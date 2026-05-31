"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const vue_1 = require("vue");
const interface_1 = require("../interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'ColumnResizeButton',
    props: {
        onResizeStart: Function,
        onResize: Function,
        onResizeEnd: Function
    },
    setup(props) {
        const { mergedClsPrefixRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        const activeRef = (0, vue_1.ref)(false);
        let startX = 0;
        function getMouseX(e) {
            return e.clientX;
        }
        function handleMousedown(e) {
            var _a;
            e.preventDefault();
            const alreadyStarted = activeRef.value;
            startX = getMouseX(e);
            activeRef.value = true;
            if (!alreadyStarted) {
                (0, evtd_1.on)('mousemove', window, handleMousemove);
                (0, evtd_1.on)('mouseup', window, handleMouseup);
                (_a = props.onResizeStart) === null || _a === void 0 ? void 0 : _a.call(props);
            }
        }
        function handleMousemove(e) {
            var _a;
            (_a = props.onResize) === null || _a === void 0 ? void 0 : _a.call(props, getMouseX(e) - startX);
        }
        function handleMouseup() {
            var _a;
            activeRef.value = false;
            (_a = props.onResizeEnd) === null || _a === void 0 ? void 0 : _a.call(props);
            (0, evtd_1.off)('mousemove', window, handleMousemove);
            (0, evtd_1.off)('mouseup', window, handleMouseup);
        }
        (0, vue_1.onBeforeUnmount)(() => {
            (0, evtd_1.off)('mousemove', window, handleMousemove);
            (0, evtd_1.off)('mouseup', window, handleMouseup);
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            active: activeRef,
            handleMousedown
        };
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("span", { "data-data-table-resizable": true, class: [
                `${mergedClsPrefix}-data-table-resize-button`,
                this.active && `${mergedClsPrefix}-data-table-resize-button--active`
            ], onMousedown: this.handleMousedown }));
    }
});
