import { defineComponent, h, nextTick, onBeforeUnmount, ref, toRef } from 'vue';
import { useStyle } from "../../../_mixins/index.mjs";
import style from "./styles/index.cssr.mjs";
export default defineComponent({
  name: 'BaseWave',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    useStyle('-base-wave', style, toRef(props, 'clsPrefix'));
    const selfRef = ref(null);
    const activeRef = ref(false);
    let animationTimerId = null;
    onBeforeUnmount(() => {
      if (animationTimerId !== null) {
        window.clearTimeout(animationTimerId);
      }
    });
    return {
      active: activeRef,
      selfRef,
      play() {
        if (animationTimerId !== null) {
          window.clearTimeout(animationTimerId);
          activeRef.value = false;
          animationTimerId = null;
        }
        void nextTick(() => {
          var _a;
          void ((_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.offsetHeight);
          activeRef.value = true;
          animationTimerId = window.setTimeout(() => {
            activeRef.value = false;
            animationTimerId = null;
          }, 1000);
        });
      }
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      ref: "selfRef",
      "aria-hidden": true,
      class: [`${clsPrefix}-base-wave`, this.active && `${clsPrefix}-base-wave--active`]
    });
  }
});