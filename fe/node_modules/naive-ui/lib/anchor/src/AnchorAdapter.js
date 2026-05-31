"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anchorProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const affix_1 = require("../../affix");
const Affix_1 = require("../../affix/src/Affix");
const styles_1 = require("../styles");
const BaseAnchor_1 = __importStar(require("./BaseAnchor"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.anchorProps = Object.assign(Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), { affix: Boolean }), Affix_1.affixProps), BaseAnchor_1.baseAnchorProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Anchor',
    props: exports.anchorProps,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Anchor', '-anchor', index_cssr_1.default, styles_1.anchorLight, props, mergedClsPrefixRef);
        const anchorRef = (0, vue_1.ref)(null);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { railColor, linkColor, railColorActive, linkTextColor, linkTextColorHover, linkTextColorPressed, linkTextColorActive, linkFontSize, railWidth, linkPadding, borderRadius }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-link-border-radius': borderRadius,
                '--n-link-color': linkColor,
                '--n-link-font-size': linkFontSize,
                '--n-link-text-color': linkTextColor,
                '--n-link-text-color-hover': linkTextColorHover,
                '--n-link-text-color-active': linkTextColorActive,
                '--n-link-text-color-pressed': linkTextColorPressed,
                '--n-link-padding': linkPadding,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-rail-color': railColor,
                '--n-rail-color-active': railColorActive,
                '--n-rail-width': railWidth
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('anchor', undefined, cssVarsRef, props)
            : undefined;
        return {
            scrollTo(href) {
                var _a;
                (_a = anchorRef.value) === null || _a === void 0 ? void 0 : _a.setActiveHref(href);
            },
            renderAnchor: () => {
                themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
                return ((0, vue_1.h)(BaseAnchor_1.default, Object.assign({ ref: anchorRef, style: inlineThemeDisabled
                        ? undefined
                        : cssVarsRef.value, class: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value }, (0, _utils_1.keep)(props, BaseAnchor_1.baseAnchorPropKeys), { mergedClsPrefix: mergedClsPrefixRef.value }), slots));
            }
        };
    },
    render() {
        return !this.affix ? (this.renderAnchor()) : ((0, vue_1.h)(affix_1.NAffix, Object.assign({}, (0, _utils_1.keep)(this, Affix_1.affixPropKeys)), { default: this.renderAnchor }));
    }
});
