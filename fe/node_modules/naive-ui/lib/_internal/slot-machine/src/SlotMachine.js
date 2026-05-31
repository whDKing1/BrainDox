"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const fade_in_expand_transition_1 = __importDefault(require("../../fade-in-expand-transition"));
const SlotMachineNumber_1 = __importDefault(require("./SlotMachineNumber"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseSlotMachine',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        value: {
            type: [Number, String],
            default: 0
        },
        max: {
            type: Number,
            default: undefined
        },
        appeared: {
            type: Boolean,
            required: true
        }
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-slot-machine', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
        const oldValueRef = (0, vue_1.ref)();
        const newValueRef = (0, vue_1.ref)();
        const numbersRef = (0, vue_1.computed)(() => {
            if (typeof props.value === 'string')
                return [];
            if (props.value < 1)
                return [0];
            const numbers = [];
            let value = props.value;
            if (props.max !== undefined) {
                value = Math.min(props.max, value);
            }
            while (value >= 1) {
                numbers.push(value % 10);
                value /= 10;
                value = Math.floor(value);
            }
            numbers.reverse();
            return numbers;
        });
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'value'), (value, oldValue) => {
            if (typeof value === 'string') {
                newValueRef.value = undefined;
                oldValueRef.value = undefined;
            }
            else {
                if (typeof oldValue === 'string') {
                    newValueRef.value = value;
                    oldValueRef.value = undefined;
                }
                else {
                    newValueRef.value = value;
                    oldValueRef.value = oldValue;
                }
            }
        });
        return () => {
            const { value, clsPrefix } = props;
            return typeof value === 'number' ? ((0, vue_1.h)("span", { class: `${clsPrefix}-base-slot-machine` },
                (0, vue_1.h)(vue_1.TransitionGroup, { name: "fade-up-width-expand-transition", tag: "span" }, {
                    default: () => numbersRef.value.map((number, i) => ((0, vue_1.h)(SlotMachineNumber_1.default, { clsPrefix: clsPrefix, key: numbersRef.value.length - i - 1, oldOriginalNumber: oldValueRef.value, newOriginalNumber: newValueRef.value, value: number })))
                }),
                (0, vue_1.h)(fade_in_expand_transition_1.default, { key: "+", width: true }, {
                    default: () => props.max !== undefined && props.max < value ? ((0, vue_1.h)(SlotMachineNumber_1.default, { clsPrefix: clsPrefix, value: "+" })) : null
                }))) : ((0, vue_1.h)("span", { class: `${clsPrefix}-base-slot-machine` }, value));
        };
    }
});
