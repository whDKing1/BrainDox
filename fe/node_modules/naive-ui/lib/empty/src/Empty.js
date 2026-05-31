"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyProps = void 0;
const vue_1 = require("vue");
const icon_1 = require("../../_internal/icon");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.emptyProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { description: String, showDescription: {
        type: Boolean,
        default: true
    }, showIcon: {
        type: Boolean,
        default: true
    }, size: {
        type: String,
        default: 'medium'
    }, renderIcon: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Empty',
    props: exports.emptyProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Empty', '-empty', index_cssr_1.default, styles_1.emptyLight, props, mergedClsPrefixRef);
        const { localeRef } = (0, _mixins_1.useLocale)('Empty');
        const mergedDescriptionRef = (0, vue_1.computed)(() => {
            var _a, _b, _c;
            return ((_a = props.description) !== null && _a !== void 0 ? _a : (_c = (_b = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _b === void 0 ? void 0 : _b.Empty) === null || _c === void 0 ? void 0 : _c.description);
        });
        const mergedRenderIconRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Empty) === null || _b === void 0 ? void 0 : _b.renderIcon)
                || (() => (0, vue_1.h)(icons_1.EmptyIcon, null));
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { size } = props;
            const { common: { cubicBezierEaseInOut }, self: { [(0, _utils_1.createKey)('iconSize', size)]: iconSize, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, textColor, iconColor, extraTextColor } } = themeRef.value;
            return {
                '--n-icon-size': iconSize,
                '--n-font-size': fontSize,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-text-color': textColor,
                '--n-icon-color': iconColor,
                '--n-extra-text-color': extraTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('empty', (0, vue_1.computed)(() => {
                let hash = '';
                const { size } = props;
                hash += size[0];
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedRenderIcon: mergedRenderIconRef,
            localizedDescription: (0, vue_1.computed)(() => {
                return mergedDescriptionRef.value || localeRef.value.description;
            }),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { $slots, mergedClsPrefix, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-empty`, this.themeClass], style: this.cssVars },
            this.showIcon ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-empty__icon` }, $slots.icon ? ($slots.icon()) : ((0, vue_1.h)(icon_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: this.mergedRenderIcon })))) : null,
            this.showDescription ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-empty__description` }, $slots.default ? $slots.default() : this.localizedDescription)) : null,
            $slots.extra ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-empty__extra` }, $slots.extra())) : null));
    }
});
