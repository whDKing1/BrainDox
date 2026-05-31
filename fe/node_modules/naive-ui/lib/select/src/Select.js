"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectProps = void 0;
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
exports.selectProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: _utils_1.useAdjustedTo.propTo, bordered: {
        type: Boolean,
        default: undefined
    }, clearable: Boolean, clearCreatedOptionsOnClear: {
        type: Boolean,
        default: true
    }, clearFilterAfterSelect: {
        type: Boolean,
        default: true
    }, options: {
        type: Array,
        default: () => []
    }, defaultValue: {
        type: [String, Number, Array],
        default: null
    }, keyboard: {
        type: Boolean,
        default: true
    }, value: [String, Number, Array], placeholder: String, menuProps: Object, multiple: Boolean, size: String, menuSize: {
        type: String
    }, filterable: Boolean, disabled: {
        type: Boolean,
        default: undefined
    }, remote: Boolean, loading: Boolean, filter: Function, placement: {
        type: String,
        default: 'bottom-start'
    }, widthMode: {
        type: String,
        default: 'trigger'
    }, tag: Boolean, onCreate: Function, fallbackOption: {
        type: [Function, Boolean],
        default: undefined
    }, show: {
        type: Boolean,
        default: undefined
    }, showArrow: {
        type: Boolean,
        default: true
    }, maxTagCount: [Number, String], ellipsisTagPopoverProps: Object, consistentMenuWidth: {
        type: Boolean,
        default: true
    }, virtualScroll: {
        type: Boolean,
        default: true
    }, labelField: {
        type: String,
        default: 'label'
    }, valueField: {
        type: String,
        default: 'value'
    }, childrenField: {
        type: String,
        default: 'children'
    }, renderLabel: Function, renderOption: Function, renderTag: Function, 'onUpdate:value': [Function, Array], inputProps: Object, nodeProps: Function, ignoreComposition: { type: Boolean, default: true }, showOnFocus: Boolean, 
    // for jsx
    onUpdateValue: [Function, Array], onBlur: [Function, Array], onClear: [Function, Array], onFocus: [Function, Array], onScroll: [Function, Array], onSearch: [Function, Array], onUpdateShow: [Function, Array], 'onUpdate:show': [Function, Array], displayDirective: {
        type: String,
        default: 'show'
    }, resetMenuOnOptionsChange: {
        type: Boolean,
        default: true
    }, status: String, showCheckmark: {
        type: Boolean,
        default: true
    }, scrollbarProps: Object, 
    /** deprecated */
    onChange: [Function, Array], items: Array });
