"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vooks_1 = require("vooks");
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseIconSwitchTransition',
    setup(_, { slots }) {
        const isMountedRef = (0, vooks_1.useIsMounted)();
        return () => ((0, vue_1.h)(vue_1.Transition, { name: "icon-switch-transition", appear: isMountedRef.value }, slots));
    }
});
