import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Td',
  render() {
    return h("td", null, this.$slots);
  }
});