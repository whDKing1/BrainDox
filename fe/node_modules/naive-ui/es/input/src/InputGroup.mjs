import { defineComponent, h } from 'vue';
import { useConfig, useStyle } from "../../_mixins/index.mjs";
import style from "./styles/input-group.cssr.mjs";
export const inputGroupProps = {};
export default defineComponent({
  name: 'InputGroup',
  props: inputGroupProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    useStyle('-input-group', style, mergedClsPrefixRef);
    return {
      mergedClsPrefix: mergedClsPrefixRef
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-input-group`
    }, this.$slots);
  }
});