"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.omit = omit;
function omit(object, keys = [], rest) {
    const omitedObject = {};
    const originalKeys = Object.getOwnPropertyNames(object);
    originalKeys.forEach((originalKey) => {
        if (!keys.includes(originalKey)) {
            omitedObject[originalKey] = object[originalKey];
        }
    });
    return Object.assign(omitedObject, rest);
}
