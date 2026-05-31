import { defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ChevronRightIcon } from "../../_internal/icons/index.mjs";
export default defineComponent({
  name: 'LayoutToggleButton',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    onClick: Function
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-layout-toggle-button`,
      onClick: this.onClick
    }, h(NBaseIcon, {
      clsPrefix: clsPrefix
    }, {
      default: () => h(ChevronRightIcon, null)
    }));
  }
});