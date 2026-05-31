import { computed, defineComponent, h, inject } from 'vue';
import { formatLength, keysOf, throwError } from "../../_utils/index.mjs";
import { rowInjectionKey } from "./Row.mjs";
export const colProps = {
  span: {
    type: [String, Number],
    default: 1
  },
  push: {
    type: [String, Number],
    default: 0
  },
  pull: {
    type: [String, Number],
    default: 0
  },
  offset: {
    type: [String, Number],
    default: 0
  }
};
export const colPropKeys = keysOf(colProps);
export default defineComponent({
  name: 'Col',
  props: colProps,
  setup(props) {
    const NRow = inject(rowInjectionKey, null);
    if (!NRow) throwError('col', '`n-col` must be placed inside `n-row`.');
    return {
      mergedClsPrefix: NRow.mergedClsPrefixRef,
      gutter: NRow.gutterRef,
      stylePadding: computed(() => `${formatLength(NRow.verticalGutterRef.value, {
        c: 0.5
      })} ${formatLength(NRow.horizontalGutterRef.value, {
        c: 0.5
      })}`),
      mergedPush: computed(() => Number(props.push) - Number(props.pull))
    };
  },
  render() {
    const {
      $slots,
      span,
      mergedPush,
      offset,
      stylePadding,
      gutter,
      mergedClsPrefix
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-col`, {
        [`${mergedClsPrefix}-col--${span}-span`]: true,
        [`${mergedClsPrefix}-col--${mergedPush}-push`]: mergedPush > 0,
        [`${mergedClsPrefix}-col--${-mergedPush}-pull`]: mergedPush < 0,
        [`${mergedClsPrefix}-col--${offset}-offset`]: offset
      }],
      style: {
        padding: stylePadding
      }
    }, gutter ? h("div", null, $slots) : $slots);
  }
});