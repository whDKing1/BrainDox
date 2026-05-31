"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const vue_1 = require("vue");
const utils_1 = require("./utils");
let fontsReady;
let isFontReady;
const init = () => {
    var _a, _b;
    fontsReady = utils_1.isBrowser ? (_b = (_a = document) === null || _a === void 0 ? void 0 : _a.fonts) === null || _b === void 0 ? void 0 : _b.ready : undefined;
    isFontReady = false;
    /* istanbul ignore if */
    if (fontsReady !== undefined) {
        void fontsReady.then(() => {
            isFontReady = true;
        });
    }
    else {
        isFontReady = true;
    }
};
exports.init = init;
init();
/**
 * Call callback on fontsReady is resolved. If fontsReady is already resolved,
 * callback won't be called.
 */
function onFontsReady(cb) {
    /* istanbul ignore next */
    if (isFontReady)
        return;
    let deactivated = false;
    (0, vue_1.onMounted)(() => {
        /* istanbul ignore next */
        if (!isFontReady) {
            fontsReady === null || fontsReady === void 0 ? void 0 : fontsReady.then(() => {
                if (deactivated)
                    return;
                cb();
            });
        }
    });
    (0, vue_1.onBeforeUnmount)(() => {
        deactivated = true;
    });
}
exports.default = onFontsReady;
