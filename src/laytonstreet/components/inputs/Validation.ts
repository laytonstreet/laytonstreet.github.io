
type ValidationStep<T> = (value: T) => Validation | Promise<Validation> | undefined;

type ValidateOptions<T> = {
    callback(v: Validation): void,
    checks: ValidationStep<T>[]
};

export async function validate<T>(value: T, { callback, checks }: ValidateOptions<T>) {
    let result;
    for (const check of checks) {
        try {
            result = (await check(value) || result);
        } catch (e) {
            callback(new ErrorResult());
            return;
        }
        if (result instanceof UnfinishedResult) {
            callback(result);
        } else if (result && !result.valid) {
            callback(result);
            return;
        }
    }
    callback(result || Valid());
}


export function Valid(message?: string): Validation  {
    return new ValidResult(message);
}

export function Invalid(message: string): Validation {
    return new InvalidResult(message);
}

export function Warning(message: string): Validation {
    return new WarningResult(message);
}

export function Unfinished(message?: string): Validation {
    return new UnfinishedResult(message);
}

export default abstract class Validation {
    public readonly valid: boolean | undefined;
    public readonly message: String | null;

    protected constructor(valid: boolean | undefined, message: string | null) {
        this.valid = valid;
        this.message = message;
    }
}

class ValidResult extends Validation {
    constructor(message?: string) {
        super(true, message || null);
    }
}

class InvalidResult extends Validation {
    constructor(message: string) {
        super(false, message);
    }
}

class WarningResult extends Validation {
    constructor(message: string) {
        super(true, message);
    }
}

class ErrorResult extends Validation {
    constructor() {
        super(false, "Error");
    }
}

class UnfinishedResult extends Validation {
    constructor(message?: string) {
        super(undefined, message || null);
    }
}