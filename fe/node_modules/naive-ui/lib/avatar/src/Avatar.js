"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarProps = void 0;
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const is_native_lazy_load_1 = require("../../_utils/env/is-native-lazy-load");
const utils_1 = require("../../image/src/utils");
const Tag_1 = require("../../tag/src/Tag");
const styles_1 = require("../styles");
const context_1 = require("./context");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.avatarProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { size: [String, Number], src: String, circle: {
        type: Boolean,
        default: undefined
    }, objectFit: String, round: {
        type: Boolean,
        default: undefined
    }, bordered: {
        type: Boolean,
        default: undefined
    }, onError: Function, fallbackSrc: String, intersectionObserverOptions: Object, lazy: Boolean, onLoad: Function, renderPlaceholder: Function, renderFallback: Function, imgProps: Object, 
    /** @deprecated */
    color: String });
exports.default = (0, vue_1.defineComponent)({
    name: 'Avatar',
    props: exports.avatarProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const hasLoadErrorRef = (0, vue_1.ref)(false);
        let memoedTextHtml = null;
        const textRef = (0, vue_1.ref)(null);
        const selfRef = (0, vue_1.ref)(null);
        const fitTextTransform = () => {
            const { value: textEl } = textRef;
            if (textEl) {
                if (memoedTextHtml === null || memoedTextHtml !== textEl.innerHTML) {
                    memoedTextHtml = textEl.innerHTML;
                    const { value: selfEl } = selfRef;
                    if (selfEl) {
                        const { offsetWidth: elWidth, offsetHeight: elHeight } = selfEl;
                        const { offsetWidth: textWidth, offsetHeight: textHeight } = textEl;
                        const radix = 0.9;
                        const ratio = Math.min((elWidth / textWidth) * radix, (elHeight / textHeight) * radix, 1);
                        textEl.style.transform = `translateX(-50%) translateY(-50%) scale(${ratio})`;
                    }
                }
            }
        };
        const NAvatarGroup = (0, vue_1.inject)(context_1.avatarGroupInjectionKey, null);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            const { size } = props;
            if (size)
                return size;
            const { size: avatarGroupSize } = NAvatarGroup || {};
            if (avatarGroupSize)
                return avatarGroupSize;
            return 'medium';
        });
        const themeRef = (0, _mixins_1.useTheme)('Avatar', '-avatar', index_cssr_1.default, styles_1.avatarLight, props, mergedClsPrefixRef);
        const TagInjection = (0, vue_1.inject)(Tag_1.tagInjectionKey, null);
        const mergedRoundRef = (0, vue_1.computed)(() => {
            if (NAvatarGroup)
                return true;
            const { round, circle } = props;
            if (round !== undefined || circle !== undefined)
                return round || circle;
            if (TagInjection) {
                return TagInjection.roundRef.value;
            }
            return false;
        });
        const mergedBorderedRef = (0, vue_1.computed)(() => {
            if (NAvatarGroup)
                return true;
            return props.bordered || false;
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const size = mergedSizeRef.value;
            const round = mergedRoundRef.value;
            const bordered = mergedBorderedRef.value;
            const { color: propColor } = props;
            const { self: { borderRadius, fontSize, color, border, colorModal, colorPopover }, common: { cubicBezierEaseInOut } } = themeRef.value;
            let height;
            if (typeof size === 'number') {
                height = `${size}px`;
            }
            else {
                height = themeRef.value.self[(0, _utils_1.createKey)('height', size)];
            }
            return {
                '--n-font-size': fontSize,
                '--n-border': bordered ? border : 'none',
                '--n-border-radius': round ? '50%' : borderRadius,
                '--n-color': propColor || color,
                '--n-color-modal': propColor || colorModal,
                '--n-color-popover': propColor || colorPopover,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-merged-size': `var(--n-avatar-size-override, ${height})`
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('avatar', (0, vue_1.computed)(() => {
                const size = mergedSizeRef.value;
                const round = mergedRoundRef.value;
                const bordered = mergedBorderedRef.value;
                const { color } = props;
                let hash = '';
                if (size) {
                    if (typeof size === 'number') {
                        hash += `a${size}`;
                    }
                    else {
                        hash += size[0];
                    }
                }
                if (round) {
                    hash += 'b';
                }
                if (bordered) {
                    hash += 'c';
                }
                if (color) {
                    hash += (0, _utils_1.color2Class)(color);
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        const shouldStartLoadingRef = (0, vue_1.ref)(!props.lazy);
        (0, vue_1.onMounted)(() => {
            // Use IntersectionObserver if lazy and intersectionObserverOptions is set
            if (props.lazy && props.intersectionObserverOptions) {
                let unobserve;
                const stopWatchHandle = (0, vue_1.watchEffect)(() => {
                    unobserve === null || unobserve === void 0 ? void 0 : unobserve();
                    unobserve = undefined;
                    if (props.lazy) {
                        unobserve = (0, utils_1.observeIntersection)(selfRef.value, props.intersectionObserverOptions, shouldStartLoadingRef);
                    }
                });
                (0, vue_1.onBeforeUnmount)(() => {
                    stopWatchHandle();
                    unobserve === null || unobserve === void 0 ? void 0 : unobserve();
                });
            }
        });
        (0, vue_1.watch)(() => { var _a; return props.src || ((_a = props.imgProps) === null || _a === void 0 ? void 0 : _a.src); }, () => {
            hasLoadErrorRef.value = false;
        });
        const loadedRef = (0, vue_1.ref)(!props.lazy);
        return {
            textRef,
            selfRef,
            mergedRoundRef,
            mergedClsPrefix: mergedClsPrefixRef,
            fitTextTransform,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            hasLoadError: hasLoadErrorRef,
            shouldStartLoading: shouldStartLoadingRef,
            loaded: loadedRef,
            mergedOnError: (e) => {
                if (!shouldStartLoadingRef.value)
                    return;
                hasLoadErrorRef.value = true;
                const { onError, imgProps: { onError: imgPropsOnError } = {} } = props;
                onError === null || onError === void 0 ? void 0 : onError(e);
                imgPropsOnError === null || imgPropsOnError === void 0 ? void 0 : imgPropsOnError(e);
            },
            mergedOnLoad: (e) => {
                const { onLoad, imgProps: { onLoad: imgPropsOnLoad } = {} } = props;
                onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
                imgPropsOnLoad === null || imgPropsOnLoad === void 0 ? void 0 : imgPropsOnLoad(e);
                loadedRef.value = true;
            }
        };
    },
    render() {
        var _a, _b;
        const { $slots, src, mergedClsPrefix, lazy, onRender, loaded, hasLoadError, imgProps = {} } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        let img;
        const placeholderNode = !loaded
            && !hasLoadError
            && (this.renderPlaceholder
                ? this.renderPlaceholder()
                : (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a));
        if (this.hasLoadError) {
            img = this.renderFallback
                ? this.renderFallback()
                : (0, _utils_1.resolveSlot)($slots.fallback, () => [
                    (0, vue_1.h)("img", { src: this.fallbackSrc, style: { objectFit: this.objectFit } })
                ]);
        }
        else {
            img = (0, _utils_1.resolveWrappedSlot)($slots.default, (children) => {
                if (children) {
                    return ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.fitTextTransform }, {
                        default: () => ((0, vue_1.h)("span", { ref: "textRef", class: `${mergedClsPrefix}-avatar__text` }, children))
                    }));
                }
                else if (src || imgProps.src) {
                    const loadSrc = this.src || imgProps.src;
                    return (0, vue_1.h)('img', Object.assign(Object.assign({}, imgProps), { loading: 
                        // If interseciton observer options is set, do not use native lazy
                        is_native_lazy_load_1.isImageSupportNativeLazy
                            && !this.intersectionObserverOptions
                            && lazy
                            ? 'lazy'
                            : 'eager', src: lazy && this.intersectionObserverOptions
                            ? this.shouldStartLoading
                                ? loadSrc
                                : undefined
                            : loadSrc, 'data-image-src': loadSrc, onLoad: this.mergedOnLoad, onError: this.mergedOnError, style: [
                            imgProps.style || '',
                            { objectFit: this.objectFit },
                            placeholderNode
                                ? {
                                    height: '0',
                                    width: '0',
                                    visibility: 'hidden',
                                    position: 'absolute'
                                }
                                : ''
                        ] }));
                }
            });
        }
        return ((0, vue_1.h)("span", { ref: "selfRef", class: [`${mergedClsPrefix}-avatar`, this.themeClass], style: this.cssVars },
            img,
            lazy && placeholderNode));
    }
});
