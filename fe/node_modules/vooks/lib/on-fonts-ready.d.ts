declare const init: () => void;
export { init };
/**
 * Call callback on fontsReady is resolved. If fontsReady is already resolved,
 * callback won't be called.
 */
export default function onFontsReady(cb: () => any): void;
