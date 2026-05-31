"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAdjustedTo = useAdjustedTo;
const evtd_1 = require("evtd");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const interface_1 = require("../../_internal/select-menu/src/interface");
const interface_2 = require("../../drawer/src/interface");
const interface_3 = require("../../modal/src/interface");
const interface_4 = require("../../popover/src/interface");
const teleportDisabled = '__disabled__';
function useAdjustedTo(props) {
    const modal = (0, vue_1.inject)(interface_3.modalBodyInjectionKey, null);
    const drawer = (0, vue_1.inject)(interface_2.drawerBodyInjectionKey, null);
    const popover = (0, vue_1.inject)(interface_4.popoverBodyInjectionKey, null);
    const selectMenu = (0, vue_1.inject)(interface_1.internalSelectionMenuBodyInjectionKey, null);
    const fullscreenElementRef = (0, vue_1.ref)();
    if (typeof document !== 'undefined') {
        fullscreenElementRef.value = document.fullscreenElement;
        const handleFullscreenChange = () => {
            fullscreenElementRef.value = document.fullscreenElement;
        };
        (0, vue_1.onMounted)(() => {
            (0, evtd_1.on)('fullscreenchange', document, handleFullscreenChange);
        });
        (0, vue_1.onBeforeUnmount)(() => {
            (0, evtd_1.off)('fullscreenchange', document, handleFullscreenChange);
        });
    }
    return (0, vooks_1.useMemo)(() => {
        var _a;
        const { to } = props;
        if (to !== undefined) {
            if (to === false)
                return teleportDisabled;
            if (to === true)
                return fullscreenElementRef.value || 'body';
            return to;
        }
        if (modal === null || modal === void 0 ? void 0 : modal.value) {
            return (_a = modal.value.$el) !== null && _a !== void 0 ? _a : modal.value;
        }
        if (drawer === null || drawer === void 0 ? void 0 : drawer.value)
            return drawer.value;
        if (popover === null || popover === void 0 ? void 0 : popover.value)
            return popover.value;
        if (selectMenu === null || selectMenu === void 0 ? void 0 : selectMenu.value)
            return selectMenu.value;
        return to !== null && to !== void 0 ? to : (fullscreenElementRef.value || 'body');
    });
}
// teleport disabled key
useAdjustedTo.tdkey = teleportDisabled;
useAdjustedTo.propTo = {
    type: [String, Object, Boolean],
    default: undefined
};
