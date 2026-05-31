import { isBrowser, isJsdom } from "./_utils/index.mjs";
// Polyfill browser APIs
class _ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
function _matchMedia(query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  };
}
if (isJsdom() && typeof window !== 'undefined') {
  window.ResizeObserver = _ResizeObserver;
  window.matchMedia = _matchMedia;
}
// https://github.com/jsdom/jsdom/issues/1422
if (isBrowser) {
  HTMLDivElement.prototype.scrollTo = () => {};
}