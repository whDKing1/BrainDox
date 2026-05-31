import { defineComponent } from 'vue';
import { DESCRIPTION_ITEM_FLAG } from "./utils.mjs";
export const descriptionsItemProps = {
  label: String,
  span: {
    type: Number,
    default: 1
  },
  labelClass: String,
  labelStyle: [Object, String],
  contentClass: String,
  contentStyle: [Object, String]
};
export default defineComponent({
  name: 'DescriptionsItem',
  [DESCRIPTION_ITEM_FLAG]: true,
  props: descriptionsItemProps,
  slots: Object,
  render() {
    return null;
  }
});