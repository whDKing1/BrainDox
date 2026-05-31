import { off, on } from 'evtd';
import { toRgbaString } from 'seemly';
import { computed, defineComponent, h, ref } from 'vue';
import { normalizeAlpha } from "./utils.mjs";
const HANDLE_SIZE = '12px';
const HANDLE_SIZE_NUM = 12;
const RADIUS = '6px';
export default defineComponent({
  name: 'AlphaSlider',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    rgba: {
      type: Array,
      default: null
    },
    alpha: {
      type: Number,
      default: 0
    },
    onUpdateAlpha: {
      type: Function,
      required: true
    },
    onComplete: Function
  },
  setup(props) {
    const railRef = ref(null);
    function handleMouseDown(e) {
      if (!railRef.value || !props.rgba) return;
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
      const newAlpha = (e.clientX - left) / (width - HANDLE_SIZE_NUM);
      props.onUpdateAlpha(normalizeAlpha(newAlpha));
    }
    function handleMouseUp() {
      var _a;
      off('mousemove', document, handleMouseMove);
      off('mouseup', document, handleMouseUp);
      (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
    }
    return {
      railRef,
      railBackgroundImage: computed(() => {
        const {
          rgba
        } = props;
        if (!rgba) return '';
        return `linear-gradient(to right, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0) 0%, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1) 100%)`;
      }),
      handleMouseDown
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-color-picker-slider`,
      ref: "railRef",
      style: {
        height: HANDLE_SIZE,
        borderRadius: RADIUS
      },
      onMousedown: this.handleMouseDown
    }, h("div", {
      style: {
        borderRadius: RADIUS,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden'
      }
    }, h("div", {
      class: `${clsPrefix}-color-picker-checkboard`
    }), h("div", {
      class: `${clsPrefix}-color-picker-slider__image`,
      style: {
        backgroundImage: this.railBackgroundImage
      }
    })), this.rgba && h("div", {
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
        left: `calc(${this.alpha * 100}% - ${RADIUS})`,
        borderRadius: RADIUS,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE
      }
    }, h("div", {
      class: `${clsPrefix}-color-picker-handle__fill`,
      style: {
        backgroundColor: toRgbaString(this.rgba),
        borderRadius: RADIUS,
        width: HANDLE_SIZE,
        height: HANDLE_SIZE
      }
    }))));
  }
});