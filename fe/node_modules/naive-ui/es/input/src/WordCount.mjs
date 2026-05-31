import { computed, defineComponent, h, inject } from 'vue';
import { resolveSlotWithTypedProps } from "../../_utils/index.mjs";
import { inputInjectionKey } from "./interface.mjs";
import { len } from "./utils.mjs";
export default defineComponent({
  name: 'InputWordCount',
  setup(_, {
    slots
  }) {
    const {
      mergedValueRef,
      maxlengthRef,
      mergedClsPrefixRef,
      countGraphemesRef
    } = inject(inputInjectionKey);
    const wordCountRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (mergedValue === null || Array.isArray(mergedValue)) return 0;
      return (countGraphemesRef.value || len)(mergedValue);
    });
    return () => {
      const {
        value: maxlength
      } = maxlengthRef;
      const {
        value: mergedValue
      } = mergedValueRef;
      return h("span", {
        class: `${mergedClsPrefixRef.value}-input-word-count`
      }, resolveSlotWithTypedProps(slots.default, {
        value: mergedValue === null || Array.isArray(mergedValue) ? '' : mergedValue
      }, () => [maxlength === undefined ? wordCountRef.value : `${wordCountRef.value} / ${maxlength}`]));
    };
  }
});