exports.default = (0, vue_1.defineComponent)({
    name: 'Select',
    props: exports.selectProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.items !== undefined) {
                    (0, _utils_1.warnOnce)('select', '`items` is deprecated, please use `options` instead.');
                }
                if (props.onChange !== undefined) {
                    (0, _utils_1.warnOnce)('select', '`on-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, mergedBorderedRef, namespaceRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Select', '-select', index_cssr_1.default, styles_1.selectLight, props, mergedClsPrefixRef);
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const focusedRef = (0, vue_1.ref)(false);
        const patternRef = (0, vue_1.ref)('');
        const compitableOptionsRef = (0, vooks_1.useCompitable)(props, ['items', 'options']);
        const createdOptionsRef = (0, vue_1.ref)([]);
        const beingCreatedOptionsRef = (0, vue_1.ref)([]);
        const localOptionsRef = (0, vue_1.computed)(() => {
            return beingCreatedOptionsRef.value.concat(createdOptionsRef.value).concat(compitableOptionsRef.value);
        });
        const resolvedFilterRef = (0, vue_1.computed)(() => {
            const { filter } = props;
            if (filter)
                return filter;
            const { labelField, valueField } = props;
            return (pattern, option) => {
                if (!option)
                    return false;
                const label = option[labelField];
                if (typeof label === 'string') {
                    return (0, utils_1.patternMatched)(pattern, label);
                }
                const value = option[valueField];
                if (typeof value === 'string') {
                    return (0, utils_1.patternMatched)(pattern, value);
                }
                if (typeof value === 'number') {
                    return (0, utils_1.patternMatched)(pattern, String(value));
                }
                return false;
            };
        });
        const filteredOptionsRef = (0, vue_1.computed)(() => {
            if (props.remote) {
                return compitableOptionsRef.value;
            }
            else {
                const { value: localOptions } = localOptionsRef;
                const { value: pattern } = patternRef;
                if (!pattern.length || !props.filterable) {
                    return localOptions;
                }
                else {
                    return (0, utils_1.filterOptions)(localOptions, resolvedFilterRef.value, pattern, props.childrenField);
                }
            }
        });
        const treeMateRef = (0, vue_1.computed)(() => {
            const { valueField, childrenField } = props;
            const options = (0, utils_1.createTmOptions)(valueField, childrenField);
            return (0, treemate_1.createTreeMate)(filteredOptionsRef.value, options);
        });
        const valOptMapRef = (0, vue_1.computed)(() => (0, utils_1.createValOptMap)(localOptionsRef.value, props.valueField, props.childrenField));
        const uncontrolledShowRef = (0, vue_1.ref)(false);
        const mergedShowRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'show'), uncontrolledShowRef);
        const triggerRef = (0, vue_1.ref)(null);
        const followerRef = (0, vue_1.ref)(null);
        const menuRef = (0, vue_1.ref)(null);
        const { localeRef } = (0, _mixins_1.useLocale)('Select');
        const localizedPlaceholderRef = (0, vue_1.computed)(() => {
            var _a;
            return (_a = props.placeholder) !== null && _a !== void 0 ? _a : localeRef.value.placeholder;
        });
        const emptyArray = [];
        const memoValOptMapRef = (0, vue_1.ref)(new Map());
        const wrappedFallbackOptionRef = (0, vue_1.computed)(() => {
            const { fallbackOption } = props;
            if (fallbackOption === undefined) {
                const { labelField, valueField } = props;
                return (value) => ({
                    [labelField]: String(value),
                    [valueField]: value
                });
            }
            if (fallbackOption === false)
                return false;
            return (value) => {
                return Object.assign(fallbackOption(value), {
                    value
                });
            };
        });
        function getMergedOptions(values) {
            const remote = props.remote;
            const { value: memoValOptMap } = memoValOptMapRef;
            const { value: valOptMap } = valOptMapRef;
            const { value: wrappedFallbackOption } = wrappedFallbackOptionRef;
            const options = [];
            values.forEach((value) => {
                if (valOptMap.has(value)) {
                    options.push(valOptMap.get(value));
                }
                else if (remote && memoValOptMap.has(value)) {
                    options.push(memoValOptMap.get(value));
                }
                else if (wrappedFallbackOption) {
                    const option = wrappedFallbackOption(value);
                    if (option) {
                        options.push(option);
                    }
                }
            });
            return options;
        }
        const selectedOptionsRef = (0, vue_1.computed)(() => {
            if (props.multiple) {
                const { value: values } = mergedValueRef;
                if (!Array.isArray(values))
                    return [];
                return getMergedOptions(values);
            }
            return null;
        });
        const selectedOptionRef = (0, vue_1.computed)(() => {
            const { value: mergedValue } = mergedValueRef;
            if (!props.multiple && !Array.isArray(mergedValue)) {
                if (mergedValue === null)
                    return null;
                return getMergedOptions([mergedValue])[0] || null;
            }
            return null;
        });
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Select) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        function doUpdateValue(value, option) {
            const { onChange, 'onUpdate:value': _onUpdateValue, onUpdateValue } = props;
            const { nTriggerFormChange, nTriggerFormInput } = formItem;
            if (onChange)
                (0, _utils_1.call)(onChange, value, option);
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value, option);
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, option);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
            nTriggerFormInput();
        }
        function doBlur(e) {
            const { onBlur } = props;
            const { nTriggerFormBlur } = formItem;
            if (onBlur)
                (0, _utils_1.call)(onBlur, e);
            nTriggerFormBlur();
        }
        function doClear() {
            const { onClear } = props;
            if (onClear)
                (0, _utils_1.call)(onClear);
        }
        function doFocus(e) {
            const { onFocus, showOnFocus } = props;
            const { nTriggerFormFocus } = formItem;
            if (onFocus)
                (0, _utils_1.call)(onFocus, e);
            nTriggerFormFocus();
            if (showOnFocus) {
                openMenu();
            }
        }
        function doSearch(value) {
            const { onSearch } = props;
            if (onSearch)
                (0, _utils_1.call)(onSearch, value);
        }
        function doScroll(e) {
            const { onScroll } = props;
            if (onScroll)
                (0, _utils_1.call)(onScroll, e);
        }
        // remote related methods
        function updateMemorizedOptions() {
            var _a;
            const { remote, multiple } = props;
            if (remote) {
                const { value: memoValOptMap } = memoValOptMapRef;
                if (multiple) {
                    const { valueField } = props;
                    (_a = selectedOptionsRef.value) === null || _a === void 0 ? void 0 : _a.forEach((option) => {
                        memoValOptMap.set(option[valueField], option);
                    });
                }
                else {
                    const option = selectedOptionRef.value;
                    if (option) {
                        memoValOptMap.set(option[props.valueField], option);
                    }
                }
            }
        }
        // menu related methods
        function doUpdateShow(value) {
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, value);
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, value);
            uncontrolledShowRef.value = value;
        }
        function openMenu() {
            if (!mergedDisabledRef.value) {
                doUpdateShow(true);
                uncontrolledShowRef.value = true;
                if (props.filterable) {
                    focusSelectionInput();
                }
            }
        }
        function closeMenu() {
            doUpdateShow(false);
        }
        function handleMenuAfterLeave() {
            patternRef.value = '';
            beingCreatedOptionsRef.value = emptyArray;
        }
        const activeWithoutMenuOpenRef = (0, vue_1.ref)(false);
        function onTriggerInputFocus() {
            if (props.filterable) {
                activeWithoutMenuOpenRef.value = true;
            }
        }
        function onTriggerInputBlur() {
            if (props.filterable) {
                activeWithoutMenuOpenRef.value = false;
                if (!mergedShowRef.value) {
                    handleMenuAfterLeave();
                }
            }
        }
        function handleTriggerClick() {
            if (mergedDisabledRef.value)
                return;
            if (!mergedShowRef.value) {
                openMenu();
            }
            else {
                if (!props.filterable) {
                    // already focused, don't need to return focus
                    closeMenu();
                }
                else {
                    focusSelectionInput();
                }
            }
        }
        function handleTriggerBlur(e) {
            var _a, _b;
            if ((_b = (_a = menuRef.value) === null || _a === void 0 ? void 0 : _a.selfRef) === null || _b === void 0 ? void 0 : _b.contains(e.relatedTarget)) {
                return;
            }
            focusedRef.value = false;
            doBlur(e);
            // outside select, don't need to return focus
            closeMenu();
        }
        function handleTriggerFocus(e) {
            doFocus(e);
            focusedRef.value = true;
        }
        function handleMenuFocus() {
            focusedRef.value = true;
        }
        function handleMenuBlur(e) {
            var _a;
            if ((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains(e.relatedTarget))
                return;
            focusedRef.value = false;
            doBlur(e);
            // outside select, don't need to return focus
            closeMenu();
        }
        function handleMenuTabOut() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            closeMenu();
        }
        function handleMenuClickOutside(e) {
            var _a;
            if (mergedShowRef.value) {
                if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
                    // outside select, don't need to return focus
                    closeMenu();
                }
            }
        }
        function createClearedMultipleSelectValue(value) {
            if (!Array.isArray(value))
                return [];
            if (wrappedFallbackOptionRef.value) {
                // if option has a fallback, I can't help user to clear some unknown value
                return Array.from(value);
            }
            else {
                // if there's no option fallback, unappeared options are treated as invalid
                const { remote } = props;
                const { value: valOptMap } = valOptMapRef;
                if (remote) {
                    const { value: memoValOptMap } = memoValOptMapRef;
                    return value.filter(v => valOptMap.has(v) || memoValOptMap.has(v));
                }
                else {
                    return value.filter(v => valOptMap.has(v));
                }
            }
        }
        function handleToggleByTmNode(tmNode) {
            handleToggleByOption(tmNode.rawNode);
        }
        function handleToggleByOption(option) {
            if (mergedDisabledRef.value)
                return;
            const { tag, remote, clearFilterAfterSelect, valueField } = props;
            if (tag && !remote) {
                const { value: beingCreatedOptions } = beingCreatedOptionsRef;
                const beingCreatedOption = beingCreatedOptions[0] || null;
                if (beingCreatedOption) {
                    const createdOptions = createdOptionsRef.value;
                    if (!createdOptions.length) {
                        createdOptionsRef.value = [beingCreatedOption];
                    }
                    else {
                        createdOptions.push(beingCreatedOption);
                    }
                    beingCreatedOptionsRef.value = emptyArray;
                }
            }
            if (remote) {
                memoValOptMapRef.value.set(option[valueField], option);
            }
            if (props.multiple) {
                const changedValue = createClearedMultipleSelectValue(mergedValueRef.value);
                const index = changedValue.findIndex(value => value === option[valueField]);
                if (~index) {
                    changedValue.splice(index, 1);
                    if (tag && !remote) {
                        const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
                        if (~createdOptionIndex) {
                            createdOptionsRef.value.splice(createdOptionIndex, 1);
                            if (clearFilterAfterSelect)
                                patternRef.value = '';
                        }
                    }
                }
                else {
                    changedValue.push(option[valueField]);
                    if (clearFilterAfterSelect)
                        patternRef.value = '';
                }
                doUpdateValue(changedValue, getMergedOptions(changedValue));
            }
            else {
                if (tag && !remote) {
                    const createdOptionIndex = getCreatedOptionIndex(option[valueField]);
                    if (~createdOptionIndex) {
                        createdOptionsRef.value = [
                            createdOptionsRef.value[createdOptionIndex]
                        ];
                    }
                    else {
                        createdOptionsRef.value = emptyArray;
                    }
                }
                focusSelection();
                closeMenu();
                doUpdateValue(option[valueField], option);
            }
        }
        function getCreatedOptionIndex(optionValue) {
            const createdOptions = createdOptionsRef.value;
            return createdOptions.findIndex(createdOption => createdOption[props.valueField] === optionValue);
        }
        function handlePatternInput(e) {
            if (!mergedShowRef.value) {
                openMenu();
            }
            const { value } = e.target;
            patternRef.value = value;
            const { tag, remote } = props;
            doSearch(value);
            if (tag && !remote) {
                if (!value) {
                    beingCreatedOptionsRef.value = emptyArray;
                    return;
                }
                const { onCreate } = props;
                const optionBeingCreated = onCreate
                    ? onCreate(value)
                    : { [props.labelField]: value, [props.valueField]: value };
                const { valueField, labelField } = props;
                if (compitableOptionsRef.value.some((option) => {
                    return (option[valueField] === optionBeingCreated[valueField]
                        || option[labelField] === optionBeingCreated[labelField]);
                })
                    || createdOptionsRef.value.some((option) => {
                        return (option[valueField] === optionBeingCreated[valueField]
                            || option[labelField] === optionBeingCreated[labelField]);
                    })) {
                    beingCreatedOptionsRef.value = emptyArray;
                }
                else {
                    beingCreatedOptionsRef.value = [optionBeingCreated];
                }
            }
        }
        function handleClear(e) {
            e.stopPropagation();
            const { multiple, tag, remote, clearCreatedOptionsOnClear } = props;
            if (!multiple && props.filterable) {
                closeMenu();
            }
            if (tag && !remote && clearCreatedOptionsOnClear) {
                createdOptionsRef.value = emptyArray;
            }
            doClear();
            if (multiple) {
                doUpdateValue([], []);
            }
            else {
                doUpdateValue(null, null);
            }
        }
        function handleMenuMousedown(e) {
            if (!(0, seemly_1.happensIn)(e, 'action')
                && !(0, seemly_1.happensIn)(e, 'empty')
                && !(0, seemly_1.happensIn)(e, 'header')) {
                e.preventDefault();
            }
        }
        // scroll events on menu
        function handleMenuScroll(e) {
            doScroll(e);
        }
        // keyboard events
        // also for menu keydown
        function handleKeydown(e) {
            var _a, _b, _c, _d, _e;
            if (!props.keyboard) {
                e.preventDefault();
                return;
            }
            switch (e.key) {
                case ' ':
                    if (props.filterable) {
                        break;
                    }
                    else {
                        e.preventDefault();
                    }
                // eslint-disable-next-line no-fallthrough
                case 'Enter':
                    if (!((_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.isComposing)) {
                        if (mergedShowRef.value) {
                            const pendingTmNode = (_b = menuRef.value) === null || _b === void 0 ? void 0 : _b.getPendingTmNode();
                            if (pendingTmNode) {
                                handleToggleByTmNode(pendingTmNode);
                            }
                            else if (!props.filterable) {
                                closeMenu();
                                focusSelection();
                            }
                        }
                        else {
                            openMenu();
                            if (props.tag && activeWithoutMenuOpenRef.value) {
                                const beingCreatedOption = beingCreatedOptionsRef.value[0];
                                if (beingCreatedOption) {
                                    const optionValue = beingCreatedOption[props.valueField];
                                    const { value: mergedValue } = mergedValueRef;
                                    if (props.multiple) {
                                        if (Array.isArray(mergedValue)
                                            && mergedValue.includes(optionValue)) {
                                            // do nothing
                                        }
                                        else {
                                            handleToggleByOption(beingCreatedOption);
                                        }
                                    }
                                    else {
                                        handleToggleByOption(beingCreatedOption);
                                    }
                                }
                            }
                        }
                    }
                    e.preventDefault();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (props.loading)
                        return;
                    if (mergedShowRef.value) {
                        (_c = menuRef.value) === null || _c === void 0 ? void 0 : _c.prev();
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (props.loading)
                        return;
                    if (mergedShowRef.value) {
                        (_d = menuRef.value) === null || _d === void 0 ? void 0 : _d.next();
                    }
                    else {
                        openMenu();
                    }
                    break;
                case 'Escape':
                    if (mergedShowRef.value) {
                        (0, _utils_1.markEventEffectPerformed)(e);
                        closeMenu();
                    }
                    (_e = triggerRef.value) === null || _e === void 0 ? void 0 : _e.focus();
                    break;
            }
        }
        function focusSelection() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        }
        function focusSelectionInput() {
            var _a;
            (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
        }
        function handleTriggerOrMenuResize() {
            var _a;
            if (!mergedShowRef.value)
                return;
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        }
        updateMemorizedOptions();
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'options'), updateMemorizedOptions);
        const exposedMethods = {
            focus: () => {
                var _a;
                (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            },
            focusInput: () => {
                var _a;
                (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
            },
            blur: () => {
                var _a;
                (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blur();
            },
            blurInput: () => {
                var _a;
                (_a = triggerRef.value) === null || _a === void 0 ? void 0 : _a.blurInput();
            }
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { menuBoxShadow } } = themeRef.value;
            return {
                '--n-menu-box-shadow': menuBoxShadow
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('select', undefined, cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({}, exposedMethods), { mergedStatus: mergedStatusRef, mergedClsPrefix: mergedClsPrefixRef, mergedBordered: mergedBorderedRef, namespace: namespaceRef, treeMate: treeMateRef, isMounted: (0, vooks_1.useIsMounted)(), triggerRef,
            menuRef, pattern: patternRef, uncontrolledShow: uncontrolledShowRef, mergedShow: mergedShowRef, adjustedTo: (0, _utils_1.useAdjustedTo)(props), uncontrolledValue: uncontrolledValueRef, mergedValue: mergedValueRef, followerRef, localizedPlaceholder: localizedPlaceholderRef, selectedOption: selectedOptionRef, selectedOptions: selectedOptionsRef, mergedSize: mergedSizeRef, mergedDisabled: mergedDisabledRef, focused: focusedRef, activeWithoutMenuOpen: activeWithoutMenuOpenRef, inlineThemeDisabled,
            onTriggerInputFocus,
            onTriggerInputBlur,
            handleTriggerOrMenuResize,
            handleMenuFocus,
            handleMenuBlur,
            handleMenuTabOut,
            handleTriggerClick, handleToggle: handleToggleByTmNode, handleDeleteOption: handleToggleByOption, handlePatternInput,
            handleClear,
            handleTriggerBlur,
            handleTriggerFocus,
            handleKeydown,
            handleMenuAfterLeave,
            handleMenuClickOutside,
            handleMenuScroll, handleMenuKeydown: handleKeydown, handleMenuMousedown, mergedTheme: themeRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        return ((0, vue_1.h)("div", { class: `${this.mergedClsPrefix}-select` },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => ((0, vue_1.h)(_internal_1.NInternalSelection, { ref: "triggerRef", inlineThemeDisabled: this.inlineThemeDisabled, status: this.mergedStatus, inputProps: this.inputProps, clsPrefix: this.mergedClsPrefix, showArrow: this.showArrow, maxTagCount: this.maxTagCount, ellipsisTagPopoverProps: this.ellipsisTagPopoverProps, bordered: this.mergedBordered, active: this.activeWithoutMenuOpen || this.mergedShow, pattern: this.pattern, placeholder: this.localizedPlaceholder, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, multiple: this.multiple, renderTag: this.renderTag, renderLabel: this.renderLabel, filterable: this.filterable, clearable: this.clearable, disabled: this.mergedDisabled, size: this.mergedSize, theme: this.mergedTheme.peers.InternalSelection, labelField: this.labelField, valueField: this.valueField, themeOverrides: this.mergedTheme.peerOverrides.InternalSelection, loading: this.loading, focused: this.focused, onClick: this.handleTriggerClick, onDeleteOption: this.handleDeleteOption, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onBlur: this.handleTriggerBlur, onFocus: this.handleTriggerFocus, onKeydown: this.handleKeydown, onPatternBlur: this.onTriggerInputBlur, onPatternFocus: this.onTriggerInputFocus, onResize: this.handleTriggerOrMenuResize, ignoreComposition: this.ignoreComposition }, {
                            arrow: () => { var _a, _b; return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)]; }
                        }))
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { ref: "followerRef", show: this.mergedShow, to: this.adjustedTo, teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? 'target' : undefined, minWidth: "target", placement: this.placement }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted, onAfterLeave: this.handleMenuAfterLeave }, {
                            default: () => {
                                var _a, _b, _c;
                                if (!(this.mergedShow
                                    || this.displayDirective === 'show')) {
                                    return null;
                                }
                                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                                return (0, vue_1.withDirectives)((0, vue_1.h)(_internal_1.NInternalSelectMenu, Object.assign({}, this.menuProps, { ref: "menuRef", onResize: this.handleTriggerOrMenuResize, inlineThemeDisabled: this.inlineThemeDisabled, virtualScroll: this.consistentMenuWidth && this.virtualScroll, class: [
                                        `${this.mergedClsPrefix}-select-menu`,
                                        this.themeClass,
                                        (_b = this.menuProps) === null || _b === void 0 ? void 0 : _b.class
                                    ], clsPrefix: this.mergedClsPrefix, focusable: true, labelField: this.labelField, valueField: this.valueField, autoPending: true, nodeProps: this.nodeProps, theme: this.mergedTheme.peers.InternalSelectMenu, themeOverrides: this.mergedTheme.peerOverrides
                                        .InternalSelectMenu, treeMate: this.treeMate, multiple: this.multiple, size: this.menuSize, renderOption: this.renderOption, renderLabel: this.renderLabel, value: this.mergedValue, style: [(_c = this.menuProps) === null || _c === void 0 ? void 0 : _c.style, this.cssVars], onToggle: this.handleToggle, onScroll: this.handleMenuScroll, onFocus: this.handleMenuFocus, onBlur: this.handleMenuBlur, onKeydown: this.handleMenuKeydown, onTabOut: this.handleMenuTabOut, onMousedown: this.handleMenuMousedown, show: this.mergedShow, showCheckmark: this.showCheckmark, resetMenuOnOptionsChange: this.resetMenuOnOptionsChange, scrollbarProps: this.scrollbarProps }), {
                                    empty: () => { var _a, _b; return [(_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a)]; },
                                    header: () => { var _a, _b; return [(_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a)]; },
                                    action: () => { var _a, _b; return [(_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a)]; }
                                }), this.displayDirective === 'show'
                                    ? [
                                        [vue_1.vShow, this.mergedShow],
                                        [
                                            vdirs_1.clickoutside,
                                            this.handleMenuClickOutside,
                                            undefined,
                                            { capture: true }
                                        ]
                                    ]
                                    : [
                                        [
                                            vdirs_1.clickoutside,
                                            this.handleMenuClickOutside,
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
