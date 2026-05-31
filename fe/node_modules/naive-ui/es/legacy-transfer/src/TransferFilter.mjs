import { defineComponent, h, inject } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { SearchIcon } from "../../_internal/icons/index.mjs";
import { NInput } from "../../input/index.mjs";
import { transferInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'TransferFilter',
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    onFocus: {
      type: Function,
      required: true
    },
    onBlur: {
      type: Function,
      required: true
    },
    onUpdateValue: {
      type: Function,
      required: true
    }
  },
  setup() {
    const {
      mergedThemeRef,
      mergedClsPrefixRef
    } = inject(transferInjectionKey);
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: mergedThemeRef
    };
  },
  render() {
    const {
      mergedTheme,
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-legacy-transfer-filter`
    }, h(NInput, {
      value: this.value,
      onUpdateValue: this.onUpdateValue,
      disabled: this.disabled,
      theme: mergedTheme.peers.Input,
      themeOverrides: mergedTheme.peerOverrides.Input,
      clearable: true,
      size: "small",
      placeholder: this.placeholder,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    }, {
      'clear-icon-placeholder': () => h(NBaseIcon, {
        clsPrefix: mergedClsPrefix,
        class: `${mergedClsPrefix}-legacy-transfer-icon`
      }, {
        default: () => h(SearchIcon, null)
      })
    }));
  }
});