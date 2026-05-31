"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputProps = void 0;
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const browser_1 = require("../../_utils/env/browser");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const input_cssr_1 = __importStar(require("./styles/input.cssr"));
const utils_1 = require("./utils");
const WordCount_1 = __importDefault(require("./WordCount"));
exports.inputProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { bordered: {
        type: Boolean,
        default: undefined
    }, type: {
        type: String,
        default: 'text'
    }, placeholder: [Array, String], defaultValue: {
        type: [String, Array],
        default: null
    }, value: [String, Array], disabled: {
        type: Boolean,
        default: undefined
    }, size: String, rows: {
        type: [Number, String],
        default: 3
    }, round: Boolean, minlength: [String, Number], maxlength: [String, Number], clearable: Boolean, autosize: {
        type: [Boolean, Object],
        default: false
    }, pair: Boolean, separator: String, readonly: {
        type: [String, Boolean],
        default: false
    }, passivelyActivated: Boolean, showPasswordOn: String, stateful: {
        type: Boolean,
        default: true
    }, autofocus: Boolean, inputProps: Object, resizable: {
        type: Boolean,
        default: true
    }, showCount: Boolean, loading: {
        type: Boolean,
        default: undefined
    }, allowInput: Function, renderCount: Function, onMousedown: Function, onKeydown: Function, onKeyup: [Function, Array], onInput: [Function, Array], onFocus: [Function, Array], onBlur: [Function, Array], onClick: [Function, Array], onChange: [Function, Array], onClear: [Function, Array], countGraphemes: Function, status: String, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], 
    /** private */
    textDecoration: [String, Array], attrSize: {
        type: Number,
        default: 20
    }, onInputBlur: [Function, Array], onInputFocus: [Function, Array], onDeactivate: [Function, Array], onActivate: [Function, Array], onWrapperFocus: [Function, Array], onWrapperBlur: [Function, Array], internalDeactivateOnEnter: Boolean, internalForceFocus: Boolean, internalLoadingBeforeSuffix: {
        type: Boolean,
        default: true
    }, 
    /** deprecated */
    showPasswordToggle: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Input',
    props: exports.inputProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, mergedBorderedRef, inlineThemeDisabled, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Input', '-input', input_cssr_1.default, styles_1.inputLight, props, mergedClsPrefixRef);
        if (browser_1.isSafari) {
            (0, _mixins_1.useStyle)('-input-safari', input_cssr_1.safariStyle, mergedClsPrefixRef);
        }
        // dom refs
        const wrapperElRef = (0, vue_1.ref)(null);
        const textareaElRef = (0, vue_1.ref)(null);
        const textareaMirrorElRef = (0, vue_1.ref)(null);
        const inputMirrorElRef = (0, vue_1.ref)(null);
        const inputElRef = (0, vue_1.ref)(null);
        const inputEl2Ref = (0, vue_1.ref)(null);
        const currentFocusedInputRef = (0, vue_1.ref)(null);
        const focusedInputCursorControl = (0, utils_1.useCursor)(currentFocusedInputRef);
        const textareaScrollbarInstRef = (0, vue_1.ref)(null);
        // local
        const { localeRef } = (0, _mixins_1.useLocale)('Input');
        // value
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        // form-item
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize: (NFormItem) => {
                var _a, _b;
                const { size } = props;
                if (size)
                    return size;
                const { mergedSize: formItemSize } = NFormItem || {};
                if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value)
                    return formItemSize.value;
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Input) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        // states
        const focusedRef = (0, vue_1.ref)(false);
        const hoverRef = (0, vue_1.ref)(false);
        const isComposingRef = (0, vue_1.ref)(false);
        const activatedRef = (0, vue_1.ref)(false);
        let syncSource = null;
        // placeholder
        const mergedPlaceholderRef = (0, vue_1.computed)(() => {
            const { placeholder, pair } = props;
            if (pair) {
                if (Array.isArray(placeholder)) {
                    return placeholder;
                }
                else if (placeholder === undefined) {
                    return ['', ''];
                }
                return [placeholder, placeholder];
            }
            else if (placeholder === undefined) {
                return [localeRef.value.placeholder];
            }
            else {
                return [placeholder];
            }
        });
        const showPlaceholder1Ref = (0, vue_1.computed)(() => {
            const { value: isComposing } = isComposingRef;
            const { value: mergedValue } = mergedValueRef;
            const { value: mergedPlaceholder } = mergedPlaceholderRef;
            return (!isComposing
                && ((0, utils_1.isEmptyInputValue)(mergedValue)
                    || (Array.isArray(mergedValue) && (0, utils_1.isEmptyInputValue)(mergedValue[0])))
                && mergedPlaceholder[0]);
        });
        const showPlaceholder2Ref = (0, vue_1.computed)(() => {
            const { value: isComposing } = isComposingRef;
            const { value: mergedValue } = mergedValueRef;
            const { value: mergedPlaceholder } = mergedPlaceholderRef;
            return (!isComposing
                && mergedPlaceholder[1]
                && ((0, utils_1.isEmptyInputValue)(mergedValue)
                    || (Array.isArray(mergedValue) && (0, utils_1.isEmptyInputValue)(mergedValue[1]))));
        });
        // focus
        const mergedFocusRef = (0, vooks_1.useMemo)(() => {
            return props.internalForceFocus || focusedRef.value;
        });
        // clear
        const showClearButton = (0, vooks_1.useMemo)(() => {
            if (mergedDisabledRef.value
                || props.readonly
                || !props.clearable
                || (!mergedFocusRef.value && !hoverRef.value)) {
                return false;
            }
            const { value: mergedValue } = mergedValueRef;
            const { value: mergedFocus } = mergedFocusRef;
            if (props.pair) {
                return (!!(Array.isArray(mergedValue)
                    && (mergedValue[0] || mergedValue[1]))
                    && (hoverRef.value || mergedFocus));
            }
            else {
                return !!mergedValue && (hoverRef.value || mergedFocus);
            }
        });
        // passwordVisible
        const mergedShowPasswordOnRef = (0, vue_1.computed)(() => {
            const { showPasswordOn } = props;
            if (showPasswordOn) {
                return showPasswordOn;
            }
            if (props.showPasswordToggle)
                return 'click';
            return undefined;
        });
        const passwordVisibleRef = (0, vue_1.ref)(false);
        // text-decoration
        const textDecorationStyleRef = (0, vue_1.computed)(() => {
            const { textDecoration } = props;
            if (!textDecoration)
                return ['', ''];
            if (Array.isArray(textDecoration)) {
                return textDecoration.map(v => ({
                    textDecoration: v
                }));
            }
            return [
                {
                    textDecoration
                }
            ];
        });
        const textAreaScrollContainerWidthRef = (0, vue_1.ref)(undefined);
        // textarea autosize
        const updateTextAreaStyle = () => {
            var _a, _b;
            if (props.type === 'textarea') {
                const { autosize } = props;
                if (autosize) {
                    textAreaScrollContainerWidthRef.value
                        = (_b = (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.$el) === null || _b === void 0 ? void 0 : _b.offsetWidth;
                }
                if (!textareaElRef.value)
                    return;
                if (typeof autosize === 'boolean')
                    return;
                const { paddingTop: stylePaddingTop, paddingBottom: stylePaddingBottom, lineHeight: styleLineHeight } = window.getComputedStyle(textareaElRef.value);
                const paddingTop = Number(stylePaddingTop.slice(0, -2));
                const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
                const lineHeight = Number(styleLineHeight.slice(0, -2));
                const { value: textareaMirrorEl } = textareaMirrorElRef;
                if (!textareaMirrorEl)
                    return;
                if (autosize.minRows) {
                    const minRows = Math.max(autosize.minRows, 1);
                    const styleMinHeight = `${paddingTop + paddingBottom + lineHeight * minRows}px`;
                    textareaMirrorEl.style.minHeight = styleMinHeight;
                }
                if (autosize.maxRows) {
                    const styleMaxHeight = `${paddingTop + paddingBottom + lineHeight * autosize.maxRows}px`;
                    textareaMirrorEl.style.maxHeight = styleMaxHeight;
                }
            }
        };
        // word count
        const maxlengthRef = (0, vue_1.computed)(() => {
            const { maxlength } = props;
            return maxlength === undefined ? undefined : Number(maxlength);
        });
        (0, vue_1.onMounted)(() => {
            // sync mirror if is not pair
            const { value } = mergedValueRef;
            if (!Array.isArray(value)) {
                syncMirror(value);
            }
        });
        // other methods
        const vm = (0, vue_1.getCurrentInstance)().proxy;
        function doUpdateValue(value, meta) {
            const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onInput } = props;
            const { nTriggerFormInput } = formItem;
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value, meta);
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, value, meta);
            if (onInput)
                (0, _utils_1.call)(onInput, value, meta);
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
        }
        function doChange(value, meta) {
            const { onChange } = props;
            const { nTriggerFormChange } = formItem;
            if (onChange)
                (0, _utils_1.call)(onChange, value, meta);
            uncontrolledValueRef.value = value;
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
        function doClear(e) {
            const { onClear } = props;
            if (onClear)
                (0, _utils_1.call)(onClear, e);
        }
        function doUpdateValueBlur(e) {
            const { onInputBlur } = props;
            if (onInputBlur)
                (0, _utils_1.call)(onInputBlur, e);
        }
        function doUpdateValueFocus(e) {
            const { onInputFocus } = props;
            if (onInputFocus)
                (0, _utils_1.call)(onInputFocus, e);
        }
        function doDeactivate() {
            const { onDeactivate } = props;
            if (onDeactivate)
                (0, _utils_1.call)(onDeactivate);
        }
        function doActivate() {
            const { onActivate } = props;
            if (onActivate)
                (0, _utils_1.call)(onActivate);
        }
        function doClick(e) {
            const { onClick } = props;
            if (onClick)
                (0, _utils_1.call)(onClick, e);
        }
        function doWrapperFocus(e) {
            const { onWrapperFocus } = props;
            if (onWrapperFocus)
                (0, _utils_1.call)(onWrapperFocus, e);
        }
        function doWrapperBlur(e) {
            const { onWrapperBlur } = props;
            if (onWrapperBlur)
                (0, _utils_1.call)(onWrapperBlur, e);
        }
        // methods
        function handleCompositionStart() {
            isComposingRef.value = true;
        }
        function handleCompositionEnd(e) {
            isComposingRef.value = false;
            if (e.target === inputEl2Ref.value) {
                handleInput(e, 1);
            }
            else {
                handleInput(e, 0);
            }
        }
        function handleInput(e, index = 0, event = 'input') {
            const targetValue = e.target.value;
            syncMirror(targetValue);
            if (e instanceof InputEvent && !e.isComposing) {
                isComposingRef.value = false;
            }
            if (props.type === 'textarea') {
                const { value: textareaScrollbarInst } = textareaScrollbarInstRef;
                if (textareaScrollbarInst) {
                    textareaScrollbarInst.syncUnifiedContainer();
                }
            }
            syncSource = targetValue;
            if (isComposingRef.value)
                return;
            focusedInputCursorControl.recordCursor();
            const isIncomingValueValid = allowInput(targetValue);
            if (isIncomingValueValid) {
                if (!props.pair) {
                    if (event === 'input') {
                        doUpdateValue(targetValue, { source: index });
                    }
                    else {
                        doChange(targetValue, { source: index });
                    }
                }
                else {
                    let { value } = mergedValueRef;
                    if (!Array.isArray(value)) {
                        value = ['', ''];
                    }
                    else {
                        value = [value[0], value[1]];
                    }
                    value[index] = targetValue;
                    if (event === 'input') {
                        doUpdateValue(value, { source: index });
                    }
                    else {
                        doChange(value, { source: index });
                    }
                }
            }
            // force update to sync input's view with value
            // if not set, after input, input value won't sync with dom input value
            vm.$forceUpdate();
            if (!isIncomingValueValid) {
                void (0, vue_1.nextTick)(focusedInputCursorControl.restoreCursor);
            }
        }
        function allowInput(value) {
            const { countGraphemes, maxlength, minlength } = props;
            if (countGraphemes) {
                let graphemesCount;
                if (maxlength !== undefined) {
                    if (graphemesCount === undefined) {
                        graphemesCount = countGraphemes(value);
                    }
                    if (graphemesCount > Number(maxlength))
                        return false;
                }
                if (minlength !== undefined) {
                    if (graphemesCount === undefined) {
                        graphemesCount = countGraphemes(value);
                    }
                    if (graphemesCount < Number(maxlength))
                        return false;
                }
            }
            const { allowInput } = props;
            if (typeof allowInput === 'function') {
                return allowInput(value);
            }
            return true;
        }
        function handleInputBlur(e) {
            doUpdateValueBlur(e);
            if (e.relatedTarget === wrapperElRef.value) {
                doDeactivate();
            }
            if (!(e.relatedTarget !== null
                && (e.relatedTarget === inputElRef.value
                    || e.relatedTarget === inputEl2Ref.value
                    || e.relatedTarget === textareaElRef.value))) {
                activatedRef.value = false;
            }
            dealWithEvent(e, 'blur');
            currentFocusedInputRef.value = null;
        }
        function handleInputFocus(e, index) {
            doUpdateValueFocus(e);
            focusedRef.value = true;
            activatedRef.value = true;
            doActivate();
            dealWithEvent(e, 'focus');
            if (index === 0) {
                currentFocusedInputRef.value = inputElRef.value;
            }
            else if (index === 1) {
                currentFocusedInputRef.value = inputEl2Ref.value;
            }
            else if (index === 2) {
                currentFocusedInputRef.value = textareaElRef.value;
            }
        }
        function handleWrapperBlur(e) {
            if (props.passivelyActivated) {
                doWrapperBlur(e);
                dealWithEvent(e, 'blur');
            }
        }
        function handleWrapperFocus(e) {
            if (props.passivelyActivated) {
                focusedRef.value = true;
                doWrapperFocus(e);
                dealWithEvent(e, 'focus');
            }
        }
        function dealWithEvent(e, type) {
            if (e.relatedTarget !== null
                && (e.relatedTarget === inputElRef.value
                    || e.relatedTarget === inputEl2Ref.value
                    || e.relatedTarget === textareaElRef.value
                    || e.relatedTarget === wrapperElRef.value)) {
                /**
                 * activeElement transfer inside the input, do nothing
                 */
            }
            else {
                if (type === 'focus') {
                    doFocus(e);
                    focusedRef.value = true;
                }
                else if (type === 'blur') {
                    doBlur(e);
                    focusedRef.value = false;
                }
            }
        }
        function handleChange(e, index) {
            handleInput(e, index, 'change');
        }
        function handleClick(e) {
            doClick(e);
        }
        function handleClear(e) {
            doClear(e);
            clearValue();
        }
        function clearValue() {
            if (props.pair) {
                doUpdateValue(['', ''], { source: 'clear' });
                doChange(['', ''], { source: 'clear' });
            }
            else {
                doUpdateValue('', { source: 'clear' });
                doChange('', { source: 'clear' });
            }
        }
        function handleMouseDown(e) {
            const { onMousedown } = props;
            if (onMousedown)
                onMousedown(e);
            const { tagName } = e.target;
            if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
                if (props.resizable) {
                    const { value: wrapperEl } = wrapperElRef;
                    if (wrapperEl) {
                        const { left, top, width, height } = wrapperEl.getBoundingClientRect();
                        const resizeHandleSize = 14;
                        if (left + width - resizeHandleSize < e.clientX
                            && e.clientX < left + width
                            && top + height - resizeHandleSize < e.clientY
                            && e.clientY < top + height) {
                            // touching resize handle, just let it go.
                            // resize won't take focus, maybe there is a better way to do this.
                            // hope someone can figure out a better solution
                            return;
                        }
                    }
                }
                e.preventDefault();
                if (!focusedRef.value) {
                    focus();
                }
            }
        }
        function handleMouseEnter() {
            var _a;
            hoverRef.value = true;
            if (props.type === 'textarea') {
                (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseEnterWrapper();
            }
        }
        function handleMouseLeave() {
            var _a;
            hoverRef.value = false;
            if (props.type === 'textarea') {
                (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.handleMouseLeaveWrapper();
            }
        }
        function handlePasswordToggleClick() {
            if (mergedDisabledRef.value)
                return;
            if (mergedShowPasswordOnRef.value !== 'click')
                return;
            passwordVisibleRef.value = !passwordVisibleRef.value;
        }
        function handlePasswordToggleMousedown(e) {
            if (mergedDisabledRef.value)
                return;
            e.preventDefault();
            const preventDefaultOnce = (e) => {
                e.preventDefault();
                (0, evtd_1.off)('mouseup', document, preventDefaultOnce);
            };
            (0, evtd_1.on)('mouseup', document, preventDefaultOnce);
            if (mergedShowPasswordOnRef.value !== 'mousedown')
                return;
            passwordVisibleRef.value = true;
            const hidePassword = () => {
                passwordVisibleRef.value = false;
                (0, evtd_1.off)('mouseup', document, hidePassword);
            };
            (0, evtd_1.on)('mouseup', document, hidePassword);
        }
        function handleWrapperKeyup(e) {
            if (props.onKeyup)
                (0, _utils_1.call)(props.onKeyup, e);
        }
        function handleWrapperKeydown(e) {
            if (props.onKeydown)
                (0, _utils_1.call)(props.onKeydown, e);
            switch (e.key) {
                case 'Escape':
                    handleWrapperKeydownEsc();
                    break;
                case 'Enter':
                    handleWrapperKeydownEnter(e);
                    break;
            }
        }
        function handleWrapperKeydownEnter(e) {
            var _a, _b;
            if (props.passivelyActivated) {
                const { value: focused } = activatedRef;
                if (focused) {
                    if (props.internalDeactivateOnEnter) {
                        handleWrapperKeydownEsc();
                    }
                    return;
                }
                e.preventDefault();
                if (props.type === 'textarea') {
                    (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                }
                else {
                    (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
                }
            }
        }
        function handleWrapperKeydownEsc() {
            if (props.passivelyActivated) {
                activatedRef.value = false;
                void (0, vue_1.nextTick)(() => {
                    var _a;
                    (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
                });
            }
        }
        function focus() {
            var _a, _b, _c;
            if (mergedDisabledRef.value)
                return;
            if (props.passivelyActivated) {
                (_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.focus();
            }
            else {
                (_b = textareaElRef.value) === null || _b === void 0 ? void 0 : _b.focus();
                (_c = inputElRef.value) === null || _c === void 0 ? void 0 : _c.focus();
            }
        }
        function blur() {
            var _a;
            if ((_a = wrapperElRef.value) === null || _a === void 0 ? void 0 : _a.contains(document.activeElement)) {
                ;
                document.activeElement.blur();
            }
        }
        function select() {
            var _a, _b;
            (_a = textareaElRef.value) === null || _a === void 0 ? void 0 : _a.select();
            (_b = inputElRef.value) === null || _b === void 0 ? void 0 : _b.select();
        }
        function activate() {
            if (mergedDisabledRef.value)
                return;
            if (textareaElRef.value)
                textareaElRef.value.focus();
            else if (inputElRef.value)
                inputElRef.value.focus();
        }
        function deactivate() {
            const { value: wrapperEl } = wrapperElRef;
            if ((wrapperEl === null || wrapperEl === void 0 ? void 0 : wrapperEl.contains(document.activeElement))
                && wrapperEl !== document.activeElement) {
                handleWrapperKeydownEsc();
            }
        }
        function scrollTo(options) {
            if (props.type === 'textarea') {
                const { value: textareaEl } = textareaElRef;
                textareaEl === null || textareaEl === void 0 ? void 0 : textareaEl.scrollTo(options);
            }
            else {
                const { value: inputEl } = inputElRef;
                inputEl === null || inputEl === void 0 ? void 0 : inputEl.scrollTo(options);
            }
        }
        function syncMirror(value) {
            const { type, pair, autosize } = props;
            if (!pair && autosize) {
                if (type === 'textarea') {
                    const { value: textareaMirrorEl } = textareaMirrorElRef;
                    if (textareaMirrorEl) {
                        textareaMirrorEl.textContent = `${value !== null && value !== void 0 ? value : ''}\r\n`;
                    }
                }
                else {
                    const { value: inputMirrorEl } = inputMirrorElRef;
                    if (inputMirrorEl) {
                        if (value) {
                            inputMirrorEl.textContent = value;
                        }
                        else {
                            inputMirrorEl.innerHTML = '&nbsp;';
                        }
                    }
                }
            }
        }
        function handleTextAreaMirrorResize() {
            updateTextAreaStyle();
        }
        const placeholderStyleRef = (0, vue_1.ref)({
            top: '0'
        });
        function handleTextAreaScroll(e) {
            var _a;
            const { scrollTop } = e.target;
            placeholderStyleRef.value.top = `${-scrollTop}px`;
            (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
        }
        let stopWatchMergedValue1 = null;
        (0, vue_1.watchEffect)(() => {
            const { autosize, type } = props;
            if (autosize && type === 'textarea') {
                stopWatchMergedValue1 = (0, vue_1.watch)(mergedValueRef, (value) => {
                    if (!Array.isArray(value) && value !== syncSource) {
                        syncMirror(value);
                    }
                });
            }
            else {
                stopWatchMergedValue1 === null || stopWatchMergedValue1 === void 0 ? void 0 : stopWatchMergedValue1();
            }
        });
        let stopWatchMergedValue2 = null;
        (0, vue_1.watchEffect)(() => {
            if (props.type === 'textarea') {
                stopWatchMergedValue2 = (0, vue_1.watch)(mergedValueRef, (value) => {
                    var _a;
                    if (!Array.isArray(value) && value !== syncSource) {
                        (_a = textareaScrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.syncUnifiedContainer();
                    }
                });
            }
            else {
                stopWatchMergedValue2 === null || stopWatchMergedValue2 === void 0 ? void 0 : stopWatchMergedValue2();
            }
        });
        (0, vue_1.provide)(interface_1.inputInjectionKey, {
            mergedValueRef,
            maxlengthRef,
            mergedClsPrefixRef,
            countGraphemesRef: (0, vue_1.toRef)(props, 'countGraphemes')
        });
        const exposedProps = {
            wrapperElRef,
            inputElRef,
            textareaElRef,
            isCompositing: isComposingRef,
            clear: clearValue,
            focus,
            blur,
            select,
            deactivate,
            activate,
            scrollTo
        };
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Input', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { common: { cubicBezierEaseInOut }, self: { color, borderRadius, textColor, caretColor, caretColorError, caretColorWarning, textDecorationColor, border, borderDisabled, borderHover, borderFocus, placeholderColor, placeholderColorDisabled, lineHeightTextarea, colorDisabled, colorFocus, textColorDisabled, boxShadowFocus, iconSize, colorFocusWarning, boxShadowFocusWarning, borderWarning, borderFocusWarning, borderHoverWarning, colorFocusError, boxShadowFocusError, borderError, borderFocusError, borderHoverError, clearSize, clearColor, clearColorHover, clearColorPressed, iconColor, iconColorDisabled, suffixTextColor, countTextColor, countTextColorDisabled, iconColorHover, iconColorPressed, loadingColor, loadingColorError, loadingColorWarning, fontWeight, [(0, _utils_1.createKey)('padding', size)]: padding, [(0, _utils_1.createKey)('fontSize', size)]: fontSize, [(0, _utils_1.createKey)('height', size)]: height } } = themeRef.value;
            const { left: paddingLeft, right: paddingRight } = (0, seemly_1.getPadding)(padding);
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-count-text-color': countTextColor,
                '--n-count-text-color-disabled': countTextColorDisabled,
                '--n-color': color,
                '--n-font-size': fontSize,
                '--n-font-weight': fontWeight,
                '--n-border-radius': borderRadius,
                '--n-height': height,
                '--n-padding-left': paddingLeft,
                '--n-padding-right': paddingRight,
                '--n-text-color': textColor,
                '--n-caret-color': caretColor,
                '--n-text-decoration-color': textDecorationColor,
                '--n-border': border,
                '--n-border-disabled': borderDisabled,
                '--n-border-hover': borderHover,
                '--n-border-focus': borderFocus,
                '--n-placeholder-color': placeholderColor,
                '--n-placeholder-color-disabled': placeholderColorDisabled,
                '--n-icon-size': iconSize,
                '--n-line-height-textarea': lineHeightTextarea,
                '--n-color-disabled': colorDisabled,
                '--n-color-focus': colorFocus,
                '--n-text-color-disabled': textColorDisabled,
                '--n-box-shadow-focus': boxShadowFocus,
                '--n-loading-color': loadingColor,
                // form warning
                '--n-caret-color-warning': caretColorWarning,
                '--n-color-focus-warning': colorFocusWarning,
                '--n-box-shadow-focus-warning': boxShadowFocusWarning,
                '--n-border-warning': borderWarning,
                '--n-border-focus-warning': borderFocusWarning,
                '--n-border-hover-warning': borderHoverWarning,
                '--n-loading-color-warning': loadingColorWarning,
                // form error
                '--n-caret-color-error': caretColorError,
                '--n-color-focus-error': colorFocusError,
                '--n-box-shadow-focus-error': boxShadowFocusError,
                '--n-border-error': borderError,
                '--n-border-focus-error': borderFocusError,
                '--n-border-hover-error': borderHoverError,
                '--n-loading-color-error': loadingColorError,
                // clear-button
                '--n-clear-color': clearColor,
                '--n-clear-size': clearSize,
                '--n-clear-color-hover': clearColorHover,
                '--n-clear-color-pressed': clearColorPressed,
                '--n-icon-color': iconColor,
                '--n-icon-color-hover': iconColorHover,
                '--n-icon-color-pressed': iconColorPressed,
                '--n-icon-color-disabled': iconColorDisabled,
                '--n-suffix-text-color': suffixTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('input', (0, vue_1.computed)(() => {
                const { value: size } = mergedSizeRef;
                return size[0];
            }), cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({}, exposedProps), { 
            // DOM ref
            wrapperElRef,
            inputElRef,
            inputMirrorElRef,
            inputEl2Ref,
            textareaElRef,
            textareaMirrorElRef,
            textareaScrollbarInstRef, 
            // value
            rtlEnabled: rtlEnabledRef, uncontrolledValue: uncontrolledValueRef, mergedValue: mergedValueRef, passwordVisible: passwordVisibleRef, mergedPlaceholder: mergedPlaceholderRef, showPlaceholder1: showPlaceholder1Ref, showPlaceholder2: showPlaceholder2Ref, mergedFocus: mergedFocusRef, isComposing: isComposingRef, activated: activatedRef, showClearButton, mergedSize: mergedSizeRef, mergedDisabled: mergedDisabledRef, textDecorationStyle: textDecorationStyleRef, mergedClsPrefix: mergedClsPrefixRef, mergedBordered: mergedBorderedRef, mergedShowPasswordOn: mergedShowPasswordOnRef, placeholderStyle: placeholderStyleRef, mergedStatus: mergedStatusRef, textAreaScrollContainerWidth: textAreaScrollContainerWidthRef, 
            // methods
            handleTextAreaScroll,
            handleCompositionStart,
            handleCompositionEnd,
            handleInput,
            handleInputBlur,
            handleInputFocus,
            handleWrapperBlur,
            handleWrapperFocus,
            handleMouseEnter,
            handleMouseLeave,
            handleMouseDown,
            handleChange,
            handleClick,
            handleClear,
            handlePasswordToggleClick,
            handlePasswordToggleMousedown,
            handleWrapperKeydown,
            handleWrapperKeyup,
            handleTextAreaMirrorResize, getTextareaScrollContainer: () => {
                return textareaElRef.value;
            }, mergedTheme: themeRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        const { mergedClsPrefix, mergedStatus, themeClass, type, countGraphemes, onRender } = this;
        const $slots = this.$slots;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { ref: "wrapperElRef", class: [
                `${mergedClsPrefix}-input`,
                `${mergedClsPrefix}-input--${this.mergedSize}-size`,
                themeClass,
                mergedStatus && `${mergedClsPrefix}-input--${mergedStatus}-status`,
                {
                    [`${mergedClsPrefix}-input--rtl`]: this.rtlEnabled,
                    [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
                    [`${mergedClsPrefix}-input--textarea`]: type === 'textarea',
                    [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
                    [`${mergedClsPrefix}-input--autosize`]: this.autosize,
                    [`${mergedClsPrefix}-input--round`]: this.round && !(type === 'textarea'),
                    [`${mergedClsPrefix}-input--pair`]: this.pair,
                    [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
                    [`${mergedClsPrefix}-input--stateful`]: this.stateful
                }
            ], style: this.cssVars, tabindex: !this.mergedDisabled && this.passivelyActivated && !this.activated
                ? 0
                : undefined, onFocus: this.handleWrapperFocus, onBlur: this.handleWrapperBlur, onClick: this.handleClick, onMousedown: this.handleMouseDown, onMouseenter: this.handleMouseEnter, onMouseleave: this.handleMouseLeave, onCompositionstart: this.handleCompositionStart, onCompositionend: this.handleCompositionEnd, onKeyup: this.handleWrapperKeyup, onKeydown: this.handleWrapperKeydown },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-input-wrapper` },
                (0, _utils_1.resolveWrappedSlot)($slots.prefix, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__prefix` }, children))),
                type === 'textarea' ? ((0, vue_1.h)(_internal_1.NScrollbar, { ref: "textareaScrollbarInstRef", class: `${mergedClsPrefix}-input__textarea`, container: this.getTextareaScrollContainer, theme: (_b = (_a = this.theme) === null || _a === void 0 ? void 0 : _a.peers) === null || _b === void 0 ? void 0 : _b.Scrollbar, themeOverrides: (_d = (_c = this.themeOverrides) === null || _c === void 0 ? void 0 : _c.peers) === null || _d === void 0 ? void 0 : _d.Scrollbar, triggerDisplayManually: true, useUnifiedContainer: true, internalHoistYRail: true }, {
                    default: () => {
                        var _a, _b;
                        const { textAreaScrollContainerWidth } = this;
                        const scrollContainerWidthStyle = {
                            width: this.autosize
                                && textAreaScrollContainerWidth
                                && `${textAreaScrollContainerWidth}px`
                        };
                        return ((0, vue_1.h)(vue_1.Fragment, null,
                            (0, vue_1.h)("textarea", Object.assign({}, this.inputProps, { ref: "textareaElRef", class: [
                                    `${mergedClsPrefix}-input__textarea-el`,
                                    (_a = this.inputProps) === null || _a === void 0 ? void 0 : _a.class
                                ], autofocus: this.autofocus, rows: Number(this.rows), placeholder: this.placeholder, value: this.mergedValue, disabled: this.mergedDisabled, maxlength: countGraphemes ? undefined : this.maxlength, minlength: countGraphemes ? undefined : this.minlength, readonly: this.readonly, tabindex: this.passivelyActivated && !this.activated
                                    ? -1
                                    : undefined, style: [
                                    this.textDecorationStyle[0],
                                    (_b = this.inputProps) === null || _b === void 0 ? void 0 : _b.style,
                                    scrollContainerWidthStyle
                                ], onBlur: this.handleInputBlur, onFocus: (e) => {
                                    this.handleInputFocus(e, 2);
                                }, onInput: this.handleInput, onChange: this.handleChange, onScroll: this.handleTextAreaScroll })),
                            this.showPlaceholder1 ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__placeholder`, style: [
                                    this.placeholderStyle,
                                    scrollContainerWidthStyle
                                ], key: "placeholder" }, this.mergedPlaceholder[0])) : null,
                            this.autosize ? ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleTextAreaMirrorResize }, {
                                default: () => ((0, vue_1.h)("div", { ref: "textareaMirrorElRef", class: `${mergedClsPrefix}-input__textarea-mirror`, key: "mirror" }))
                            })) : null));
                    }
                })) : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__input` },
                    (0, vue_1.h)("input", Object.assign({ type: type === 'password'
                            && this.mergedShowPasswordOn
                            && this.passwordVisible
                            ? 'text'
                            : type }, this.inputProps, { ref: "inputElRef", class: [
                            `${mergedClsPrefix}-input__input-el`,
                            (_e = this.inputProps) === null || _e === void 0 ? void 0 : _e.class
                        ], style: [
                            this.textDecorationStyle[0],
                            (_f = this.inputProps) === null || _f === void 0 ? void 0 : _f.style
                        ], tabindex: this.passivelyActivated && !this.activated
                            ? -1
                            : (_g = this.inputProps) === null || _g === void 0 ? void 0 : _g.tabindex, placeholder: this.mergedPlaceholder[0], disabled: this.mergedDisabled, maxlength: countGraphemes ? undefined : this.maxlength, minlength: countGraphemes ? undefined : this.minlength, value: Array.isArray(this.mergedValue)
                            ? this.mergedValue[0]
                            : this.mergedValue, readonly: this.readonly, autofocus: this.autofocus, size: this.attrSize, onBlur: this.handleInputBlur, onFocus: (e) => {
                            this.handleInputFocus(e, 0);
                        }, onInput: (e) => {
                            this.handleInput(e, 0);
                        }, onChange: (e) => {
                            this.handleChange(e, 0);
                        } })),
                    this.showPlaceholder1 ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__placeholder` },
                        (0, vue_1.h)("span", null, this.mergedPlaceholder[0]))) : null,
                    this.autosize ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__input-mirror`, key: "mirror", ref: "inputMirrorElRef" }, "\u00A0")) : null)),
                !this.pair
                    && (0, _utils_1.resolveWrappedSlot)($slots.suffix, (children) => {
                        return children
                            || this.clearable
                            || this.showCount
                            || this.mergedShowPasswordOn
                            || this.loading !== undefined ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__suffix` }, [
                            (0, _utils_1.resolveWrappedSlot)($slots['clear-icon-placeholder'], (children) => {
                                return ((this.clearable || children) && ((0, vue_1.h)(_internal_1.NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, {
                                    placeholder: () => children,
                                    icon: () => { var _a, _b; return (_b = (_a = this.$slots)['clear-icon']) === null || _b === void 0 ? void 0 : _b.call(_a); }
                                })));
                            }),
                            !this.internalLoadingBeforeSuffix ? children : null,
                            this.loading !== undefined ? ((0, vue_1.h)(_internal_1.NBaseSuffix, { clsPrefix: mergedClsPrefix, loading: this.loading, showArrow: false, showClear: false, style: this.cssVars })) : null,
                            this.internalLoadingBeforeSuffix ? children : null,
                            this.showCount && this.type !== 'textarea' ? ((0, vue_1.h)(WordCount_1.default, null, {
                                default: (props) => {
                                    var _a;
                                    const { renderCount } = this;
                                    if (renderCount) {
                                        return renderCount(props);
                                    }
                                    return (_a = $slots.count) === null || _a === void 0 ? void 0 : _a.call($slots, props);
                                }
                            })) : null,
                            this.mergedShowPasswordOn && this.type === 'password' ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__eye`, onMousedown: this.handlePasswordToggleMousedown, onClick: this.handlePasswordToggleClick }, this.passwordVisible
                                ? (0, _utils_1.resolveSlot)($slots['password-visible-icon'], () => [
                                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.EyeIcon, null) })
                                ])
                                : (0, _utils_1.resolveSlot)($slots['password-invisible-icon'], () => [
                                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: () => (0, vue_1.h)(icons_1.EyeOffIcon, null) })
                                ]))) : null
                        ])) : null;
                    })),
            this.pair ? ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-input__separator` }, (0, _utils_1.resolveSlot)($slots.separator, () => [this.separator]))) : null,
            this.pair ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input-wrapper` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__input` },
                    (0, vue_1.h)("input", { ref: "inputEl2Ref", type: this.type, class: `${mergedClsPrefix}-input__input-el`, tabindex: this.passivelyActivated && !this.activated ? -1 : undefined, placeholder: this.mergedPlaceholder[1], disabled: this.mergedDisabled, maxlength: countGraphemes ? undefined : this.maxlength, minlength: countGraphemes ? undefined : this.minlength, value: Array.isArray(this.mergedValue)
                            ? this.mergedValue[1]
                            : undefined, readonly: this.readonly, style: this.textDecorationStyle[1], onBlur: this.handleInputBlur, onFocus: (e) => {
                            this.handleInputFocus(e, 1);
                        }, onInput: (e) => {
                            this.handleInput(e, 1);
                        }, onChange: (e) => {
                            this.handleChange(e, 1);
                        } }),
                    this.showPlaceholder2 ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__placeholder` },
                        (0, vue_1.h)("span", null, this.mergedPlaceholder[1]))) : null),
                (0, _utils_1.resolveWrappedSlot)($slots.suffix, (children) => {
                    return ((this.clearable || children) && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__suffix` }, [
                        this.clearable && ((0, vue_1.h)(_internal_1.NBaseClear, { clsPrefix: mergedClsPrefix, show: this.showClearButton, onClear: this.handleClear }, {
                            icon: () => { var _a; return (_a = $slots['clear-icon']) === null || _a === void 0 ? void 0 : _a.call($slots); },
                            placeholder: () => { var _a; return (_a = $slots['clear-icon-placeholder']) === null || _a === void 0 ? void 0 : _a.call($slots); }
                        })),
                        children
                    ])));
                }))) : null,
            this.mergedBordered ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__border` })) : null,
            this.mergedBordered ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-input__state-border` })) : null,
            this.showCount && type === 'textarea' ? ((0, vue_1.h)(WordCount_1.default, null, {
                default: (props) => {
                    var _a;
                    const { renderCount } = this;
                    if (renderCount) {
                        return renderCount(props);
                    }
                    return (_a = $slots.count) === null || _a === void 0 ? void 0 : _a.call($slots, props);
                }
            })) : null));
    }
});
