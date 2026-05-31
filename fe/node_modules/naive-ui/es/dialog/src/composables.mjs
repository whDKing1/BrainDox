import { inject } from 'vue';
import { throwError } from "../../_utils/index.mjs";
import { dialogApiInjectionKey, dialogReactiveListInjectionKey } from "./context.mjs";
export function useDialog() {
  const dialog = inject(dialogApiInjectionKey, null);
  if (dialog === null) {
    throwError('use-dialog', 'No outer <n-dialog-provider /> founded.');
  }
  return dialog;
}
export function useDialogReactiveList() {
  const dialogReactiveList = inject(dialogReactiveListInjectionKey, null);
  if (dialogReactiveList === null) {
    throwError('use-dialog-reactive-list', 'No outer <n-dialog-provider /> founded.');
  }
  return dialogReactiveList;
}