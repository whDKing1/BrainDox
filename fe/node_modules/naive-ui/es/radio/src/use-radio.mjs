import { useMemo, useMergedState } from 'vooks';
import { inject, ref, toRef, watchEffect } from 'vue';
import { useConfig, useFormItem } from "../../_mixins/index.mjs";
import { call, createInjectionKey, warnOnce } from "../../_utils/index.mjs";
export const radioBaseProps = {
  name: String,
  value: {
    type: [String, Number, Boolean],
    default: 'on'
  },
  checked: {
    type: Boolean,
    default: undefined
  },
  defaultChecked: Boolean,
  disabled: {
    type: Boolean,
    default: undefined
  },
  label: String,
  size: String,
  onUpdateChecked: [Function, Array],
  'onUpdate:checked': [Function, Array],
  // deprecated
  checkedValue: {
    type: Boolean,
    default: undefined
  }
};
export const radioGroupInjectionKey = createInjectionKey('n-radio-group');
function setup(props) {
  if (process.env.NODE_ENV !== 'production') {
    watchEffect(() => {
      if (props.checkedValue !== undefined) {
        warnOnce('radio', '`checked-value` is deprecated, please use `checked` instead.');
      }
    });
  }
  const NRadioGroup = inject(radioGroupInjectionKey, null);
  const {
    mergedClsPrefixRef,
    mergedComponentPropsRef
  } = useConfig(props);
  const formItem = useFormItem(props, {
    mergedSize(NFormItem) {
      var _a, _b;
      const {
        size
      } = props;
      if (size !== undefined) return size;
      if (NRadioGroup) {
        const {
          mergedSizeRef: {
            value: mergedSize
          }
        } = NRadioGroup;
        if (mergedSize !== undefined) {
          return mergedSize;
        }
      }
      if (NFormItem) {
        return NFormItem.mergedSize.value;
      }
      const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Radio) === null || _b === void 0 ? void 0 : _b.size;
      if (configSize) return configSize;
      return 'medium';
    },
    mergedDisabled(NFormItem) {
      if (props.disabled) return true;
      if (NRadioGroup === null || NRadioGroup === void 0 ? void 0 : NRadioGroup.disabledRef.value) return true;
      if (NFormItem === null || NFormItem === void 0 ? void 0 : NFormItem.disabled.value) return true;
      return false;
    }
  });
  const {
    mergedSizeRef,
    mergedDisabledRef
  } = formItem;
  const inputRef = ref(null);
  const labelRef = ref(null);
  const uncontrolledCheckedRef = ref(props.defaultChecked);
  const controlledCheckedRef = toRef(props, 'checked');
  const mergedCheckedRef = useMergedState(controlledCheckedRef, uncontrolledCheckedRef);
  const renderSafeCheckedRef = useMemo(() => {
    if (NRadioGroup) return NRadioGroup.valueRef.value === props.value;
    return mergedCheckedRef.value;
  });
  const mergedNameRef = useMemo(() => {
    const {
      name
    } = props;
    if (name !== undefined) return name;
    if (NRadioGroup) return NRadioGroup.nameRef.value;
  });
  const focusRef = ref(false);
  function doUpdateChecked() {
    if (NRadioGroup) {
      const {
        doUpdateValue
      } = NRadioGroup;
      const {
        value
      } = props;
      call(doUpdateValue, value);
    } else {
      const {
        onUpdateChecked,
        'onUpdate:checked': _onUpdateChecked
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onUpdateChecked) call(onUpdateChecked, true);
      if (_onUpdateChecked) call(_onUpdateChecked, true);
      nTriggerFormInput();
      nTriggerFormChange();
      uncontrolledCheckedRef.value = true;
    }
  }
  function toggle() {
    if (mergedDisabledRef.value) return;
    if (!renderSafeCheckedRef.value) {
      doUpdateChecked();
    }
  }
  function handleRadioInputChange() {
    toggle();
    // Restore element check prop's value to current state, since if doesn't
    // reflect current VNode. If not, bug will happens in component with element
    // that has internal state such as <input />.
    if (inputRef.value) {
      inputRef.value.checked = renderSafeCheckedRef.value;
    }
  }
  function handleRadioInputBlur() {
    focusRef.value = false;
  }
  function handleRadioInputFocus() {
    focusRef.value = true;
  }
  return {
    mergedClsPrefix: NRadioGroup ? NRadioGroup.mergedClsPrefixRef : mergedClsPrefixRef,
    inputRef,
    labelRef,
    mergedName: mergedNameRef,
    mergedDisabled: mergedDisabledRef,
    renderSafeChecked: renderSafeCheckedRef,
    focus: focusRef,
    mergedSize: mergedSizeRef,
    handleRadioInputChange,
    handleRadioInputBlur,
    handleRadioInputFocus
  };
}
export { setup };