"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDataKey = createDataKey;
function createDataKey(key) {
    return typeof key === 'string' ? `s-${key}` : `n-${key}`;
}
