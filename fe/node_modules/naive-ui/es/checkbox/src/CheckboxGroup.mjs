import { useMergedState } from 'vooks';
import { computed, defineComponent, h, provide, ref, toRef, watchEffect } from 'vue';
import { useConfig, useFormItem } from "../../_mixins/index.mjs";
import { call, createInjectionKey, warnOnce } from "../../_utils/index.mjs";
export const checkboxGroupInjectionKey = createInjectionKey('n-checkbox-group');
export const checkboxGroupProps = {
  min: Number,
  max: Number,
  size: String,
  value: Array,
  defaultValue: {
    type: Array,
    default: null
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  // deprecated
  onChange: [Function, Array]
};
export default defineComponent({
  name: 'CheckboxGroup',
  props: checkboxGroupProps,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warnOnce('checkbox-group', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
      });
    }
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const formItem = useFormItem(props);
    const {
      mergedSizeRef,
      mergedDisabledRef
    } = formItem;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = computed(() => props.value);
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const checkedCount = computed(() => {
      var _a;
      return ((_a = mergedValueRef.value) === null || _a === void 0 ? void 0 : _a.length) || 0;
    });
    const valueSetRef = computed(() => {
      if (Array.isArray(mergedValueRef.value)) {
        return new Set(mergedValueRef.value);
      }
      return new Set();
    });
    function toggleCheckbox(checked, checkboxValue) {
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      const {
        onChange,
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props;
      if (Array.isArray(mergedValueRef.value)) {
        const groupValue = Array.from(mergedValueRef.value);
        const index = groupValue.findIndex(value => value === checkboxValue);
        if (checked) {
          if (!~index) {
            groupValue.push(checkboxValue);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: 'check',
                value: checkboxValue
              });
            }
            nTriggerFormInput();
            nTriggerFormChange();
            uncontrolledValueRef.value = groupValue;
            // deprecated
            if (onChange) call(onChange, groupValue);
          }
        } else {
          if (~index) {
            groupValue.splice(index, 1);
            if (onUpdateValue) {
              call(onUpdateValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              });
            }
            if (_onUpdateValue) {
              call(_onUpdateValue, groupValue, {
                actionType: 'uncheck',
                value: checkboxValue
              });
            }
            if (onChange) call(onChange, groupValue); // deprecated
            uncontrolledValueRef.value = groupValue;
            nTriggerFormInput();
            nTriggerFormChange();
          }
        }
      } else {
        if (checked) {
          if (onUpdateValue) {
            call(onUpdateValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [checkboxValue], {
              actionType: 'check',
              value: checkboxValue
            });
          }
          if (onChange) call(onChange, [checkboxValue]); // deprecated
          uncontrolledValueRef.value = [checkboxValue];
          nTriggerFormInput();
          nTriggerFormChange();
        } else {
          if (onUpdateValue) {
            call(onUpdateValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            });
          }
          if (_onUpdateValue) {
            call(_onUpdateValue, [], {
              actionType: 'uncheck',
              value: checkboxValue
            });
          }
          if (onChange) call(onChange, []); // deprecated
          uncontrolledValueRef.value = [];
          nTriggerFormInput();
          nTriggerFormChange();
        }
      }
    }
    provide(checkboxGroupInjectionKey, {
      checkedCountRef: checkedCount,
      maxRef: toRef(props, 'max'),
      minRef: toRef(props, 'min'),
      valueSetRef,
      disabledRef: mergedDisabledRef,
      mergedSizeRef,
      toggleCheckbox
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef
    };
  },
  render() {
    return h("div", {
      class: `${this.mergedClsPrefix}-checkbox-group`,
      role: "group"
    }, this.$slots);
  }
});