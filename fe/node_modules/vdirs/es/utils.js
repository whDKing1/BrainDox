const warnedMessages = new Set();
export function warnOnce(location, message) {
    const mergedMessage = `[vdirs/${location}]: ${message}`;
    if (warnedMessages.has(mergedMessage))
        return;
    warnedMessages.add(mergedMessage);
}
export function warn(location, message) {
    console.error(`[vdirs/${location}]: ${message}`);
}
