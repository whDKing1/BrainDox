import { defineComponent, h } from 'vue';
export default defineComponent({
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
      onClick: this.onClick,
      class: `${clsPrefix}-layout-toggle-bar`
    }, h("div", {
      class: `${clsPrefix}-layout-toggle-bar__top`
    }), h("div", {
      class: `${clsPrefix}-layout-toggle-bar__bottom`
    }));
  }
});