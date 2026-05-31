import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DataTableRenderSorter',
  props: {
    render: {
      type: Function,
      required: true
    },
    order: {
      // asc, desc
      type: [String, Boolean],
      default: false
    }
  },
  render() {
    const {
      render,
      order
    } = this;
    return render({
      order
    });
  }
});