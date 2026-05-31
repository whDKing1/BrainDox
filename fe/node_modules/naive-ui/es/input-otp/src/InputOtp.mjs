var __rest = this && this.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
import { pxfy, repeat } from 'seemly';
import { useMergedState } from 'vooks';
import { computed, defineComponent, h, ref, toRef } from 'vue';
import { useConfig, useFormItem, useRtl, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, createKey, isArrayShallowEqual, resolveSlotWithTypedProps } from "../../_utils/index.mjs";
import { NInput } from "../../input/index.mjs";
import inputOtpLight from "../styles/light.mjs";
import style from "./styles/index.cssr.mjs";
export const inputOtpProps = Object.assign(Object.assign({}, useTheme.props), {
  defaultValue: {
    type: Array,
    default: []
  },
  value: Array,
  length: {
    type: Number,
    default: 6
  },
  block: Boolean,
  size: String,
  disabled: Boolean,
  mask: Boolean,
  readonly: Boolean,
  status: String,
  gap: [String, Number],
  placeholder: {
    type: String,
    default: ''
  },
  allowInput: Function,
  onBlur: [Function, Array],
  onFocus: [Function, Array],
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onFinish: [Function, Array]
});
export default defineComponent({
  name: 'InputOtp',
  props: inputOtpProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('InputOtp', '-input-otp', style, inputOtpLight, props, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('InputOtp', mergedRtlRef, mergedClsPrefixRef);
    // form-item
    const formItem = useFormItem(props, {
      mergedSize: NFormItem => {
        var _a, _b;
        const {
          size
        } = props;
        if (size) return size;
        const {
          mergedSize: formItemSize
        } = NFormItem || {};
        if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value) return formItemSize.value;
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.InputOtp) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const {
      mergedSizeRef,
      mergedDisabledRef,
      mergedStatusRef
    } = formItem;
    const cssVarsRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        gap: propGap
      } = props;
      const {
        self: {
          [createKey('inputWidth', size)]: inputWidth,
          [createKey('gap', size)]: gap
        }
      } = themeRef.value;
      return {
        '--n-gap': propGap === undefined ? gap : typeof propGap === 'number' ? pxfy(propGap) : propGap,
        '--n-input-width': inputWidth
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('input-otp', computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      return size[0];
    }), cssVarsRef, props) : undefined;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const inputRefList = ref([]);
    const inputTypeRef = computed(() => props.mask ? 'password' : 'text');
    const handleFocus = (e, index) => {
      // If it's focused from other input element inside the component, returns
      if (inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value.some(inputInst => inputInst.inputElRef === e.relatedTarget)) {
        return;
      }
      const {
        onFocus
      } = props;
      if (onFocus) {
        call(onFocus, e, index);
      }
      const {
        nTriggerFormFocus
      } = formItem;
      nTriggerFormFocus();
    };
    const handleBlur = (e, index) => {
      // If it's blured to other input element inside the component, returns
      if (inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value.some(inputInst => inputInst.inputElRef === e.relatedTarget)) {
        return;
      }
      const {
        onBlur
      } = props;
      const {
        nTriggerFormBlur
      } = formItem;
      if (onBlur) call(onBlur, e, index);
      nTriggerFormBlur();
    };
    const focusOnChar = charIndex => {
      if (charIndex >= props.length) return;
      if (charIndex < 0) return;
      inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value[charIndex].focus();
      inputRefList === null || inputRefList === void 0 ? void 0 : inputRefList.value[charIndex].select();
    };
    const focusOnNextChar = currentIndex => {
      if (currentIndex >= props.length - 1) {
        return;
      }
      focusOnChar(currentIndex + 1);
    };
    const focusOnPrevChar = currentIndex => {
      if (currentIndex <= 0) {
        return;
      }
      focusOnChar(currentIndex - 1);
    };
    const justifyValue = value => {
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
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (isArrayShallowEqual(value, mergedValueRef.value)) {
        nTriggerFormInput();
        return;
      }
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue,
        length,
        onFinish
      } = props;
      if (_onUpdateValue) call(_onUpdateValue, value, meta);
      if (onUpdateValue) call(onUpdateValue, value, meta);
      if (value.filter(v => v).length === length && onFinish) {
        call(onFinish, value);
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
      const {
        clipboardData
      } = e;
      const text = clipboardData === null || clipboardData === void 0 ? void 0 : clipboardData.getData('text');
      if (!text) return;
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
      if (mergedDisabledRef.value) return;
      const keyCode = e.code || e.key;
      const currentValue = justifyValue(mergedValueRef.value);
      if (keyCode === 'Backspace' && !props.readonly) {
        e.preventDefault();
        currentValue[Math.max(index, 0)] = '';
        doUpdateValue(currentValue, {
          diff: '',
          index,
          source: 'delete'
        });
        focusOnPrevChar(index);
      } else if (keyCode === 'ArrowLeft') {
        e.preventDefault();
        focusOnPrevChar(index);
      } else if (keyCode === 'ArrowRight') {
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
      doUpdateValue(currentValue, {
        diff: char,
        index,
        source: 'input'
      });
      focusOnNextChar(index);
    };
    const getTemplateEvents = index => {
      return {
        onInput: value => handleInput(value, index),
        onPaste: event => handlePaste(event, index),
        onKeydown: event => handleKeydown(event, index),
        onFocus: event => handleFocus(event, index),
        onBlur: event => handleBlur(event, index)
      };
    };
    const exposedMethods = {
      focusOnChar
    };
    return Object.assign({
      mergedTheme: themeRef,
      perItemValueArray: computed(() => justifyValue(mergedValueRef.value)),
      mergedClsPrefix: mergedClsPrefixRef,
      inputRefList,
      inputType: inputTypeRef,
      rtlEnabled: rtlEnabledRef,
      mergedStatus: mergedStatusRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      getTemplateEvents,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedMethods);
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix,
      perItemValueArray,
      size,
      placeholder,
      mergedDisabled,
      mergedStatus,
      readonly,
      inputType,
      $slots,
      getTemplateEvents,
      themeClass,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      style: this.cssVars,
      class: [`${mergedClsPrefix}-input-otp`, themeClass, this.rtlEnabled && `${mergedClsPrefix}-input-otp--rtl`, this.block && `${mergedClsPrefix}-input-otp--block`]
    }, repeat(this.length, undefined).map((_, index) => resolveSlotWithTypedProps($slots.default, Object.assign({
      index,
      value: perItemValueArray[index],
      type: inputType,
      size,
      placeholder,
      disabled: mergedDisabled,
      readonly,
      status: mergedStatus,
      builtinThemeOverrides: {
        paddingTiny: '0',
        paddingSmall: '0',
        paddingMedium: '0',
        paddingLarge: '0'
      },
      theme: mergedTheme.peers.Input,
      themeOverrides: mergedTheme.peerOverrides.Input,
      ref: el => this.inputRefList[index] = el
    }, getTemplateEvents(index)), _a => {
      var {
          index
        } = _a,
        restProps = __rest(_a, ["index"]);
      return [h(NInput, Object.assign({}, restProps, {
        key: index
      }))];
    })));
  }
});