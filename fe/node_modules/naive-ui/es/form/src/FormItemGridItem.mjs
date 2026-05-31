import { defineComponent, h, ref } from 'vue';
import { keep, keysOf } from "../../_utils/index.mjs";
import NGridItem, { gridItemPropKeys, gridItemProps } from "../../grid/src/GridItem.mjs";
import NFormItem, { formItemPropKeys, formItemProps } from "./FormItem.mjs";
export const formItemGiProps = Object.assign(Object.assign({}, gridItemProps), formItemProps);
export const formItemGiPropKeys = keysOf(formItemGiProps);
export default defineComponent({
  __GRID_ITEM__: true,
  name: 'FormItemGridItem',
  alias: ['FormItemGi'],
  props: formItemGiProps,
  slots: Object,
  setup() {
    const formItemInstRef = ref(null);
    const validate = (...args) => {
      const {
        value
      } = formItemInstRef;
      if (value) {
        return value.validate(...args);
      }
    };
    const restoreValidation = () => {
      const {
        value
      } = formItemInstRef;
      if (value) {
        value.restoreValidation();
      }
    };
    return {
      formItemInstRef,
      validate,
      restoreValidation
    };
  },
  render() {
    return h(NGridItem, keep(this.$.vnode.props || {}, gridItemPropKeys), {
      default: () => {
        const itemProps = keep(this.$props, formItemPropKeys);
        return h(NFormItem, Object.assign({
          ref: 'formItemInstRef'
        }, itemProps), this.$slots);
      }
    });
  }
});