"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logProps = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const code_1 = require("../../code");
const styles_1 = require("../styles");
const context_1 = require("./context");
const LogLine_1 = __importDefault(require("./LogLine"));
const LogLoader_1 = __importDefault(require("./LogLoader"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
// Fix vue-tsc error
const throttle = lodash_1.throttle;
exports.logProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { loading: Boolean, trim: Boolean, log: String, fontSize: {
        type: Number,
        default: 14
    }, lines: {
        type: Array,
        default: () => []
    }, lineHeight: {
        type: Number,
        default: 1.25
    }, language: String, rows: {
        type: Number,
        default: 15
    }, offsetTop: {
        type: Number,
        default: 0
    }, offsetBottom: {
        type: Number,
        default: 0
    }, hljs: Object, spinProps: Object, onReachTop: Function, onReachBottom: Function, onRequireMore: Function });
exports.default = (0, vue_1.defineComponent)({
    name: 'Log',
    props: exports.logProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const silentRef = (0, vue_1.ref)(false);
        const highlightRef = (0, vue_1.computed)(() => {
            return props.language !== undefined;
        });
        const styleHeightRef = (0, vue_1.computed)(() => {
            return `calc(${Math.round(props.rows * props.lineHeight * props.fontSize)}px)`;
        });
        const mergedLinesRef = (0, vue_1.computed)(() => {
            const { log } = props;
            if (log) {
                return log.split('\n');
            }
            return props.lines;
        });
        const scrollbarRef = (0, vue_1.ref)(null);
        const themeRef = (0, _mixins_1.useTheme)('Log', '-log', index_cssr_1.default, styles_1.logLight, props, mergedClsPrefixRef);
        function handleScroll(e) {
            const container = e.target;
            const content = container.firstElementChild;
            if (silentRef.value) {
                void (0, vue_1.nextTick)(() => {
                    silentRef.value = false;
                });
                return;
            }
            const containerHeight = container.offsetHeight;
            const containerScrollTop = container.scrollTop;
            const contentHeight = content.offsetHeight;
            const scrollTop = containerScrollTop;
            const scrollBottom = contentHeight - containerScrollTop - containerHeight;
            if (scrollTop <= props.offsetTop) {
                const { onReachTop, onRequireMore } = props;
                if (onRequireMore)
                    onRequireMore('top');
                if (onReachTop)
                    onReachTop();
            }
            if (scrollBottom <= props.offsetBottom) {
                const { onReachBottom, onRequireMore } = props;
                if (onRequireMore)
                    onRequireMore('bottom');
                if (onReachBottom)
                    onReachBottom();
            }
        }
        const handleWheel = throttle(_handleWheel, 300);
        function _handleWheel(e) {
            if (silentRef.value) {
                void (0, vue_1.nextTick)(() => {
                    silentRef.value = false;
                });
                return;
            }
            if (scrollbarRef.value) {
                const { containerRef, contentRef } = scrollbarRef.value;
                if (containerRef && contentRef) {
                    const containerHeight = containerRef.offsetHeight;
                    const containerScrollTop = containerRef.scrollTop;
                    const contentHeight = contentRef.offsetHeight;
                    const scrollTop = containerScrollTop;
                    const scrollBottom = contentHeight - containerScrollTop - containerHeight;
                    const deltaY = e.deltaY;
                    if (scrollTop === 0 && deltaY < 0) {
                        const { onRequireMore } = props;
                        if (onRequireMore)
                            onRequireMore('top');
                    }
                    if (scrollBottom <= 0 && deltaY > 0) {
                        const { onRequireMore } = props;
                        if (onRequireMore)
                            onRequireMore('bottom');
                    }
                }
            }
        }
        function scrollTo(options) {
            const { value: scrollbarInst } = scrollbarRef;
            if (!scrollbarInst)
                return;
            const { silent, top, position } = options;
            if (silent) {
                silentRef.value = true;
            }
            if (top !== undefined) {
                scrollbarInst.scrollTo({ left: 0, top });
            }
            else if (position === 'bottom' || position === 'top') {
                scrollbarInst.scrollTo({ position });
            }
        }
        // deprecated
        function scrollToTop(silent = false) {
            (0, _utils_1.warn)('log', '`scrollToTop` is deprecated, please use `scrollTo({ position: \'top\'})` instead.');
            scrollTo({
                position: 'top',
                silent
            });
        }
        function scrollToBottom(silent = false) {
            (0, _utils_1.warn)('log', '`scrollToTop` is deprecated, please use `scrollTo({ position: \'bottom\'})` instead.');
            scrollTo({
                position: 'bottom',
                silent
            });
        }
        (0, vue_1.provide)(context_1.logInjectionKey, {
            languageRef: (0, vue_1.toRef)(props, 'language'),
            mergedHljsRef: (0, _mixins_1.useHljs)(props, highlightRef),
            trimRef: (0, vue_1.toRef)(props, 'trim'),
            highlightRef
        });
        const exportedMethods = {
            scrollTo
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { self: { loaderFontSize, loaderTextColor, loaderColor, loaderBorder, loadingColor }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-loader-font-size': loaderFontSize,
                '--n-loader-border': loaderBorder,
                '--n-loader-color': loaderColor,
                '--n-loader-text-color': loaderTextColor,
                '--n-loading-color': loadingColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('log', undefined, cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({}, exportedMethods), { mergedClsPrefix: mergedClsPrefixRef, scrollbarRef, mergedTheme: themeRef, styleHeight: styleHeightRef, mergedLines: mergedLinesRef, scrollToTop,
            scrollToBottom,
            handleWheel,
            handleScroll, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        const { mergedClsPrefix, mergedTheme, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return (0, vue_1.h)('div', {
            class: [`${mergedClsPrefix}-log`, this.themeClass],
            style: [
                {
                    lineHeight: this.lineHeight,
                    height: this.styleHeight
                },
                this.cssVars
            ],
            onWheelPassive: this.handleWheel
        }, [
            (0, vue_1.h)(_internal_1.NScrollbar, { ref: "scrollbarRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, onScroll: this.handleScroll }, {
                default: () => ((0, vue_1.h)(code_1.NCode, { internalNoHighlight: true, internalFontSize: this.fontSize, theme: mergedTheme.peers.Code, themeOverrides: mergedTheme.peerOverrides.Code }, {
                    default: () => this.mergedLines.map((line, index) => {
                        return (0, vue_1.h)(LogLine_1.default, { key: index, line: line });
                    })
                }))
            }),
            (0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition" }, {
                default: () => this.loading ? ((0, vue_1.h)(LogLoader_1.default, { clsPrefix: mergedClsPrefix, spinProps: this.spinProps })) : null
            })
        ]);
    }
});
