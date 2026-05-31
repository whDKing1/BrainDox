"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscreteApp = createDiscreteApp;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const config_provider_1 = require("../../config-provider");
const dialog_1 = require("../../dialog");
const loading_bar_1 = require("../../loading-bar");
const message_1 = require("../../message");
const modal_1 = require("../../modal");
const notification_1 = require("../../notification");
const InjectionExtractor_1 = require("./InjectionExtractor");
const injectionFactoryMap = {
    message: message_1.useMessage,
    notification: notification_1.useNotification,
    loadingBar: loading_bar_1.useLoadingBar,
    dialog: dialog_1.useDialog,
    modal: modal_1.useModal
};
function createDiscreteApp({ providersAndProps, configProviderProps }) {
    let app = (0, vue_1.createApp)(App);
    const extractedApi = {
        app
    };
    function App() {
        return (0, vue_1.h)(config_provider_1.NConfigProvider, (0, vue_1.unref)(configProviderProps), {
            default: () => providersAndProps.map(({ type, Provider, props }) => {
                return (0, vue_1.h)(Provider, (0, vue_1.unref)(props), {
                    default: () => (0, vue_1.h)(InjectionExtractor_1.NInjectionExtractor, {
                        onSetup: () => (extractedApi[type] = injectionFactoryMap[type]())
                    })
                });
            })
        });
    }
    let hostEl;
    if (_utils_1.isBrowser) {
        hostEl = document.createElement('div');
        document.body.appendChild(hostEl);
        app.mount(hostEl);
    }
    const unmount = () => {
        var _a;
        if (app === null || hostEl === null) {
            (0, _utils_1.warn)('discrete', 'unmount call no need because discrete app has been unmounted');
            return;
        }
        app.unmount();
        (_a = hostEl.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(hostEl);
        hostEl = null;
        app = null;
    };
    return Object.assign({ unmount }, extractedApi);
}
