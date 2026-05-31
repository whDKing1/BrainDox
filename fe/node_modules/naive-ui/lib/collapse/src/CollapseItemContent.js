"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
exports.default = (0, vue_1.defineComponent)({
    name: 'CollapseItemContent',
    props: {
        displayDirective: {
            type: String,
            required: true
        },
        show: Boolean,
        clsPrefix: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const onceTrueRef = (0, vooks_1.useFalseUntilTruthy)((0, vue_1.toRef)(props, 'show'));
        return {
            onceTrue: onceTrueRef
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, null, {
            default: () => {
                const { show, displayDirective, onceTrue, clsPrefix } = this;
                const useVShow = displayDirective === 'show' && onceTrue;
                const contentNode = ((0, vue_1.h)("div", { class: `${clsPrefix}-collapse-item__content-wrapper` },
                    (0, vue_1.h)("div", { class: `${clsPrefix}-collapse-item__content-inner` }, this.$slots)));
                return useVShow
                    ? (0, vue_1.withDirectives)(contentNode, [[vue_1.vShow, show]])
                    : show
                        ? contentNode
                        : null;
            }
        }));
    }
});
