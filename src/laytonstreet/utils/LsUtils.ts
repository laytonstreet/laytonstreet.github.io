
export function* intersperse<T>(array: T[], delim: T) {
    let first = true;
    for (const x of array) {
        if (!first) {
            yield delim;
        }
        first = false;
        yield x;
    }
}

export function range(start: number, end: number) {
    const length = Math.floor(end - start) + 1;
    return Array.from(Array(length), (_, idx) => start + (idx));
}

export function total(array: number[]) {
    return array.reduce((x, y) => x + y);
}

type RoundingOptions = { decimalPlaces: number } | { significantFigures: number }

export function round(value: number, options: RoundingOptions = { decimalPlaces: 0 }): number {
    if ((options as any).decimalPlaces) {
        const tens = Math.pow(10, (options as any).decimalPlaces)
        return Math.round((value + Number.EPSILON) * tens) / tens;
    } else {
        const tens = Math.pow(10, (options as any).significantFigures)
        return Math.round((value / tens) + Number.EPSILON) * tens;
    }
}