"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radioProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const radio_cssr_1 = __importDefault(require("./styles/radio.cssr"));
const use_radio_1 = require("./use-radio");
exports.radioProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), use_radio_1.radioBaseProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Radio',
    props: exports.radioProps,
    setup(props) {
        const radio = (0, use_radio_1.setup)(props);
        const themeRef = (0, _mixins_1.useTheme)('Radio', '-radio', radio_cssr_1.default, styles_1.radioLight, props, radio.mergedClsPrefix);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { mergedSize: { value: size } } = radio;
            const { common: { cubicBezierEaseInOut }, self: { boxShadow, boxShadowActive, boxShadowDisabled, boxShadowFocus, boxShadowHover, color, colorDisabled, colorActive, textColor, textColorDisabled, dotColorActive, dotColorDisabled, labelPadding, labelLineHeight, labelFontWeight, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('radioSize', size)]: radioSize } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-label-line-height': labelLineHeight,
                '--n-label-font-weight': labelFontWeight,
                '--n-box-shadow': boxShadow,
                '--n-box-shadow-active': boxShadowActive,
                '--n-box-shadow-disabled': boxShadowDisabled,
                '--n-box-shadow-focus': boxShadowFocus,
                '--n-box-shadow-hover': boxShadowHover,
                '--n-color': color,
                '--n-color-active': colorActive,
                '--n-color-disabled': colorDisabled,
                '--n-dot-color-active': dotColorActive,
                '--n-dot-color-disabled': dotColorDisabled,
                '--n-font-size': fontSize,
                '--n-radio-size': radioSize,
                '--n-text-color': textColor,
                '--n-text-color-disabled': textColorDisabled,
                '--n-label-padding': labelPadding
            };
        });
        const { inlineThemeDisabled, mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Radio', mergedRtlRef, mergedClsPrefixRef);
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('radio', (0, vue_1.computed)(() => radio.mergedSize.value[0]), cssVarsRef, props)
            : undefined;
        return Object.assign(radio, {
            rtlEnabled: rtlEnabledRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        });
    },
    render() {
        const { $slots, mergedClsPrefix, onRender, label } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("label", { class: [
                `${mergedClsPrefix}-radio`,
                this.themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-radio--rtl`,
                this.mergedDisabled && `${mergedClsPrefix}-radio--disabled`,
                this.renderSafeChecked && `${mergedClsPrefix}-radio--checked`,
                this.focus && `${mergedClsPrefix}-radio--focus`
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-radio__dot-wrapper` },
                "\u00A0",
                (0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-radio__dot`,
                        this.renderSafeChecked && `${mergedClsPrefix}-radio__dot--checked`
                    ] }),
                (0, vue_1.h)("input", { ref: "inputRef", type: "radio", class: `${mergedClsPrefix}-radio-input`, value: this.value, name: this.mergedName, checked: this.renderSafeChecked, disabled: this.mergedDisabled, onChange: this.handleRadioInputChange, onFocus: this.handleRadioInputFocus, onBlur: this.handleRadioInputBlur })),
            (0, _utils_1.resolveWrappedSlot)($slots.default, (children) => {
                if (!children && !label)
                    return null;
                return ((0, vue_1.h)("div", { ref: "labelRef", class: `${mergedClsPrefix}-radio__label` }, children || label));
            })));
    }
});
