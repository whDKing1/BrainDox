"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkboxProps = void 0;
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const CheckboxGroup_1 = require("./CheckboxGroup");
const CheckMark_1 = __importDefault(require("./CheckMark"));
const LineMark_1 = __importDefault(require("./LineMark"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.checkboxProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: String, checked: {
        type: [Boolean, String, Number],
        default: undefined
    }, defaultChecked: {
        type: [Boolean, String, Number],
        default: false
    }, value: [String, Number], disabled: {
        type: Boolean,
        default: undefined
    }, indeterminate: Boolean, label: String, focusable: {
        type: Boolean,
        default: true
    }, checkedValue: {
        type: [Boolean, String, Number],
        default: true
    }, uncheckedValue: {
        type: [Boolean, String, Number],
        default: false
    }, 'onUpdate:checked': [Function, Array], onUpdateChecked: [Function, Array], 
    // private
    privateInsideTable: Boolean, 
    // deprecated
    onChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Checkbox',
    props: exports.checkboxProps,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onChange) {
                    (0, _utils_1.warnOnce)('checkbox', '`on-change` is deprecated, please use `on-update:checked` instead.');
                }
            });
        }
        const NCheckboxGroup = (0, vue_1.inject)(CheckboxGroup_1.checkboxGroupInjectionKey, null);
        const selfRef = (0, vue_1.ref)(null);
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const uncontrolledCheckedRef = (0, vue_1.ref)(props.defaultChecked);
        const controlledCheckedRef = (0, vue_1.toRef)(props, 'checked');
        const mergedCheckedRef = (0, vooks_1.useMergedState)(controlledCheckedRef, uncontrolledCheckedRef);
        const renderedCheckedRef = (0, vooks_1.useMemo)(() => {
            if (NCheckboxGroup) {
                const groupValueSet = NCheckboxGroup.valueSetRef.value;
                if (groupValueSet && props.value !== undefined) {
                    return groupValueSet.has(props.value);
                }
                return false;
            }
            else {
                return mergedCheckedRef.value === props.checkedValue;
            }
        });
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize(NFormItem) {
                var _a, _b;
                const { size } = props;
                if (size !== undefined)
                    return size;
                if (NCheckboxGroup) {
                    const { value: mergedSize } = NCheckboxGroup.mergedSizeRef;
                    if (mergedSize !== undefined) {
                        return mergedSize;
                    }
                }
                if (NFormItem) {
                    const { mergedSize } = NFormItem;
                    if (mergedSize !== undefined)
                        return mergedSize.value;
                }
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Checkbox) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            },
            mergedDisabled(NFormItem) {
                const { disabled } = props;
                if (disabled !== undefined)
                    return disabled;
                if (NCheckboxGroup) {
                    if (NCheckboxGroup.disabledRef.value)
                        return true;
                    const { maxRef: { value: max }, checkedCountRef } = NCheckboxGroup;
                    if (max !== undefined
                        && checkedCountRef.value >= max
                        && !renderedCheckedRef.value) {
                        return true;
                    }
                    const { minRef: { value: min } } = NCheckboxGroup;
                    if (min !== undefined
                        && checkedCountRef.value <= min
                        && renderedCheckedRef.value) {
                        return true;
                    }
                }
                if (NFormItem) {
                    return NFormItem.disabled.value;
                }
                return false;
            }
        });
        const { mergedDisabledRef, mergedSizeRef } = formItem;
        const themeRef = (0, _mixins_1.useTheme)('Checkbox', '-checkbox', index_cssr_1.default, styles_1.checkboxLight, props, mergedClsPrefixRef);
        function toggle(e) {
            if (NCheckboxGroup && props.value !== undefined) {
                NCheckboxGroup.toggleCheckbox(!renderedCheckedRef.value, props.value);
            }
            else {
                const { onChange, 'onUpdate:checked': _onUpdateCheck, onUpdateChecked } = props;
                const { nTriggerFormInput, nTriggerFormChange } = formItem;
                const nextChecked = renderedCheckedRef.value
                    ? props.uncheckedValue
                    : props.checkedValue;
                if (_onUpdateCheck) {
                    (0, _utils_1.call)(_onUpdateCheck, nextChecked, e);
                }
                if (onUpdateChecked) {
                    (0, _utils_1.call)(onUpdateChecked, nextChecked, e);
                }
                if (onChange)
                    (0, _utils_1.call)(onChange, nextChecked, e); // deprecated
                nTriggerFormInput();
                nTriggerFormChange();
                uncontrolledCheckedRef.value = nextChecked;
            }
        }
        function handleClick(e) {
            if (!mergedDisabledRef.value) {
                toggle(e);
            }
        }
        function handleKeyUp(e) {
            if (mergedDisabledRef.value)
                return;
            switch (e.key) {
                case ' ':
                case 'Enter':
                    toggle(e);
            }
        }
        function handleKeyDown(e) {
            switch (e.key) {
                case ' ':
                    e.preventDefault();
            }
        }
        const exposedMethods = {
            focus: () => {
                var _a;
                (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            blur: () => {
                var _a;
                (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            }
        };
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Checkbox', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: mergedSize } = mergedSizeRef;
            const { common: { cubicBezierEaseInOut }, self: { borderRadius, color, colorChecked, colorDisabled, colorTableHeader, colorTableHeaderModal, colorTableHeaderPopover, checkMarkColor, checkMarkColorDisabled, border, borderFocus, borderDisabled, borderChecked, boxShadowFocus, textColor, textColorDisabled, checkMarkColorDisabledChecked, colorDisabledChecked, borderDisabledChecked, labelPadding, labelLineHeight, labelFontWeight, [(0, _utils_1.createKey)('fontSize', mergedSize)]: fontSize, [(0, _utils_1.createKey)('size', mergedSize)]: size } } = themeRef.value;
            return {
                '--n-label-line-height': labelLineHeight,
                '--n-label-font-weight': labelFontWeight,
                '--n-size': size,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border-radius': borderRadius,
                '--n-border': border,
                '--n-border-checked': borderChecked,
                '--n-border-focus': borderFocus,
                '--n-border-disabled': borderDisabled,
                '--n-border-disabled-checked': borderDisabledChecked,
                '--n-box-shadow-focus': boxShadowFocus,
                '--n-color': color,
                '--n-color-checked': colorChecked,
                '--n-color-table': colorTableHeader,
                '--n-color-table-modal': colorTableHeaderModal,
                '--n-color-table-popover': colorTableHeaderPopover,
                '--n-color-disabled': colorDisabled,
                '--n-color-disabled-checked': colorDisabledChecked,
                '--n-text-color': textColor,
                '--n-text-color-disabled': textColorDisabled,
                '--n-check-mark-color': checkMarkColor,
                '--n-check-mark-color-disabled': checkMarkColorDisabled,
                '--n-check-mark-color-disabled-checked': checkMarkColorDisabledChecked,
                '--n-font-size': fontSize,
                '--n-label-padding': labelPadding
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('checkbox', (0, vue_1.computed)(() => mergedSizeRef.value[0]), cssVarsRef, props)
            : undefined;
        return Object.assign(formItem, exposedMethods, {
            rtlEnabled: rtlEnabledRef,
            selfRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedDisabled: mergedDisabledRef,
            renderedChecked: renderedCheckedRef,
            mergedTheme: themeRef,
            labelId: (0, seemly_1.createId)(),
            handleClick,
            handleKeyUp,
            handleKeyDown,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        });
    },
    render() {
        var _a;
        const { $slots, renderedChecked, mergedDisabled, indeterminate, privateInsideTable, cssVars, labelId, label, mergedClsPrefix, focusable, handleKeyUp, handleKeyDown, handleClick } = this;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        const labelNode = (0, _utils_1.resolveWrappedSlot)($slots.default, (children) => {
            if (label || children) {
                return ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-checkbox__label`, id: labelId }, label || children));
            }
            return null;
        });
        return ((0, vue_1.h)("div", { ref: "selfRef", class: [
                `${mergedClsPrefix}-checkbox`,
                this.themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-checkbox--rtl`,
                renderedChecked && `${mergedClsPrefix}-checkbox--checked`,
                mergedDisabled && `${mergedClsPrefix}-checkbox--disabled`,
                indeterminate && `${mergedClsPrefix}-checkbox--indeterminate`,
                privateInsideTable && `${mergedClsPrefix}-checkbox--inside-table`,
                labelNode && `${mergedClsPrefix}-checkbox--show-label`
            ], tabindex: mergedDisabled || !focusable ? undefined : 0, role: "checkbox", "aria-checked": indeterminate ? 'mixed' : renderedChecked, "aria-labelledby": labelId, style: cssVars, onKeyup: handleKeyUp, onKeydown: handleKeyDown, onClick: handleClick, onMousedown: () => {
                (0, evtd_1.on)('selectstart', window, (e) => {
                    e.preventDefault();
                }, {
                    once: true
                });
            } },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-checkbox-box-wrapper` },
                "\u00A0",
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-checkbox-box` },
                    (0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                        default: () => this.indeterminate ? ((0, vue_1.h)("div", { key: "indeterminate", class: `${mergedClsPrefix}-checkbox-icon` }, (0, LineMark_1.default)())) : ((0, vue_1.h)("div", { key: "check", class: `${mergedClsPrefix}-checkbox-icon` }, (0, CheckMark_1.default)()))
                    }),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-checkbox-box__border` }))),
            labelNode));
    }
});
