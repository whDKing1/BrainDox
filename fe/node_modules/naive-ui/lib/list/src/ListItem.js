"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const List_1 = require("./List");
exports.default = (0, vue_1.defineComponent)({
    name: 'ListItem',
    slots: Object,
    setup() {
        const listInjection = (0, vue_1.inject)(List_1.listInjectionKey, null);
        if (!listInjection) {
            (0, _utils_1.throwError)('list-item', '`n-list-item` must be placed in `n-list`.');
        }
        return {
            showDivider: listInjection.showDividerRef,
            mergedClsPrefix: listInjection.mergedClsPrefixRef
        };
    },
    render() {
        const { $slots, mergedClsPrefix } = this;
        return ((0, vue_1.h)("li", { class: `${mergedClsPrefix}-list-item` },
            $slots.prefix ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list-item__prefix` }, $slots.prefix())) : null,
            $slots.default ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list-item__main` }, $slots)) : null,
            $slots.suffix ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list-item__suffix` }, $slots.suffix())) : null,
            this.showDivider && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-list-item__divider` }))));
    }
});
