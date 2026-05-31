"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const _403_1 = require("./403");
const _404_1 = require("./404");
const _418_1 = require("./418");
const _500_1 = require("./500");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const iconRenderMap = {
    403: _403_1.render403,
    404: _404_1.render404,
    418: _418_1.render418,
    500: _500_1.render500,
    info: () => (0, vue_1.h)(icons_1.InfoIcon, null),
    success: () => (0, vue_1.h)(icons_1.SuccessIcon, null),
    warning: () => (0, vue_1.h)(icons_1.WarningIcon, null),
    error: () => (0, vue_1.h)(icons_1.ErrorIcon, null)
};
exports.resultProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: String, status: {
        type: String,
        default: 'info'
    }, title: String, description: String });
exports.default = (0, vue_1.defineComponent)({
    name: 'Result',
    props: exports.resultProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Result) === null || _b === void 0 ? void 0 : _b.size) || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Result', '-result', index_cssr_1.default, styles_1.resultLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { status } = props;
            const size = mergedSizeRef.value;
            const { common: { cubicBezierEaseInOut }, self: { textColor, lineHeight, titleTextColor, titleFontWeight, [(0, _utils_1.createKey)('iconColor', status)]: iconColor, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('titleFontSize', size)]: titleFontSize, [(0, _utils_1.createKey)('iconSize', size)]: iconSize } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-font-size': fontSize,
                '--n-icon-size': iconSize,
                '--n-line-height': lineHeight,
                '--n-text-color': textColor,
                '--n-title-font-size': titleFontSize,
                '--n-title-font-weight': titleFontWeight,
                '--n-title-text-color': titleTextColor,
                '--n-icon-color': iconColor || ''
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('result', (0, vue_1.computed)(() => {
                const { status } = props;
                const size = mergedSizeRef.value;
                let hash = '';
                if (size) {
                    hash += size[0];
                }
                if (status) {
                    hash += status[0];
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { status, $slots, mergedClsPrefix, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-result`, this.themeClass], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-icon` }, ((_a = $slots.icon) === null || _a === void 0 ? void 0 : _a.call($slots)) || ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => iconRenderMap[status]() }))),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-header` },
                this.title ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-header__title` }, this.title)) : null,
                this.description ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-header__description` }, this.description)) : null),
            $slots.default && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-content` }, $slots)),
            $slots.footer && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-result-footer` }, $slots.footer()))));
    }
});
