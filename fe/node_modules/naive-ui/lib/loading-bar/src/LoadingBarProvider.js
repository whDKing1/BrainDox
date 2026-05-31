"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingBarProviderProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const context_1 = require("./context");
const LoadingBar_1 = __importDefault(require("./LoadingBar"));
exports.loadingBarProviderProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { to: {
        type: [String, Object, Boolean],
        default: undefined
    }, containerClass: String, containerStyle: [String, Object], loadingBarStyle: {
        type: Object
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'LoadingBarProvider',
    props: exports.loadingBarProviderProps,
    setup(props) {
        const isMountedRef = (0, vooks_1.useIsMounted)();
        const loadingBarRef = (0, vue_1.ref)(null);
        const methods = {
            start() {
                var _a;
                if (isMountedRef.value) {
                    (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.start();
                }
                else {
                    void (0, vue_1.nextTick)(() => {
                        var _a;
                        (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.start();
                    });
                }
            },
            error() {
                var _a;
                if (isMountedRef.value) {
                    (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.error();
                }
                else {
                    void (0, vue_1.nextTick)(() => {
                        var _a;
                        (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.error();
                    });
                }
            },
            finish() {
                var _a;
                if (isMountedRef.value) {
                    (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.finish();
                }
                else {
                    void (0, vue_1.nextTick)(() => {
                        var _a;
                        (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.finish();
                    });
                }
            }
        };
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        (0, vue_1.provide)(context_1.loadingBarApiInjectionKey, methods);
        (0, vue_1.provide)(context_1.loadingBarProviderInjectionKey, {
            props,
            mergedClsPrefixRef
        });
        return Object.assign(methods, {
            loadingBarRef
        });
    },
    render() {
        var _a, _b;
        return ((0, vue_1.h)(vue_1.Fragment, null,
            (0, vue_1.h)(vue_1.Teleport, { disabled: this.to === false, to: this.to || 'body' },
                (0, vue_1.h)(LoadingBar_1.default, { ref: "loadingBarRef", containerStyle: this.containerStyle, containerClass: this.containerClass })), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 :
            _b.call(_a)));
    }
});
