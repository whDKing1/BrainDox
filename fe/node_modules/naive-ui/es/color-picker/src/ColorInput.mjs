import { toHexaString, toHexString, toHslaString, toHslString, toHsvaString, toHsvString, toRgbaString, toRgbString } from 'seemly';
import { defineComponent, h } from 'vue';
import { NInputGroup } from "../../input/index.mjs";
import ColorInputUnit from "./ColorInputUnit.mjs";
export default defineComponent({
  name: 'ColorInput',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    mode: {
      type: String,
      required: true
    },
    modes: {
      type: Array,
      required: true
    },
    showAlpha: {
      type: Boolean,
      required: true
    },
    value: {
      // for hex to get percise value
      type: String,
      default: null
    },
    valueArr: {
      type: Array,
      default: null
    },
    onUpdateValue: {
      type: Function,
      required: true
    },
    onUpdateMode: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    return {
      handleUnitUpdateValue(index, value) {
        const {
          showAlpha
        } = props;
        if (props.mode === 'hex') {
          props.onUpdateValue((showAlpha ? toHexaString : toHexString)(value));
          return;
        }
        let nextValueArr;
        if (props.valueArr === null) {
          nextValueArr = [0, 0, 0, 0];
        } else {
          nextValueArr = Array.from(props.valueArr);
        }
        switch (props.mode) {
          case 'hsv':
            nextValueArr[index] = value;
            props.onUpdateValue((showAlpha ? toHsvaString : toHsvString)(nextValueArr));
            break;
          case 'rgb':
            nextValueArr[index] = value;
            props.onUpdateValue((showAlpha ? toRgbaString : toRgbString)(nextValueArr));
            break;
          case 'hsl':
            nextValueArr[index] = value;
            props.onUpdateValue((showAlpha ? toHslaString : toHslString)(nextValueArr));
            break;
        }
      }
    };
  },
  render() {
    const {
      clsPrefix,
      modes
    } = this;
    return h("div", {
      class: `${clsPrefix}-color-picker-input`
    }, h("div", {
      class: `${clsPrefix}-color-picker-input__mode`,
      onClick: this.onUpdateMode,
      style: {
        cursor: modes.length === 1 ? '' : 'pointer'
      }
    }, this.mode.toUpperCase() + (this.showAlpha ? 'A' : '')), h(NInputGroup, null, {
      default: () => {
        const {
          mode,
          valueArr,
          showAlpha
        } = this;
        if (mode === 'hex') {
          // hex and rgba shares the same value arr
          let hexValue = null;
          try {
            hexValue = valueArr === null ? null : (showAlpha ? toHexaString : toHexString)(valueArr);
          } catch (_a) {}
          return h(ColorInputUnit, {
            label: "HEX",
            showAlpha: showAlpha,
            value: hexValue,
            onUpdateValue: unitValue => {
              this.handleUnitUpdateValue(0, unitValue);
            }
          });
        }
        return (mode + (showAlpha ? 'a' : '')).split('').map((v, i) => h(ColorInputUnit, {
          label: v.toUpperCase(),
          value: valueArr === null ? null : valueArr[i],
          onUpdateValue: unitValue => {
            this.handleUnitUpdateValue(i, unitValue);
          }
        }));
      }
    }));
  }
});