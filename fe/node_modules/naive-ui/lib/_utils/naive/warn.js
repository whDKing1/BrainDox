"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnOnce = warnOnce;
exports.warn = warn;
exports.error = error;
exports.throwError = throwError;
const warnedMessages = new Set();
function warnOnce(location, message) {
    const mergedMessage = `[naive/${location}]: ${message}`;
    if (warnedMessages.has(mergedMessage))
        return;
    warnedMessages.add(mergedMessage);
    console.error(mergedMessage);
}
function warn(location, message) {
    console.error(`[naive/${location}]: ${message}`);
}
function error(location, message, error) {
    console.error(`[naive/${location}]: ${message}`, error);
}
function throwError(location, message) {
    throw new Error(`[naive/${location}]: ${message}`);
}
