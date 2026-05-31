"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscreteApi = createDiscreteApi;
const dialog_1 = require("../../dialog");
const loading_bar_1 = require("../../loading-bar");
const message_1 = require("../../message");
const ModalProvider_1 = require("../../modal/src/ModalProvider");
const notification_1 = require("../../notification");
const discreteApp_1 = require("./discreteApp");
function createDiscreteApi(includes, { configProviderProps, messageProviderProps, dialogProviderProps, notificationProviderProps, loadingBarProviderProps, modalProviderProps } = {}) {
    const providersAndProps = [];
    includes.forEach((type) => {
        switch (type) {
            case 'message':
                providersAndProps.push({
                    type,
                    Provider: message_1.NMessageProvider,
                    props: messageProviderProps
                });
                break;
            case 'notification':
                providersAndProps.push({
                    type,
                    Provider: notification_1.NNotificationProvider,
                    props: notificationProviderProps
                });
                break;
            case 'dialog':
                providersAndProps.push({
                    type,
                    Provider: dialog_1.NDialogProvider,
                    props: dialogProviderProps
                });
                break;
            case 'loadingBar':
                providersAndProps.push({
                    type,
                    Provider: loading_bar_1.NLoadingBarProvider,
                    props: loadingBarProviderProps
                });
                break;
            case 'modal':
                providersAndProps.push({
                    type,
                    Provider: ModalProvider_1.NModalProvider,
                    props: modalProviderProps
                });
        }
    });
    const discreteApp = (0, discreteApp_1.createDiscreteApp)({
        providersAndProps,
        configProviderProps
    });
    return discreteApp;
}
