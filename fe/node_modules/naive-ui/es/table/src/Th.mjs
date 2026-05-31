import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Th',
  render() {
    return h("th", null, this.$slots);
  }
});