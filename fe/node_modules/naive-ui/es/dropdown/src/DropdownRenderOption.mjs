import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'DropdownRenderOption',
  props: {
    tmNode: {
      type: Object,
      required: true
    }
  },
  render() {
    const {
      rawNode: {
        render,
        props
      }
    } = this.tmNode;
    return h('div', props, [render === null || render === void 0 ? void 0 : render()]);
  }
});