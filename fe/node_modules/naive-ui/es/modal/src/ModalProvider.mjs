import { createId } from 'seemly';
import { useClicked, useClickPosition } from 'vooks';
import { defineComponent, Fragment, h, provide, reactive, ref } from 'vue';
import { omit } from "../../_utils/index.mjs";
import { modalApiInjectionKey, modalProviderInjectionKey, modalReactiveListInjectionKey } from "./context.mjs";
import { NModalEnvironment } from "./ModalEnvironment.mjs";
export const modalProviderProps = {
  to: [String, Object]
};
export const NModalProvider = defineComponent({
  name: 'ModalProvider',
  props: modalProviderProps,
  setup() {
    const modalListRef = ref([]);
    const modalInstRefs = {};
    function create(options = {}) {
      const key = createId();
      const modalReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy: () => {
          var _a;
          (_a = modalInstRefs[`n-modal-${key}`]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      modalListRef.value.push(modalReactive);
      return modalReactive;
    }
    function handleAfterLeave(key) {
      const {
        value: modalList
      } = modalListRef;
      modalList.splice(modalList.findIndex(modal => modal.key === key), 1);
    }
    function destroyAll() {
      Object.values(modalInstRefs).forEach(modalInstRef => {
        modalInstRef === null || modalInstRef === void 0 ? void 0 : modalInstRef.hide();
      });
    }
    const api = {
      create,
      destroyAll
    };
    provide(modalApiInjectionKey, api);
    provide(modalProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickedPositionRef: useClickPosition()
    });
    provide(modalReactiveListInjectionKey, modalListRef);
    return Object.assign(Object.assign({}, api), {
      modalList: modalListRef,
      modalInstRefs,
      handleAfterLeave
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, [this.modalList.map(modal => {
      var _a;
      return h(NModalEnvironment, omit(modal, ['destroy', 'render'], {
        to: (_a = modal.to) !== null && _a !== void 0 ? _a : this.to,
        ref: inst => {
          if (inst === null) {
            delete this.modalInstRefs[`n-modal-${modal.key}`];
          } else {
            this.modalInstRefs[`n-modal-${modal.key}`] = inst;
          }
        },
        internalKey: modal.key,
        onInternalAfterLeave: this.handleAfterLeave
      }), {
        default: modal.render
      });
    }), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]);
  }
});