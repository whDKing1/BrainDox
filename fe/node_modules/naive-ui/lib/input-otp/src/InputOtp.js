"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputOtpProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const input_1 = require("../../input");
const light_1 = __importDefault(require("../styles/light"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.inputOtpProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { defaultValue: { type: Array, default: [] }, value: Array, length: {
        type: Number,
        default: 6
    }, block: Boolean, size: String, disabled: Boolean, mask: Boolean, readonly: Boolean, status: String, gap: [String, Number], placeholder: { type: String, default: '' }, allowInput: Function, onBlur: [Function, Array], onFocus: [Function, Array], 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], onFinish: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'InputOtp',
    props: exports.inputOtpProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('InputOtp', '-input-otp', index_cssr_1.default, light_1.default, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('InputOtp', mergedRtlRef, mergedClsPrefixRef);
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
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.InputOtp) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize)
                    return configSize;
                return 'medium';
            }
        });
        const { mergedSizeRef, mergedDisabledRef, mergedStatusRef } = formItem;
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { gap: propGap } = props;
            const { self: { [(0, _utils_1.createKey)('inputWidth', size)]: inputWidth, [(0, _utils_1.createKey)('gap', size)]: gap } } = themeRef.value;
            return {
                '--n-gap': propGap === undefined
                    ? gap
                    : typeof propGap === 'number'
                        ? (0, seemly_1.pxfy)(propGap)
                        : propGap,
                '--n-input-width': inputWidth
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('input-otp', (0, vue_1.computed)(() => {
                const { value: size } = mergedSizeRef;
                return size[0];
            }), cssVarsRef, props)
            : undefined;
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const mergedValueRef = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        const inputRefList = (0, vue_1.ref)([]);
        const inputTypeRef = (0, vue_1.computed)(() => props.mask ? 'password' : 'text');
        const handleFocus = (e, index) => {
            // If it's focused from other input element inside the component, returns
            if (inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value.some(inputInst => inputInst.inputElRef === e.relatedTarget)) {
                return;
            }
            const { onFocus } = props;
            if (onFocus) {
                (0, _utils_1.call)(onFocus, e, index);
            }
            const { nTriggerFormFocus } = formItem;
            nTriggerFormFocus();
        };
        const handleBlur = (e, index) => {
            // If it's blured to other input element inside the component, returns
            if (inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value.some(inputInst => inputInst.inputElRef === e.relatedTarget)) {
                return;
            }
            const { onBlur } = props;
            const { nTriggerFormBlur } = formItem;
            if (onBlur)
                (0, _utils_1.call)(onBlur, e, index);
            nTriggerFormBlur();
        };
        const focusOnChar = (charIndex) => {
            if (charIndex >= props.length)
                return;
            if (charIndex < 0)
                return;
            inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value[charIndex].focus();
            inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value[charIndex].select();
        };
        const focusOnNextChar = (currentIndex) => {
            if (currentIndex >= props.length - 1) {
                return;
            }
            focusOnChar(currentIndex + 1);
        };
        const focusOnPrevChar = (currentIndex) => {
            if (currentIndex <= 0) {
                return;
            }
            focusOnChar(currentIndex - 1);
        };
        const justifyValue = (value) => {
            const justifiedValue = value ? Array.from(value) : [];
            const length = props.length;
            while (justifiedValue.length > length) {
                justifiedValue.pop();
            }
            while (justifiedValue.length < length) {
                justifiedValue.push('');
            }
            return justifiedValue;
        };
        function doUpdateValue(value, meta) {
            const { nTriggerFormInput, nTriggerFormChange } = formItem;
            if ((0, _utils_1.isArrayShallowEqual)(value, mergedValueRef.value)) {
                nTriggerFormInput();
                return;
            }
            const { 'onUpdate:value': _onUpdateValue, onUpdateValue, length, onFinish } = props;
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, value, meta);
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, value, meta);
            if (value.filter(v => v).length === length && onFinish) {
                (0, _utils_1.call)(onFinish, value);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormInput();
            nTriggerFormChange();
        }
        const handlePaste = (e, index) => {
            if (props.readonly || mergedDisabledRef.value) {
                return;
            }
            e.preventDefault();
            const { clipboardData } = e;
            const text = clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData('text');
            if (!text)
                return;
            const currentValue = justifyValue(mergedValueRef.value);
            let startIndex = index;
            const allowInput = props.allowInput;
            let pasteApplied = false;
            let appendedText = '';
            for (let i = 0; i < text.length; ++i) {
                if (allowInput && !allowInput(text[i], startIndex, currentValue)) {
                    continue;
                }
                pasteApplied = true;
                currentValue[startIndex] = text[i];
                appendedText += text[i];
                startIndex++;
                if (startIndex >= currentValue.length) {
                    break;
                }
            }
            if (pasteApplied) {
                focusOnChar(startIndex);
                doUpdateValue(currentValue, {
                    diff: appendedText,
                    index: startIndex,
                    source: 'paste'
                });
            }
        };
        const handleKeydown = (e, index) => {
            if (mergedDisabledRef.value)
                return;
            const keyCode = e.code || e.key;
            const currentValue = justifyValue(mergedValueRef.value);
            if (keyCode === 'Backspace' && !props.readonly) {
                e.preventDefault();
                currentValue[Math.max(index, 0)] = '';
                doUpdateValue(currentValue, { diff: '', index, source: 'delete' });
                focusOnPrevChar(index);
            }
            else if (keyCode === 'ArrowLeft') {
                e.preventDefault();
                focusOnPrevChar(index);
            }
            else if (keyCode === 'ArrowRight') {
                e.preventDefault();
                focusOnNextChar(index);
            }
        };
        const handleInput = (value, index) => {
            const currentValue = justifyValue(mergedValueRef.value);
            const currentValueAtIndex = currentValue[index];
            const diff = value.replace(currentValueAtIndex, '');
            const char = diff[diff.length - 1] || value[value.length - 1] || '';
            const allowInput = props.allowInput;
            if (allowInput && !allowInput(char, index, currentValue)) {
                return;
            }
            currentValue[index] = char;
            doUpdateValue(currentValue, { diff: char, index, source: 'input' });
            focusOnNextChar(index);
        };
        const getTemplateEvents = (index) => {
            return {
                onInput: (value) => handleInput(value, index),
                onPaste: (event) => handlePaste(event, index),
                onKeydown: (event) => handleKeydown(event, index),
                onFocus: (event) => handleFocus(event, index),
                onBlur: (event) => handleBlur(event, index)
            };
        };
        const exposedMethods = {
            focusOnChar
        };
        return Object.assign({ mergedTheme: themeRef, perItemValueArray: (0, vue_1.computed)(() => justifyValue(mergedValueRef.value)), mergedClsPrefix: mergedClsPrefixRef, inputRefList, inputType: inputTypeRef, rtlEnabled: rtlEnabledRef, mergedStatus: mergedStatusRef, mergedDisabled: mergedDisabledRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, getTemplateEvents, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
    },
    render() {
        const { mergedTheme, mergedClsPrefix, perItemValueArray, size, placeholder, mergedDisabled, mergedStatus, readonly, inputType, $slots, getTemplateEvents, themeClass, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { style: this.cssVars, class: [
                `${mergedClsPrefix}-input-otp`,
                themeClass,
                this.rtlEnabled && `${mergedClsPrefix}-input-otp--rtl`,
                this.block && `${mergedClsPrefix}-input-otp--block`
            ] }, (0, seemly_1.repeat)(this.length, undefined).map((_, index) => (0, _utils_1.resolveSlotWithTypedProps)($slots.default, Object.assign({ index, value: perItemValueArray[index], type: inputType, size,
            placeholder, disabled: mergedDisabled, readonly, status: mergedStatus, builtinThemeOverrides: {
                paddingTiny: '0',
                paddingSmall: '0',
                paddingMedium: '0',
                paddingLarge: '0'
            }, theme: mergedTheme.peers.Input, themeOverrides: mergedTheme.peerOverrides.Input, ref: (el) => (this.inputRefList[index] = el) }, getTemplateEvents(index)), (_a) => {
            var { index } = _a, restProps = __rest(_a, ["index"]);
            return [(0, vue_1.h)(input_1.NInput, Object.assign({}, restProps, { key: index }))];
        }))));
    }
});
