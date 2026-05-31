import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'DropdownDivider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  render() {
    return h("div", {
      class: `${this.clsPrefix}-dropdown-divider`
    });
  }
});