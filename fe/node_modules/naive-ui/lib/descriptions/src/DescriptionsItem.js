"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptionsItemProps = void 0;
const vue_1 = require("vue");
const utils_1 = require("./utils");
exports.descriptionsItemProps = {
    label: String,
    span: {
        type: Number,
        default: 1
    },
    labelClass: String,
    labelStyle: [Object, String],
    contentClass: String,
    contentStyle: [Object, String]
};
exports.default = (0, vue_1.defineComponent)({
    name: 'DescriptionsItem',
    [utils_1.DESCRIPTION_ITEM_FLAG]: true,
    props: exports.descriptionsItemProps,
    slots: Object,
    render() {
        return null;
    }
});
