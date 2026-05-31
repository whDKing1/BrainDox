"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const input_1 = require("../../input");
const ColorInputUnit_1 = __importDefault(require("./ColorInputUnit"));
exports.default = (0, vue_1.defineComponent)({
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
                const { showAlpha } = props;
                if (props.mode === 'hex') {
                    props.onUpdateValue((showAlpha ? seemly_1.toHexaString : seemly_1.toHexString)(value));
                    return;
                }
                let nextValueArr;
                if (props.valueArr === null) {
                    nextValueArr = [0, 0, 0, 0];
                }
                else {
                    nextValueArr = Array.from(props.valueArr);
                }
                switch (props.mode) {
                    case 'hsv':
                        nextValueArr[index] = value;
                        props.onUpdateValue((showAlpha ? seemly_1.toHsvaString : seemly_1.toHsvString)(nextValueArr));
                        break;
                    case 'rgb':
                        nextValueArr[index] = value;
                        props.onUpdateValue((showAlpha ? seemly_1.toRgbaString : seemly_1.toRgbString)(nextValueArr));
                        break;
                    case 'hsl':
                        nextValueArr[index] = value;
                        props.onUpdateValue((showAlpha ? seemly_1.toHslaString : seemly_1.toHslString)(nextValueArr));
                        break;
                }
            }
        };
    },
    render() {
        const { clsPrefix, modes } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-input` },
            (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-input__mode`, onClick: this.onUpdateMode, style: {
                    cursor: modes.length === 1 ? '' : 'pointer'
                } }, this.mode.toUpperCase() + (this.showAlpha ? 'A' : '')),
            (0, vue_1.h)(input_1.NInputGroup, null, {
                default: () => {
                    const { mode, valueArr, showAlpha } = this;
                    if (mode === 'hex') {
                        // hex and rgba shares the same value arr
                        let hexValue = null;
                        try {
                            hexValue
                                = valueArr === null
                                    ? null
                                    : (showAlpha ? seemly_1.toHexaString : seemly_1.toHexString)(valueArr);
                        }
                        catch (_a) { }
                        return ((0, vue_1.h)(ColorInputUnit_1.default, { label: "HEX", showAlpha: showAlpha, value: hexValue, onUpdateValue: (unitValue) => {
                                this.handleUnitUpdateValue(0, unitValue);
                            } }));
                    }
                    return (mode + (showAlpha ? 'a' : '')).split('').map((v, i) => ((0, vue_1.h)(ColorInputUnit_1.default, { label: v.toUpperCase(), value: valueArr === null ? null : valueArr[i], onUpdateValue: (unitValue) => {
                            this.handleUnitUpdateValue(i, unitValue);
                        } })));
                }
            })));
    }
});
