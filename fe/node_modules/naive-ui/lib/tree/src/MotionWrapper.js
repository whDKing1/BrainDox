"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const fade_in_expand_transition_1 = __importDefault(require("../../_internal/fade-in-expand-transition"));
const TreeNode_1 = __importDefault(require("./TreeNode"));
exports.default = (0, vue_1.defineComponent)({
    name: 'TreeMotionWrapper',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        height: Number,
        nodes: {
            type: Array,
            required: true
        },
        mode: {
            type: String,
            required: true
        },
        onAfterEnter: {
            type: Function,
            required: true
        }
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)(fade_in_expand_transition_1.default, { onAfterEnter: this.onAfterEnter, appear: true, reverse: this.mode === 'collapse' }, {
            default: () => ((0, vue_1.h)("div", { class: [
                    `${clsPrefix}-tree-motion-wrapper`,
                    `${clsPrefix}-tree-motion-wrapper--${this.mode}`
                ], style: {
                    height: (0, seemly_1.pxfy)(this.height)
                } }, this.nodes.map(node => ((0, vue_1.h)(TreeNode_1.default, { clsPrefix: clsPrefix, tmNode: node })))))
        }));
    }
});
