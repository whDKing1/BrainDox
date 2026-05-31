const warnedMessages = new Set();
export function warnOnce(location, message) {
    const mergedMessage = `[seemly/${location}]: ${message}`;
    if (warnedMessages.has(mergedMessage))
        return;
    warnedMessages.add(mergedMessage);
}
export function warn(location, message) {
    console.error(`[seemly/${location}]: ${message}`);
}
