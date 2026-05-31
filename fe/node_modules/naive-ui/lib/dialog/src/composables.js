"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDialog = useDialog;
exports.useDialogReactiveList = useDialogReactiveList;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
function useDialog() {
    const dialog = (0, vue_1.inject)(context_1.dialogApiInjectionKey, null);
    if (dialog === null) {
        (0, _utils_1.throwError)('use-dialog', 'No outer <n-dialog-provider /> founded.');
    }
    return dialog;
}
function useDialogReactiveList() {
    const dialogReactiveList = (0, vue_1.inject)(context_1.dialogReactiveListInjectionKey, null);
    if (dialogReactiveList === null) {
        (0, _utils_1.throwError)('use-dialog-reactive-list', 'No outer <n-dialog-provider /> founded.');
    }
    return dialogReactiveList;
}
