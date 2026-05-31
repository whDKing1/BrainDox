"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBrowserLocation = useBrowserLocation;
const vue_1 = require("vue");
const is_browser_1 = require("../env/is-browser");
function useBrowserLocation(customWindow = is_browser_1.isBrowser ? window : null) {
    const getWindowLocation = () => {
        const { hash, host, hostname, href, origin, pathname, port, protocol, search } = (customWindow === null || customWindow === void 0 ? void 0 : customWindow.location) || {};
        return {
            hash,
            host,
            hostname,
            href,
            origin,
            pathname,
            port,
            protocol,
            search
        };
    };
    const locationState = (0, vue_1.ref)(getWindowLocation());
    const updateLocation = () => {
        locationState.value = getWindowLocation();
    };
    (0, vue_1.onMounted)(() => {
        if (customWindow) {
            customWindow.addEventListener('popstate', updateLocation);
            customWindow.addEventListener('hashchange', updateLocation);
        }
    });
    (0, vue_1.onUnmounted)(() => {
        if (customWindow) {
            customWindow.removeEventListener('popstate', updateLocation);
            customWindow.removeEventListener('hashchange', updateLocation);
        }
    });
    return locationState;
}
