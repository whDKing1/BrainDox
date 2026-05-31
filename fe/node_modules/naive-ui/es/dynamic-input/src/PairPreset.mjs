import { defineComponent, h, inject } from 'vue';
import { NInput } from "../../input/index.mjs";
import { dynamicInputInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'DynamicInputPairPreset',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: Object,
      default: () => ({
        key: '',
        value: ''
      })
    },
    disabled: Boolean,
    parentPath: String,
    path: String,
    onUpdateValue: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const {
      mergedThemeRef,
      keyPlaceholderRef,
      valuePlaceholderRef
    } = inject(dynamicInputInjectionKey);
    return {
      mergedTheme: mergedThemeRef,
      keyPlaceholder: keyPlaceholderRef,
      valuePlaceholder: valuePlaceholderRef,
      handleKeyInput(key) {
        props.onUpdateValue({
          key,
          value: props.value.value
        });
      },
      handleValueInput(value) {
        props.onUpdateValue({
          key: props.value.key,
          value
        });
      }
    };
  },
  render() {
    const {
      mergedTheme,
      keyPlaceholder,
      valuePlaceholder,
      value,
      clsPrefix,
      disabled
    } = this;
    return h("div", {
      class: `${clsPrefix}-dynamic-input-preset-pair`
    }, h(NInput, {
      theme: mergedTheme.peers.Input,
      "theme-overrides": mergedTheme.peerOverrides.Input,
      value: value.key,
      class: `${clsPrefix}-dynamic-input-pair-input`,
      placeholder: keyPlaceholder,
      onUpdateValue: this.handleKeyInput,
      disabled: disabled
    }), h(NInput, {
      theme: mergedTheme.peers.Input,
      "theme-overrides": mergedTheme.peerOverrides.Input,
      value: value.value,
      class: `${clsPrefix}-dynamic-input-pair-input`,
      placeholder: valuePlaceholder,
      onUpdateValue: this.handleValueInput,
      disabled: disabled
    }));
  }
});