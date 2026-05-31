"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createId = createId;
exports.repeat = repeat;
exports.indexMap = indexMap;
exports.sleep = sleep;
function createId(length = 8) {
    return Math.random()
        .toString(16)
        .slice(2, 2 + length);
}
function repeat(count, v) {
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
async function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
