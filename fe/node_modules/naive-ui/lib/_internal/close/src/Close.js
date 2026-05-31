"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const icon_1 = require("../../icon");
const icons_1 = require("../../icons");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseClose',
    props: {
        isButtonTag: {
            type: Boolean,
            default: true
        },
        clsPrefix: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: undefined
        },
        focusable: {
            type: Boolean,
            default: true
        },
        round: Boolean,
        onClick: Function,
        absolute: Boolean
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-close', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
        return () => {
            const { clsPrefix, disabled, absolute, round, isButtonTag } = props;
            const Tag = isButtonTag ? 'button' : 'div';
            return ((0, vue_1.h)(Tag, { type: isButtonTag ? 'button' : undefined, tabindex: disabled || !props.focusable ? -1 : 0, "aria-disabled": disabled, "aria-label": "close", role: isButtonTag ? undefined : 'button', disabled: disabled, class: [
                    `${clsPrefix}-base-close`,
                    absolute && `${clsPrefix}-base-close--absolute`,
                    disabled && `${clsPrefix}-base-close--disabled`,
                    round && `${clsPrefix}-base-close--round`
                ], onMousedown: (e) => {
                    if (!props.focusable) {
                        e.preventDefault();
                    }
                }, onClick: props.onClick },
                (0, vue_1.h)(icon_1.NBaseIcon, { clsPrefix: clsPrefix }, {
                    default: () => (0, vue_1.h)(icons_1.CloseIcon, null)
                })));
        };
    }
});
