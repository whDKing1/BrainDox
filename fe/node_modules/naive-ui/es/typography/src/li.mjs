import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'Li',
  render() {
    return h("li", null, this.$slots);
  }
});