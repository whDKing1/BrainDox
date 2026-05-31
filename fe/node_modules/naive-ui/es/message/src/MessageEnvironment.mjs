import { defineComponent, h, onMounted, ref } from 'vue';
import { NFadeInExpandTransition } from "../../_internal/index.mjs";
import NMessage from "./Message.mjs";
import { messageProps } from "./message-props.mjs";
export default defineComponent({
  name: 'MessageEnvironment',
  props: Object.assign(Object.assign({}, messageProps), {
    duration: {
      type: Number,
      default: 3000
    },
    onAfterLeave: Function,
    onLeave: Function,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: Function,
    // deprecated
    onHide: Function,
    onAfterHide: Function
  }),
  setup(props) {
    let timerId = null;
    const showRef = ref(true);
    onMounted(() => {
      setHideTimeout();
    });
    function setHideTimeout() {
      const {
        duration
      } = props;
      if (duration) {
        timerId = window.setTimeout(hide, duration);
      }
    }
    function handleMouseenter(e) {
      if (e.currentTarget !== e.target) return;
      if (timerId !== null) {
        window.clearTimeout(timerId);
        timerId = null;
      }
    }
    function handleMouseleave(e) {
      if (e.currentTarget !== e.target) return;
      setHideTimeout();
    }
    function hide() {
      const {
        onHide
      } = props;
      showRef.value = false;
      if (timerId) {
        window.clearTimeout(timerId);
        timerId = null;
      }
      // deprecated
      if (onHide) onHide();
    }
    function handleClose() {
      const {
        onClose
      } = props;
      if (onClose) onClose();
      hide();
    }
    function handleAfterLeave() {
      const {
        onAfterLeave,
        onInternalAfterLeave,
        onAfterHide,
        internalKey
      } = props;
      if (onAfterLeave) onAfterLeave();
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      // deprecated
      if (onAfterHide) onAfterHide();
    }
    // deprecated
    function deactivate() {
      hide();
    }
    return {
      show: showRef,
      hide,
      handleClose,
      handleAfterLeave,
      handleMouseleave,
      handleMouseenter,
      deactivate
    };
  },
  render() {
    return h(NFadeInExpandTransition, {
      appear: true,
      onAfterLeave: this.handleAfterLeave,
      onLeave: this.onLeave
    }, {
      default: () => [this.show ? h(NMessage, {
        content: this.content,
        type: this.type,
        icon: this.icon,
        showIcon: this.showIcon,
        closable: this.closable,
        spinProps: this.spinProps,
        onClose: this.handleClose,
        onMouseenter: this.keepAliveOnHover ? this.handleMouseenter : undefined,
        onMouseleave: this.keepAliveOnHover ? this.handleMouseleave : undefined
      }) : null]
    });
  }
});