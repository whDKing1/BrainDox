"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnOnce = warnOnce;
exports.warn = warn;
const warnedMessages = new Set();
function warnOnce(location, message) {
    const mergedMessage = `[seemly/${location}]: ${message}`;
    if (warnedMessages.has(mergedMessage))
        return;
    warnedMessages.add(mergedMessage);
}
function warn(location, message) {
    console.error(`[seemly/${location}]: ${message}`);
}
