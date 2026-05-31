"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../../_mixins");
const _utils_1 = require("../../../_utils");
const popover_1 = require("../../../popover");
const tag_1 = require("../../../tag");
const suffix_1 = __importDefault(require("../../suffix"));
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'InternalSelection',
    props: Object.assign(Object.assign({}, _mixins_1.useTheme.props), { clsPrefix: {
            type: String,
            required: true
        }, bordered: {
            type: Boolean,
            default: undefined
        }, active: Boolean, pattern: {
            type: String,
            default: ''
        }, placeholder: String, selectedOption: {
            type: Object,
            default: null
        }, selectedOptions: {
            type: Array,
            default: null
        }, labelField: { type: String, default: 'label' }, valueField: {
            type: String,
            default: 'value'
        }, multiple: Boolean, filterable: Boolean, clearable: Boolean, disabled: Boolean, size: {
            type: String,
            default: 'medium'
        }, loading: Boolean, autofocus: Boolean, showArrow: {
            type: Boolean,
            default: true
        }, inputProps: Object, focused: Boolean, renderTag: Function, onKeydown: Function, onClick: Function, onBlur: Function, onFocus: Function, onDeleteOption: Function, maxTagCount: [String, Number], ellipsisTagPopoverProps: Object, onClear: Function, onPatternInput: Function, onPatternFocus: Function, onPatternBlur: Function, renderLabel: Function, status: String, inlineThemeDisabled: Boolean, ignoreComposition: { type: Boolean, default: true }, onResize: Function }),
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('InternalSelection', mergedRtlRef, mergedClsPrefixRef);
        const patternInputMirrorRef = (0, vue_1.ref)(null);
        const patternInputRef = (0, vue_1.ref)(null);
        const selfRef = (0, vue_1.ref)(null);
        const multipleElRef = (0, vue_1.ref)(null);
        const singleElRef = (0, vue_1.ref)(null);
        const patternInputWrapperRef = (0, vue_1.ref)(null);
        const counterRef = (0, vue_1.ref)(null);
        const counterWrapperRef = (0, vue_1.ref)(null);
        const overflowRef = (0, vue_1.ref)(null);
        const inputTagElRef = (0, vue_1.ref)(null);
        const showTagsPopoverRef = (0, vue_1.ref)(false);
        const patternInputFocusedRef = (0, vue_1.ref)(false);
        const hoverRef = (0, vue_1.ref)(false);
        const themeRef = (0, _mixins_1.useTheme)('InternalSelection', '-internal-selection', index_cssr_1.default, styles_1.internalSelectionLight, props, (0, vue_1.toRef)(props, 'clsPrefix'));
        const mergedClearableRef = (0, vue_1.computed)(() => {
            return (props.clearable && !props.disabled && (hoverRef.value || props.active));
        });
        const filterablePlaceholderRef = (0, vue_1.computed)(() => {
            return props.selectedOption
                ? props.renderTag
                    ? props.renderTag({
                        option: props.selectedOption,
                        handleClose: () => { }
                    })
                    : props.renderLabel
                        ? props.renderLabel(props.selectedOption, true)
                        : (0, _utils_1.render)(props.selectedOption[props.labelField], props.selectedOption, true)
                : props.placeholder;
        });
        const labelRef = (0, vue_1.computed)(() => {
            const option = props.selectedOption;
            if (!option)
                return undefined;
            return option[props.labelField];
        });
        const selectedRef = (0, vue_1.computed)(() => {
            if (props.multiple) {
                return !!(Array.isArray(props.selectedOptions) && props.selectedOptions.length);
            }
            else {
                return props.selectedOption !== null;
            }
        });
        function syncMirrorWidth() {
            var _a;
            const { value: patternInputMirrorEl } = patternInputMirrorRef;
            if (patternInputMirrorEl) {
                const { value: patternInputEl } = patternInputRef;
                if (patternInputEl) {
                    patternInputEl.style.width = `${patternInputMirrorEl.offsetWidth}px`;
                    if (props.maxTagCount !== 'responsive') {
                        (_a = overflowRef.value) === null || _a === void 0 ? void 0 : _a.sync({
                            showAllItemsBeforeCalculate: false
                        });
                    }
                }
            }
        }
        function hideInputTag() {
            const { value: inputTagEl } = inputTagElRef;
            if (inputTagEl)
                inputTagEl.style.display = 'none';
        }
        function showInputTag() {
            const { value: inputTagEl } = inputTagElRef;
            if (inputTagEl)
                inputTagEl.style.display = 'inline-block';
        }
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'active'), (value) => {
            if (!value)
                hideInputTag();
        });
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'pattern'), () => {
            if (props.multiple) {
                void (0, vue_1.nextTick)(syncMirrorWidth);
            }
        });
        function doFocus(e) {
            const { onFocus } = props;
            if (onFocus)
                onFocus(e);
        }
        function doBlur(e) {
            const { onBlur } = props;
            if (onBlur)
                onBlur(e);
        }
        function doDeleteOption(value) {
            const { onDeleteOption } = props;
            if (onDeleteOption)
                onDeleteOption(value);
        }
        function doClear(e) {
            const { onClear } = props;
            if (onClear)
                onClear(e);
        }
        function doPatternInput(value) {
            const { onPatternInput } = props;
            if (onPatternInput)
                onPatternInput(value);
        }
        function handleFocusin(e) {
            var _a;
            if (!e.relatedTarget
                || !((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))) {
                doFocus(e);
            }
        }
        function handleFocusout(e) {
            var _a;
            if ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
                return;
            doBlur(e);
        }
        function handleClear(e) {
            doClear(e);
        }
        function handleMouseEnter() {
            hoverRef.value = true;
        }
        function handleMouseLeave() {
            hoverRef.value = false;
        }
        function handleMouseDown(e) {
            if (!props.active || !props.filterable)
                return;
            if (e.target === patternInputRef.value)
                return;
            e.preventDefault();
        }
        function handleDeleteOption(option) {
            doDeleteOption(option);
        }
        const isComposingRef = (0, vue_1.ref)(false);
        function handlePatternKeyDown(e) {
            if (e.key === 'Backspace' && !isComposingRef.value) {
                if (!props.pattern.length) {
                    const { selectedOptions } = props;
                    if (selectedOptions === null || selectedOptions === void 0 ? void 0 : selectedOptions.length) {
                        handleDeleteOption(selectedOptions[selectedOptions.length - 1]);
                    }
                }
            }
        }
        // the composition end is later than its input so we can cached the event
        // and return the input event
        let cachedInputEvent = null;
        function handlePatternInputInput(e) {
            // we should sync mirror width here
            const { value: patternInputMirrorEl } = patternInputMirrorRef;
            if (patternInputMirrorEl) {
                const inputText = e.target.value;
                patternInputMirrorEl.textContent = inputText;
                syncMirrorWidth();
            }
            if (props.ignoreComposition) {
                if (!isComposingRef.value) {
                    doPatternInput(e);
                }
                else {
                    cachedInputEvent = e;
                }
            }
            else {
                doPatternInput(e);
            }
        }
        function handleCompositionStart() {
            isComposingRef.value = true;
        }
        function handleCompositionEnd() {
            isComposingRef.value = false;
            if (props.ignoreComposition) {
                doPatternInput(cachedInputEvent);
            }
            cachedInputEvent = null;
        }
        function handlePatternInputFocus(e) {
            var _a;
            patternInputFocusedRef.value = true;
            (_a = props.onPatternFocus) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function handlePatternInputBlur(e) {
            var _a;
            patternInputFocusedRef.value = false;
            (_a = props.onPatternBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function blur() {
            var _a, _b;
            if (props.filterable) {
                patternInputFocusedRef.value = false;
                (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.blur();
                (_b = patternInputRef.value) === null || _b === void 0 ? void 0 : _b.blur();
            }
            else if (props.multiple) {
                const { value: multipleEl } = multipleElRef;
                multipleEl === null || multipleEl === void 0 ? void 0 : multipleEl.blur();
            }
            else {
                const { value: singleEl } = singleElRef;
                singleEl === null || singleEl === void 0 ? void 0 : singleEl.blur();
            }
        }
        function focus() {
            var _a, _b, _c;
            if (props.filterable) {
                patternInputFocusedRef.value = false;
                (_a = patternInputWrapperRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else if (props.multiple) {
                (_b = multipleElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
            }
            else {
                (_c = singleElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
            }
        }
        function focusInput() {
            const { value: patternInputEl } = patternInputRef;
            if (patternInputEl) {
                showInputTag();
                patternInputEl.focus();
            }
        }
        function blurInput() {
            const { value: patternInputEl } = patternInputRef;
            if (patternInputEl) {
                patternInputEl.blur();
            }
        }
        function updateCounter(count) {
            const { value } = counterRef;
            if (value) {
                value.setTextContent(`+${count}`);
            }
        }
        function getCounter() {
            const { value } = counterWrapperRef;
            return value;
        }
        function getTail() {
            return patternInputRef.value;
        }
        let enterTimerId = null;
        function clearEnterTimer() {
            if (enterTimerId !== null)
                window.clearTimeout(enterTimerId);
        }
        function handleMouseEnterCounter() {
            if (props.active)
                return;
            clearEnterTimer();
            enterTimerId = window.setTimeout(() => {
                if (selectedRef.value) {
                    showTagsPopoverRef.value = true;
                }
            }, 100);
        }
        function handleMouseLeaveCounter() {
            clearEnterTimer();
        }
        function onPopoverUpdateShow(show) {
            if (!show) {
                clearEnterTimer();
                showTagsPopoverRef.value = false;
            }
        }
        (0, vue_1.watch)(selectedRef, (value) => {
            if (!value) {
                showTagsPopoverRef.value = false;
            }
        });
        (0, vue_1.onMounted)(() => {
            (0, vue_1.watchEffect)(() => {
                const patternInputWrapperEl = patternInputWrapperRef.value;
                if (!patternInputWrapperEl)
                    return;
                if (props.disabled) {
                    patternInputWrapperEl.removeAttribute('tabindex');
                }
                else {
                    patternInputWrapperEl.tabIndex = patternInputFocusedRef.value ? -1 : 0;
                }
            });
        });
        (0, _utils_1.useOnResize)(selfRef, props.onResize);
        const { inlineThemeDisabled } = props;
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { size } = props;
            const { common: { cubicBezierEaseInOut }, self: { fontWeight, borderRadius, color, placeholderColor, textColor, paddingSingle, paddingMultiple, caretColor, colorDisabled, textColorDisabled, placeholderColorDisabled, colorActive, boxShadowFocus, boxShadowActive, boxShadowHover, border, borderFocus, borderHover, borderActive, arrowColor, arrowColorDisabled, loadingColor, 
            // form warning
            colorActiveWarning, boxShadowFocusWarning, boxShadowActiveWarning, boxShadowHoverWarning, borderWarning, borderFocusWarning, borderHoverWarning, borderActiveWarning, 
            // form error
            colorActiveError, boxShadowFocusError, boxShadowActiveError, boxShadowHoverError, borderError, borderFocusError, borderHoverError, borderActiveError, 
            // clear
            clearColor, clearColorHover, clearColorPressed, clearSize, 
            // arrow
            arrowSize, [(0, _utils_1.createKey)('height', size)]: height, [(0, _utils_1.createKey)('fontSize', size)]: fontSize } } = themeRef.value;
            const paddingSingleDiscrete = (0, seemly_1.getPadding)(paddingSingle);
            const paddingMultipleDiscrete = (0, seemly_1.getPadding)(paddingMultiple);
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-border': border,
                '--n-border-active': borderActive,
                '--n-border-focus': borderFocus,
                '--n-border-hover': borderHover,
                '--n-border-radius': borderRadius,
                '--n-box-shadow-active': boxShadowActive,
                '--n-box-shadow-focus': boxShadowFocus,
                '--n-box-shadow-hover': boxShadowHover,
                '--n-caret-color': caretColor,
                '--n-color': color,
                '--n-color-active': colorActive,
                '--n-color-disabled': colorDisabled,
                '--n-font-size': fontSize,
                '--n-height': height,
                '--n-padding-single-top': paddingSingleDiscrete.top,
                '--n-padding-multiple-top': paddingMultipleDiscrete.top,
                '--n-padding-single-right': paddingSingleDiscrete.right,
                '--n-padding-multiple-right': paddingMultipleDiscrete.right,
                '--n-padding-single-left': paddingSingleDiscrete.left,
                '--n-padding-multiple-left': paddingMultipleDiscrete.left,
                '--n-padding-single-bottom': paddingSingleDiscrete.bottom,
                '--n-padding-multiple-bottom': paddingMultipleDiscrete.bottom,
                '--n-placeholder-color': placeholderColor,
                '--n-placeholder-color-disabled': placeholderColorDisabled,
                '--n-text-color': textColor,
                '--n-text-color-disabled': textColorDisabled,
                '--n-arrow-color': arrowColor,
                '--n-arrow-color-disabled': arrowColorDisabled,
                '--n-loading-color': loadingColor,
                // form warning
                '--n-color-active-warning': colorActiveWarning,
                '--n-box-shadow-focus-warning': boxShadowFocusWarning,
                '--n-box-shadow-active-warning': boxShadowActiveWarning,
                '--n-box-shadow-hover-warning': boxShadowHoverWarning,
                '--n-border-warning': borderWarning,
                '--n-border-focus-warning': borderFocusWarning,
                '--n-border-hover-warning': borderHoverWarning,
                '--n-border-active-warning': borderActiveWarning,
                // form error
                '--n-color-active-error': colorActiveError,
                '--n-box-shadow-focus-error': boxShadowFocusError,
                '--n-box-shadow-active-error': boxShadowActiveError,
                '--n-box-shadow-hover-error': boxShadowHoverError,
                '--n-border-error': borderError,
                '--n-border-focus-error': borderFocusError,
                '--n-border-hover-error': borderHoverError,
                '--n-border-active-error': borderActiveError,
                // clear
                '--n-clear-size': clearSize,
                '--n-clear-color': clearColor,
                '--n-clear-color-hover': clearColorHover,
                '--n-clear-color-pressed': clearColorPressed,
                // arrow-size
                '--n-arrow-size': arrowSize,
                // font-weight
                '--n-font-weight': fontWeight
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('internal-selection', (0, vue_1.computed)(() => {
                return props.size[0];
            }), cssVarsRef, props)
            : undefined;
        return {
            mergedTheme: themeRef,
            mergedClearable: mergedClearableRef,
            mergedClsPrefix: mergedClsPrefixRef,
            rtlEnabled: rtlEnabledRef,
            patternInputFocused: patternInputFocusedRef,
            filterablePlaceholder: filterablePlaceholderRef,
            label: labelRef,
            selected: selectedRef,
            showTagsPanel: showTagsPopoverRef,
            isComposing: isComposingRef,
            // dom ref
            counterRef,
            counterWrapperRef,
            patternInputMirrorRef,
            patternInputRef,
            selfRef,
            multipleElRef,
            singleElRef,
            patternInputWrapperRef,
            overflowRef,
            inputTagElRef,
            handleMouseDown,
            handleFocusin,
            handleClear,
            handleMouseEnter,
            handleMouseLeave,
            handleDeleteOption,
            handlePatternKeyDown,
            handlePatternInputInput,
            handlePatternInputBlur,
            handlePatternInputFocus,
            handleMouseEnterCounter,
            handleMouseLeaveCounter,
            handleFocusout,
            handleCompositionEnd,
            handleCompositionStart,
            onPopoverUpdateShow,
            focus,
            focusInput,
            blur,
            blurInput,
            updateCounter,
            getCounter,
            getTail,
            renderLabel: props.renderLabel,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { status, multiple, size, disabled, filterable, maxTagCount, bordered, clsPrefix, ellipsisTagPopoverProps, onRender, renderTag, renderLabel } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const maxTagCountResponsive = maxTagCount === 'responsive';
        const maxTagCountNumeric = typeof maxTagCount === 'number';
        const useMaxTagCount = maxTagCountResponsive || maxTagCountNumeric;
        const suffix = ((0, vue_1.h)(_utils_1.Wrapper, null, {
            default: () => ((0, vue_1.h)(suffix_1.default, { clsPrefix: clsPrefix, loading: this.loading, showArrow: this.showArrow, showClear: this.mergedClearable && this.selected, onClear: this.handleClear }, {
                default: () => { var _a, _b; return (_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a); }
            }))
        }));
        let body;
        if (multiple) {
            const { labelField } = this;
            const createTag = (option) => ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-tag-wrapper`, key: option.value }, renderTag ? (renderTag({
                option,
                handleClose: () => {
                    this.handleDeleteOption(option);
                }
            })) : ((0, vue_1.h)(tag_1.NTag, { size: size, closable: !option.disabled, disabled: disabled, onClose: () => {
                    this.handleDeleteOption(option);
                }, internalCloseIsButtonTag: false, internalCloseFocusable: false }, {
                default: () => renderLabel
                    ? renderLabel(option, true)
                    : (0, _utils_1.render)(option[labelField], option, true)
            }))));
            const createOriginalTagNodes = () => (maxTagCountNumeric
                ? this.selectedOptions.slice(0, maxTagCount)
                : this.selectedOptions).map(createTag);
            const input = filterable ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-input-tag`, ref: "inputTagElRef", key: "__input-tag__" },
                (0, vue_1.h)("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", tabindex: -1, disabled: disabled, value: this.pattern, autofocus: this.autofocus, class: `${clsPrefix}-base-selection-input-tag__input`, onBlur: this.handlePatternInputBlur, onFocus: this.handlePatternInputFocus, onKeydown: this.handlePatternKeyDown, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
                (0, vue_1.h)("span", { ref: "patternInputMirrorRef", class: `${clsPrefix}-base-selection-input-tag__mirror` }, this.pattern))) : null;
            // May Overflow
            const renderCounter = maxTagCountResponsive
                ? () => ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-tag-wrapper`, ref: "counterWrapperRef" },
                    (0, vue_1.h)(tag_1.NTag, { size: size, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, onMouseleave: this.handleMouseLeaveCounter, disabled: disabled })))
                : undefined;
            let counter;
            if (maxTagCountNumeric) {
                const rest = this.selectedOptions.length - maxTagCount;
                if (rest > 0) {
                    counter = ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-tag-wrapper`, key: "__counter__" },
                        (0, vue_1.h)(tag_1.NTag, { size: size, ref: "counterRef", onMouseenter: this.handleMouseEnterCounter, disabled: disabled }, {
                            default: () => `+${rest}`
                        })));
                }
            }
            const tags = maxTagCountResponsive ? (filterable ? ((0, vue_1.h)(vueuc_1.VOverflow, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, getTail: this.getTail, style: {
                    width: '100%',
                    display: 'flex',
                    overflow: 'hidden'
                } }, {
                default: createOriginalTagNodes,
                counter: renderCounter,
                tail: () => input
            })) : ((0, vue_1.h)(vueuc_1.VOverflow, { ref: "overflowRef", updateCounter: this.updateCounter, getCounter: this.getCounter, style: {
                    width: '100%',
                    display: 'flex',
                    overflow: 'hidden'
                } }, {
                default: createOriginalTagNodes,
                counter: renderCounter
            }))) : maxTagCountNumeric && counter ? (createOriginalTagNodes().concat(counter)) : (createOriginalTagNodes());
            const renderPopover = useMaxTagCount
                ? () => ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-popover` }, maxTagCountResponsive
                    ? createOriginalTagNodes()
                    : this.selectedOptions.map(createTag)))
                : undefined;
            const popoverProps = useMaxTagCount
                ? Object.assign({ show: this.showTagsPanel, trigger: 'hover', overlap: true, placement: 'top', width: 'trigger', onUpdateShow: this.onPopoverUpdateShow, theme: this.mergedTheme.peers.Popover, themeOverrides: this.mergedTheme.peerOverrides.Popover }, ellipsisTagPopoverProps)
                : null;
            const showPlaceholder = this.selected
                ? false
                : this.active
                    ? !this.pattern && !this.isComposing
                    : true;
            const placeholder = showPlaceholder ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay` },
                (0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-placeholder__inner` }, this.placeholder))) : null;
            const popoverTrigger = filterable ? ((0, vue_1.h)("div", { ref: "patternInputWrapperRef", class: `${clsPrefix}-base-selection-tags` },
                tags,
                maxTagCountResponsive ? null : input,
                suffix)) : ((0, vue_1.h)("div", { ref: "multipleElRef", class: `${clsPrefix}-base-selection-tags`, tabindex: disabled ? undefined : 0 },
                tags,
                suffix));
            body = ((0, vue_1.h)(vue_1.Fragment, null,
                useMaxTagCount ? ((0, vue_1.h)(popover_1.NPopover, Object.assign({}, popoverProps, { scrollable: true, style: "max-height: calc(var(--v-target-height) * 6.6);" }), {
                    trigger: () => popoverTrigger,
                    default: renderPopover
                })) : (popoverTrigger),
                placeholder));
        }
        else {
            if (filterable) {
                const hasInput = this.pattern || this.isComposing;
                const showPlaceholder = this.active ? !hasInput : !this.selected;
                const showSelectedLabel = this.active ? false : this.selected;
                body = ((0, vue_1.h)("div", { ref: "patternInputWrapperRef", class: `${clsPrefix}-base-selection-label`, title: this.patternInputFocused
                        ? undefined
                        : (0, _utils_1.getTitleAttribute)(this.label) },
                    (0, vue_1.h)("input", Object.assign({}, this.inputProps, { ref: "patternInputRef", class: `${clsPrefix}-base-selection-input`, value: this.active ? this.pattern : '', placeholder: "", readonly: disabled, disabled: disabled, tabindex: -1, autofocus: this.autofocus, onFocus: this.handlePatternInputFocus, onBlur: this.handlePatternInputBlur, onInput: this.handlePatternInputInput, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd })),
                    showSelectedLabel ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-label__render-label ${clsPrefix}-base-selection-overlay`, key: "input" },
                        (0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-overlay__wrapper` }, renderTag
                            ? renderTag({
                                option: this.selectedOption,
                                handleClose: () => { }
                            })
                            : renderLabel
                                ? renderLabel(this.selectedOption, true)
                                : (0, _utils_1.render)(this.label, this.selectedOption, true)))) : null,
                    showPlaceholder ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`, key: "placeholder" },
                        (0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-overlay__wrapper` }, this.filterablePlaceholder))) : null,
                    suffix));
            }
            else {
                body = ((0, vue_1.h)("div", { ref: "singleElRef", class: `${clsPrefix}-base-selection-label`, tabindex: this.disabled ? undefined : 0 },
                    this.label !== undefined ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-input`, title: (0, _utils_1.getTitleAttribute)(this.label), key: "input" },
                        (0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-input__content` }, renderTag
                            ? renderTag({
                                option: this.selectedOption,
                                handleClose: () => { }
                            })
                            : renderLabel
                                ? renderLabel(this.selectedOption, true)
                                : (0, _utils_1.render)(this.label, this.selectedOption, true)))) : ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-placeholder ${clsPrefix}-base-selection-overlay`, key: "placeholder" },
                        (0, vue_1.h)("div", { class: `${clsPrefix}-base-selection-placeholder__inner` }, this.placeholder))),
                    suffix));
            }
        }
        return ((0, vue_1.h)("div", { ref: "selfRef", class: [
                `${clsPrefix}-base-selection`,
                this.rtlEnabled && `${clsPrefix}-base-selection--rtl`,
                this.themeClass,
                status && `${clsPrefix}-base-selection--${status}-status`,
                {
                    [`${clsPrefix}-base-selection--active`]: this.active,
                    [`${clsPrefix}-base-selection--selected`]: this.selected || (this.active && this.pattern),
                    [`${clsPrefix}-base-selection--disabled`]: this.disabled,
                    [`${clsPrefix}-base-selection--multiple`]: this.multiple,
                    // focus is not controlled by selection itself since it always need
                    // to be managed together with menu. provide :focus style will cause
                    // many redundant codes.
                    [`${clsPrefix}-base-selection--focus`]: this.focused
                }
            ], style: this.cssVars, onClick: this.onClick, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onKeydown: this.onKeydown, onFocusin: this.handleFocusin, onFocusout: this.handleFocusout, onMousedown: this.handleMouseDown },
            body,
            bordered ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection__border` })) : null,
            bordered ? ((0, vue_1.h)("div", { class: `${clsPrefix}-base-selection__state-border` })) : null));
    }
});
