import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Tbody',
  render() {
    return h("tbody", null, this.$slots);
  }
});