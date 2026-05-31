import { useMergedState } from 'vooks';
import { computed, defineComponent, h, nextTick, ref, toRef, watchEffect } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { AddIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useFormItem, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, smallerSize, warnOnce } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { NInput } from "../../input/index.mjs";
import { NSpace } from "../../space/index.mjs";
import { NTag } from "../../tag/index.mjs";
import commonProps from "../../tag/src/common-props.mjs";
import { dynamicTagsLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const dynamicTagsProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), commonProps), {
  size: String,
  closable: {
    type: Boolean,
    default: true
  },
  defaultValue: {
    type: Array,
    default: () => []
  },
  value: Array,
  inputClass: String,
  inputStyle: [String, Object],
  inputProps: Object,
  max: Number,
  tagClass: String,
  tagStyle: [String, Object],
  renderTag: Function,
  onCreate: {
    type: Function,
    default: label => label
  },
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
});
export default defineComponent({
  name: 'DynamicTags',
  props: dynamicTagsProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce('dynamic-tags', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
      });
    }
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.DynamicTags) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const {
      localeRef
    } = useLocale('DynamicTags');
    const formItem = useFormItem(props);
    const {
      mergedDisabledRef
    } = formItem;
    const inputValueRef = ref('');
    const showInputRef = ref(false);
    const inputForceFocusedRef = ref(true);
    const inputInstRef = ref(null);
    const themeRef = useTheme('DynamicTags', '-dynamic-tags', style, dynamicTagsLight, props, mergedClsPrefixRef);
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const localizedAddRef = computed(() => {
      return localeRef.value.add;
    });
    const inputSizeRef = computed(() => {
      return smallerSize(mergedSizeRef.value);
    });
    const triggerDisabledRef = computed(() => {
      return mergedDisabledRef.value || !!props.max && mergedValueRef.value.length >= props.max;
    });
    function doChange(value) {
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onChange) call(onChange, value);
      if (onUpdateValue) call(onUpdateValue, value);
      if (_onUpdateValue) call(_onUpdateValue, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function handleCloseClick(index) {
      const tags = mergedValueRef.value.slice(0);
      tags.splice(index, 1);
      doChange(tags);
    }
    function handleInputKeyDown(e) {
      switch (e.key) {
        case 'Enter':
          handleInputConfirm();
      }
    }
    function handleInputConfirm(externalValue) {
      const nextValue = externalValue !== null && externalValue !== void 0 ? externalValue : inputValueRef.value;
      if (nextValue) {
        const tags = mergedValueRef.value.slice(0);
        tags.push(props.onCreate(nextValue));
        doChange(tags);
      }
      showInputRef.value = false;
      inputForceFocusedRef.value = true;
      inputValueRef.value = '';
    }
    function handleInputBlur() {
      handleInputConfirm();
    }
    function handleAddClick() {
      showInputRef.value = true;
      void nextTick(() => {
        var _a;
        (_a = inputInstRef.value) === null || _a === void 0 ? void 0 : _a.focus();
        inputForceFocusedRef.value = false;
      });
    }
    const cssVarsRef = computed(() => {
      const {
        self: {
          inputWidth
        }
      } = themeRef.value;
      return {
        '--n-input-width': inputWidth
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('dynamic-tags', undefined, cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      inputInstRef,
      localizedAdd: localizedAddRef,
      inputSize: inputSizeRef,
      mergedSize: mergedSizeRef,
      inputValue: inputValueRef,
      showInput: showInputRef,
      inputForceFocused: inputForceFocusedRef,
      mergedValue: mergedValueRef,
      mergedDisabled: mergedDisabledRef,
      triggerDisabled: triggerDisabledRef,
      handleInputKeyDown,
      handleAddClick,
      handleInputBlur,
      handleCloseClick,
      handleInputConfirm,
      mergedTheme: themeRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedTheme,
      cssVars,
      mergedClsPrefix,
      onRender,
      renderTag
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(NSpace, {
      class: [`${mergedClsPrefix}-dynamic-tags`, this.themeClass],
      size: "small",
      style: cssVars,
      theme: mergedTheme.peers.Space,
      themeOverrides: mergedTheme.peerOverrides.Space,
      itemStyle: "display: flex;"
    }, {
      default: () => {
        const {
          mergedTheme,
          tagClass,
          tagStyle,
          type,
          round,
          mergedSize,
          color,
          closable,
          mergedDisabled,
          showInput,
          inputValue,
          inputClass,
          inputStyle,
          inputSize,
          inputForceFocused,
          triggerDisabled,
          handleInputKeyDown,
          handleInputBlur,
          handleAddClick,
          handleCloseClick,
          handleInputConfirm,
          $slots
        } = this;
        return this.mergedValue.map((tag, index) => renderTag ? renderTag(tag, index) : h(NTag, {
          key: index,
          theme: mergedTheme.peers.Tag,
          themeOverrides: mergedTheme.peerOverrides.Tag,
          class: tagClass,
          style: tagStyle,
          type: type,
          round: round,
          size: mergedSize,
          color: color,
          closable: closable,
          disabled: mergedDisabled,
          onClose: () => {
            handleCloseClick(index);
          }
        }, {
          default: () => typeof tag === 'string' ? tag : tag.label
        })).concat(showInput ? $slots.input ? $slots.input({
          submit: handleInputConfirm,
          deactivate: handleInputBlur
        }) : h(NInput, Object.assign({
          placeholder: "",
          size: inputSize,
          style: inputStyle,
          class: inputClass,
          autosize: true
        }, this.inputProps, {
          ref: "inputInstRef",
          value: inputValue,
          onUpdateValue: v => {
            this.inputValue = v;
          },
          theme: mergedTheme.peers.Input,
          themeOverrides: mergedTheme.peerOverrides.Input,
          onKeydown: handleInputKeyDown,
          onBlur: handleInputBlur,
          internalForceFocus: inputForceFocused
        })) : $slots.trigger ? $slots.trigger({
          activate: handleAddClick,
          disabled: triggerDisabled
        }) : h(NButton, {
          dashed: true,
          disabled: triggerDisabled,
          theme: mergedTheme.peers.Button,
          themeOverrides: mergedTheme.peerOverrides.Button,
          size: inputSize,
          onClick: handleAddClick
        }, {
          icon: () => h(NBaseIcon, {
            clsPrefix: mergedClsPrefix
          }, {
            default: () => h(AddIcon, null)
          })
        }));
      }
    });
  }
});