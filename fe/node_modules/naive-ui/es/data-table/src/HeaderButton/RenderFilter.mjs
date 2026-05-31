import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DataTableRenderFilter',
  props: {
    render: {
      type: Function,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  render() {
    const {
      render,
      active,
      show
    } = this;
    return render({
      active,
      show
    });
  }
});