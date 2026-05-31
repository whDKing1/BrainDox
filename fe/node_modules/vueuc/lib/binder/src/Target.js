"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const vue_1 = require("vue");
const v_node_1 = require("../../shared/v-node");
exports.default = (0, vue_1.defineComponent)({
    name: 'Target',
    setup() {
        const { setTargetRef, syncTarget } = (0, vue_1.inject)('VBinder');
        const setTargetDirective = {
            mounted: setTargetRef,
            updated: setTargetRef
        };
        return {
            syncTarget,
            setTargetDirective
        };
    },
    render() {
        const { syncTarget, setTargetDirective } = this;
        /**
         * If you are using VBinder as a child of VBinder, the children wouldn't be
         * a valid DOM or component that can be attached to by directive.
         * So we won't sync target on those kind of situation and control the
         * target sync logic manually.
         */
        if (syncTarget) {
            return (0, vue_1.withDirectives)((0, v_node_1.getFirstVNode)('follower', this.$slots), [
                [setTargetDirective]
            ]);
        }
        return (0, v_node_1.getFirstVNode)('follower', this.$slots);
    }
});
