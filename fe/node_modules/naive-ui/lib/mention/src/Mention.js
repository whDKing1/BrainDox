"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentionProps = void 0;
const treemate_1 = require("treemate");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const input_1 = require("../../input");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
exports.mentionProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: _utils_1.useAdjustedTo.propTo, autosize: [Boolean, Object], options: {
        type: Array,
        default: []
    }, filter: {
        type: Function,
        default: (pattern, option) => {
            if (!pattern)
                return true;
            if (typeof option.label === 'string') {
                return option.label.startsWith(pattern);
            }
            if (typeof option.value === 'string') {
                return option.value.startsWith(pattern);
            }
            return false;
        }
    }, type: {
        type: String,
        default: 'text'
    }, separator: {
        type: String,
        validator: (separator) => {
            if (separator.length !== 1) {
                (0, _utils_1.warn)('mention', '`separator`\'s length must be 1.');
                return false;
            }
            return true;
        },
        default: ' '
    }, bordered: {
        type: Boolean,
        default: undefined
    }, disabled: Boolean, value: String, defaultValue: {
        type: String,
        default: ''
    }, loading: Boolean, prefix: {
        type: [String, Array],
        default: '@'
    }, placeholder: {
        type: String,
        default: ''
    }, placement: {
        type: String,
        default: 'bottom-start'
    }, size: String, renderLabel: Function, status: String, 'onUpdate:show': [Array, Function], onUpdateShow: [Array, Function], 'onUpdate:value': [Array, Function], onUpdateValue: [Array, Function], onSearch: Function, onSelect: Function, onFocus: Function, onBlur: Function, scrollbarProps: Object, 
    // private
    internalDebug: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Mention',
    props: exports.mentionProps,
    slots: Object,
    setup(props) {
        const { namespaceRef, mergedClsPrefixRef, mergedBorderedRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Mention', '-mention', index_cssr_1.default, styles_1.mentionLight, props, mergedClsPrefixRef);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Mention) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const inputInstRef = (0, vue_1.ref)(null);
        const cursorRef = (0, vue_1.ref)(null);
        const followerRef = (0, vue_1.ref)(null);
        const wrapperElRef = (0, vue_1.ref)(null);
        const partialPatternRef = (0, vue_1.ref)('');
        let cachedPrefix = null;
        // cached pattern end is for partial pattern
        // for example @abc|def
        // end is after `c`
        let cachedPartialPatternStart = null;
        let cachedPartialPatternEnd = null;
        const filteredOptionsRef = (0, vue_1.computed)(() => {
            const { value: pattern } = partialPatternRef;
            return props.options.filter(option => props.filter(pattern, option));
        });
        const treeMateRef = (0, vue_1.computed)(() => {
            return (0, treemate_1.createTreeMate)(filteredOptionsRef.value, {
                getKey: (v) => {
                    return v.value;
                }
            });
        });
        const selectMenuInstRef = (0, vue_1.ref)(null);
        const showMenuRef = (0, vue_1.ref)(false);
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { menuBoxShadow } } = themeRef.value;
            return {
                '--n-menu-box-shadow': menuBoxShadow
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('mention', undefined, cssVarsRef, props)
            : undefined;
        function doUpdateShowMenu(show) {
            if (props.disabled)
                return;
            const { onUpdateShow, 'onUpdate:show': _onUpdateShow } = props;
            if (onUpdateShow)
                (0, _utils_1.call)(onUpdateShow, show);
            if (_onUpdateShow)
                (0, _utils_1.call)(_onUpdateShow, show);
            if (!show) {
                cachedPrefix = null;
                cachedPartialPatternStart = null;
                cachedPartialPatternEnd = null;
            }
            showMenuRef.value = show;
        }
        function doUpdateValue(value) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue } = props;
            const { nTriggerFormChange, nTriggerFormInput } = formItem;
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value);
            }
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value);
            }
            nTriggerFormInput();
            nTriggerFormChange();
            uncontrolledValueRef.value = value;
        }
        function getInputEl() {
            return props.type === 'text'
                ? inputInstRef.value.inputElRef
                : inputInstRef.value.textareaElRef;
        }
        function deriveShowMenu() {
            var _a;
            const inputEl = getInputEl();
            if (document.activeElement !== inputEl) {
                doUpdateShowMenu(false);
                return;
            }
            const { selectionEnd } = inputEl;
            if (selectionEnd === null) {
                doUpdateShowMenu(false);
                return;
            }
            const inputValue = inputEl.value;
            const { separator } = props;
            const { prefix } = props;
            const prefixArray = typeof prefix === 'string' ? [prefix] : prefix;
            for (let i = selectionEnd - 1; i >= 0; --i) {
                const char = inputValue[i];
                if (char === separator || char === '\n' || char === '\r') {
                    doUpdateShowMenu(false);
                    return;
                }
                if (prefixArray.includes(char)) {
                    const partialPattern = inputValue.slice(i + 1, selectionEnd);
                    doUpdateShowMenu(true);
                    (_a = props.onSearch) === null || _a === void 0 ? void 0 : _a.call(props, partialPattern, char);
                    partialPatternRef.value = partialPattern;
                    cachedPrefix = char;
                    cachedPartialPatternStart = i + 1;
                    cachedPartialPatternEnd = selectionEnd;
                    return;
                }
            }
            doUpdateShowMenu(false);
        }
        function syncCursor() {
            const { value: cursorAnchor } = cursorRef;
            if (!cursorAnchor)
                return;
            const inputEl = getInputEl();
            const cursorPos = (0, utils_1.getRelativePosition)(inputEl);
            const inputRect = inputEl.getBoundingClientRect();
            const wrapperRect = wrapperElRef.value.getBoundingClientRect();
            cursorAnchor.style.left = `${cursorPos.left + inputRect.left - wrapperRect.left}px`;
            cursorAnchor.style.top = `${cursorPos.top + inputRect.top - wrapperRect.top}px`;
            cursorAnchor.style.height = `${cursorPos.height}px`;
        }
        function syncPosition() {
            var _a;
            if (!showMenuRef.value)
                return;
            (_a = followerRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
        }
        function handleInputUpdateValue(value) {
            doUpdateValue(value);
            // Vue update is mirco task.
            // So DOM must have been done when sync start in marco task.
            // I can't use nextTick(), Chrome doesn't update scrollLeft of INPUT
            // element is immediatelly updated. The behavior is wired but that's what
            // happens.
            syncAfterCursorMove();
        }
        function syncAfterCursorMove() {
            setTimeout(() => {
                syncCursor();
                deriveShowMenu();
                void (0, vue_1.nextTick)().then(syncPosition);
            }, 0);
        }
        function handleInputKeyDown(e) {
            var _a, _b;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                if ((_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.isCompositing)
                    return;
                syncAfterCursorMove();
            }
            else if (e.key === 'ArrowUp'
                || e.key === 'ArrowDown'
                || e.key === 'Enter') {
                if ((_b = inputInstRef.value) === null || _b === void 0 ? void 0 : _b.isCompositing)
                    return;
                const { value: selectMenuInst } = selectMenuInstRef;
                if (showMenuRef.value) {
                    if (selectMenuInst) {
                        e.preventDefault();
                        if (e.key === 'ArrowUp') {
                            selectMenuInst.prev();
                        }
                        else if (e.key === 'ArrowDown') {
                            selectMenuInst.next();
                        }
                        else {
                            // Enter
                            const pendingOptionTmNode = selectMenuInst.getPendingTmNode();
                            if (pendingOptionTmNode) {
                                handleSelect(pendingOptionTmNode);
                            }
                            else {
                                doUpdateShowMenu(false);
                            }
                        }
                    }
                }
                else {
                    syncAfterCursorMove();
                }
            }
        }
        function handleInputFocus(e) {
            const { onFocus } = props;
            onFocus === null || onFocus === void 0 ? void 0 : onFocus(e);
            const { nTriggerFormFocus } = formItem;
            nTriggerFormFocus();
            syncAfterCursorMove();
        }
        function focus() {
            var _a;
            (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        }
        function blur() {
            var _a;
            (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.blur();
        }
        function handleInputBlur(e) {
            const { onBlur } = props;
            onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
            const { nTriggerFormBlur } = formItem;
            nTriggerFormBlur();
            doUpdateShowMenu(false);
        }
        function handleSelect(tmNode) {
            var _a;
            if (cachedPrefix === null
                || cachedPartialPatternStart === null
                || cachedPartialPatternEnd === null) {
                if (process.env.NODE_ENV !== 'production') {
                    (0, _utils_1.warn)('mention', 'Cache works unexpectly, this is probably a bug. Please create an issue.');
                }
                return;
            }
            const { rawNode: { value = '' } } = tmNode;
            const inputEl = getInputEl();
            const inputValue = inputEl.value;
            const { separator } = props;
            const nextEndPart = inputValue.slice(cachedPartialPatternEnd);
            const alreadySeparated = nextEndPart.startsWith(separator);
            const nextMiddlePart = `${value}${alreadySeparated ? '' : separator}`;
            doUpdateValue(inputValue.slice(0, cachedPartialPatternStart)
                + nextMiddlePart
                + nextEndPart);
            (_a = props.onSelect) === null || _a === void 0 ? void 0 : _a.call(props, tmNode.rawNode, cachedPrefix);
            const nextSelectionEnd = cachedPartialPatternStart
                + nextMiddlePart.length
                + (alreadySeparated ? 1 : 0);
            void (0, vue_1.nextTick)().then(() => {
                // input value is updated
                inputEl.selectionStart = nextSelectionEnd;
                inputEl.selectionEnd = nextSelectionEnd;
                deriveShowMenu();
            });
        }
        function handleInputMouseDown() {
            if (!props.disabled) {
                syncAfterCursorMove();
            }
        }
        return {
            namespace: namespaceRef,
            mergedClsPrefix: mergedClsPrefixRef,
            mergedBordered: mergedBorderedRef,
            mergedSize: formItem.mergedSizeRef,
            mergedStatus: formItem.mergedStatusRef,
            mergedTheme: themeRef,
            treeMate: treeMateRef,
            selectMenuInstRef,
            inputInstRef,
            cursorRef,
            followerRef,
            wrapperElRef,
            showMenu: showMenuRef,
            adjustedTo: (0, _utils_1.useAdjustedTo)(props),
            isMounted: (0, vooks_1.useIsMounted)(),
            mergedValue: mergedValueRef,
            handleInputFocus,
            handleInputBlur,
            handleInputUpdateValue,
            handleInputKeyDown,
            handleSelect,
            handleInputMouseDown,
            focus,
            blur,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedTheme, mergedClsPrefix, $slots } = this;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-mention`, ref: "wrapperElRef" },
            (0, vue_1.h)(input_1.NInput, { status: this.mergedStatus, themeOverrides: mergedTheme.peerOverrides.Input, theme: mergedTheme.peers.Input, size: this.mergedSize, autosize: this.autosize, type: this.type, ref: "inputInstRef", placeholder: this.placeholder, onMousedown: this.handleInputMouseDown, onUpdateValue: this.handleInputUpdateValue, onKeydown: this.handleInputKeyDown, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur, bordered: this.mergedBordered, disabled: this.disabled, value: this.mergedValue }),
            (0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => {
                            const style = {
                                position: 'absolute',
                                width: 0
                            };
                            if (process.env.NODE_ENV !== 'production' && this.internalDebug) {
                                style.width = '1px';
                                style.background = 'red';
                            }
                            return (0, vue_1.h)("div", { style: style, ref: "cursorRef" });
                        }
                    }),
                    (0, vue_1.h)(vueuc_1.VFollower, { ref: "followerRef", placement: this.placement, show: this.showMenu, containerClass: this.namespace, to: this.adjustedTo, teleportDisabled: this.adjustedTo === _utils_1.useAdjustedTo.tdkey }, {
                        default: () => ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", appear: this.isMounted }, {
                            default: () => {
                                const { mergedTheme, onRender } = this;
                                onRender === null || onRender === void 0 ? void 0 : onRender();
                                return this.showMenu ? ((0, vue_1.h)(_internal_1.NInternalSelectMenu, { clsPrefix: mergedClsPrefix, theme: mergedTheme.peers.InternalSelectMenu, themeOverrides: mergedTheme.peerOverrides.InternalSelectMenu, autoPending: true, ref: "selectMenuInstRef", class: [
                                        `${mergedClsPrefix}-mention-menu`,
                                        this.themeClass
                                    ], loading: this.loading, treeMate: this.treeMate, virtualScroll: false, style: this.cssVars, onToggle: this.handleSelect, renderLabel: this.renderLabel, scrollbarProps: this.scrollbarProps }, $slots)) : null;
                            }
                        }))
                    })
                ]
            })));
    }
});
