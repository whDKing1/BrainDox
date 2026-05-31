import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Tr',
  render() {
    return h("tr", null, this.$slots);
  }
});