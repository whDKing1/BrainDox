import { createId } from 'seemly';
import { useClicked, useClickPosition } from 'vooks';
import { defineComponent, Fragment, h, provide, reactive, ref } from 'vue';
import { omit } from "../../_utils/index.mjs";
import { dialogApiInjectionKey, dialogProviderInjectionKey, dialogReactiveListInjectionKey } from "./context.mjs";
import { NDialogEnvironment } from "./DialogEnvironment.mjs";
export const dialogProviderProps = {
  injectionKey: String,
  to: [String, Object]
};
export const NDialogProvider = defineComponent({
  name: 'DialogProvider',
  props: dialogProviderProps,
  setup() {
    const dialogListRef = ref([]);
    const dialogInstRefs = {};
    function create(options = {}) {
      const key = createId();
      const dialogReactive = reactive(Object.assign(Object.assign({}, options), {
        key,
        destroy: () => {
          var _a;
          (_a = dialogInstRefs[`n-dialog-${key}`]) === null || _a === void 0 ? void 0 : _a.hide();
        }
      }));
      dialogListRef.value.push(dialogReactive);
      return dialogReactive;
    }
    const typedApi = ['info', 'success', 'warning', 'error'].map(type => options => {
      return create(Object.assign(Object.assign({}, options), {
        type
      }));
    });
    function handleAfterLeave(key) {
      const {
        value: dialogList
      } = dialogListRef;
      dialogList.splice(dialogList.findIndex(dialog => dialog.key === key), 1);
    }
    function destroyAll() {
      Object.values(dialogInstRefs).forEach(dialogInstRef => {
        dialogInstRef === null || dialogInstRef === void 0 ? void 0 : dialogInstRef.hide();
      });
    }
    const api = {
      create,
      destroyAll,
      info: typedApi[0],
      success: typedApi[1],
      warning: typedApi[2],
      error: typedApi[3]
    };
    provide(dialogApiInjectionKey, api);
    provide(dialogProviderInjectionKey, {
      clickedRef: useClicked(64),
      clickedPositionRef: useClickPosition()
    });
    provide(dialogReactiveListInjectionKey, dialogListRef);
    return Object.assign(Object.assign({}, api), {
      dialogList: dialogListRef,
      dialogInstRefs,
      handleAfterLeave
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, [this.dialogList.map(dialog => h(NDialogEnvironment, omit(dialog, ['destroy', 'style'], {
      internalStyle: dialog.style,
      to: this.to,
      ref: inst => {
        if (inst === null) {
          delete this.dialogInstRefs[`n-dialog-${dialog.key}`];
        } else {
          this.dialogInstRefs[`n-dialog-${dialog.key}`] = inst;
        }
      },
      internalKey: dialog.key,
      onInternalAfterLeave: this.handleAfterLeave
    }))), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)]);
  }
});