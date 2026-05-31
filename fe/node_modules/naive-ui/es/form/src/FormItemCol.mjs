import { defineComponent, h, ref } from 'vue';
import { keep, keysOf } from "../../_utils/index.mjs";
import NCol, { colPropKeys, colProps } from "../../legacy-grid/src/Col.mjs";
import NFormItem, { formItemPropKeys, formItemProps } from "./FormItem.mjs";
export const formItemColProps = Object.assign(Object.assign({}, colProps), formItemProps);
export const formItemColPropKeys = keysOf(formItemColProps);
export default defineComponent({
  name: 'FormItemCol',
  props: formItemColProps,
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
    return h(NCol, keep(this.$props, colPropKeys), {
      default: () => {
        const itemProps = keep(this.$props, formItemPropKeys);
        return h(NFormItem, Object.assign({
          ref: 'formItemInstRef'
        }, itemProps), this.$slots);
      }
    });
  }
});