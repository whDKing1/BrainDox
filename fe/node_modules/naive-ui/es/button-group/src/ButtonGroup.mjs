import { defineComponent, h, provide } from 'vue';
import { useConfig, useStyle } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { buttonGroupInjectionKey } from "./context.mjs";
import style from "./styles/index.cssr.mjs";
export const buttonGroupProps = {
  size: String,
  vertical: Boolean
};
export default defineComponent({
  name: 'ButtonGroup',
  props: buttonGroupProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    useStyle('-button-group', style, mergedClsPrefixRef);
    provide(buttonGroupInjectionKey, props);
    const rtlEnabledRef = useRtl('ButtonGroup', mergedRtlRef, mergedClsPrefixRef);
    return {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-button-group`, this.rtlEnabled && `${mergedClsPrefix}-button-group--rtl`, this.vertical && `${mergedClsPrefix}-button-group--vertical`],
      role: "group"
    }, this.$slots);
  }
});