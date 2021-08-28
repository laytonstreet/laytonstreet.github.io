
export declare class TypedString<T extends string> extends String {
    protected readonly __opaqueString: T
    toString(): string
}

export declare class TypedNumber<T extends string> extends Number {
    protected readonly __opaqueString: T
    toString(): string
    valueOf(): number
}

export declare class StringId<T extends string> extends TypedString<T> {
}

export declare class IntId<T extends string> extends TypedNumber<T> {
}
