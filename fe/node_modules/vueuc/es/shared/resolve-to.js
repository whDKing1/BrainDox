export function resolveTo(selector) {
    if (typeof selector === 'string') {
        return document.querySelector(selector);
    }
    return selector() || null;
}
