import { hsv2rgb, hsva, toRgbaString } from 'seemly';
import { computed, defineComponent, h } from 'vue';
import { warn } from "../../_utils/index.mjs";
import { convertColor, getModeFromValue } from "./utils.mjs";
// Try to normalize the color values to ensure that they are valid CSS colors
function normalizeColor(color, mode) {
  if (mode === 'hsv') {
    const [h, s, v, a] = hsva(color);
    return toRgbaString([...hsv2rgb(h, s, v), a]);
  }
  // For the mode that is not in preset, we keep the original value.
  // For color names, they are legal to CSS, so we don’t deal with them,
  // and only standardize them when outputting.
  return color;
}
function getHexFromName(color) {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) {
    return '#000000';
  }
  ctx.fillStyle = color;
  return ctx.fillStyle;
}
export default defineComponent({
  name: 'ColorPickerSwatches',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    swatches: {
      type: Array,
      required: true
    },
    onUpdateColor: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const parsedSwatchesRef = computed(() => props.swatches.map(value => {
      const mode = getModeFromValue(value);
      return {
        value,
        mode,
        legalValue: normalizeColor(value, mode)
      };
    }));
    function normalizeOutput(parsed) {
      const {
        mode: modeProp
      } = props;
      let {
        value,
        mode: swatchColorMode
      } = parsed;
      // color name is converted to hex
      if (!swatchColorMode) {
        swatchColorMode = 'hex';
        if (/^[a-zA-Z]+$/.test(value)) {
          value = getHexFromName(value);
        } else {
          // for invalid color, we make it black
          warn('color-picker', `color ${value} in swatches is invalid.`);
          value = '#000000';
        }
      }
      if (swatchColorMode === modeProp) return value;
      // swatch value to current mode value
      return convertColor(value, modeProp, swatchColorMode);
    }
    function handleSwatchSelect(parsed) {
      props.onUpdateColor(normalizeOutput(parsed));
    }
    function handleSwatchKeyDown(e, parsed) {
      if (e.key === 'Enter') handleSwatchSelect(parsed);
    }
    return {
      parsedSwatchesRef,
      handleSwatchSelect,
      handleSwatchKeyDown
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-color-picker-swatches`
    }, this.parsedSwatchesRef.map(swatch => h("div", {
      class: `${clsPrefix}-color-picker-swatch`,
      tabindex: 0,
      onClick: () => {
        this.handleSwatchSelect(swatch);
      },
      onKeydown: e => {
        this.handleSwatchKeyDown(e, swatch);
      }
    }, h("div", {
      class: `${clsPrefix}-color-picker-swatch__fill`,
      style: {
        background: swatch.legalValue
      }
    }))));
  }
});