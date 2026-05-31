import { defineComponent, h } from 'vue';
import { convertColor, getModeFromValue } from "./utils.mjs";
export default defineComponent({
  name: 'ColorPreview',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: null,
      validator: value => {
        const mode = getModeFromValue(value);
        return Boolean(!value || mode && mode !== 'hsv');
      }
    },
    onUpdateColor: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    function handleChange(e) {
      var _a;
      // hex
      const value = e.target.value;
      (_a = props.onUpdateColor) === null || _a === void 0 ? void 0 : _a.call(props, convertColor(value.toUpperCase(), props.mode, 'hex'));
      e.stopPropagation();
    }
    return {
      handleChange
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-color-picker-preview__preview`
    }, h("span", {
      class: `${clsPrefix}-color-picker-preview__fill`,
      style: {
        background: this.color || '#000000'
      }
    }), h("input", {
      class: `${clsPrefix}-color-picker-preview__input`,
      type: "color",
      value: this.color,
      onChange: this.handleChange
    }));
  }
});