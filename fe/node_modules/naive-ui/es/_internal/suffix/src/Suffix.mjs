import { defineComponent, h } from 'vue';
import { resolveSlot } from "../../../_utils/vue/index.mjs";
import NBaseClear from "../../clear/index.mjs";
import { NBaseIcon } from "../../icon/index.mjs";
import { ChevronDownIcon } from "../../icons/index.mjs";
import NBaseLoading from "../../loading/index.mjs";
export default defineComponent({
  name: 'InternalSelectionSuffix',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    showArrow: {
      type: Boolean,
      default: undefined
    },
    showClear: {
      type: Boolean,
      default: undefined
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClear: Function
  },
  setup(props, {
    slots
  }) {
    return () => {
      const {
        clsPrefix
      } = props;
      return h(NBaseLoading, {
        clsPrefix: clsPrefix,
        class: `${clsPrefix}-base-suffix`,
        strokeWidth: 24,
        scale: 0.85,
        show: props.loading
      }, {
        default: () => props.showArrow ? h(NBaseClear, {
          clsPrefix: clsPrefix,
          show: props.showClear,
          onClear: props.onClear
        }, {
          placeholder: () => h(NBaseIcon, {
            clsPrefix: clsPrefix,
            class: `${clsPrefix}-base-suffix__arrow`
          }, {
            default: () => resolveSlot(slots.default, () => [h(ChevronDownIcon, null)])
          })
        }) : null
      });
    };
  }
});