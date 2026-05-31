"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.switchProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: String, value: {
        type: [String, Number, Boolean],
        default: undefined
    }, loading: Boolean, defaultValue: {
        type: [String, Number, Boolean],
        default: false
    }, disabled: {
        type: Boolean,
        default: undefined
    }, round: {
        type: Boolean,
        default: true
    }, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], checkedValue: {
        type: [String, Number, Boolean],
        default: true
    }, uncheckedValue: {
        type: [String, Number, Boolean],
        default: false
    }, railStyle: Function, rubberBand: {
        type: Boolean,
        default: true
    }, spinProps: Object, 
    /** @deprecated */
    onChange: [Function, Array] });
let supportCssMax;
exports.default = (0, vue_1.defineComponent)({
    name: 'Switch',
    props: exports.switchProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange) {
                    (0, _utils_1.warnOnce)('switch', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        if (supportCssMax === undefined) {
            if (typeof CSS !== 'undefined') {
                if (typeof CSS.supports !== 'undefined') {
                    supportCssMax = CSS.supports('width', 'max(1px)');
                }
                else {
                    supportCssMax = false;
                }
            }
            else {
                // If you are using SSR, we assume that you are targeting browsers with
                // recent versions
                supportCssMax = true;
            }
        }
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Switch', '-switch', index_cssr_1.default, styles_1.switchLight, props, mergedClsPrefixRef);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize(NFormItem) {
                var _a, _b;
                if (props.size !== undefined)
                    return props.size;
                if (NFormItem) {
                    return NFormItem.mergedSize.value;
                }
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Switch) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef } = formItem;
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const checkedRef = (0, vue_1.computed)(() => {
            return mergedValueRef.value === props.checkedValue;
        });
        const pressedRef = (0, vue_1.ref)(false);
        const focusedRef = (0, vue_1.ref)(false);
        const mergedRailStyleRef = (0, vue_1.computed)(() => {
            const { railStyle } = props;
            if (!railStyle)
                return undefined;
            return railStyle({ focused: focusedRef.value, checked: checkedRef.value });
        });
        function doUpdateValue(value) {
            const { 'onUpdate:value': _onUpdateValue, onChange, onUpdateValue } = props;
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, value);
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value);
            if (onChange)
                (0, _utils_1.call)(onChange, value);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
        }
        function doFocus() {
            const { nTriggerFormFocus } = formItem;
            nTriggerFormFocus();
        }
        function doBlur() {
            const { nTriggerFormBlur } = formItem;
            nTriggerFormBlur();
        }
        function handleClick() {
            if (props.loading || mergedDisabledRef.value)
                return;
            if (mergedValueRef.value !== props.checkedValue) {
                doUpdateValue(props.checkedValue);
            }
            else {
                doUpdateValue(props.uncheckedValue);
            }
        }
        function handleFocus() {
            focusedRef.value = true;
            doFocus();
        }
        function handleBlur() {
            focusedRef.value = false;
            doBlur();
            pressedRef.value = false;
        }
        function handleKeyup(e) {
            if (props.loading || mergedDisabledRef.value)
                return;
            if (e.key === ' ') {
                if (mergedValueRef.value !== props.checkedValue) {
                    doUpdateValue(props.checkedValue);
                }
                else {
                    doUpdateValue(props.uncheckedValue);
                }
                pressedRef.value = false;
            }
        }
        function handleKeydown(e) {
            if (props.loading || mergedDisabledRef.value)
                return;
            if (e.key === ' ') {
                e.preventDefault();
                pressedRef.value = true;
            }
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { self: { opacityDisabled, railColor, railColorActive, buttonBoxShadow, buttonColor, boxShadowFocus, loadingColor, textColor, iconColor, [(0, _utils_1.createKey)('buttonHeight', size)]: buttonHeight, [(0, _utils_1.createKey)('buttonWidth', size)]: buttonWidth, [(0, _utils_1.createKey)('buttonWidthPressed', size)]: buttonWidthPressed, [(0, _utils_1.createKey)('railHeight', size)]: railHeight, [(0, _utils_1.createKey)('railWidth', size)]: railWidth, [(0, _utils_1.createKey)('railBorderRadius', size)]: railBorderRadius, [(0, _utils_1.createKey)('buttonBorderRadius', size)]: buttonBorderRadius }, common: { cubicBezierEaseInOut } } = themeRef.value;
            let offset;
            let height;
            let width;
            if (supportCssMax) {
                offset = `calc((${railHeight} - ${buttonHeight}) / 2)`;
                height = `max(${railHeight}, ${buttonHeight})`;
                width = `max(${railWidth}, calc(${railWidth} + ${buttonHeight} - ${railHeight}))`;
            }
            else {
                offset = (0, seemly_1.pxfy)(((0, seemly_1.depx)(railHeight) - (0, seemly_1.depx)(buttonHeight)) / 2);
                height = (0, seemly_1.pxfy)(Math.max((0, seemly_1.depx)(railHeight), (0, seemly_1.depx)(buttonHeight)));
                width
                    = (0, seemly_1.depx)(railHeight) > (0, seemly_1.depx)(buttonHeight)
                        ? railWidth
                        : (0, seemly_1.pxfy)((0, seemly_1.depx)(railWidth) + (0, seemly_1.depx)(buttonHeight) - (0, seemly_1.depx)(railHeight));
            }
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-button-border-radius': buttonBorderRadius,
                '--n-button-box-shadow': buttonBoxShadow,
                '--n-button-color': buttonColor,
                '--n-button-width': buttonWidth,
                '--n-button-width-pressed': buttonWidthPressed,
                '--n-button-height': buttonHeight,
                '--n-height': height,
                '--n-offset': offset,
                '--n-opacity-disabled': opacityDisabled,
                '--n-rail-border-radius': railBorderRadius,
                '--n-rail-color': railColor,
                '--n-rail-color-active': railColorActive,
                '--n-rail-height': railHeight,
                '--n-rail-width': railWidth,
                '--n-width': width,
                '--n-box-shadow-focus': boxShadowFocus,
                '--n-loading-color': loadingColor,
                '--n-text-color': textColor,
                '--n-icon-color': iconColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('switch', (0, vue_1.computed)(() => {
                return mergedSizeRef.value[0];
            }), cssVarsRef, props)
            : undefined;
        return {
            handleClick,
            handleBlur,
            handleFocus,
            handleKeyup,
            handleKeydown,
            mergedRailStyle: mergedRailStyleRef,
            pressed: pressedRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedValue: mergedValueRef,
            checked: checkedRef,
            mergedDisabled: mergedDisabledRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix, mergedDisabled, checked, mergedRailStyle, onRender, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const { checked: checkedSlot, unchecked: uncheckedSlot, icon: iconSlot, 'checked-icon': checkedIconSlot, 'unchecked-icon': uncheckedIconSlot } = $slots;
        const hasIcon = !((0, _utils_1.isSlotEmpty)(iconSlot)
            && (0, _utils_1.isSlotEmpty)(checkedIconSlot)
            && (0, _utils_1.isSlotEmpty)(uncheckedIconSlot));
        return ((0, vue_1.h)("div", { role: "switch", "aria-checked": checked, class: [
                `${mergedClsPrefix}-switch`,
                this.themeClass,
                hasIcon && `${mergedClsPrefix}-switch--icon`,
                checked && `${mergedClsPrefix}-switch--active`,
                mergedDisabled && `${mergedClsPrefix}-switch--disabled`,
                this.round && `${mergedClsPrefix}-switch--round`,
                this.loading && `${mergedClsPrefix}-switch--loading`,
                this.pressed && `${mergedClsPrefix}-switch--pressed`,
                this.rubberBand && `${mergedClsPrefix}-switch--rubber-band`
            ], tabindex: !this.mergedDisabled ? 0 : undefined, style: this.cssVars, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__rail`, "aria-hidden": "true", style: mergedRailStyle },
                (0, _utils_1.resolveWrappedSlot)(checkedSlot, checkedSlotChildren => (0, _utils_1.resolveWrappedSlot)(uncheckedSlot, (uncheckedSlotChildren) => {
                    if (checkedSlotChildren || uncheckedSlotChildren) {
                        return ((0, vue_1.h)("div", { "aria-hidden": true, class: `${mergedClsPrefix}-switch__children-placeholder` },
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__rail-placeholder` },
                                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__button-placeholder` }),
                                checkedSlotChildren),
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__rail-placeholder` },
                                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__button-placeholder` }),
                                uncheckedSlotChildren)));
                    }
                    return null;
                })),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__button` },
                    (0, _utils_1.resolveWrappedSlot)(iconSlot, icon => (0, _utils_1.resolveWrappedSlot)(checkedIconSlot, checkedIcon => (0, _utils_1.resolveWrappedSlot)(uncheckedIconSlot, (uncheckedIcon) => {
                        return ((0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                            default: () => this.loading ? ((0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ key: "loading", clsPrefix: mergedClsPrefix, strokeWidth: 20 }, this.spinProps))) : this.checked && (checkedIcon || icon) ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__button-icon`, key: checkedIcon ? 'checked-icon' : 'icon' }, checkedIcon || icon)) : !this.checked && (uncheckedIcon || icon) ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-switch__button-icon`, key: uncheckedIcon ? 'unchecked-icon' : 'icon' }, uncheckedIcon || icon)) : null
                        }));
                    }))),
                    (0, _utils_1.resolveWrappedSlot)(checkedSlot, children => children && ((0, vue_1.h)("div", { key: "checked", class: `${mergedClsPrefix}-switch__checked` }, children))),
                    (0, _utils_1.resolveWrappedSlot)(uncheckedSlot, children => children && ((0, vue_1.h)("div", { key: "unchecked", class: `${mergedClsPrefix}-switch__unchecked` }, children)))))));
    }
});
