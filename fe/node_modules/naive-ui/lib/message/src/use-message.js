"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMessage = useMessage;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
function useMessage() {
    const api = (0, vue_1.inject)(context_1.messageApiInjectionKey, null);
    if (api === null) {
        (0, _utils_1.throwError)('use-message', 'No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A.');
    }
    return api;
}
