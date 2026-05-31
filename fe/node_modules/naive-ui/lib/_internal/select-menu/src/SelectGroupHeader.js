"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../../_utils");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NBaseSelectGroupHeader',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        tmNode: {
            type: Object,
            required: true
        }
    },
    setup() {
        const { renderLabelRef, renderOptionRef, labelFieldRef, nodePropsRef } = (0, vue_1.inject)(interface_1.internalSelectionMenuInjectionKey);
        return {
            labelField: labelFieldRef,
            nodeProps: nodePropsRef,
            renderLabel: renderLabelRef,
            renderOption: renderOptionRef
        };
    },
    render() {
        const { clsPrefix, renderLabel, renderOption, nodeProps, tmNode: { rawNode } } = this;
        const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
        const children = renderLabel
            ? renderLabel(rawNode, false)
            : (0, _utils_1.render)(rawNode[this.labelField], rawNode, false);
        const node = ((0, vue_1.h)("div", Object.assign({}, attrs, { class: [`${clsPrefix}-base-select-group-header`, attrs === null || attrs === void 0 ? void 0 : attrs.class] }), children));
        return rawNode.render
            ? rawNode.render({ node, option: rawNode })
            : renderOption
                ? renderOption({ node, option: rawNode, selected: false })
                : node;
    }
});
