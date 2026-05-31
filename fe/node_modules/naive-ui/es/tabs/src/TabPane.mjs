import { defineComponent, h, inject, watchEffect } from 'vue';
import { throwError, warnOnce } from "../../_utils/index.mjs";
import { tabsInjectionKey } from "./interface.mjs";
export const tabPaneProps = {
  tab: [String, Number, Object, Function],
  name: {
    type: [String, Number],
    required: true
  },
  disabled: Boolean,
  displayDirective: {
    type: String,
    default: 'if'
  },
  closable: {
    type: Boolean,
    default: undefined
  },
  tabProps: Object,
  /** @deprecated */
  label: [String, Number, Object, Function]
};
export default defineComponent({
  __TAB_PANE__: true,
  name: 'TabPane',
  alias: ['TabPanel'],
  props: tabPaneProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.label !== undefined) {
          warnOnce('tab-pane', '`label` is deprecated, please use `tab` instead.');
        }
      });
    }
    const NTab = inject(tabsInjectionKey, null);
    if (!NTab) {
      throwError('tab-pane', '`n-tab-pane` must be placed inside `n-tabs`.');
    }
    return {
      style: NTab.paneStyleRef,
      class: NTab.paneClassRef,
      mergedClsPrefix: NTab.mergedClsPrefixRef
    };
  },
  render() {
    return h("div", {
      class: [`${this.mergedClsPrefix}-tab-pane`, this.class],
      style: this.style
    }, this.$slots);
  }
});