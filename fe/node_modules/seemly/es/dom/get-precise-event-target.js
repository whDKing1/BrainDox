export function getPreciseEventTarget(event) {
    return event.composedPath()[0] || null;
}
