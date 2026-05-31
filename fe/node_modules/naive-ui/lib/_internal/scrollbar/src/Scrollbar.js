"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XScrollbar = void 0;
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../../_mixins");
const _utils_1 = require("../../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const scrollbarProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { duration: {
        type: Number,
        default: 0
    }, scrollable: {
        type: Boolean,
        default: true
    }, xScrollable: Boolean, trigger: {
        type: String,
        default: 'hover'
    }, useUnifiedContainer: Boolean, triggerDisplayManually: Boolean, 
    // If container is set, resize observer won't not attached
    container: Function, content: Function, containerClass: String, containerStyle: [String, Object], contentClass: [String, Array], contentStyle: [String, Object], horizontalRailStyle: [String, Object], verticalRailStyle: [String, Object], onScroll: Function, onWheel: Function, onResize: Function, internalOnUpdateScrollLeft: Function, internalHoistYRail: Boolean, internalExposeWidthCssVar: Boolean, yPlacement: {
        type: String,
        default: 'right'
    }, xPlacement: {
        type: String,
        default: 'bottom'
    } });
const Scrollbar = (0, vue_1.defineComponent)({
    name: 'Scrollbar',
    props: scrollbarProps,
    inheritAttrs: false,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const rtlEnabledRef = (0, _mixins_1.useRtl)('Scrollbar', mergedRtlRef, mergedClsPrefixRef);
        // dom ref
        const wrapperRef = (0, vue_1.ref)(null);
        const containerRef = (0, vue_1.ref)(null);
        const contentRef = (0, vue_1.ref)(null);
        const yRailRef = (0, vue_1.ref)(null);
        const xRailRef = (0, vue_1.ref)(null);
        // data ref
        const contentHeightRef = (0, vue_1.ref)(null);
        const contentWidthRef = (0, vue_1.ref)(null);
        const containerHeightRef = (0, vue_1.ref)(null);
        const containerWidthRef = (0, vue_1.ref)(null);
        const yRailSizeRef = (0, vue_1.ref)(null);
        const xRailSizeRef = (0, vue_1.ref)(null);
        const containerScrollTopRef = (0, vue_1.ref)(0);
        const containerScrollLeftRef = (0, vue_1.ref)(0);
        const isShowXBarRef = (0, vue_1.ref)(false);
        const isShowYBarRef = (0, vue_1.ref)(false);
        let yBarPressed = false;
        let xBarPressed = false;
        let xBarVanishTimerId;
        let yBarVanishTimerId;
        let memoYTop = 0;
        let memoXLeft = 0;
        let memoMouseX = 0;
        let memoMouseY = 0;
        const isIos = (0, vooks_1.useIsIos)();
        const themeRef = (0, _mixins_1.useTheme)('Scrollbar', '-scrollbar', index_cssr_1.default, styles_1.scrollbarLight, props, mergedClsPrefixRef);
        const yBarSizeRef = (0, vue_1.computed)(() => {
            const { value: containerHeight } = containerHeightRef;
            const { value: contentHeight } = contentHeightRef;
            const { value: yRailSize } = yRailSizeRef;
            if (containerHeight === null
                || contentHeight === null
                || yRailSize === null) {
                return 0;
            }
            else {
                return Math.min(containerHeight, (yRailSize * containerHeight) / contentHeight
                    + (0, seemly_1.depx)(themeRef.value.self.width) * 1.5);
            }
        });
        const yBarSizePxRef = (0, vue_1.computed)(() => {
            return `${yBarSizeRef.value}px`;
        });
        const xBarSizeRef = (0, vue_1.computed)(() => {
            const { value: containerWidth } = containerWidthRef;
            const { value: contentWidth } = contentWidthRef;
            const { value: xRailSize } = xRailSizeRef;
            if (containerWidth === null
                || contentWidth === null
                || xRailSize === null) {
                return 0;
            }
            else {
                return ((xRailSize * containerWidth) / contentWidth
                    + (0, seemly_1.depx)(themeRef.value.self.height) * 1.5);
            }
        });
        const xBarSizePxRef = (0, vue_1.computed)(() => {
            return `${xBarSizeRef.value}px`;
        });
        const yBarTopRef = (0, vue_1.computed)(() => {
            const { value: containerHeight } = containerHeightRef;
            const { value: containerScrollTop } = containerScrollTopRef;
            const { value: contentHeight } = contentHeightRef;
            const { value: yRailSize } = yRailSizeRef;
            if (containerHeight === null
                || contentHeight === null
                || yRailSize === null) {
                return 0;
            }
            else {
                const heightDiff = contentHeight - containerHeight;
                if (!heightDiff)
                    return 0;
                return ((containerScrollTop / heightDiff) * (yRailSize - yBarSizeRef.value));
            }
        });
        const yBarTopPxRef = (0, vue_1.computed)(() => {
            return `${yBarTopRef.value}px`;
        });
        const xBarLeftRef = (0, vue_1.computed)(() => {
            const { value: containerWidth } = containerWidthRef;
            const { value: containerScrollLeft } = containerScrollLeftRef;
            const { value: contentWidth } = contentWidthRef;
            const { value: xRailSize } = xRailSizeRef;
            if (containerWidth === null
                || contentWidth === null
                || xRailSize === null) {
                return 0;
            }
            else {
                const widthDiff = contentWidth - containerWidth;
                if (!widthDiff)
                    return 0;
                return ((containerScrollLeft / widthDiff) * (xRailSize - xBarSizeRef.value));
            }
        });
        const xBarLeftPxRef = (0, vue_1.computed)(() => {
            return `${xBarLeftRef.value}px`;
        });
        const needYBarRef = (0, vue_1.computed)(() => {
            const { value: containerHeight } = containerHeightRef;
            const { value: contentHeight } = contentHeightRef;
            return (containerHeight !== null
                && contentHeight !== null
                && contentHeight > containerHeight);
        });
        const needXBarRef = (0, vue_1.computed)(() => {
            const { value: containerWidth } = containerWidthRef;
            const { value: contentWidth } = contentWidthRef;
            return (containerWidth !== null
                && contentWidth !== null
                && contentWidth > containerWidth);
        });
        const mergedShowXBarRef = (0, vue_1.computed)(() => {
            const { trigger } = props;
            return trigger === 'none' || isShowXBarRef.value;
        });
        const mergedShowYBarRef = (0, vue_1.computed)(() => {
            const { trigger } = props;
            return trigger === 'none' || isShowYBarRef.value;
        });
        const mergedContainerRef = (0, vue_1.computed)(() => {
            const { container } = props;
            if (container)
                return container();
            return containerRef.value;
        });
        const mergedContentRef = (0, vue_1.computed)(() => {
            const { content } = props;
            if (content)
                return content();
            return contentRef.value;
        });
        const scrollTo = (options, y) => {
            if (!props.scrollable)
                return;
            if (typeof options === 'number') {
                scrollToPosition(options, y !== null && y !== void 0 ? y : 0, 0, false, 'auto');
                return;
            }
            const { left, top, index, elSize, position, behavior, el, debounce = true } = options;
            if (left !== undefined || top !== undefined) {
                scrollToPosition(left !== null && left !== void 0 ? left : 0, top !== null && top !== void 0 ? top : 0, 0, false, behavior);
            }
            if (el !== undefined) {
                scrollToPosition(0, el.offsetTop, el.offsetHeight, debounce, behavior);
            }
            else if (index !== undefined && elSize !== undefined) {
                scrollToPosition(0, index * elSize, elSize, debounce, behavior);
            }
            else if (position === 'bottom') {
                scrollToPosition(0, Number.MAX_SAFE_INTEGER, 0, false, behavior);
            }
            else if (position === 'top') {
                scrollToPosition(0, 0, 0, false, behavior);
            }
        };
        const activateState = (0, _utils_1.useReactivated)(() => {
            // Only restore for builtin container & content
            if (!props.container) {
                // remount
                scrollTo({
                    top: containerScrollTopRef.value,
                    left: containerScrollLeftRef.value
                });
            }
        });
        // methods
        const handleContentResize = () => {
            if (activateState.isDeactivated)
                return;
            sync();
        };
        const handleContainerResize = (e) => {
            if (activateState.isDeactivated)
                return;
            const { onResize } = props;
            if (onResize)
                onResize(e);
            sync();
        };
        const scrollBy = (options, y) => {
            if (!props.scrollable)
                return;
            const { value: container } = mergedContainerRef;
            if (!container)
                return;
            if (typeof options === 'object') {
                container.scrollBy(options);
            }
            else {
                container.scrollBy(options, y || 0);
            }
        };
        function scrollToPosition(left, top, elSize, debounce, behavior) {
            const { value: container } = mergedContainerRef;
            if (!container)
                return;
            if (debounce) {
                const { scrollTop, offsetHeight } = container;
                if (top > scrollTop) {
                    if (top + elSize <= scrollTop + offsetHeight) {
                        // do nothing
                    }
                    else {
                        container.scrollTo({
                            left,
                            top: top + elSize - offsetHeight,
                            behavior
                        });
                    }
                    return;
                }
            }
            container.scrollTo({
                left,
                top,
                behavior
            });
        }
        function handleMouseEnterWrapper() {
            showXBar();
            showYBar();
            sync();
        }
        function handleMouseLeaveWrapper() {
            hideBar();
        }
        function hideBar() {
            hideYBar();
            hideXBar();
        }
        function hideYBar() {
            if (yBarVanishTimerId !== undefined) {
                window.clearTimeout(yBarVanishTimerId);
            }
            yBarVanishTimerId = window.setTimeout(() => {
                isShowYBarRef.value = false;
            }, props.duration);
        }
        function hideXBar() {
            if (xBarVanishTimerId !== undefined) {
                window.clearTimeout(xBarVanishTimerId);
            }
            xBarVanishTimerId = window.setTimeout(() => {
                isShowXBarRef.value = false;
            }, props.duration);
        }
        function showXBar() {
            if (xBarVanishTimerId !== undefined) {
                window.clearTimeout(xBarVanishTimerId);
            }
            isShowXBarRef.value = true;
        }
        function showYBar() {
            if (yBarVanishTimerId !== undefined) {
                window.clearTimeout(yBarVanishTimerId);
            }
            isShowYBarRef.value = true;
        }
        function handleScroll(e) {
            const { onScroll } = props;
            if (onScroll)
                onScroll(e);
            syncScrollState();
        }
        function syncScrollState() {
            // only collect scroll state, do not trigger any dom event
            const { value: container } = mergedContainerRef;
            if (container) {
                containerScrollTopRef.value = container.scrollTop;
                containerScrollLeftRef.value
                    = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
            }
        }
        function syncPositionState() {
            // only collect position state, do not trigger any dom event
            // Don't use getClientBoundingRect because element may be scale transformed
            const { value: content } = mergedContentRef;
            if (content) {
                contentHeightRef.value = content.offsetHeight;
                contentWidthRef.value = content.offsetWidth;
            }
            const { value: container } = mergedContainerRef;
            if (container) {
                containerHeightRef.value = container.offsetHeight;
                containerWidthRef.value = container.offsetWidth;
            }
            const { value: xRailEl } = xRailRef;
            const { value: yRailEl } = yRailRef;
            if (xRailEl) {
                xRailSizeRef.value = xRailEl.offsetWidth;
            }
            if (yRailEl) {
                yRailSizeRef.value = yRailEl.offsetHeight;
            }
        }
        /**
         * Sometimes there's only one element that we can scroll,
         * For example for textarea, there won't be a content element.
         */
        function syncUnifiedContainer() {
            const { value: container } = mergedContainerRef;
            if (container) {
                containerScrollTopRef.value = container.scrollTop;
                containerScrollLeftRef.value
                    = container.scrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
                containerHeightRef.value = container.offsetHeight;
                containerWidthRef.value = container.offsetWidth;
                contentHeightRef.value = container.scrollHeight;
                contentWidthRef.value = container.scrollWidth;
            }
            const { value: xRailEl } = xRailRef;
            const { value: yRailEl } = yRailRef;
            if (xRailEl) {
                xRailSizeRef.value = xRailEl.offsetWidth;
            }
            if (yRailEl) {
                yRailSizeRef.value = yRailEl.offsetHeight;
            }
        }
        function sync() {
            if (!props.scrollable)
                return;
            if (props.useUnifiedContainer) {
                syncUnifiedContainer();
            }
            else {
                syncPositionState();
                syncScrollState();
            }
        }
        function isMouseUpAway(e) {
            var _a;
            return !((_a = wrapperRef.value) === null || _a === void 0 ? void 0 : _a.contains((0, seemly_1.getPreciseEventTarget)(e)));
        }
        function handleXScrollMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            xBarPressed = true;
            (0, evtd_1.on)('mousemove', window, handleXScrollMouseMove, true);
            (0, evtd_1.on)('mouseup', window, handleXScrollMouseUp, true);
            memoXLeft = containerScrollLeftRef.value;
            memoMouseX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value)
                ? window.innerWidth - e.clientX
                : e.clientX;
        }
        function handleXScrollMouseMove(e) {
            if (!xBarPressed)
                return;
            if (xBarVanishTimerId !== undefined) {
                window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== undefined) {
                window.clearTimeout(yBarVanishTimerId);
            }
            const { value: containerWidth } = containerWidthRef;
            const { value: contentWidth } = contentWidthRef;
            const { value: xBarSize } = xBarSizeRef;
            if (containerWidth === null || contentWidth === null)
                return;
            const dX = (rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value)
                ? window.innerWidth - e.clientX - memoMouseX
                : e.clientX - memoMouseX;
            const dScrollLeft = (dX * (contentWidth - containerWidth)) / (containerWidth - xBarSize);
            const toScrollLeftUpperBound = contentWidth - containerWidth;
            let toScrollLeft = memoXLeft + dScrollLeft;
            toScrollLeft = Math.min(toScrollLeftUpperBound, toScrollLeft);
            toScrollLeft = Math.max(toScrollLeft, 0);
            const { value: container } = mergedContainerRef;
            if (container) {
                container.scrollLeft = toScrollLeft * ((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? -1 : 1);
                const { internalOnUpdateScrollLeft } = props;
                if (internalOnUpdateScrollLeft)
                    internalOnUpdateScrollLeft(toScrollLeft);
            }
        }
        function handleXScrollMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            (0, evtd_1.off)('mousemove', window, handleXScrollMouseMove, true);
            (0, evtd_1.off)('mouseup', window, handleXScrollMouseUp, true);
            xBarPressed = false;
            sync();
            if (isMouseUpAway(e)) {
                hideBar();
            }
        }
        function handleYScrollMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
            yBarPressed = true;
            (0, evtd_1.on)('mousemove', window, handleYScrollMouseMove, true);
            (0, evtd_1.on)('mouseup', window, handleYScrollMouseUp, true);
            memoYTop = containerScrollTopRef.value;
            memoMouseY = e.clientY;
        }
        function handleYScrollMouseMove(e) {
            if (!yBarPressed)
                return;
            if (xBarVanishTimerId !== undefined) {
                window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== undefined) {
                window.clearTimeout(yBarVanishTimerId);
            }
            const { value: containerHeight } = containerHeightRef;
            const { value: contentHeight } = contentHeightRef;
            const { value: yBarSize } = yBarSizeRef;
            if (containerHeight === null || contentHeight === null)
                return;
            const dY = e.clientY - memoMouseY;
            const dScrollTop = (dY * (contentHeight - containerHeight)) / (containerHeight - yBarSize);
            const toScrollTopUpperBound = contentHeight - containerHeight;
            let toScrollTop = memoYTop + dScrollTop;
            toScrollTop = Math.min(toScrollTopUpperBound, toScrollTop);
            toScrollTop = Math.max(toScrollTop, 0);
            const { value: container } = mergedContainerRef;
            if (container) {
                container.scrollTop = toScrollTop;
            }
        }
        function handleYScrollMouseUp(e) {
            e.preventDefault();
            e.stopPropagation();
            (0, evtd_1.off)('mousemove', window, handleYScrollMouseMove, true);
            (0, evtd_1.off)('mouseup', window, handleYScrollMouseUp, true);
            yBarPressed = false;
            sync();
            if (isMouseUpAway(e)) {
                hideBar();
            }
        }
        (0, vue_1.watchEffect)(() => {
            const { value: needXBar } = needXBarRef;
            const { value: needYBar } = needYBarRef;
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            const { value: xRailEl } = xRailRef;
            const { value: yRailEl } = yRailRef;
            if (xRailEl) {
                if (!needXBar) {
                    xRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
                }
                else {
                    xRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
                }
            }
            if (yRailEl) {
                if (!needYBar) {
                    yRailEl.classList.add(`${mergedClsPrefix}-scrollbar-rail--disabled`);
                }
                else {
                    yRailEl.classList.remove(`${mergedClsPrefix}-scrollbar-rail--disabled`);
                }
            }
        });
        (0, vue_1.onMounted)(() => {
            // if container exist, it always can't be resolved when scrollbar is mounted
            // for example:
            // - component
            //   - scrollbar
            //     - inner
            // if you pass inner to scrollbar, you may use a ref inside component
            // however, when scrollbar is mounted, ref is not ready at component
            // you need to init by yourself
            if (props.container)
                return;
            sync();
        });
        (0, vue_1.onBeforeUnmount)(() => {
            if (xBarVanishTimerId !== undefined) {
                window.clearTimeout(xBarVanishTimerId);
            }
            if (yBarVanishTimerId !== undefined) {
                window.clearTimeout(yBarVanishTimerId);
            }
            (0, evtd_1.off)('mousemove', window, handleYScrollMouseMove, true);
            (0, evtd_1.off)('mouseup', window, handleYScrollMouseUp, true);
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { color, colorHover, height, width, borderRadius, railInsetHorizontalTop, railInsetHorizontalBottom, railInsetVerticalRight, railInsetVerticalLeft, railColor } } = themeRef.value;
            const { top: railTopHorizontalTop, right: railRightHorizontalTop, bottom: railBottomHorizontalTop, left: railLeftHorizontalTop } = (0, seemly_1.getPadding)(railInsetHorizontalTop);
            const { top: railTopHorizontalBottom, right: railRightHorizontalBottom, bottom: railBottomHorizontalBottom, left: railLeftHorizontalBottom } = (0, seemly_1.getPadding)(railInsetHorizontalBottom);
            const { top: railTopVerticalRight, right: railRightVerticalRight, bottom: railBottomVerticalRight, left: railLeftVerticalRight } = (0, seemly_1.getPadding)((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value)
                ? (0, _utils_1.rtlInset)(railInsetVerticalRight)
                : railInsetVerticalRight);
            const { top: railTopVerticalLeft, right: railRightVerticalLeft, bottom: railBottomVerticalLeft, left: railLeftVerticalLeft } = (0, seemly_1.getPadding)((rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value)
                ? (0, _utils_1.rtlInset)(railInsetVerticalLeft)
                : railInsetVerticalLeft);
            return {
                '--n-scrollbar-bezier': cubicBezierEaseInOut,
                '--n-scrollbar-color': color,
                '--n-scrollbar-color-hover': colorHover,
                '--n-scrollbar-border-radius': borderRadius,
                '--n-scrollbar-width': width,
                '--n-scrollbar-height': height,
                '--n-scrollbar-rail-top-horizontal-top': railTopHorizontalTop,
                '--n-scrollbar-rail-right-horizontal-top': railRightHorizontalTop,
                '--n-scrollbar-rail-bottom-horizontal-top': railBottomHorizontalTop,
                '--n-scrollbar-rail-left-horizontal-top': railLeftHorizontalTop,
                '--n-scrollbar-rail-top-horizontal-bottom': railTopHorizontalBottom,
                '--n-scrollbar-rail-right-horizontal-bottom': railRightHorizontalBottom,
                '--n-scrollbar-rail-bottom-horizontal-bottom': railBottomHorizontalBottom,
                '--n-scrollbar-rail-left-horizontal-bottom': railLeftHorizontalBottom,
                '--n-scrollbar-rail-top-vertical-right': railTopVerticalRight,
                '--n-scrollbar-rail-right-vertical-right': railRightVerticalRight,
                '--n-scrollbar-rail-bottom-vertical-right': railBottomVerticalRight,
                '--n-scrollbar-rail-left-vertical-right': railLeftVerticalRight,
                '--n-scrollbar-rail-top-vertical-left': railTopVerticalLeft,
                '--n-scrollbar-rail-right-vertical-left': railRightVerticalLeft,
                '--n-scrollbar-rail-bottom-vertical-left': railBottomVerticalLeft,
                '--n-scrollbar-rail-left-vertical-left': railLeftVerticalLeft,
                '--n-scrollbar-rail-color': railColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('scrollbar', undefined, cssVarsRef, props)
            : undefined;
        const exposedMethods = {
            scrollTo,
            scrollBy,
            sync,
            syncUnifiedContainer,
            handleMouseEnterWrapper,
            handleMouseLeaveWrapper
        };
        return Object.assign(Object.assign({}, exposedMethods), { mergedClsPrefix: mergedClsPrefixRef, rtlEnabled: rtlEnabledRef, containerScrollTop: containerScrollTopRef, wrapperRef,
            containerRef,
            contentRef,
            yRailRef,
            xRailRef, needYBar: needYBarRef, needXBar: needXBarRef, yBarSizePx: yBarSizePxRef, xBarSizePx: xBarSizePxRef, yBarTopPx: yBarTopPxRef, xBarLeftPx: xBarLeftPxRef, isShowXBar: mergedShowXBarRef, isShowYBar: mergedShowYBarRef, isIos,
            handleScroll,
            handleContentResize,
            handleContainerResize,
            handleYScrollMouseDown,
            handleXScrollMouseDown, containerWidth: containerWidthRef, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        var _a;
        const { $slots, mergedClsPrefix, triggerDisplayManually, rtlEnabled, internalHoistYRail, yPlacement, xPlacement, xScrollable } = this;
        if (!this.scrollable)
            return (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots);
        const triggerIsNone = this.trigger === 'none';
        const createYRail = (className, style) => {
            return ((0, vue_1.h)("div", { ref: "yRailRef", class: [
                    `${mergedClsPrefix}-scrollbar-rail`,
                    `${mergedClsPrefix}-scrollbar-rail--vertical`,
                    `${mergedClsPrefix}-scrollbar-rail--vertical--${yPlacement}`,
                    className
                ], "data-scrollbar-rail": true, style: [style || '', this.verticalRailStyle], "aria-hidden": true }, (0, vue_1.h)((triggerIsNone ? _utils_1.Wrapper : vue_1.Transition), triggerIsNone ? null : { name: 'fade-in-transition' }, {
                default: () => this.needYBar && this.isShowYBar && !this.isIos ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
                        height: this.yBarSizePx,
                        top: this.yBarTopPx
                    }, onMousedown: this.handleYScrollMouseDown })) : null
            })));
        };
        const createChildren = () => {
            var _a, _b;
            (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
            return (0, vue_1.h)('div', (0, vue_1.mergeProps)(this.$attrs, {
                role: 'none',
                ref: 'wrapperRef',
                class: [
                    `${mergedClsPrefix}-scrollbar`,
                    this.themeClass,
                    rtlEnabled && `${mergedClsPrefix}-scrollbar--rtl`
                ],
                style: this.cssVars,
                onMouseenter: triggerDisplayManually
                    ? undefined
                    : this.handleMouseEnterWrapper,
                onMouseleave: triggerDisplayManually
                    ? undefined
                    : this.handleMouseLeaveWrapper
            }), [
                this.container ? ((_b = $slots.default) === null || _b === void 0 ? void 0 : _b.call($slots)) : ((0, vue_1.h)("div", { role: "none", ref: "containerRef", class: [
                        `${mergedClsPrefix}-scrollbar-container`,
                        this.containerClass
                    ], style: [
                        this.containerStyle,
                        this.internalExposeWidthCssVar
                            ? { '--n-scrollbar-current-width': (0, seemly_1.pxfy)(this.containerWidth) }
                            : undefined
                    ], onScroll: this.handleScroll, onWheel: this.onWheel },
                    (0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleContentResize }, {
                        default: () => ((0, vue_1.h)("div", { ref: "contentRef", role: "none", style: [
                                {
                                    width: this.xScrollable ? 'fit-content' : null
                                },
                                this.contentStyle
                            ], class: [
                                `${mergedClsPrefix}-scrollbar-content`,
                                this.contentClass
                            ] }, $slots))
                    }))),
                internalHoistYRail ? null : createYRail(undefined, undefined),
                xScrollable && ((0, vue_1.h)("div", { ref: "xRailRef", class: [
                        `${mergedClsPrefix}-scrollbar-rail`,
                        `${mergedClsPrefix}-scrollbar-rail--horizontal`,
                        `${mergedClsPrefix}-scrollbar-rail--horizontal--${xPlacement}`
                    ], style: this.horizontalRailStyle, "data-scrollbar-rail": true, "aria-hidden": true }, (0, vue_1.h)((triggerIsNone ? _utils_1.Wrapper : vue_1.Transition), triggerIsNone ? null : { name: 'fade-in-transition' }, {
                    default: () => this.needXBar && this.isShowXBar && !this.isIos ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-scrollbar-rail__scrollbar`, style: {
                            width: this.xBarSizePx,
                            right: rtlEnabled ? this.xBarLeftPx : undefined,
                            left: rtlEnabled ? undefined : this.xBarLeftPx
                        }, onMousedown: this.handleXScrollMouseDown })) : null
                })))
            ]);
        };
        const scrollbarNode = this.container ? (createChildren()) : ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleContainerResize }, {
            default: createChildren
        }));
        if (internalHoistYRail) {
            return ((0, vue_1.h)(vue_1.Fragment, null,
                scrollbarNode,
                createYRail(this.themeClass, this.cssVars)));
        }
        else {
            return scrollbarNode;
        }
    }
});
exports.default = Scrollbar;
exports.XScrollbar = Scrollbar;
