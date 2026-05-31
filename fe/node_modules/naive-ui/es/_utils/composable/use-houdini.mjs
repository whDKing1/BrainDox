import { isBrowser } from "../env/is-browser.mjs";
let houdiniRegistered = false;
export function useHoudini() {
  if (!isBrowser) return;
  if (!window.CSS) return;
  if (!houdiniRegistered) {
    houdiniRegistered = true;
    if ('registerProperty' in (window === null || window === void 0 ? void 0 : window.CSS)) {
      try {
        ;
        CSS.registerProperty({
          name: '--n-color-start',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        });
        CSS.registerProperty({
          name: '--n-color-end',
          syntax: '<color>',
          inherits: false,
          initialValue: '#0000'
        });
      } catch (_a) {}
    }
  }
}