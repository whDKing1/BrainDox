"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabsProps = void 0;
const lodash_1 = require("lodash");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const interface_1 = require("./interface");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const Tab_1 = __importDefault(require("./Tab"));
// Fix vue-tsc error
const throttle = lodash_1.throttle;
exports.tabsProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { value: [String, Number], defaultValue: [String, Number], trigger: {
        type: String,
        default: 'click'
    }, type: {
        type: String,
        default: 'bar'
    }, closable: Boolean, justifyContent: String, size: String, placement: {
        type: String,
        default: 'top'
    }, tabStyle: [String, Object], tabClass: String, addTabStyle: [String, Object], addTabClass: String, barWidth: Number, paneClass: String, paneStyle: [String, Object], paneWrapperClass: String, paneWrapperStyle: [String, Object], addable: [Boolean, Object], tabsPadding: {
        type: Number,
        default: 0
    }, animated: Boolean, onBeforeLeave: Function, onAdd: Function, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array], onClose: [Function, Array], 
    // deprecated
    labelSize: String, activeName: [String, Number], onActiveNameChange: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Tabs',
    props: exports.tabsProps,
    slots: Object,
    setup(props, { slots }) {
        var _a, _b, _c, _d;
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.labelSize !== undefined) {
                    (0, _utils_1.warnOnce)('tabs', '`label-size` is deprecated, please use `size` instead.');
                }
                if (props.activeName !== undefined) {
                    (0, _utils_1.warnOnce)('tabs', '`active-name` is deprecated, please use `value` instead.');
                }
                if (props.onActiveNameChange !== undefined) {
                    (0, _utils_1.warnOnce)('tabs', '`on-active-name-change` is deprecated, please use `on-update:value` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Tabs', '-tabs', index_cssr_1.default, styles_1.tabsLight, props, mergedClsPrefixRef);
        const tabsElRef = (0, vue_1.ref)(null);
        const barElRef = (0, vue_1.ref)(null);
        const scrollWrapperElRef = (0, vue_1.ref)(null);
        const addTabInstRef = (0, vue_1.ref)(null);
        const xScrollInstRef = (0, vue_1.ref)(null);
        const yScrollElRef = (0, vue_1.ref)(null);
        const startReachedRef = (0, vue_1.ref)(true);
        const endReachedRef = (0, vue_1.ref)(true);
        const compitableSizeRef = (0, vooks_1.useCompitable)(props, ['labelSize', 'size']);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            if (compitableSizeRef.value)
                return compitableSizeRef.value;
            const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Tabs) === null || _b === void 0 ? void 0 : _b.size;
            if (configSize)
                return configSize;
            return 'medium';
        });
        const compitableValueRef = (0, vooks_1.useCompitable)(props, ['activeName', 'value']);
        const uncontrolledValueRef = (0, vue_1.ref)((_b = (_a = compitableValueRef.value) !== null && _a !== void 0 ? _a : props.defaultValue) !== null && _b !== void 0 ? _b : (slots.default
            ? (_d = (_c = (0, _utils_1.flatten)(slots.default())[0]) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d.name
            : null));
        const mergedValueRef = (0, vooks_1.useMergedState)(compitableValueRef, uncontrolledValueRef);
        const tabChangeIdRef = { id: 0 };
        const tabWrapperStyleRef = (0, vue_1.computed)(() => {
            if (!props.justifyContent || props.type === 'card')
                return undefined;
            return {
                display: 'flex',
                justifyContent: props.justifyContent
            };
        });
        (0, vue_1.watch)(mergedValueRef, () => {
            tabChangeIdRef.id = 0;
            updateCurrentBarStyle();
            updateCurrentScrollPosition();
        });
        function getCurrentEl() {
            var _a;
            const { value } = mergedValueRef;
            if (value === null)
                return null;
            const tabEl = (_a = tabsElRef.value) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-name="${value}"]`);
            return tabEl;
        }
        function updateBarStyle(tabEl) {
            if (props.type === 'card')
                return;
            const { value: barEl } = barElRef;
            if (!barEl)
                return;
            const barIsHide = barEl.style.opacity === '0';
            if (tabEl) {
                const disabledClassName = `${mergedClsPrefixRef.value}-tabs-bar--disabled`;
                const { barWidth, placement } = props;
                if (tabEl.dataset.disabled === 'true') {
                    barEl.classList.add(disabledClassName);
                }
                else {
                    barEl.classList.remove(disabledClassName);
                }
                if (['top', 'bottom'].includes(placement)) {
                    clearBarStyle(['top', 'maxHeight', 'height']);
                    if (typeof barWidth === 'number' && tabEl.offsetWidth >= barWidth) {
                        const offsetDiffLeft = Math.floor((tabEl.offsetWidth - barWidth) / 2) + tabEl.offsetLeft;
                        barEl.style.left = `${offsetDiffLeft}px`;
                        barEl.style.maxWidth = `${barWidth}px`;
                    }
                    else {
                        barEl.style.left = `${tabEl.offsetLeft}px`;
                        barEl.style.maxWidth = `${tabEl.offsetWidth}px`;
                    }
                    barEl.style.width = '8192px';
                    if (barIsHide) {
                        barEl.style.transition = 'none';
                    }
                    void barEl.offsetWidth;
                    if (barIsHide) {
                        barEl.style.transition = '';
                        barEl.style.opacity = '1';
                    }
                }
                else {
                    clearBarStyle(['left', 'maxWidth', 'width']);
                    if (typeof barWidth === 'number' && tabEl.offsetHeight >= barWidth) {
                        const offsetDiffTop = Math.floor((tabEl.offsetHeight - barWidth) / 2) + tabEl.offsetTop;
                        barEl.style.top = `${offsetDiffTop}px`;
                        barEl.style.maxHeight = `${barWidth}px`;
                    }
                    else {
                        barEl.style.top = `${tabEl.offsetTop}px`;
                        barEl.style.maxHeight = `${tabEl.offsetHeight}px`;
                    }
                    barEl.style.height = '8192px';
                    if (barIsHide) {
                        barEl.style.transition = 'none';
                    }
                    void barEl.offsetHeight;
                    if (barIsHide) {
                        barEl.style.transition = '';
                        barEl.style.opacity = '1';
                    }
                }
            }
        }
        function hideBarStyle() {
            if (props.type === 'card')
                return;
            const { value: barEl } = barElRef;
            if (!barEl)
                return;
            barEl.style.opacity = '0';
        }
        function clearBarStyle(styleProps) {
            const { value: barEl } = barElRef;
            if (!barEl)
                return;
            for (const prop of styleProps) {
                barEl.style[prop] = '';
            }
        }
        function updateCurrentBarStyle() {
            if (props.type === 'card')
                return;
            const tabEl = getCurrentEl();
            if (tabEl) {
                updateBarStyle(tabEl);
            }
            else {
                hideBarStyle();
            }
        }
        function updateCurrentScrollPosition() {
            var _a;
            const scrollWrapperEl = (_a = xScrollInstRef.value) === null || _a === void 0 ? void 0 : _a.$el;
            if (!scrollWrapperEl)
                return;
            const tabEl = getCurrentEl();
            if (!tabEl)
                return;
            const { scrollLeft: scrollWrapperElScrollLeft, offsetWidth: scrollWrapperElOffsetWidth } = scrollWrapperEl;
            const { offsetLeft: tabElOffsetLeft, offsetWidth: tabElOffsetWidth } = tabEl;
            if (scrollWrapperElScrollLeft > tabElOffsetLeft) {
                scrollWrapperEl.scrollTo({
                    top: 0,
                    left: tabElOffsetLeft,
                    behavior: 'smooth'
                });
            }
            else if (tabElOffsetLeft + tabElOffsetWidth
                > scrollWrapperElScrollLeft + scrollWrapperElOffsetWidth) {
                scrollWrapperEl.scrollTo({
                    top: 0,
                    left: tabElOffsetLeft + tabElOffsetWidth - scrollWrapperElOffsetWidth,
                    behavior: 'smooth'
                });
            }
        }
        const tabsPaneWrapperRef = (0, vue_1.ref)(null);
        let fromHeight = 0;
        let hangingTransition = null;
        function onAnimationBeforeLeave(el) {
            const tabsPaneWrapperEl = tabsPaneWrapperRef.value;
            if (tabsPaneWrapperEl) {
                fromHeight = el.getBoundingClientRect().height;
                const fromHeightPx = `${fromHeight}px`;
                const applyFromStyle = () => {
                    tabsPaneWrapperEl.style.height = fromHeightPx;
                    tabsPaneWrapperEl.style.maxHeight = fromHeightPx;
                };
                if (!hangingTransition) {
                    hangingTransition = applyFromStyle;
                }
                else {
                    applyFromStyle();
                    hangingTransition();
                    hangingTransition = null;
                }
            }
        }
        function onAnimationEnter(el) {
            const tabsPaneWrapperEl = tabsPaneWrapperRef.value;
            if (tabsPaneWrapperEl) {
                const targetHeight = el.getBoundingClientRect().height;
                const applyTargetStyle = () => {
                    void document.body.offsetHeight;
                    tabsPaneWrapperEl.style.maxHeight = `${targetHeight}px`;
                    tabsPaneWrapperEl.style.height = `${Math.max(fromHeight, targetHeight)}px`;
                };
                if (!hangingTransition) {
                    hangingTransition = applyTargetStyle;
                }
                else {
                    hangingTransition();
                    hangingTransition = null;
                    applyTargetStyle();
                }
            }
        }
        function onAnimationAfterEnter() {
            const tabsPaneWrapperEl = tabsPaneWrapperRef.value;
            if (tabsPaneWrapperEl) {
                tabsPaneWrapperEl.style.maxHeight = '';
                tabsPaneWrapperEl.style.height = '';
                const { paneWrapperStyle } = props;
                if (typeof paneWrapperStyle === 'string') {
                    tabsPaneWrapperEl.style.cssText = paneWrapperStyle;
                }
                else if (paneWrapperStyle) {
                    const { maxHeight, height } = paneWrapperStyle;
                    if (maxHeight !== undefined) {
                        tabsPaneWrapperEl.style.maxHeight = maxHeight;
                    }
                    if (height !== undefined) {
                        tabsPaneWrapperEl.style.height = height;
                    }
                }
            }
        }
        const renderNameListRef = { value: [] };
        const animationDirectionRef = (0, vue_1.ref)('next');
        function activateTab(panelName) {
            const currentValue = mergedValueRef.value;
            let dir = 'next';
            for (const name of renderNameListRef.value) {
                if (name === currentValue) {
                    break;
                }
                if (name === panelName) {
                    dir = 'prev';
                    break;
                }
            }
            animationDirectionRef.value = dir;
            doUpdateValue(panelName);
        }
        function doUpdateValue(panelName) {
            const { onActiveNameChange, onUpdateValue, 'onUpdate:value': _onUpdateValue } = props;
            if (onActiveNameChange) {
                (0, _utils_1.call)(onActiveNameChange, panelName);
            }
            if (onUpdateValue)
                (0, _utils_1.call)(onUpdateValue, panelName);
            if (_onUpdateValue)
                (0, _utils_1.call)(_onUpdateValue, panelName);
            uncontrolledValueRef.value = panelName;
        }
        function handleClose(panelName) {
            const { onClose } = props;
            if (onClose)
                (0, _utils_1.call)(onClose, panelName);
        }
        let firstTimeUpdatePosition = true;
        function updateBarPositionInstantly() {
            const { value: barEl } = barElRef;
            if (!barEl)
                return;
            if (!firstTimeUpdatePosition)
                firstTimeUpdatePosition = false;
            const disableTransitionClassName = 'transition-disabled';
            barEl.classList.add(disableTransitionClassName);
            updateCurrentBarStyle();
            // here we don't need to force layout after update bar style
            // since deriveScrollShadow will force layout
            barEl.classList.remove(disableTransitionClassName);
        }
        const segmentCapsuleElRef = (0, vue_1.ref)(null);
        function updateSegmentPosition({ transitionDisabled }) {
            const tabsEl = tabsElRef.value;
            if (!tabsEl)
                return;
            if (transitionDisabled)
                tabsEl.classList.add('transition-disabled');
            const activeTabEl = getCurrentEl();
            if (activeTabEl && segmentCapsuleElRef.value) {
                // move segment capsule to match the position of the active tab
                segmentCapsuleElRef.value.style.width = `${activeTabEl.offsetWidth}px`;
                segmentCapsuleElRef.value.style.height = `${activeTabEl.offsetHeight}px`;
                segmentCapsuleElRef.value.style.transform = `translateX(${activeTabEl.offsetLeft - (0, seemly_1.depx)(getComputedStyle(tabsEl).paddingLeft)}px)`;
                if (transitionDisabled) {
                    void segmentCapsuleElRef.value.offsetWidth;
                }
            }
            if (transitionDisabled) {
                tabsEl.classList.remove('transition-disabled');
            }
        }
        (0, vue_1.watch)([mergedValueRef], () => {
            if (props.type === 'segment') {
                void (0, vue_1.nextTick)(() => {
                    updateSegmentPosition({
                        transitionDisabled: false
                    });
                });
            }
        });
        (0, vue_1.onMounted)(() => {
            if (props.type === 'segment') {
                updateSegmentPosition({
                    transitionDisabled: true
                });
            }
        });
        let memorizedWidth = 0;
        function _handleNavResize(entry) {
            var _a, _b;
            if (entry.contentRect.width === 0 && entry.contentRect.height === 0) {
                return;
            }
            if (memorizedWidth === entry.contentRect.width) {
                return;
            }
            memorizedWidth = entry.contentRect.width;
            const { type } = props;
            if (type === 'line' || type === 'bar') {
                if (firstTimeUpdatePosition
                    || ((_a = props.justifyContent) === null || _a === void 0 ? void 0 : _a.startsWith('space'))) {
                    updateBarPositionInstantly();
                }
            }
            if (type !== 'segment') {
                const { placement } = props;
                deriveScrollShadow((placement === 'top' || placement === 'bottom'
                    ? (_b = xScrollInstRef.value) === null || _b === void 0 ? void 0 : _b.$el
                    : yScrollElRef.value) || null);
            }
        }
        const handleNavResize = throttle(_handleNavResize, 64);
        (0, vue_1.watch)([() => props.justifyContent, () => props.size], () => {
            void (0, vue_1.nextTick)(() => {
                const { type } = props;
                if (type === 'line' || type === 'bar') {
                    updateBarPositionInstantly();
                }
            });
        });
        const addTabFixedRef = (0, vue_1.ref)(false);
        function _handleTabsResize(entry) {
            var _a;
            const { target, contentRect: { width, height } } = entry;
            const containerWidth = target.parentElement.parentElement.offsetWidth;
            const containerHeight = target.parentElement.parentElement.offsetHeight;
            const { placement } = props;
            if (!addTabFixedRef.value) {
                if (placement === 'top' || placement === 'bottom') {
                    if (containerWidth < width) {
                        addTabFixedRef.value = true;
                    }
                }
                else {
                    if (containerHeight < height) {
                        addTabFixedRef.value = true;
                    }
                }
            }
            else {
                const { value: addTabInst } = addTabInstRef;
                if (!addTabInst)
                    return;
                if (placement === 'top' || placement === 'bottom') {
                    if (containerWidth - width
                        > addTabInst.$el.offsetWidth) {
                        addTabFixedRef.value = false;
                    }
                }
                else {
                    if (containerHeight - height
                        > addTabInst.$el.offsetHeight) {
                        addTabFixedRef.value = false;
                    }
                }
            }
            deriveScrollShadow(((_a = xScrollInstRef.value) === null || _a === void 0 ? void 0 : _a.$el) || null);
        }
        const handleTabsResize = throttle(_handleTabsResize, 64);
        function handleAdd() {
            const { onAdd } = props;
            if (onAdd)
                onAdd();
            void (0, vue_1.nextTick)(() => {
                const currentEl = getCurrentEl();
                const { value: xScrollInst } = xScrollInstRef;
                if (!currentEl || !xScrollInst)
                    return;
                xScrollInst.scrollTo({
                    left: currentEl.offsetLeft,
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        function deriveScrollShadow(el) {
            if (!el)
                return;
            const { placement } = props;
            if (placement === 'top' || placement === 'bottom') {
                const { scrollLeft, scrollWidth, offsetWidth } = el;
                startReachedRef.value = scrollLeft <= 0;
                endReachedRef.value = scrollLeft + offsetWidth >= scrollWidth;
            }
            else {
                const { scrollTop, scrollHeight, offsetHeight } = el;
                startReachedRef.value = scrollTop <= 0;
                endReachedRef.value = scrollTop + offsetHeight >= scrollHeight;
            }
        }
        const handleScroll = throttle((e) => {
            deriveScrollShadow(e.target);
        }, 64);
        (0, vue_1.provide)(interface_1.tabsInjectionKey, {
            triggerRef: (0, vue_1.toRef)(props, 'trigger'),
            tabStyleRef: (0, vue_1.toRef)(props, 'tabStyle'),
            tabClassRef: (0, vue_1.toRef)(props, 'tabClass'),
            addTabStyleRef: (0, vue_1.toRef)(props, 'addTabStyle'),
            addTabClassRef: (0, vue_1.toRef)(props, 'addTabClass'),
            paneClassRef: (0, vue_1.toRef)(props, 'paneClass'),
            paneStyleRef: (0, vue_1.toRef)(props, 'paneStyle'),
            mergedClsPrefixRef,
            typeRef: (0, vue_1.toRef)(props, 'type'),
            closableRef: (0, vue_1.toRef)(props, 'closable'),
            valueRef: mergedValueRef,
            tabChangeIdRef,
            onBeforeLeaveRef: (0, vue_1.toRef)(props, 'onBeforeLeave'),
            activateTab,
            handleClose,
            handleAdd
        });
        (0, vooks_1.onFontsReady)(() => {
            updateCurrentBarStyle();
            updateCurrentScrollPosition();
        });
        // avoid useless rerender
        (0, vue_1.watchEffect)(() => {
            const { value: el } = scrollWrapperElRef;
            if (!el)
                return;
            const { value: clsPrefix } = mergedClsPrefixRef;
            const shadowStartClass = `${clsPrefix}-tabs-nav-scroll-wrapper--shadow-start`;
            const shadowEndClass = `${clsPrefix}-tabs-nav-scroll-wrapper--shadow-end`;
            if (startReachedRef.value) {
                el.classList.remove(shadowStartClass);
            }
            else {
                el.classList.add(shadowStartClass);
            }
            if (endReachedRef.value) {
                el.classList.remove(shadowEndClass);
            }
            else {
                el.classList.add(shadowEndClass);
            }
        });
        const exposedMethods = {
            syncBarPosition: () => {
                updateCurrentBarStyle();
            }
        };
        const handleSegmentResize = () => {
            updateSegmentPosition({
                transitionDisabled: true
            });
        };
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: size } = mergedSizeRef;
            const { type } = props;
            const typeSuffix = {
                card: 'Card',
                bar: 'Bar',
                line: 'Line',
                segment: 'Segment'
            }[type];
            const sizeType = `${size}${typeSuffix}`;
            const { self: { barColor, closeIconColor, closeIconColorHover, closeIconColorPressed, tabColor, tabBorderColor, paneTextColor, tabFontWeight, tabBorderRadius, tabFontWeightActive, colorSegment, fontWeightStrong, tabColorSegment, closeSize, closeIconSize, closeColorHover, closeColorPressed, closeBorderRadius, [(0, _utils_1.createKey)('panePadding', size)]: panePadding, [(0, _utils_1.createKey)('tabPadding', sizeType)]: tabPadding, [(0, _utils_1.createKey)('tabPaddingVertical', sizeType)]: tabPaddingVertical, [(0, _utils_1.createKey)('tabGap', sizeType)]: tabGap, [(0, _utils_1.createKey)('tabGap', `${sizeType}Vertical`)]: tabGapVertical, [(0, _utils_1.createKey)('tabTextColor', type)]: tabTextColor, [(0, _utils_1.createKey)('tabTextColorActive', type)]: tabTextColorActive, [(0, _utils_1.createKey)('tabTextColorHover', type)]: tabTextColorHover, [(0, _utils_1.createKey)('tabTextColorDisabled', type)]: tabTextColorDisabled, [(0, _utils_1.createKey)('tabFontSize', size)]: tabFontSize }, common: { cubicBezierEaseInOut } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-color-segment': colorSegment,
                '--n-bar-color': barColor,
                '--n-tab-font-size': tabFontSize,
                '--n-tab-text-color': tabTextColor,
                '--n-tab-text-color-active': tabTextColorActive,
                '--n-tab-text-color-disabled': tabTextColorDisabled,
                '--n-tab-text-color-hover': tabTextColorHover,
                '--n-pane-text-color': paneTextColor,
                '--n-tab-border-color': tabBorderColor,
                '--n-tab-border-radius': tabBorderRadius,
                '--n-close-size': closeSize,
                '--n-close-icon-size': closeIconSize,
                '--n-close-color-hover': closeColorHover,
                '--n-close-color-pressed': closeColorPressed,
                '--n-close-border-radius': closeBorderRadius,
                '--n-close-icon-color': closeIconColor,
                '--n-close-icon-color-hover': closeIconColorHover,
                '--n-close-icon-color-pressed': closeIconColorPressed,
                '--n-tab-color': tabColor,
                '--n-tab-font-weight': tabFontWeight,
                '--n-tab-font-weight-active': tabFontWeightActive,
                '--n-tab-padding': tabPadding,
                '--n-tab-padding-vertical': tabPaddingVertical,
                '--n-tab-gap': tabGap,
                '--n-tab-gap-vertical': tabGapVertical,
                '--n-pane-padding-left': (0, seemly_1.getPadding)(panePadding, 'left'),
                '--n-pane-padding-right': (0, seemly_1.getPadding)(panePadding, 'right'),
                '--n-pane-padding-top': (0, seemly_1.getPadding)(panePadding, 'top'),
                '--n-pane-padding-bottom': (0, seemly_1.getPadding)(panePadding, 'bottom'),
                '--n-font-weight-strong': fontWeightStrong,
                '--n-tab-color-segment': tabColorSegment
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('tabs', (0, vue_1.computed)(() => {
                return `${mergedSizeRef.value[0]}${props.type[0]}`;
            }), cssVarsRef, props)
            : undefined;
        return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, mergedValue: mergedValueRef, renderedNames: new Set(), segmentCapsuleElRef,
            tabsPaneWrapperRef,
            tabsElRef,
            barElRef,
            addTabInstRef,
            xScrollInstRef,
            scrollWrapperElRef, addTabFixed: addTabFixedRef, tabWrapperStyle: tabWrapperStyleRef, handleNavResize, mergedSize: mergedSizeRef, handleScroll,
            handleTabsResize, cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, animationDirection: animationDirectionRef, renderNameListRef,
            yScrollElRef,
            handleSegmentResize,
            onAnimationBeforeLeave,
            onAnimationEnter,
            onAnimationAfterEnter, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender }, exposedMethods);
    },
    render() {
        const { mergedClsPrefix, type, placement, addTabFixed, addable, mergedSize, renderNameListRef, onRender, paneWrapperClass, paneWrapperStyle, $slots: { default: defaultSlot, prefix: prefixSlot, suffix: suffixSlot } } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const tabPaneChildren = defaultSlot
            ? (0, _utils_1.flatten)(defaultSlot()).filter((v) => {
                return v.type.__TAB_PANE__ === true;
            })
            : [];
        const tabChildren = defaultSlot
            ? (0, _utils_1.flatten)(defaultSlot()).filter((v) => {
                return v.type.__TAB__ === true;
            })
            : [];
        const showPane = !tabChildren.length;
        const isCard = type === 'card';
        const isSegment = type === 'segment';
        const mergedJustifyContent = !isCard && !isSegment && this.justifyContent;
        renderNameListRef.value = [];
        const scrollContent = () => {
            const tabs = ((0, vue_1.h)("div", { style: this.tabWrapperStyle, class: `${mergedClsPrefix}-tabs-wrapper` },
                mergedJustifyContent ? null : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-scroll-padding`, style: placement === 'top' || placement === 'bottom'
                        ? { width: `${this.tabsPadding}px` }
                        : { height: `${this.tabsPadding}px` } })),
                showPane
                    ? tabPaneChildren.map((tabPaneVNode, index) => {
                        renderNameListRef.value.push(tabPaneVNode.props.name);
                        return justifyTabDynamicProps((0, vue_1.h)(Tab_1.default, Object.assign({}, tabPaneVNode.props, { internalCreatedByPane: true, internalLeftPadded: index !== 0
                                && (!mergedJustifyContent
                                    || mergedJustifyContent === 'center'
                                    || mergedJustifyContent === 'start'
                                    || mergedJustifyContent === 'end') }), tabPaneVNode.children
                            ? {
                                default: tabPaneVNode.children.tab
                            }
                            : undefined));
                    })
                    : tabChildren.map((tabVNode, index) => {
                        renderNameListRef.value.push(tabVNode.props.name);
                        if (index !== 0 && !mergedJustifyContent) {
                            return justifyTabDynamicProps(createLeftPaddedTabVNode(tabVNode));
                        }
                        else {
                            return justifyTabDynamicProps(tabVNode);
                        }
                    }),
                !addTabFixed && addable && isCard
                    ? createAddTag(addable, (showPane ? tabPaneChildren.length : tabChildren.length) !== 0)
                    : null,
                mergedJustifyContent ? null : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-scroll-padding`, style: { width: `${this.tabsPadding}px` } }))));
            return ((0, vue_1.h)("div", { ref: "tabsElRef", class: `${mergedClsPrefix}-tabs-nav-scroll-content` },
                isCard && addable ? ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleTabsResize }, {
                    default: () => tabs
                })) : (tabs),
                isCard ? (0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-pad` }) : null,
                isCard ? null : ((0, vue_1.h)("div", { ref: "barElRef", class: `${mergedClsPrefix}-tabs-bar` }))));
        };
        const resolvedPlacement = isSegment ? 'top' : placement;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-tabs`,
                this.themeClass,
                `${mergedClsPrefix}-tabs--${type}-type`,
                `${mergedClsPrefix}-tabs--${mergedSize}-size`,
                mergedJustifyContent && `${mergedClsPrefix}-tabs--flex`,
                `${mergedClsPrefix}-tabs--${resolvedPlacement}`
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: [
                    // the class should be applied here since it's possible
                    // to make tabs nested in tabs, style may influence each
                    // other. adding a class will make it easy to write the
                    // style.
                    `${mergedClsPrefix}-tabs-nav--${type}-type`,
                    `${mergedClsPrefix}-tabs-nav--${resolvedPlacement}`,
                    `${mergedClsPrefix}-tabs-nav`
                ] },
                (0, _utils_1.resolveWrappedSlot)(prefixSlot, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-nav__prefix` }, children))),
                isSegment ? ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleSegmentResize }, {
                    default: () => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-rail`, ref: "tabsElRef" },
                        (0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-capsule`, ref: "segmentCapsuleElRef" },
                            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-wrapper` },
                                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-tab` }))),
                        showPane
                            ? tabPaneChildren.map((tabPaneVNode, index) => {
                                renderNameListRef.value.push(tabPaneVNode.props.name);
                                return ((0, vue_1.h)(Tab_1.default, Object.assign({}, tabPaneVNode.props, { internalCreatedByPane: true, internalLeftPadded: index !== 0 }), tabPaneVNode.children
                                    ? {
                                        default: tabPaneVNode.children.tab
                                    }
                                    : undefined));
                            })
                            : tabChildren.map((tabVNode, index) => {
                                renderNameListRef.value.push(tabVNode.props.name);
                                if (index === 0) {
                                    return tabVNode;
                                }
                                else {
                                    return createLeftPaddedTabVNode(tabVNode);
                                }
                            })))
                })) : ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleNavResize }, {
                    default: () => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-nav-scroll-wrapper`, ref: "scrollWrapperElRef" }, ['top', 'bottom'].includes(resolvedPlacement) ? ((0, vue_1.h)(vueuc_1.VXScroll, { ref: "xScrollInstRef", onScroll: this.handleScroll }, {
                        default: scrollContent
                    })) : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-nav-y-scroll`, onScroll: this.handleScroll, ref: "yScrollElRef" }, scrollContent()))))
                })),
                addTabFixed && addable && isCard
                    ? createAddTag(addable, true)
                    : null,
                (0, _utils_1.resolveWrappedSlot)(suffixSlot, children => children && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-tabs-nav__suffix` }, children)))),
            showPane
                && (this.animated
                    && (resolvedPlacement === 'top' || resolvedPlacement === 'bottom') ? ((0, vue_1.h)("div", { ref: "tabsPaneWrapperRef", style: paneWrapperStyle, class: [`${mergedClsPrefix}-tabs-pane-wrapper`, paneWrapperClass] }, filterMapTabPanes(tabPaneChildren, this.mergedValue, this.renderedNames, this.onAnimationBeforeLeave, this.onAnimationEnter, this.onAnimationAfterEnter, this.animationDirection))) : (filterMapTabPanes(tabPaneChildren, this.mergedValue, this.renderedNames)))));
    }
});
function filterMapTabPanes(tabPaneVNodes, value, renderedNames, onBeforeLeave, onEnter, onAfterEnter, animationDirection) {
    const children = [];
    tabPaneVNodes.forEach((vNode) => {
        const { name, displayDirective, 'display-directive': _displayDirective } = vNode.props;
        const matchDisplayDirective = (directive) => displayDirective === directive || _displayDirective === directive;
        const show = value === name;
        if (vNode.key !== undefined) {
            vNode.key = name;
        }
        if (show
            || matchDisplayDirective('show')
            || (matchDisplayDirective('show:lazy') && renderedNames.has(name))) {
            if (!renderedNames.has(name)) {
                renderedNames.add(name);
            }
            const useVShow = !matchDisplayDirective('if');
            children.push(useVShow ? (0, vue_1.withDirectives)(vNode, [[vue_1.vShow, show]]) : vNode);
        }
    });
    if (!animationDirection) {
        return children;
    }
    return ((0, vue_1.h)(vue_1.TransitionGroup, { name: `${animationDirection}-transition`, onBeforeLeave: onBeforeLeave, onEnter: onEnter, onAfterEnter: onAfterEnter }, { default: () => children }));
}
function createAddTag(addable, internalLeftPadded) {
    return ((0, vue_1.h)(Tab_1.default, { ref: "addTabInstRef", key: "__addable", name: "__addable", internalCreatedByPane: true, internalAddable: true, internalLeftPadded: internalLeftPadded, disabled: typeof addable === 'object' && addable.disabled }));
}
function createLeftPaddedTabVNode(tabVNode) {
    const modifiedVNode = (0, vue_1.cloneVNode)(tabVNode);
    if (modifiedVNode.props) {
        modifiedVNode.props.internalLeftPadded = true;
    }
    else {
        modifiedVNode.props = {
            internalLeftPadded: true
        };
    }
    return modifiedVNode;
}
function justifyTabDynamicProps(tabVNode) {
    if (Array.isArray(tabVNode.dynamicProps)) {
        if (!tabVNode.dynamicProps.includes('internalLeftPadded')) {
            tabVNode.dynamicProps.push('internalLeftPadded');
        }
    }
    else {
        tabVNode.dynamicProps = ['internalLeftPadded'];
    }
    return tabVNode;
}
