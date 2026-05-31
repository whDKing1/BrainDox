import { off, on } from 'evtd';
import { useMemo } from 'vooks';
import { inject, onBeforeUnmount, onMounted, ref } from 'vue';
import { internalSelectionMenuBodyInjectionKey } from "../../_internal/select-menu/src/interface.mjs";
import { drawerBodyInjectionKey } from "../../drawer/src/interface.mjs";
import { modalBodyInjectionKey } from "../../modal/src/interface.mjs";
import { popoverBodyInjectionKey } from "../../popover/src/interface.mjs";
const teleportDisabled = '__disabled__';
function useAdjustedTo(props) {
  const modal = inject(modalBodyInjectionKey, null);
  const drawer = inject(drawerBodyInjectionKey, null);
  const popover = inject(popoverBodyInjectionKey, null);
  const selectMenu = inject(internalSelectionMenuBodyInjectionKey, null);
  const fullscreenElementRef = ref();
  if (typeof document !== 'undefined') {
    fullscreenElementRef.value = document.fullscreenElement;
    const handleFullscreenChange = () => {
      fullscreenElementRef.value = document.fullscreenElement;
    };
    onMounted(() => {
      on('fullscreenchange', document, handleFullscreenChange);
    });
    onBeforeUnmount(() => {
      off('fullscreenchange', document, handleFullscreenChange);
    });
  }
  return useMemo(() => {
    var _a;
    const {
      to
    } = props;
    if (to !== undefined) {
      if (to === false) return teleportDisabled;
      if (to === true) return fullscreenElementRef.value || 'body';
      return to;
    }
    if (modal === null || modal === void 0 ? void 0 : modal.value) {
      return (_a = modal.value.$el) !== null && _a !== void 0 ? _a : modal.value;
    }
    if (drawer === null || drawer === void 0 ? void 0 : drawer.value) return drawer.value;
    if (popover === null || popover === void 0 ? void 0 : popover.value) return popover.value;
    if (selectMenu === null || selectMenu === void 0 ? void 0 : selectMenu.value) return selectMenu.value;
    return to !== null && to !== void 0 ? to : fullscreenElementRef.value || 'body';
  });
}
// teleport disabled key
useAdjustedTo.tdkey = teleportDisabled;
useAdjustedTo.propTo = {
  type: [String, Object, Boolean],
  default: undefined
};
export { useAdjustedTo };