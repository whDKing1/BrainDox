import { toHslaString } from 'seemly';
import { defineComponent, h, inject } from 'vue';
import { colorPickerInjectionKey } from "./context.mjs";
import { getWCAGContrast } from "./utils.mjs";
export default defineComponent({
  name: 'ColorPickerTrigger',
  slots: Object,
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    },
    hsla: {
      type: Array,
      default: null
    },
    disabled: Boolean,
    onClick: Function
  },
  setup(props) {
    const {
      colorPickerSlots,
      renderLabelRef
    } = inject(colorPickerInjectionKey, null);
    return () => {
      const {
        hsla,
        value,
        clsPrefix,
        onClick,
        disabled
      } = props;
      const renderLabel = colorPickerSlots.label || renderLabelRef.value;
      return h("div", {
        class: [`${clsPrefix}-color-picker`, disabled && `${clsPrefix}-color-picker--disabled`],
        onClick: disabled ? undefined : onClick
      }, h("div", {
        class: `${clsPrefix}-color-picker__fill`
      }, h("div", {
        class: `${clsPrefix}-color-picker-checkboard`
      }), h("div", {
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: hsla ? toHslaString(hsla) : ''
        }
      }), value && hsla ? h("div", {
        class: `${clsPrefix}-color-picker__value`,
        style: {
          color: getWCAGContrast(hsla) ? 'white' : 'black'
        }
      }, renderLabel ? renderLabel(value) : value) : null));
    };
  }
});