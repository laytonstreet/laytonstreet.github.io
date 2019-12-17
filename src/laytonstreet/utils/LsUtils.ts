
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