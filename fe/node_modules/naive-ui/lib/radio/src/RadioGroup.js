"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radioGroupProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const radio_group_cssr_1 = __importDefault(require("./styles/radio-group.cssr"));
const use_radio_1 = require("./use-radio");
function mapSlot(defaultSlot, value, clsPrefix) {
    var _a;
    const children = [];
    let isButtonGroup = false;
    for (let i = 0; i < defaultSlot.length; ++i) {
        const wrappedInstance = defaultSlot[i];
        const name = (_a = wrappedInstance.type) === null || _a === void 0 ? void 0 : _a.name;
        if (name === 'RadioButton') {
            isButtonGroup = true;
        }
        if (process.env.NODE_ENV !== 'production' && isButtonGroup && name !== 'RadioButton') {
            (0, _utils_1.warn)('radio-group', '`n-radio-group` in button mode only takes `n-radio-button` as children.');
            continue;
        }
        const instanceProps = wrappedInstance.props;
        if (name !== 'RadioButton') {
            children.push(wrappedInstance);
            continue;
        }
        if (i === 0) {
            children.push(wrappedInstance);
        }
        else {
            const lastInstanceProps = children[children.length - 1]
                .props;
            const lastInstanceChecked = value === lastInstanceProps.value;
            const lastInstanceDisabled = lastInstanceProps.disabled;
            const currentInstanceChecked = value === instanceProps.value;
            const currentInstanceDisabled = instanceProps.disabled;
            /**
             * Priority of button splitor:
             * !disabled  checked >
             *  disabled  checked >
             * !disabled !checked >
             *  disabled !checked
             */
            const lastInstancePriority = (lastInstanceChecked ? 2 : 0) + (!lastInstanceDisabled ? 1 : 0);
            const currentInstancePriority = (currentInstanceChecked ? 2 : 0) + (!currentInstanceDisabled ? 1 : 0);
            const lastInstanceClass = {
                [`${clsPrefix}-radio-group__splitor--disabled`]: lastInstanceDisabled,
                [`${clsPrefix}-radio-group__splitor--checked`]: lastInstanceChecked
            };
            const currentInstanceClass = {
                [`${clsPrefix}-radio-group__splitor--disabled`]: currentInstanceDisabled,
                [`${clsPrefix}-radio-group__splitor--checked`]: currentInstanceChecked
            };
            const splitorClass = lastInstancePriority < currentInstancePriority
                ? currentInstanceClass
                : lastInstanceClass;
            children.push((0, vue_1.h)("div", { class: [`${clsPrefix}-radio-group__splitor`, splitorClass] }), wrappedInstance);
        }
    }
    return {
        children,
        isButtonGroup
    };
}
exports.radioGroupProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { name: String, value: [String, Number, Boolean], defaultValue: {
        type: [String, Number, Boolean],
        default: null
    }, size: String, disabled: {
        type: Boolean,
        default: undefined
    }, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'RadioGroup',
    props: exports.radioGroupProps,
    setup(props) {
        const selfElRef = (0, vue_1.ref)(null);
        const { mergedSizeRef, mergedDisabledRef, nTriggerFormChange, nTriggerFormInput, nTriggerFormBlur, nTriggerFormFocus } = (0, _mixins_1.useFormItem)(props);
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Radio', '-radio-group', radio_group_cssr_1.default, styles_1.radioLight, props, mergedClsPrefixRef);
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        function doUpdateValue(value) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props;
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value);
            }
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
            nTriggerFormInput();
        }
        function handleFocusin(e) {
            const { value: selfEl } = selfElRef;
            if (!selfEl)
                return;
            if (selfEl.contains(e.relatedTarget))
                return;
            nTriggerFormFocus();
        }
        function handleFocusout(e) {
            const { value: selfEl } = selfElRef;
            if (!selfEl)
                return;
            if (selfEl.contains(e.relatedTarget))
                return;
            nTriggerFormBlur();
        }
        (0, vue_1.provide)(use_radio_1.radioGroupInjectionKey, {
            mergedClsPrefixRef,
            nameRef: (0, vue_1.toRef)(props, 'name'),
            valueRef: mergedValueRef,
            disabledRef: mergedDisabledRef,
            mergedSizeRef,
            doUpdateValue
        });
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Radio', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { common: { cubicBezierEaseInOut }, self: { buttonBorderColor, buttonBorderColorActive, buttonBorderRadius, buttonBoxShadow, buttonBoxShadowFocus, buttonBoxShadowHover, buttonColor, buttonColorActive, buttonTextColor, buttonTextColorActive, buttonTextColorHover, opacityDisabled, [(0, _utils_1.createKey)('buttonHeight', size)]: height, [(0, _utils_1.createKey)('fontSize', size)]: fontSize } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-button-border-color': buttonBorderColor,
                '--n-button-border-color-active': buttonBorderColorActive,
                '--n-button-border-radius': buttonBorderRadius,
                '--n-button-box-shadow': buttonBoxShadow,
                '--n-button-box-shadow-focus': buttonBoxShadowFocus,
                '--n-button-box-shadow-hover': buttonBoxShadowHover,
                '--n-button-color': buttonColor,
                '--n-button-color-active': buttonColorActive,
                '--n-button-text-color': buttonTextColor,
                '--n-button-text-color-hover': buttonTextColorHover,
                '--n-button-text-color-active': buttonTextColorActive,
                '--n-height': height,
                '--n-opacity-disabled': opacityDisabled
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('radio-group', (0, vue_1.computed)(() => mergedSizeRef.value[0]), cssVarsRef, props)
            : undefined;
        return {
            selfElRef,
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedValue: mergedValueRef,
            handleFocusout,
            handleFocusin,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { mergedValue, mergedClsPrefix, handleFocusin, handleFocusout } = this;
        const { children, isButtonGroup } = mapSlot((0, _utils_1.flatten)((0, _utils_1.getSlot)(this)), mergedValue, mergedClsPrefix);
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { onFocusin: handleFocusin, onFocusout: handleFocusout, ref: "selfElRef", class: [
                `${mergedClsPrefix}-radio-group`,
                this.rtlEnabled && `${mergedClsPrefix}-radio-group--rtl`,
                this.themeClass,
                isButtonGroup && `${mergedClsPrefix}-radio-group--button-group`
            ], style: this.cssVars }, children));
    }
});
