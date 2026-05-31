"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = useNotification;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const NotificationProvider_1 = require("./NotificationProvider");
function useNotification() {
    const api = (0, vue_1.inject)(NotificationProvider_1.notificationApiInjectionKey, null);
    if (api === null) {
        (0, _utils_1.throwError)('use-notification', 'No outer `n-notification-provider` found.');
    }
    return api;
}
