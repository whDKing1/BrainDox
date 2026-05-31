"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'TreeNodeContent',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        disabled: Boolean,
        checked: Boolean,
        selected: Boolean,
        onClick: Function,
        onDragstart: Function,
        tmNode: {
            type: Object,
            required: true
        },
        nodeProps: Object
    },
    setup(props) {
        const { renderLabelRef, renderPrefixRef, renderSuffixRef, labelFieldRef } = (0, vue_1.inject)(interface_1.treeInjectionKey);
        const selfRef = (0, vue_1.ref)(null);
        function doClick(e) {
            const { onClick } = props;
            if (onClick)
                onClick(e);
        }
        function handleClick(e) {
            doClick(e);
        }
        return {
            selfRef,
            renderLabel: renderLabelRef,
            renderPrefix: renderPrefixRef,
            renderSuffix: renderSuffixRef,
            labelField: labelFieldRef,
            handleClick
        };
    },
    render() {
        const { clsPrefix, labelField, nodeProps, checked = false, selected = false, renderLabel, renderPrefix, renderSuffix, handleClick, onDragstart, tmNode: { rawNode, rawNode: { prefix, suffix, [labelField]: label } } } = this;
        return ((0, vue_1.h)("span", Object.assign({}, nodeProps, { ref: "selfRef", class: [`${clsPrefix}-tree-node-content`, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps.class], onClick: handleClick, draggable: onDragstart === undefined ? undefined : true, onDragstart: onDragstart }),
            renderPrefix || prefix ? ((0, vue_1.h)("div", { class: `${clsPrefix}-tree-node-content__prefix` }, renderPrefix
                ? renderPrefix({
                    option: rawNode,
                    selected,
                    checked
                })
                : (0, _utils_1.render)(prefix))) : null,
            (0, vue_1.h)("div", { class: `${clsPrefix}-tree-node-content__text` }, renderLabel
                ? renderLabel({
                    option: rawNode,
                    selected,
                    checked
                })
                : (0, _utils_1.render)(label)),
            renderSuffix || suffix ? ((0, vue_1.h)("div", { class: `${clsPrefix}-tree-node-content__suffix` }, renderSuffix
                ? renderSuffix({
                    option: rawNode,
                    selected,
                    checked
                })
                : (0, _utils_1.render)(suffix))) : null));
    }
});
