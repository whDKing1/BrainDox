// use absolute path to make sure no circular ref of style
// this -> modal-index -> modal-style
import { defineComponent, h, ref } from 'vue';
import NModal, { modalProps } from "./Modal.mjs";
export const NModalEnvironment = defineComponent({
  name: 'ModalEnvironment',
  props: Object.assign(Object.assign({}, modalProps), {
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: {
      type: Function,
      required: true
    }
  }),
  setup(props) {
    const showRef = ref(true);
    function handleAfterLeave() {
      const {
        onInternalAfterLeave,
        internalKey,
        onAfterLeave
      } = props;
      if (onInternalAfterLeave) onInternalAfterLeave(internalKey);
      if (onAfterLeave) onAfterLeave();
    }
    function handlePositiveClick() {
      const {
        onPositiveClick
      } = props;
      if (onPositiveClick) {
        void Promise.resolve(onPositiveClick()).then(result => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleNegativeClick() {
      const {
        onNegativeClick
      } = props;
      if (onNegativeClick) {
        void Promise.resolve(onNegativeClick()).then(result => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleCloseClick() {
      const {
        onClose
      } = props;
      if (onClose) {
        void Promise.resolve(onClose()).then(result => {
          if (result === false) return;
          hide();
        });
      } else {
        hide();
      }
    }
    function handleMaskClick(e) {
      const {
        onMaskClick,
        maskClosable
      } = props;
      if (onMaskClick) {
        onMaskClick(e);
        if (maskClosable) {
          hide();
        }
      }
    }
    function handleEsc() {
      const {
        onEsc
      } = props;
      if (onEsc) {
        onEsc();
      }
    }
    function hide() {
      showRef.value = false;
    }
    function handleUpdateShow(value) {
      showRef.value = value;
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleCloseClick,
      handleNegativeClick,
      handlePositiveClick,
      handleMaskClick,
      handleEsc
    };
  },
  render() {
    const {
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      show
    } = this;
    return h(NModal, Object.assign({}, this.$props, {
      show: show,
      onUpdateShow: handleUpdateShow,
      onMaskClick: handleMaskClick,
      onEsc: handleEsc,
      onAfterLeave: handleAfterLeave,
      internalAppear: true,
      internalModal: true
    }), this.$slots);
  }
});