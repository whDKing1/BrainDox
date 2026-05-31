import { off, on } from 'evtd';
import { defineComponent, h, inject, onBeforeUnmount, ref } from 'vue';
import { dataTableInjectionKey } from "../interface.mjs";
export default defineComponent({
  name: 'ColumnResizeButton',
  props: {
    onResizeStart: Function,
    onResize: Function,
    onResizeEnd: Function
  },
  setup(props) {
    const {
      mergedClsPrefixRef
    } = inject(dataTableInjectionKey);
    const activeRef = ref(false);
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
        on('mousemove', window, handleMousemove);
        on('mouseup', window, handleMouseup);
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
      off('mousemove', window, handleMousemove);
      off('mouseup', window, handleMouseup);
    }
    onBeforeUnmount(() => {
      off('mousemove', window, handleMousemove);
      off('mouseup', window, handleMouseup);
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      active: activeRef,
      handleMousedown
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("span", {
      "data-data-table-resizable": true,
      class: [`${mergedClsPrefix}-data-table-resize-button`, this.active && `${mergedClsPrefix}-data-table-resize-button--active`],
      onMousedown: this.handleMousedown
    });
  }
});