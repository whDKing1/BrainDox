"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const vue_2 = require("../../../_utils/vue");
const clear_1 = __importDefault(require("../../clear"));
const icon_1 = require("../../icon");
const icons_1 = require("../../icons");
const loading_1 = __importDefault(require("../../loading"));
exports.default = (0, vue_1.defineComponent)({
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
    setup(props, { slots }) {
        return () => {
            const { clsPrefix } = props;
            return ((0, vue_1.h)(loading_1.default, { clsPrefix: clsPrefix, class: `${clsPrefix}-base-suffix`, strokeWidth: 24, scale: 0.85, show: props.loading }, {
                default: () => props.showArrow ? ((0, vue_1.h)(clear_1.default, { clsPrefix: clsPrefix, show: props.showClear, onClear: props.onClear }, {
                    placeholder: () => ((0, vue_1.h)(icon_1.NBaseIcon, { clsPrefix: clsPrefix, class: `${clsPrefix}-base-suffix__arrow` }, {
                        default: () => (0, vue_2.resolveSlot)(slots.default, () => [
                            (0, vue_1.h)(icons_1.ChevronDownIcon, null)
                        ])
                    }))
                })) : null
            }));
        };
    }
});
