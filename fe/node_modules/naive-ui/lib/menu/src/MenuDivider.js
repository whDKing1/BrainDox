"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const context_1 = require("./context");
exports.default = (0, vue_1.defineComponent)({
    name: 'MenuDivider',
    setup() {
        const NMenu = (0, vue_1.inject)(context_1.menuInjectionKey);
        const { mergedClsPrefixRef, isHorizontalRef } = NMenu;
        return () => isHorizontalRef.value ? null : ((0, vue_1.h)("div", { class: `${mergedClsPrefixRef.value}-menu-divider` }));
    }
});
