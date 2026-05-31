import { defineComponent, h, ref } from 'vue';
import { keep } from "../../_utils/index.mjs";
import NRow, { rowPropKeys, rowProps } from "../../legacy-grid/src/Row.mjs";
import NFormItemCol, { formItemColPropKeys, formItemColProps } from "./FormItemCol.mjs";
export const formItemRowProps = Object.assign(Object.assign({}, rowProps), formItemColProps);
export default defineComponent({
  name: 'FormItemRow',
  props: formItemRowProps,
  setup() {
    const formItemColInstRef = ref(null);
    const validate = (...args) => {
      const {
        value
      } = formItemColInstRef;
      if (value) {
        return value.validate(...args);
      }
    };
    const restoreValidation = () => {
      const {
        value
      } = formItemColInstRef;
      if (value) {
        value.restoreValidation();
      }
    };
    return {
      formItemColInstRef,
      validate,
      restoreValidation
    };
  },
  render() {
    return h(NRow, keep(this.$props, rowPropKeys), {
      default: () => {
        const colProps = keep(this.$props, formItemColPropKeys);
        return h(NFormItemCol, Object.assign(Object.assign({
          ref: 'formItemColInstRef'
        }, colProps), {
          span: 24
        }), this.$slots);
      }
    });
  }
});