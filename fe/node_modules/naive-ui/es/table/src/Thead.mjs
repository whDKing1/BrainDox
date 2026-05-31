import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Thead',
  render() {
    return h("thead", null, this.$slots);
  }
});