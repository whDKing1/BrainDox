import { defineComponent, h, onBeforeUnmount, ref, toRef, Transition } from 'vue';
import { useStyle } from "../../../_mixins/index.mjs";
import style from "./styles/index.cssr.mjs";
export default defineComponent({
  name: 'BaseMenuMask',
  props: {
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props) {
    useStyle('-base-menu-mask', style, toRef(props, 'clsPrefix'));
    const messageRef = ref(null);
    let timerId = null;
    const uncontrolledShowRef = ref(false);
    onBeforeUnmount(() => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
      }
    });
    const exposedRef = {
      showOnce(message, duration = 1500) {
        if (timerId) window.clearTimeout(timerId);
        uncontrolledShowRef.value = true;
        messageRef.value = message;
        timerId = window.setTimeout(() => {
          uncontrolledShowRef.value = false;
          messageRef.value = null;
        }, duration);
      }
    };
    return Object.assign({
      message: messageRef,
      show: uncontrolledShowRef
    }, exposedRef);
  },
  render() {
    return h(Transition, {
      name: "fade-in-transition"
    }, {
      default: () => this.show ? h("div", {
        class: `${this.clsPrefix}-base-menu-mask`
      }, this.message) : null
    });
  }
});