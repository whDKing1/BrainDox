import { off, on } from 'evtd';
import { defineComponent, h, ref } from 'vue';
import { normalizeHue } from "./utils.mjs";
const HANDLE_SIZE = '12px';
const HANDLE_SIZE_NUM = 12;
const RADIUS = '6px';
const RADIUS_NUM = 6;
const GRADIENT = 'linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)';
export default defineComponent({
  name: 'HueSlider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    hue: {
      type: Number,
      required: true
    },
    onUpdateHue: {
      type: Function,
      required: true
    },
    onComplete: Function
  },
  setup(props) {
    const railRef = ref(null);
    function handleMouseDown(e) {
      if (!railRef.value) return;
      on('mousemove', document, handleMouseMove);
      on('mouseup', document, handleMouseUp);
      handleMouseMove(e);
    }
    function handleMouseMove(e) {
      const {
        value: railEl
      } = railRef;
      if (!railEl) return;
      const {
        width,
        left
      } = railEl.getBoundingClientRect();
      const newHue = normalizeHue((e.clientX - left - RADIUS_NUM) / (width - HANDLE_SIZE_NUM) * 360);
      props.onUpdateHue(newHue);
    }
    function handleMouseUp() {
      var _a;
      off('mousemove', document, handleMouseMove);
      off('mouseup', document, handleMouseUp);
      (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    return {
      railRef,
      handleMouseDown
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-color-picker-slider`,
      style: {
        height: HANDLE_SIZE,
        borderRadius: RADIUS
      }
    }, h("div", {
      ref: "railRef",
      style: {
        boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, .24)',
        boxSizing: 'border-box',
        backgroundImage: GRADIENT,
        height: HANDLE_SIZE,
        borderRadius: RADIUS,
        position: 'relative'
      },
      onMousedown: this.handleMouseDown
    }, h("div", {
      style: {
        position: 'absolute',
        left: RADIUS,
        right: RADIUS,
        top: 0,
        bottom: 0
      }
    }, h("div", {
      class: `${clsPrefix}-color-picker-handle`,
      style: {
        left: `calc((${this.hue}%) / 359 * 100 - ${RADIUS})`,
        borderRadius: RADIUS,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE
      }
    }, h("div", {
      class: `${clsPrefix}-color-picker-handle__fill`,
      style: {
        backgroundColor: `hsl(${this.hue}, 100%, 50%)`,
        borderRadius: RADIUS,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE
      }
    })))));
  }
});