"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
exports.default = (0, vue_1.defineComponent)({
    name: 'DropdownGroupHeader',
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
        const { showIconRef, hasSubmenuRef } = (0, vue_1.inject)(context_1.dropdownMenuInjectionKey);
        const { renderLabelRef, labelFieldRef, nodePropsRef, renderOptionRef } = (0, vue_1.inject)(context_1.dropdownInjectionKey);
        return {
            labelField: labelFieldRef,
            showIcon: showIconRef,
            hasSubmenu: hasSubmenuRef,
            renderLabel: renderLabelRef,
            nodeProps: nodePropsRef,
            renderOption: renderOptionRef
        };
    },
    render() {
        var _a;
        const { clsPrefix, hasSubmenu, showIcon, nodeProps, renderLabel, renderOption } = this;
        const { rawNode } = this.tmNode;
        const node = ((0, vue_1.h)("div", Object.assign({ class: `${clsPrefix}-dropdown-option` }, nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode)),
            (0, vue_1.h)("div", { class: `${clsPrefix}-dropdown-option-body ${clsPrefix}-dropdown-option-body--group` },
                (0, vue_1.h)("div", { "data-dropdown-option": true, class: [
                        `${clsPrefix}-dropdown-option-body__prefix`,
                        showIcon && `${clsPrefix}-dropdown-option-body__prefix--show-icon`
                    ] }, (0, _utils_1.render)(rawNode.icon)),
                (0, vue_1.h)("div", { class: `${clsPrefix}-dropdown-option-body__label`, "data-dropdown-option": true }, renderLabel
                    ? renderLabel(rawNode)
                    : (0, _utils_1.render)((_a = rawNode.title) !== null && _a !== void 0 ? _a : rawNode[this.labelField])),
                (0, vue_1.h)("div", { class: [
                        `${clsPrefix}-dropdown-option-body__suffix`,
                        hasSubmenu
                            && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
                    ], "data-dropdown-option": true }))));
        if (renderOption) {
            return renderOption({ node, option: rawNode });
        }
        return node;
    }
});
