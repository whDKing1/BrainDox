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
      class: `${mergedClsPrefix}-transfer-filter`
    }, h(NInput, {
      value: this.value,
      onUpdateValue: this.onUpdateValue,
      disabled: this.disabled,
      placeholder: this.placeholder,
      theme: mergedTheme.peers.Input,
      themeOverrides: mergedTheme.peerOverrides.Input,
      clearable: true,
      size: "small"
    }, {
      'clear-icon-placeholder': () => h(NBaseIcon, {
        clsPrefix: mergedClsPrefix
      }, {
        default: () => h(SearchIcon, null)
      })
    }));
  }
});