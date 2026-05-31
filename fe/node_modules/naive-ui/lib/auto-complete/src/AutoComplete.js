"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCompleteProps = void 0;
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const input_1 = require("../../input");
const utils_1 = require("../../select/src/utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_2 = require("./utils");
exports.autoCompleteProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: _utils_1.useAdjustedTo.propTo, menuProps: Object, append: Boolean, bordered: {
        type: Boolean,
        default: undefined
    }, clearable: {
        type: Boolean,
        default: undefined
    }, defaultValue: {
        type: String,
        default: null
    }, loading: {
        type: Boolean,
        default: undefined
    }, disabled: {
        type: Boolean,
        default: undefined
    }, placeholder: String, placement: {
        type: String,
        default: 'bottom-start'
    }, value: String, blurAfterSelect: Boolean, clearAfterSelect: Boolean, getShow: Function, showEmpty: Boolean, inputProps: Object, renderOption: Function, renderLabel: Function, size: String, options: {
        type: Array,
        default: () => []
    }, zIndex: Number, status: String, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], onSelect: [Function, Array], onBlur: [Function, Array], onFocus: [Function, Array], scrollbarProps: Object, 
    // deprecated
    onInput: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'AutoComplete',
    props: exports.autoCompleteProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.onInput !== undefined) {
                    (0, _utils_1.warnOnce)('auto-complete', '`on-input` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedBorderedRef, namespaceRef, mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.AutoComplete) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        const triggerElRef = (0, vue_1.ref)(null);
        const menuInstRef = (0, vue_1.ref)(null);
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const canBeActivatedRef = (0, vue_1.ref)(false);
        const isComposingRef = (0, vue_1.ref)(false);
        const themeRef = (0, _mixins_1.useTheme)('AutoComplete', '-auto-complete', index_cssr_1.default, styles_1.autoCompleteLight, props, mergedClsPrefixRef);
        const selectOptionsRef = (0, vue_1.computed)(() => {
            return (0, utils_2.mapAutoCompleteOptionsToSelectOptions)(props.options);
        });
        const mergedShowOptionsRef = (0, vue_1.computed)(() => {
            const { getShow } = props;
            if (getShow) {
                return getShow(mergedValueRef.value || '');
            }
            return !!mergedValueRef.value;
        });
        const activeRef = (0, vue_1.computed)(() => {
            return (mergedShowOptionsRef.value
                && canBeActivatedRef.value
                && (props.showEmpty ? true : !!selectOptionsRef.value.length));
        });
        const treeMateRef = (0, vue_1.computed)(() => (0, treemate_1.createTreeMate)(selectOptionsRef.value, (0, utils_1.createTmOptions)('value', 'children')));
        function doUpdateValue(value) {
            const { 'onUpdate:value': _onUpdateValue, onUpdateValue, onInput } = props;
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value);
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, value);
            if (onInput)
                (0, _utils_1.call)(onInput, value);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
        }
        function doSelect(value) {
            const { onSelect } = props;
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            if (onSelect)
                (0, _utils_1.call)(onSelect, value);
            nTriggerFormInput();
            nTriggerFormChange();
        }
        function doBlur(e) {
            const { onBlur } = props;
            const { nTriggerFormBlur } = formItem;
            if (onBlur)
                (0, _utils_1.call)(onBlur, e);
            nTriggerFormBlur();
        }
        function doFocus(e) {
            const { onFocus } = props;
            const { nTriggerFormFocus } = formItem;
            if (onFocus)
                (0, _utils_1.call)(onFocus, e);
            nTriggerFormFocus();
        }
        function handleCompositionStart() {
            isComposingRef.value = true;
        }
        function handleCompositionEnd() {
            window.setTimeout(() => {
                isComposingRef.value = false;
            }, 0);
        }
        function handleKeyDown(e) {
            var _a, _b, _c;
            switch (e.key) {
                case 'Enter':
                    if (!isComposingRef.value) {
                        const pendingOptionTmNode = (_a = menuInstRef.value) === null || _a === void 0 ? void 0 : _a.getPendingTmNode();
                        if (pendingOptionTmNode) {
                            select(pendingOptionTmNode.rawNode);
                            e.preventDefault();
                        }
                    }
                    break;
                case 'ArrowDown':
                    (_b = menuInstRef.value) === null || _b === void 0 ? void 0 : _b.next();
                    break;
                case 'ArrowUp':
                    (_c = menuInstRef.value) === null || _c === void 0 ? void 0 : _c.prev();
                    break;
            }
        }
        function select(option) {
            if ((option === null || option === void 0 ? void 0 : option.value) !== undefined) {
                doSelect(option.value);
                if (props.clearAfterSelect) {
                    doUpdateValue(null);
                }
                else if (option.label !== undefined) {
                    doUpdateValue(props.append
                        ? `${mergedValueRef.value}${option.label}`
                        : option.label);
                }
                canBeActivatedRef.value = false;
                if (props.blurAfterSelect) {
                    blur();
                }
            }
        }
        function handleClear() {
            doUpdateValue(null);
        }
        function handleFocus(e) {
            canBeActivatedRef.value = true;
            doFocus(e);
        }
        function handleBlur(e) {
            canBeActivatedRef.value = false;
            doBlur(e);
        }
        function handleInput(value) {
            canBeActivatedRef.value = true;
            doUpdateValue(value);
        }
        function handleToggle(option) {
            select(option.rawNode);
        }
        function handleClickOutsideMenu(e) {
            var _a;
            if (!((_a = triggerElRef.value) === null || _a === void 0 ? void 0 : _a.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
                canBeActivatedRef.value = false;
            }
        }
        function blur() {
            var _a, _b;
            if ((_a = triggerElRef.value) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
                ;
                (_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.blur();
            }
        }
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { menuBoxShadow } } = themeRef.value;
            return {
                '--n-menu-box-shadow': menuBoxShadow,
                '--n-bezier': cubicBezierEaseInOut
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('auto-complete', undefined, cssVarsRef, props)
            : undefined;
        const inputInstRef = (0, vue_1.ref)(null);
        const exposedMethods = {
            focus: () => {
                var _a;
                (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            blur: () => {
                var _a;
                (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            }
        };
        return {
            focus: exposedMethods.focus,
            blur: exposedMethods.blur,
            inputInstRef,
            uncontrolledValue: uncontrolledValueRef,
            mergedValue: mergedValueRef,
            isMounted: (0, vooks_1.useIsMounted)(),
            adjustedTo: (0, _utils_1.useAdjustedTo)(props),
            menuInstRef,
            triggerElRef,
            treeMate: treeMateRef,
            mergedSize: mergedSizeRef,
            mergedDisabled: mergedDisabledRef,
            active: activeRef,
            mergedStatus: mergedStatusRef,
            handleClear,
            handleFocus,
            handleBlur,
            handleInput,
            handleToggle,
            handleClickOutsideMenu,
            handleCompositionStart,
            handleCompositionEnd,
            handleKeyDown,
            mergedTheme: themeRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            mergedBordered: mergedBorderedRef,
            namespace: namespaceRef,
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-auto-complete`, ref: "triggerElRef", onKeydown: this.handleKeyDown, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => {
                            const defaultSlot = this.$slots.default;
                            if (defaultSlot) {
                                return (0, _utils_1.getFirstSlotVNodeWithTypedProps)('default', defaultSlot, {
                                    handleInput: this.handleInput,
                                    handleFocus: this.handleFocus,
                                    handleBlur: this.handleBlur,
                                    value: this.mergedValue
                                });
                            }
                            const { mergedTheme } = this;
                            return ((0, vue_1.h)(input_1.NInput, { ref: "inputInstRef", status: this.mergedStatus, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, bordered: this.mergedBordered, value: this.mergedValue, placeholder: this.placeholder, size: this.mergedSize, disabled: this.mergedDisabled, clearable: this.clearable, loading: this.loading, inputProps: this.inputProps, onClear: this.handleClear, onFocus: this.handleFocus, onUpdateValue: this.handleInput, onBlur: this.handleBlur }, {
                                suffix: () => { var _a, _b; return (_b = (_a = this.$slots).suffix) === null || _b === void 0 ? void 0 : _b.call(_a); },
                                prefix: () => { var _a, _b; return (_b = (_a = this.$slots).prefix) === null || _b === void 0 ? void 0 : _b.call(_a); }
                            }));
                        }
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { show: this.active, to: this.adjustedTo, containerClass: this.namespace, zIndex: this.zIndex, teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey, placement: this.placement, width: "target" }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted }, {
                            default: () => {
                                var _a;
                                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                                if (!this.active)
                                    return null;
                                const { menuProps } = this;
                                return (0, vue_1.withDirectives)((0, vue_1.h)(_internal_1.NInternalSelectMenu, Object.assign({}, menuProps, { clsPrefix: mergedClsPrefix, ref: "menuInstRef", theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides
                                        .InternalSelectMenu, "auto-pending": true, class: [
                                        `${mergedClsPrefix}-auto-complete-menu`,
                                        this.themeClass,
                                        menuProps === null || menuProps === void 0 ? void 0 : menuProps.class
                                    ], style: [
                                        menuProps === null || menuProps === void 0 ? void 0 : menuProps.style,
                                        this.cssVars
                                    ], treeMate: this.treeMate, multiple: false, renderLabel: this.renderLabel, renderOption: this.renderOption, size: "medium", onToggle: this.handleToggle, scrollbarProps: this.scrollbarProps }), { empty: () => { var _a, _b; return (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a); } }), [
                                    [
                                        vdirs_1.clickoutside,
                                        this.handleClickOutsideMenu,
                                        undefined,
                                        { capture: true }
                                    ]
                                ]);
                            }
                        }))
                    })
                ]
            })));
    }
});
