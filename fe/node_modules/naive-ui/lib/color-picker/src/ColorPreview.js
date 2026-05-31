"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
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
            validator: (value) => {
                const mode = (0, utils_1.getModeFromValue)(value);
                return Boolean(!value || (mode && mode !== 'hsv'));
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
            (_a = props.onUpdateColor) === null || _a === void 0 ? void 0 : _a.call(props, (0, utils_1.convertColor)(value.toUpperCase(), props.mode, 'hex'));
            e.stopPropagation();
        }
        return {
            handleChange
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-preview__preview` },
            (0, vue_1.h)("span", { class: `${clsPrefix}-color-picker-preview__fill`, style: {
                    background: this.color || '#000000'
                } }),
            (0, vue_1.h)("input", { class: `${clsPrefix}-color-picker-preview__input`, type: "color", value: this.color, onChange: this.handleChange })));
    }
});
