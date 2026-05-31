"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputGroupProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const input_group_cssr_1 = __importDefault(require("./styles/input-group.cssr"));
exports.inputGroupProps = {};
exports.default = (0, vue_1.defineComponent)({
    name: 'InputGroup',
    props: exports.inputGroupProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useStyle)('-input-group', input_group_cssr_1.default, mergedClsPrefixRef);
        return {
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return (0, vue_1.h)("div", { class: `${mergedClsPrefix}-input-group` }, this.$slots);
    }
});
