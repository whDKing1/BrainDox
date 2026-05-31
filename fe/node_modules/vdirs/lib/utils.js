"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = exports.warnOnce = void 0;
const warnedMessages = new Set();
function warnOnce(location, message) {
    const mergedMessage = `[vdirs/${location}]: ${message}`;
    if (warnedMessages.has(mergedMessage))
        return;
    warnedMessages.add(mergedMessage);
}
exports.warnOnce = warnOnce;
function warn(location, message) {
    console.error(`[vdirs/${location}]: ${message}`);
}
exports.warn = warn;
