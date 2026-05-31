"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const common_1 = require("../../_styles/common");
const _utils_1 = require("../../_utils");
const context_1 = require("../../config-provider/src/context");
exports.default = (0, vue_1.defineComponent)({
    name: 'GlobalStyle',
    setup() {
        if (typeof document === 'undefined')
            return; // TODO: inject style for SSR
        const NConfigProvider = (0, vue_1.inject)(context_1.configProviderInjectionKey, null);
        const { body } = document;
        const { style } = body;
        let styleApplied = false;
        let firstApply = true;
        (0, vue_1.onBeforeMount)(() => {
            (0, vue_1.watchEffect)(() => {
                var _a, _b;
                const { textColor2, fontSize, fontFamily, bodyColor, cubicBezierEaseInOut, lineHeight } = NConfigProvider
                    ? (0, lodash_1.merge)({}, ((_a = NConfigProvider.mergedThemeRef.value) === null || _a === void 0 ? void 0 : _a.common) || common_1.commonLight, (_b = NConfigProvider.mergedThemeOverridesRef.value) === null || _b === void 0 ? void 0 : _b.common)
                    : common_1.commonLight;
                if (styleApplied || !body.hasAttribute('n-styled')) {
                    style.setProperty('-webkit-text-size-adjust', '100%');
                    style.setProperty('-webkit-tap-highlight-color', 'transparent');
                    style.padding = '0';
                    style.margin = '0';
                    style.backgroundColor = bodyColor;
                    style.color = textColor2;
                    style.fontSize = fontSize;
                    style.fontFamily = fontFamily;
                    style.lineHeight = lineHeight;
                    const transition = `color .3s ${cubicBezierEaseInOut}, background-color .3s ${cubicBezierEaseInOut}`;
                    if (firstApply) {
                        setTimeout(() => {
                            style.transition = transition;
                        }, 0);
                    }
                    else {
                        style.transition = transition;
                    }
                    body.setAttribute('n-styled', '');
                    styleApplied = true;
                    firstApply = false;
                }
                else if (process.env.NODE_ENV !== 'production') {
                    (0, _utils_1.warn)('global-style', 'More than one n-global-style exist in the document.body. Only the first mounted one will work.');
                }
            });
        });
        (0, vue_1.onUnmounted)(() => {
            if (styleApplied) {
                body.removeAttribute('n-styled');
            }
        });
    },
    render() {
        return null;
    }
});
