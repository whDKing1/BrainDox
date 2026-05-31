"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeSelectProps = void 0;
const seemly_1 = require("seemly");
const treemate_1 = require("treemate");
const vdirs_1 = require("vdirs");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const empty_1 = require("../../empty");
const tree_1 = require("../../tree");
const Tree_1 = require("../../tree/src/Tree");
const utils_1 = require("../../tree/src/utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_2 = require("./utils");
exports.treeSelectProps = Object.assign(Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), { bordered: {
        type: Boolean,
        default: true
    }, cascade: Boolean, checkable: Boolean, clearable: Boolean, clearFilterAfterSelect: {
        type: Boolean,
        default: true
    }, consistentMenuWidth: {
        type: Boolean,
        default: true
    }, defaultShow: Boolean, defaultValue: {
        type: [String, Number, Array],
        default: null
    }, disabled: {
        type: Boolean,
        default: undefined
    }, filterable: Boolean, checkStrategy: {
        type: String,
        default: 'all'
    }, loading: Boolean, maxTagCount: [String, Number], multiple: Boolean, showLine: Boolean, showPath: Boolean, separator: {
        type: String,
        default: ' / '
    }, options: {
        type: Array,
        default: () => []
    }, placeholder: String, placement: {
        type: String,
        default: 'bottom-start'
    }, show: {
        type: Boolean,
        default: undefined
    }, size: String, value: [String, Number, Array], to: _utils_1.useAdjustedTo.propTo, menuProps: Object, virtualScroll: {
        type: Boolean,
        default: true
    }, status: String, renderTag: Function, ellipsisTagPopoverProps: Object }), Tree_1.treeSharedProps), { renderLabel: Function, renderPrefix: Function, renderSuffix: Function, nodeProps: Function, watchProps: Array, getChildren: Function, onBlur: Function, onFocus: Function, onLoad: Function, onUpdateShow: [Function, Array], onUpdateValue: [Function, Array], 'onUpdate:value': [Function, Array], 'onUpdate:show': [Function, Array], 
    /**
     * @deprecated
     */
    leafOnly: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'TreeSelect',
    props: exports.treeSelectProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.leafOnly) {
                    (0, _utils_1.warnOnce)('tree-select', '`leaf-only` is deprecated, please use `check-strategy="child"` instead.');
                }
            });
        }
        const followerInstRef = (0, vue_1.ref)(null);
        const triggerInstRef = (0, vue_1.ref)(null);
        const treeInstRef = (0, vue_1.ref)(null);
        const menuElRef = (0, vue_1.ref)(null);
        const { mergedClsPrefixRef, namespaceRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const { localeRef } = (0, _mixins_1.useLocale)('Select');
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef, nTriggerFormBlur, nTriggerFormChange, nTriggerFormFocus, nTriggerFormInput } = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.TreeSelect) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const uncontrolledShowRef = (0, vue_1.ref)(props.defaultShow);
        const controlledShowRef = (0, vue_1.toRef)(props, 'show');
        const mergedShowRef = (0, vooks_1.useMergedState)(controlledShowRef, uncontrolledShowRef);
        const patternRef = (0, vue_1.ref)('');
        const mergedFilterRef = (0, vue_1.computed)(() => {
            const { filter } = props;
            if (filter)
                return filter;
            const { labelField } = props;
            return (pattern, node) => {
                if (!pattern.length)
                    return true;
                return node[labelField]
                    .toLowerCase()
                    .includes(pattern.toLowerCase());
            };
        });
        // used to resolve selected options
        const dataTreeMateRef = (0, vue_1.computed)(() => (0, treemate_1.createTreeMate)(props.options, (0, Tree_1.createTreeMateOptions)(props.keyField, props.childrenField, props.disabledField, undefined)));
        const { value: initMergedValue } = mergedValueRef;
        const pendingNodeKeyRef = (0, vue_1.ref)(props.checkable
            ? null
            : Array.isArray(initMergedValue) && initMergedValue.length
                ? initMergedValue[initMergedValue.length - 1]
                : null);
        const mergedCascadeRef = (0, vue_1.computed)(() => {
            return props.multiple && props.cascade && props.checkable;
        });
        // The same logic as tree, now it's not that complex so I don't extract a
        // function to reuse it.
        const uncontrolledExpandedKeysRef = (0, vue_1.ref)(props.defaultExpandAll
            ? undefined // leave it, n-tree will handle it
            : props.defaultExpandedKeys || props.expandedKeys);
        const controlledExpandedKeysRef = (0, vue_1.toRef)(props, 'expandedKeys');
        const mergedExpandedKeysRef = (0, vooks_1.useMergedState)(controlledExpandedKeysRef, uncontrolledExpandedKeysRef);
        const focusedRef = (0, vue_1.ref)(false);
        const mergedPlaceholderRef = (0, vue_1.computed)(() => {
            const { placeholder } = props;
            if (placeholder !== undefined)
                return placeholder;
            return localeRef.value.placeholder;
        });
        const treeCheckedKeysRef = (0, vue_1.computed)(() => {
            const { value: mergedValue } = mergedValueRef;
            if (props.multiple) {
                if (Array.isArray(mergedValue))
                    return mergedValue;
                else
                    return [];
            }
            else {
                if (mergedValue === null || Array.isArray(mergedValue))
                    return [];
                else
                    return [mergedValue];
            }
        });
        const treeSelectedKeysRef = (0, vue_1.computed)(() => {
            if (props.checkable)
                return [];
            return treeCheckedKeysRef.value;
        });
        const selectedOptionRef = (0, vue_1.computed)(() => {
            const { multiple, showPath, separator, labelField } = props;
            if (multiple)
                return null;
            const { value: mergedValue } = mergedValueRef;
            if (!Array.isArray(mergedValue) && mergedValue !== null) {
                const { value: treeMate } = dataTreeMateRef;
                const tmNode = treeMate.getNode(mergedValue);
                if (tmNode !== null) {
                    return showPath
                        ? (0, utils_2.treeOption2SelectOptionWithPath)(tmNode, treeMate.getPath(mergedValue).treeNodePath, separator, labelField)
                        : (0, utils_2.treeOption2SelectOption)(tmNode, labelField);
                }
            }
            return null;
        });
        const selectedOptionsRef = (0, vue_1.computed)(() => {
            const { multiple, showPath, separator } = props;
            if (!multiple)
                return null;
            const { value: mergedValue } = mergedValueRef;
            if (Array.isArray(mergedValue)) {
                const res = [];
                const { value: treeMate } = dataTreeMateRef;
                const { checkedKeys } = treeMate.getCheckedKeys(mergedValue, {
                    checkStrategy: props.checkStrategy,
                    cascade: mergedCascadeRef.value,
                    allowNotLoaded: props.allowCheckingNotLoaded
                });
                const { labelField } = props;
                checkedKeys.forEach((value) => {
                    const tmNode = treeMate.getNode(value);
                    if (tmNode !== null) {
                        res.push(showPath
                            ? (0, utils_2.treeOption2SelectOptionWithPath)(tmNode, treeMate.getPath(value).treeNodePath, separator, labelField)
                            : (0, utils_2.treeOption2SelectOption)(tmNode, labelField));
                    }
                });
                return res;
            }
            return [];
        });
        function focusSelection() {
            var _a;
            (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        }
        function focusSelectionInput() {
            var _a;
            (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focusInput();
        }
        function doUpdateShow(value) {
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, value);
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, value);
            uncontrolledShowRef.value = value;
        }
        function doUpdateValue(value, option, meta) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props;
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value, option, meta);
            }
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value, option, meta);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
        }
        function doUpdateIndeterminateKeys(value, option) {
            const { onUpdateIndeterminateKeys, 'onUpdate:indeterminateKeys': _onUpdateIndeterminateKeys } = props;
            if (onUpdateIndeterminateKeys) {
                (0, _utils_1.call)(onUpdateIndeterminateKeys, value, option);
            }
            if (_onUpdateIndeterminateKeys) {
                (0, _utils_1.call)(_onUpdateIndeterminateKeys, value, option);
            }
        }
        function doUpdateExpandedKeys(keys, option, meta) {
            const { onUpdateExpandedKeys, 'onUpdate:expandedKeys': _onUpdateExpandedKeys } = props;
            if (onUpdateExpandedKeys) {
                (0, _utils_1.call)(onUpdateExpandedKeys, keys, option, meta);
            }
            if (_onUpdateExpandedKeys) {
                (0, _utils_1.call)(_onUpdateExpandedKeys, keys, option, meta);
            }
            uncontrolledExpandedKeysRef.value = keys;
        }
        function doFocus(e) {
            const { onFocus } = props;
            if (onFocus)
                onFocus(e);
            nTriggerFormFocus();
        }
        function doBlur(e) {
            closeMenu();
            const { onBlur } = props;
            if (onBlur)
                onBlur(e);
            nTriggerFormBlur();
        }
        function closeMenu() {
            doUpdateShow(false);
        }
        function openMenu() {
            if (!mergedDisabledRef.value) {
                patternRef.value = '';
                doUpdateShow(true);
                if (props.filterable) {
                    focusSelectionInput();
                }
            }
        }
        function handleMenuLeave() {
            patternRef.value = '';
        }
        function handleMenuClickoutside(e) {
            var _a;
            if (mergedShowRef.value) {
                if (!((_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.$el.contains((0, seemly_1.getPreciseEventTarget)(e)))) {
                    // outside select, don't need to return focus
                    closeMenu();
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
            }
        }
        function getOptionsByKeys(keys) {
            const { value: { getNode } } = dataTreeMateRef;
            return keys.map(key => { var _a; return ((_a = getNode(key)) === null || _a === void 0 ? void 0 : _a.rawNode) || null; });
        }
        function handleUpdateCheckedKeys(keys, _, meta) {
            const options = getOptionsByKeys(keys);
            const action = meta.action === 'check' ? 'select' : 'unselect';
            const node = meta.node;
            if (props.multiple) {
                doUpdateValue(keys, options, { node, action });
                if (props.filterable) {
                    focusSelectionInput();
                    if (props.clearFilterAfterSelect)
                        patternRef.value = '';
                }
            }
            else {
                if (keys.length) {
                    doUpdateValue(keys[0], options[0] || null, {
                        node,
                        action
                    });
                }
                else {
                    doUpdateValue(null, null, { node, action });
                }
                closeMenu();
                // Currently it is not necessary. However if there is an action slot,
                // it will be useful. So just leave it here.
                focusSelection();
            }
        }
        function handleUpdateIndeterminateKeys(keys) {
            if (props.checkable) {
                doUpdateIndeterminateKeys(keys, getOptionsByKeys(keys));
            }
        }
        function handleTriggerFocus(e) {
            var _a;
            if ((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
                return;
            focusedRef.value = true;
            doFocus(e);
        }
        function handleTriggerBlur(e) {
            var _a;
            if ((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
                return;
            focusedRef.value = false;
            doBlur(e);
        }
        function handleMenuFocusin(e) {
            var _a, _b, _c;
            if (((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
                || ((_c = (_b = triggerInstRef.value) === null || _b === void 0 ? void 0 : _b.$el) === null || _c === void 0 ? void 0 : _c.contains(e.relatedTarget))) {
                return;
            }
            focusedRef.value = true;
            doFocus(e);
        }
        function handleMenuFocusout(e) {
            var _a, _b, _c;
            if (((_a = menuElRef.value) === null || _a === void 0 ? void 0 : _a.contains(e.relatedTarget))
                || ((_c = (_b = triggerInstRef.value) === null || _b === void 0 ? void 0 : _b.$el) === null || _c === void 0 ? void 0 : _c.contains(e.relatedTarget))) {
                return;
            }
            focusedRef.value = false;
            doBlur(e);
        }
        function handleClear(e) {
            e.stopPropagation();
            const { multiple } = props;
            if (!multiple && props.filterable) {
                closeMenu();
            }
            if (multiple) {
                doUpdateValue([], [], { node: null, action: 'clear' });
            }
            else {
                doUpdateValue(null, null, { node: null, action: 'clear' });
            }
        }
        function handleDeleteOption(option) {
            // only work for multiple mode
            const { value: mergedValue } = mergedValueRef;
            if (Array.isArray(mergedValue)) {
                const { value: treeMate } = dataTreeMateRef;
                // all visible checked keys
                const { checkedKeys: checkedKeysValue } = treeMate.getCheckedKeys(mergedValue, {
                    cascade: mergedCascadeRef.value,
                    allowNotLoaded: props.allowCheckingNotLoaded
                });
                const index = checkedKeysValue.findIndex(key => key === option.value);
                if (~index) {
                    const checkedKeyToBeRemoved = checkedKeysValue[index];
                    const checkOptionToBeRemoved = getOptionsByKeys([
                        checkedKeyToBeRemoved
                    ])[0];
                    if (props.checkable) {
                        const { checkedKeys } = treeMate.uncheck(option.value, checkedKeysValue, {
                            checkStrategy: props.checkStrategy,
                            cascade: mergedCascadeRef.value,
                            allowNotLoaded: props.allowCheckingNotLoaded
                        });
                        doUpdateValue(checkedKeys, getOptionsByKeys(checkedKeys), {
                            node: checkOptionToBeRemoved,
                            action: 'delete'
                        });
                    }
                    else {
                        const nextValue = Array.from(checkedKeysValue);
                        nextValue.splice(index, 1);
                        doUpdateValue(nextValue, getOptionsByKeys(nextValue), {
                            node: checkOptionToBeRemoved,
                            action: 'delete'
                        });
                    }
                }
            }
        }
        function handlePatternInput(e) {
            const { value } = e.target;
            patternRef.value = value;
        }
        function treeHandleKeydown(e) {
            const { value: treeInst } = treeInstRef;
            if (treeInst) {
                return treeInst.handleKeydown(e);
            }
            return {
                enterBehavior: null
            };
        }
        function handleKeydown(e) {
            if (e.key === 'Enter') {
                if (mergedShowRef.value) {
                    const { enterBehavior } = treeHandleKeydown(e);
                    if (!props.multiple) {
                        switch (enterBehavior) {
                            case 'default':
                            case 'toggleSelect':
                                closeMenu();
                                focusSelection();
                                break;
                            default:
                                break;
                        }
                    }
                }
                else {
                    openMenu();
                }
                e.preventDefault();
            }
            else if (e.key === 'Escape') {
                if (mergedShowRef.value) {
                    (0, _utils_1.markEventEffectPerformed)(e);
                    closeMenu();
                    focusSelection();
                }
            }
            else {
                if (mergedShowRef.value) {
                    treeHandleKeydown(e);
                }
                else if (e.key === 'ArrowDown') {
                    openMenu();
                }
            }
        }
        function handleTabOut() {
            closeMenu();
            focusSelection();
        }
        function handleMenuMousedown(e) {
            // If there's an action slot later, we need to check if mousedown happens
            // in action panel
            if (!(0, seemly_1.happensIn)(e, 'action') && !(0, seemly_1.happensIn)(e, 'header'))
                e.preventDefault();
        }
        const selectionRenderTagRef = (0, vue_1.computed)(() => {
            const { renderTag } = props;
            if (!renderTag)
                return undefined;
            return function selectionRenderTag({ option, handleClose }) {
                const { value } = option;
                if (value !== undefined) {
                    const treeOption = dataTreeMateRef.value.getNode(value);
                    if (treeOption) {
                        return renderTag({ option: treeOption.rawNode, handleClose });
                    }
                }
                return value;
            };
        });
        (0, vue_1.provide)(interface_1.treeSelectInjectionKey, {
            pendingNodeKeyRef,
            dataTreeMate: dataTreeMateRef
        });
        function handleTriggerOrMenuResize() {
            var _a;
            if (!mergedShowRef.value)
                return;
            (_a = followerInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        }
        (0, _utils_1.useOnResize)(menuElRef, handleTriggerOrMenuResize);
        const mergedCheckStrategyRef = (0, utils_1.useMergedCheckStrategy)(props);
        const exposedCheckedStatusRef = (0, vue_1.computed)(() => {
            if (props.checkable) {
                const mergedValue = mergedValueRef.value;
                if (props.multiple && Array.isArray(mergedValue)) {
                    return dataTreeMateRef.value.getCheckedKeys(mergedValue, {
                        cascade: props.cascade,
                        checkStrategy: mergedCheckStrategyRef.value,
                        allowNotLoaded: props.allowCheckingNotLoaded
                    });
                }
                else {
                    return {
                        checkedKeys: Array.isArray(mergedValue) || mergedValue === null
                            ? []
                            : [mergedValue],
                        indeterminateKeys: []
                    };
                }
            }
            return {
                checkedKeys: [],
                indeterminateKeys: []
            };
        });
        const exposedMethods = {
            getCheckedData: () => {
                const { checkedKeys } = exposedCheckedStatusRef.value;
                return { keys: checkedKeys, options: getOptionsByKeys(checkedKeys) };
            },
            getIndeterminateData: () => {
                const { indeterminateKeys } = exposedCheckedStatusRef.value;
                return {
                    keys: indeterminateKeys,
                    options: getOptionsByKeys(indeterminateKeys)
                };
            },
            focus: () => { var _a; return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focus(); },
            focusInput: () => { var _a; return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.focusInput(); },
            blur: () => { var _a; return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.blur(); },
            blurInput: () => { var _a; return (_a = triggerInstRef.value) === null || _a === void 0 ? void 0 : _a.blurInput(); }
        };
        const themeRef = (0, _mixins_1.useTheme)('TreeSelect', '-tree-select', index_cssr_1.default, styles_1.treeSelectLight, props, mergedClsPrefixRef);
        const mergedRenderEmptyRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.TreeSelect) === null || _b === void 0 ? void 0 : _b.renderEmpty;
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { menuBoxShadow, menuBorderRadius, menuColor, menuHeight, actionPadding, actionDividerColor, actionTextColor, headerDividerColor, headerPadding, headerTextColor } } = themeRef.value;
            return {
                '--n-menu-box-shadow': menuBoxShadow,
                '--n-menu-border-radius': menuBorderRadius,
                '--n-menu-color': menuColor,
                '--n-menu-height': menuHeight,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-action-padding': actionPadding,
                '--n-action-text-color': actionTextColor,
                '--n-action-divider-color': actionDividerColor,
                '--n-header-padding': headerPadding,
                '--n-header-text-color': headerTextColor,
                '--n-header-divider-color': headerDividerColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('tree-select', undefined, cssVarsRef, props)
            : undefined;
        const menuPaddingRef = (0, vue_1.computed)(() => {
            const { self: { menuPadding } } = themeRef.value;
            return menuPadding;
        });
        return Object.assign(Object.assign({}, exposedMethods), { menuElRef, mergedStatus: mergedStatusRef, triggerInstRef,
            followerInstRef,
            treeInstRef, mergedClsPrefix: mergedClsPrefixRef, mergedValue: mergedValueRef, mergedShow: mergedShowRef, namespace: namespaceRef, adjustedTo: (0, _utils_1.useAdjustedTo)(props), isMounted: (0, vooks_1.useIsMounted)(), focused: focusedRef, menuPadding: menuPaddingRef, mergedPlaceholder: mergedPlaceholderRef, mergedExpandedKeys: mergedExpandedKeysRef, treeSelectedKeys: treeSelectedKeysRef, treeCheckedKeys: treeCheckedKeysRef, mergedSize: mergedSizeRef, mergedDisabled: mergedDisabledRef, selectedOption: selectedOptionRef, selectedOptions: selectedOptionsRef, pattern: patternRef, pendingNodeKey: pendingNodeKeyRef, mergedCascade: mergedCascadeRef, mergedFilter: mergedFilterRef, selectionRenderTag: selectionRenderTagRef, handleTriggerOrMenuResize,
            doUpdateExpandedKeys,
            handleMenuLeave,
            handleTriggerClick,
            handleMenuClickoutside,
            handleUpdateCheckedKeys,
            handleUpdateIndeterminateKeys,
            handleTriggerFocus,
            handleTriggerBlur,
            handleMenuFocusin,
            handleMenuFocusout,
            handleClear,
            handleDeleteOption,
            handlePatternInput,
            handleKeydown,
            handleTabOut,
            handleMenuMousedown, mergedTheme: themeRef, mergedRenderEmpty: mergedRenderEmptyRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        const { mergedTheme, mergedClsPrefix, $slots } = this;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tree-select` },
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => ((0, vue_1.h)(_internal_1.NInternalSelection, { ref: "triggerInstRef", onResize: this.handleTriggerOrMenuResize, status: this.mergedStatus, focused: this.focused, clsPrefix: mergedClsPrefix, theme: mergedTheme.peers.InternalSelection, themeOverrides: mergedTheme.peerOverrides.InternalSelection, ellipsisTagPopoverProps: this.ellipsisTagPopoverProps, renderTag: this.selectionRenderTag, selectedOption: this.selectedOption, selectedOptions: this.selectedOptions, size: this.mergedSize, bordered: this.bordered, placeholder: this.mergedPlaceholder, disabled: this.mergedDisabled, active: this.mergedShow, loading: this.loading, multiple: this.multiple, maxTagCount: this.maxTagCount, showArrow: true, filterable: this.filterable, clearable: this.clearable, pattern: this.pattern, onPatternInput: this.handlePatternInput, onClear: this.handleClear, onClick: this.handleTriggerClick, onFocus: this.handleTriggerFocus, onBlur: this.handleTriggerBlur, onDeleteOption: this.handleDeleteOption, onKeydown: this.handleKeydown }, {
                            arrow: () => { var _a, _b; return [(_b = (_a = this.$slots).arrow) === null || _b === void 0 ? void 0 : _b.call(_a)]; }
                        }))
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { ref: "followerInstRef", show: this.mergedShow, placement: this.placement, to: this.adjustedTo, teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey, containerClass: this.namespace, width: this.consistentMenuWidth ? 'target' : undefined, minWidth: "target" }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted, onLeave: this.handleMenuLeave }, {
                            default: () => {
                                var _a;
                                if (!this.mergedShow)
                                    return null;
                                const { mergedClsPrefix, checkable, multiple, menuProps, options } = this;
                                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                                return (0, vue_1.withDirectives)((0, vue_1.h)("div", Object.assign({}, menuProps, { class: [
                                        `${mergedClsPrefix}-tree-select-menu`,
                                        menuProps === null || menuProps === void 0 ? void 0 : menuProps.class,
                                        this.themeClass
                                    ], ref: "menuElRef", style: [
                                        (menuProps === null || menuProps === void 0 ? void 0 : menuProps.style) || '',
                                        this.cssVars
                                    ], tabindex: 0, onMousedown: this.handleMenuMousedown, onKeydown: this.handleKeydown, onFocusin: this.handleMenuFocusin, onFocusout: this.handleMenuFocusout }),
                                    (0, _utils_1.resolveWrappedSlot)($slots.header, (children) => {
                                        return children ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tree-select-menu__header`, "data-header": true }, children)) : null;
                                    }),
                                    (0, vue_1.h)(tree_1.NTree, { ref: "treeInstRef", blockLine: true, allowCheckingNotLoaded: this.allowCheckingNotLoaded, showIrrelevantNodes: false, animated: false, pattern: this.pattern, getChildren: this.getChildren, filter: this.mergedFilter, data: options, cancelable: multiple, labelField: this.labelField, keyField: this.keyField, disabledField: this.disabledField, childrenField: this.childrenField, theme: mergedTheme.peers.Tree, themeOverrides: mergedTheme.peerOverrides.Tree, defaultExpandAll: this.defaultExpandAll, defaultExpandedKeys: this.defaultExpandedKeys, indent: this.indent, expandedKeys: this.mergedExpandedKeys, checkedKeys: this.treeCheckedKeys, selectedKeys: this.treeSelectedKeys, checkable: checkable, checkStrategy: this.checkStrategy, cascade: this.mergedCascade, leafOnly: this.leafOnly, multiple: this.multiple, showLine: this.showLine, renderLabel: this.renderLabel, renderPrefix: this.renderPrefix, renderSuffix: this.renderSuffix, renderSwitcherIcon: this.renderSwitcherIcon, nodeProps: this.nodeProps, watchProps: this.watchProps, virtualScroll: this.consistentMenuWidth && this.virtualScroll, overrideDefaultNodeClickBehavior: this.overrideDefaultNodeClickBehavior, internalTreeSelect: true, internalUnifySelectCheck: true, internalScrollable: true, internalScrollablePadding: this.menuPadding, internalFocusable: false, internalCheckboxFocusable: false, internalRenderEmpty: () => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tree-select-menu__empty` }, (0, _utils_1.resolveSlot)($slots.empty, () => {
                                            var _a;
                                            return [
                                                ((_a = this.mergedRenderEmpty) === null || _a === void 0 ? void 0 : _a.call(this)) || ((0, vue_1.h)(empty_1.NEmpty, { theme: mergedTheme.peers.Empty, themeOverrides: mergedTheme.peerOverrides.Empty }))
                                            ];
                                        }))), onLoad: this.onLoad, onUpdateCheckedKeys: this.handleUpdateCheckedKeys, onUpdateIndeterminateKeys: this.handleUpdateIndeterminateKeys, onUpdateExpandedKeys: this.doUpdateExpandedKeys }),
                                    (0, _utils_1.resolveWrappedSlot)($slots.action, (children) => {
                                        return children ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tree-select-menu__action`, "data-action": true }, children)) : null;
                                    }),
                                    (0, vue_1.h)(_internal_1.NBaseFocusDetector, { onFocus: this.handleTabOut })), [
                                    [
                                        vdirs_1.clickoutside,
                                        this.handleMenuClickoutside,
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
