"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const context_1 = require("./context");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
function createClassName(status, clsPrefix) {
    return `${clsPrefix}-loading-bar ${clsPrefix}-loading-bar--${status}`;
}
exports.default = (0, vue_1.defineComponent)({
    name: 'LoadingBar',
    props: {
        containerClass: String,
        containerStyle: [String, Object]
    },
    setup() {
        const { inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const { props: providerProps, mergedClsPrefixRef } = (0, vue_1.inject)(context_1.loadingBarProviderInjectionKey);
        const loadingBarRef = (0, vue_1.ref)(null);
        const enteringRef = (0, vue_1.ref)(false);
        const startedRef = (0, vue_1.ref)(false);
        const loadingRef = (0, vue_1.ref)(false);
        const transitionDisabledRef = (0, vue_1.ref)(false);
        let finishing = false;
        const erroringRef = (0, vue_1.ref)(false);
        const mergedLoadingBarStyle = (0, vue_1.computed)(() => {
            const { loadingBarStyle } = providerProps;
            if (!loadingBarStyle)
                return '';
            return loadingBarStyle[erroringRef.value ? 'error' : 'loading'];
        });
        function init() {
            return __awaiter(this, void 0, void 0, function* () {
                enteringRef.value = false;
                loadingRef.value = false;
                finishing = false;
                erroringRef.value = false;
                transitionDisabledRef.value = true;
                yield (0, vue_1.nextTick)();
                transitionDisabledRef.value = false;
            });
        }
        function start() {
            return __awaiter(this, arguments, void 0, function* (fromProgress = 0, toProgress = 80, status = 'starting') {
                startedRef.value = true;
                yield init();
                if (finishing)
                    return;
                loadingRef.value = true;
                yield (0, vue_1.nextTick)();
                const el = loadingBarRef.value;
                if (!el)
                    return;
                el.style.maxWidth = `${fromProgress}%`;
                el.style.transition = 'none';
                void el.offsetWidth;
                el.className = createClassName(status, mergedClsPrefixRef.value);
                el.style.transition = '';
                el.style.maxWidth = `${toProgress}%`;
            });
        }
        function finish() {
            return __awaiter(this, void 0, void 0, function* () {
                if (finishing || erroringRef.value)
                    return;
                if (startedRef.value) {
                    yield (0, vue_1.nextTick)();
                }
                finishing = true;
                const el = loadingBarRef.value;
                if (!el)
                    return;
                el.className = createClassName('finishing', mergedClsPrefixRef.value);
                el.style.maxWidth = '100%';
                void el.offsetWidth;
                loadingRef.value = false;
            });
        }
        function error() {
            if (finishing || erroringRef.value)
                return;
            if (!loadingRef.value) {
                void start(100, 100, 'error').then(() => {
                    erroringRef.value = true;
                    const el = loadingBarRef.value;
                    if (!el)
                        return;
                    el.className = createClassName('error', mergedClsPrefixRef.value);
                    void el.offsetWidth;
                    loadingRef.value = false;
                });
            }
            else {
                erroringRef.value = true;
                const el = loadingBarRef.value;
                if (!el)
                    return;
                el.className = createClassName('error', mergedClsPrefixRef.value);
                el.style.maxWidth = '100%';
                void el.offsetWidth;
                loadingRef.value = false;
            }
        }
        function handleEnter() {
            enteringRef.value = true;
        }
        function handleAfterEnter() {
            enteringRef.value = false;
        }
        function handleAfterLeave() {
            return __awaiter(this, void 0, void 0, function* () {
                yield init();
            });
        }
        const themeRef = (0, _mixins_1.useTheme)('LoadingBar', '-loading-bar', index_cssr_1.default, styles_1.loadingBarLight, providerProps, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { height, colorError, colorLoading } } = themeRef.value;
            return {
                '--n-height': height,
                '--n-color-loading': colorLoading,
                '--n-color-error': colorError
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('loading-bar', undefined, cssVarsRef, providerProps)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            loadingBarRef,
            started: startedRef,
            loading: loadingRef,
            entering: enteringRef,
            transitionDisabled: transitionDisabledRef,
            start,
            error,
            finish,
            handleEnter,
            handleAfterEnter,
            handleAfterLeave,
            mergedLoadingBarStyle,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        if (!this.started)
            return null;
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition", appear: true, onEnter: this.handleEnter, onAfterEnter: this.handleAfterEnter, onAfterLeave: this.handleAfterLeave, css: !this.transitionDisabled }, {
            default: () => {
                var _a;
                (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
                return (0, vue_1.withDirectives)((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-loading-bar-container`,
                        this.themeClass,
                        this.containerClass
                    ], style: this.containerStyle },
                    (0, vue_1.h)("div", { ref: "loadingBarRef", class: [`${mergedClsPrefix}-loading-bar`], style: [
                            this.cssVars,
                            this.mergedLoadingBarStyle
                        ] })), [[vue_1.vShow, this.loading || (!this.loading && this.entering)]]);
            }
        }));
    }
});
