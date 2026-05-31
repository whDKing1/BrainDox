export function createId(length = 8) {
    return Math.random()
        .toString(16)
        .slice(2, 2 + length);
}
export function repeat(count, v) {
    const ret = [];
    for (let i = 0; i < count; ++i) {
        ret.push(v);
    }
    return ret;
}
function indexMap(count, createValue) {
    const ret = [];
    if (!createValue) {
        for (let i = 0; i < count; ++i) {
            ret.push(i);
        }
        return ret;
    }
    for (let i = 0; i < count; ++i) {
        ret.push(createValue(i));
    }
    return ret;
}
export { indexMap };
export async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
