"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselProps = void 0;
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const CarouselArrow_1 = __importDefault(require("./CarouselArrow"));
const CarouselContext_1 = require("./CarouselContext");
const CarouselDots_1 = __importDefault(require("./CarouselDots"));
const CarouselItem_1 = __importStar(require("./CarouselItem"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const utils_1 = require("./utils");
const transitionProperties = [
    'transitionDuration',
    'transitionTimingFunction'
];
exports.carouselProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { defaultIndex: {
        type: Number,
        default: 0
    }, currentIndex: Number, showArrow: Boolean, dotType: {
        type: String,
        default: 'dot'
    }, dotPlacement: {
        type: String,
        default: 'bottom'
    }, slidesPerView: {
        type: [Number, String],
        default: 1
    }, spaceBetween: {
        type: Number,
        default: 0
    }, centeredSlides: Boolean, direction: {
        type: String,
        default: 'horizontal'
    }, autoplay: Boolean, interval: {
        type: Number,
        default: 5000
    }, loop: {
        type: Boolean,
        default: true
    }, effect: {
        type: String,
        default: 'slide'
    }, showDots: {
        type: Boolean,
        default: true
    }, trigger: {
        type: String,
        default: 'click'
    }, transitionStyle: {
        type: Object,
        default: () => ({
            transitionDuration: '300ms'
        })
    }, transitionProps: Object, draggable: Boolean, prevSlideStyle: [Object, String], nextSlideStyle: [Object, String], touchable: {
        type: Boolean,
        default: true
    }, mousewheel: Boolean, keyboard: Boolean, 'onUpdate:currentIndex': Function, onUpdateCurrentIndex: Function });
// only one carousel is allowed to trigger touch globally
let globalDragging = false;
exports.default = (0, vue_1.defineComponent)({
    name: 'Carousel',
    props: exports.carouselProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        // Dom
        const selfElRef = (0, vue_1.ref)(null);
        const slidesElRef = (0, vue_1.ref)(null);
        const slideElsRef = (0, vue_1.ref)([]);
        const slideVNodesRef = { value: [] };
        // Computed states
        const verticalRef = (0, vue_1.computed)(() => props.direction === 'vertical');
        const sizeAxisRef = (0, vue_1.computed)(() => (verticalRef.value ? 'height' : 'width'));
        const spaceAxisRef = (0, vue_1.computed)(() => verticalRef.value ? 'bottom' : 'right');
        const sequenceLayoutRef = (0, vue_1.computed)(() => props.effect === 'slide');
        const duplicatedableRef = (0, vue_1.computed)(
        // duplicate the copy operation in `slide` mode,
        // because only its DOM is sequence layout
        () => props.loop && props.slidesPerView === 1 && sequenceLayoutRef.value);
        // user wants to control the transition animation
        const userWantsControlRef = (0, vue_1.computed)(() => props.effect === 'custom');
        // used to calculate total views
        const displaySlidesPerViewRef = (0, vue_1.computed)(() => !sequenceLayoutRef.value || props.centeredSlides ? 1 : props.slidesPerView);
        // used to calculate the size of each slide
        const realSlidesPerViewRef = (0, vue_1.computed)(() => userWantsControlRef.value ? 1 : props.slidesPerView);
        // we automatically calculate total view for special slides per view
        const autoSlideSizeRef = (0, vue_1.computed)(() => displaySlidesPerViewRef.value === 'auto'
            || (props.slidesPerView === 'auto' && props.centeredSlides));
        // Carousel size
        const perViewSizeRef = (0, vue_1.ref)({ width: 0, height: 0 });
        const slideSizesTrigger = (0, vue_1.ref)(0);
        const slideSizesRef = (0, vue_1.computed)(() => {
            const { value: slidesEls } = slideElsRef;
            if (!slidesEls.length)
                return [];
            // eslint-disable-next-line ts/no-unused-expressions
            slideSizesTrigger.value;
            const { value: autoSlideSize } = autoSlideSizeRef;
            if (autoSlideSize) {
                return slidesEls.map(slide => (0, utils_1.calculateSize)(slide));
            }
            const { value: slidesPerView } = realSlidesPerViewRef;
            const { value: perViewSize } = perViewSizeRef;
            const { value: axis } = sizeAxisRef;
            let axisSize = perViewSize[axis];
            if (slidesPerView !== 'auto') {
                const { spaceBetween } = props;
                const remaining = axisSize - (slidesPerView - 1) * spaceBetween;
                const percentage = 1 / Math.max(1, slidesPerView);
                axisSize = remaining * percentage;
            }
            const slideSize = Object.assign(Object.assign({}, perViewSize), { [axis]: axisSize });
            return slidesEls.map(() => slideSize);
        });
        // The translate required to reach each slide
        const slideTranlatesRef = (0, vue_1.computed)(() => {
            const { value: slideSizes } = slideSizesRef;
            if (!slideSizes.length)
                return [];
            const { centeredSlides, spaceBetween } = props;
            const { value: axis } = sizeAxisRef;
            const { [axis]: perViewSize } = perViewSizeRef.value;
            let previousTranslate = 0;
            return slideSizes.map(({ [axis]: slideSize }) => {
                let translate = previousTranslate;
                if (centeredSlides) {
                    translate += (slideSize - perViewSize) / 2;
                }
                previousTranslate += slideSize + spaceBetween;
                return translate;
            });
        });
        // Styles
        const isMountedRef = (0, vue_1.ref)(false);
        const transitionStyleRef = (0, vue_1.computed)(() => {
            const { transitionStyle } = props;
            return transitionStyle
                ? (0, _utils_1.keep)(transitionStyle, transitionProperties)
                : {};
        });
        const speedRef = (0, vue_1.computed)(() => userWantsControlRef.value
            ? 0
            : (0, utils_1.resolveSpeed)(transitionStyleRef.value.transitionDuration));
        const slideStylesRef = (0, vue_1.computed)(() => {
            const { value: slidesEls } = slideElsRef;
            if (!slidesEls.length)
                return [];
            const useComputedSize = !(autoSlideSizeRef.value || realSlidesPerViewRef.value === 1);
            const getSlideSize = (index) => {
                if (useComputedSize) {
                    const { value: axis } = sizeAxisRef;
                    return {
                        [axis]: `${slideSizesRef.value[index][axis]}px`
                    };
                }
            };
            if (userWantsControlRef.value) {
                // We center each slide when user wants to control the transition animation,
                // so there is no need to calculate the offset
                return slidesEls.map((_, i) => getSlideSize(i));
            }
            const { effect, spaceBetween } = props;
            const { value: spaceAxis } = spaceAxisRef;
            return slidesEls.reduce((styles, _, i) => {
                const style = Object.assign(Object.assign({}, getSlideSize(i)), { [`margin-${spaceAxis}`]: `${spaceBetween}px` });
                styles.push(style);
                if (isMountedRef.value && (effect === 'fade' || effect === 'card')) {
                    Object.assign(style, transitionStyleRef.value);
                }
                return styles;
            }, []);
        });
        // Total
        const totalViewRef = (0, vue_1.computed)(() => {
            const { value: slidesPerView } = displaySlidesPerViewRef;
            const { length: totalSlides } = slideElsRef.value;
            if (slidesPerView !== 'auto') {
                return Math.max(totalSlides - slidesPerView, 0) + 1;
            }
            else {
                const { value: slideSizes } = slideSizesRef;
                const { length } = slideSizes;
                if (!length)
                    return totalSlides;
                const { value: translates } = slideTranlatesRef;
                const { value: axis } = sizeAxisRef;
                const perViewSize = perViewSizeRef.value[axis];
                let lastViewSize = slideSizes[slideSizes.length - 1][axis];
                let i = length;
                while (i > 1 && lastViewSize < perViewSize) {
                    i--;
                    lastViewSize += translates[i] - translates[i - 1];
                }
                return (0, utils_1.clampValue)(i + 1, 1, length);
            }
        });
        const displayTotalViewRef = (0, vue_1.computed)(() => (0, utils_1.getDisplayTotalView)(totalViewRef.value, duplicatedableRef.value));
        // Index
        const defaultRealIndex = (0, utils_1.getRealIndex)(props.defaultIndex, duplicatedableRef.value);
        const uncontrolledDisplayIndexRef = (0, vue_1.ref)((0, utils_1.getDisplayIndex)(defaultRealIndex, totalViewRef.value, duplicatedableRef.value));
        const mergedDisplayIndexRef = (0, vooks_1.useMergedState)((0, vue_1.toRef)(props, 'currentIndex'), uncontrolledDisplayIndexRef);
        const realIndexRef = (0, vue_1.computed)(() => (0, utils_1.getRealIndex)(mergedDisplayIndexRef.value, duplicatedableRef.value));
        // Reality methods
        function toRealIndex(index) {
            var _a, _b;
            index = (0, utils_1.clampValue)(index, 0, totalViewRef.value - 1);
            const displayIndex = (0, utils_1.getDisplayIndex)(index, totalViewRef.value, duplicatedableRef.value);
            const { value: lastDisplayIndex } = mergedDisplayIndexRef;
            if (displayIndex !== mergedDisplayIndexRef.value) {
                uncontrolledDisplayIndexRef.value = displayIndex;
                (_a = props['onUpdate:currentIndex']) === null || _a === void 0 ? void 0 : _a.call(props, displayIndex, lastDisplayIndex);
                (_b = props.onUpdateCurrentIndex) === null || _b === void 0 ? void 0 : _b.call(props, displayIndex, lastDisplayIndex);
            }
        }
        function getRealPrevIndex(index = realIndexRef.value) {
            return (0, utils_1.getPrevIndex)(index, totalViewRef.value, props.loop);
        }
        function getRealNextIndex(index = realIndexRef.value) {
            return (0, utils_1.getNextIndex)(index, totalViewRef.value, props.loop);
        }
        function isRealPrev(slideOrIndex) {
            const index = getSlideIndex(slideOrIndex);
            return (index !== null && getRealPrevIndex() === index && totalViewRef.value > 1);
        }
        function isRealNext(slideOrIndex) {
            const index = getSlideIndex(slideOrIndex);
            return (index !== null && getRealNextIndex() === index && totalViewRef.value > 1);
        }
        function isRealActive(slideOrIndex) {
            return realIndexRef.value === getSlideIndex(slideOrIndex);
        }
        // Display methods
        // They are used to deal with the actual values displayed on the UI
        function isDisplayActive(index) {
            return mergedDisplayIndexRef.value === index;
        }
        function isPrevDisabled() {
            return getRealPrevIndex() === null;
        }
        function isNextDisabled() {
            return getRealNextIndex() === null;
        }
        // To
        let expectedTransitionDirection = 0;
        function to(index) {
            const realIndex = (0, utils_1.clampValue)((0, utils_1.getRealIndex)(index, duplicatedableRef.value), 0, totalViewRef.value);
            if (index !== mergedDisplayIndexRef.value
                || realIndex !== realIndexRef.value) {
                toRealIndex(realIndex);
            }
        }
        function prev() {
            const prevIndex = getRealPrevIndex();
            if (prevIndex !== null) {
                expectedTransitionDirection = -1;
                toRealIndex(prevIndex);
            }
        }
        function next() {
            const nextIndex = getRealNextIndex();
            if (nextIndex !== null) {
                expectedTransitionDirection = 1;
                toRealIndex(nextIndex);
            }
        }
        // Translate to
        let inTransition = false;
        function prevIfSlideTransitionEnd() {
            if (!inTransition || !duplicatedableRef.value)
                prev();
        }
        function nextIfSlideTransitionEnd() {
            if (!inTransition || !duplicatedableRef.value)
                next();
        }
        // record the translate of each slide, so that it can be restored at touch
        let previousTranslate = 0;
        const translateStyleRef = (0, vue_1.ref)({});
        function updateTranslate(translate, speed = 0) {
            translateStyleRef.value = Object.assign({}, transitionStyleRef.value, {
                transform: verticalRef.value
                    ? `translateY(${-translate}px)`
                    : `translateX(${-translate}px)`,
                transitionDuration: `${speed}ms`
            });
        }
        function fixTranslate(speed = 0) {
            if (sequenceLayoutRef.value) {
                translateTo(realIndexRef.value, speed);
            }
            else if (previousTranslate !== 0) {
                if (!inTransition && speed > 0) {
                    inTransition = true;
                }
                updateTranslate((previousTranslate = 0), speed);
            }
        }
        function translateTo(index, speed) {
            const translate = getTranslate(index);
            if (translate !== previousTranslate && speed > 0) {
                inTransition = true;
            }
            previousTranslate = getTranslate(realIndexRef.value);
            updateTranslate(translate, speed);
        }
        function getTranslate(index) {
            let translate;
            // Deal with auto slides pre view
            if (index >= totalViewRef.value - 1) {
                translate = getLastViewTranslate();
            }
            else {
                translate = slideTranlatesRef.value[index] || 0;
            }
            return translate;
        }
        function getLastViewTranslate() {
            if (displaySlidesPerViewRef.value === 'auto') {
                const { value: axis } = sizeAxisRef;
                const { [axis]: perViewSize } = perViewSizeRef.value;
                const { value: translates } = slideTranlatesRef;
                const lastTranslate = translates[translates.length - 1];
                let overallSize;
                if (lastTranslate === undefined) {
                    overallSize = perViewSize;
                }
                else {
                    const { value: slideSizes } = slideSizesRef;
                    overallSize = lastTranslate + slideSizes[slideSizes.length - 1][axis];
                }
                // Bring the last slide to the edge
                return overallSize - perViewSize;
            }
            else {
                const { value: translates } = slideTranlatesRef;
                return translates[totalViewRef.value - 1] || 0;
            }
        }
        // Provide
        const carouselContext = {
            currentIndexRef: mergedDisplayIndexRef,
            to,
            prev: prevIfSlideTransitionEnd,
            next: nextIfSlideTransitionEnd,
            isVertical: () => verticalRef.value,
            isHorizontal: () => !verticalRef.value,
            isPrev: isRealPrev,
            isNext: isRealNext,
            isActive: isRealActive,
            isPrevDisabled,
            isNextDisabled,
            getSlideIndex,
            getSlideStyle,
            addSlide,
            removeSlide,
            onCarouselItemClick
        };
        (0, CarouselContext_1.provideCarouselContext)(carouselContext);
        function addSlide(slide) {
            if (!slide)
                return;
            slideElsRef.value.push(slide);
        }
        function removeSlide(slide) {
            if (!slide)
                return;
            const index = getSlideIndex(slide);
            if (index !== -1) {
                slideElsRef.value.splice(index, 1);
            }
        }
        function getSlideIndex(slideOrIndex) {
            return typeof slideOrIndex === 'number'
                ? slideOrIndex
                : slideOrIndex
                    ? slideElsRef.value.indexOf(slideOrIndex)
                    : -1;
        }
        function getSlideStyle(slide) {
            const index = getSlideIndex(slide);
            if (index !== -1) {
                const styles = [slideStylesRef.value[index]];
                const isPrev = carouselContext.isPrev(index);
                const isNext = carouselContext.isNext(index);
                if (isPrev) {
                    styles.push(props.prevSlideStyle || '');
                }
                if (isNext) {
                    styles.push(props.nextSlideStyle || '');
                }
                return (0, vue_1.normalizeStyle)(styles);
            }
        }
        // Drag
        let dragStartX = 0;
        let dragStartY = 0;
        let dragOffset = 0;
        let dragStartTime = 0;
        let dragging = false;
        let isEffectiveDrag = false;
        function onCarouselItemClick(index, event) {
            let allowClick = !inTransition && !dragging && !isEffectiveDrag;
            if (props.effect === 'card' && allowClick && !isRealActive(index)) {
                to(index);
                allowClick = false;
            }
            if (!allowClick) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        // Autoplay
        let autoplayTimer = null;
        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }
        function resetAutoplay() {
            stopAutoplay();
            const disabled = !props.autoplay || displayTotalViewRef.value < 2;
            if (!disabled) {
                autoplayTimer = window.setInterval(next, props.interval);
            }
        }
        function handleTouchstart(event) {
            var _a;
            if (globalDragging)
                return;
            if (!((_a = slidesElRef.value) === null || _a === void 0 ? void 0 : _a.contains((0, seemly_1.getPreciseEventTarget)(event)))) {
                return;
            }
            globalDragging = true;
            dragging = true;
            isEffectiveDrag = false;
            dragStartTime = Date.now();
            stopAutoplay();
            if (event.type !== 'touchstart'
                && !event.target.isContentEditable) {
                event.preventDefault();
            }
            const touchEvent = (0, utils_1.isTouchEvent)(event) ? event.touches[0] : event;
            if (verticalRef.value) {
                dragStartY = touchEvent.clientY;
            }
            else {
                dragStartX = touchEvent.clientX;
            }
            if (props.touchable) {
                (0, evtd_1.on)('touchmove', document, handleTouchmove);
                (0, evtd_1.on)('touchend', document, handleTouchend);
                (0, evtd_1.on)('touchcancel', document, handleTouchend);
            }
            if (props.draggable) {
                (0, evtd_1.on)('mousemove', document, handleTouchmove);
                (0, evtd_1.on)('mouseup', document, handleTouchend);
            }
        }
        function handleTouchmove(event) {
            const { value: vertical } = verticalRef;
            const { value: axis } = sizeAxisRef;
            const touchEvent = (0, utils_1.isTouchEvent)(event) ? event.touches[0] : event;
            const offset = vertical
                ? touchEvent.clientY - dragStartY
                : touchEvent.clientX - dragStartX;
            const perViewSize = perViewSizeRef.value[axis];
            dragOffset = (0, utils_1.clampValue)(offset, -perViewSize, perViewSize);
            if (event.cancelable) {
                event.preventDefault();
            }
            if (sequenceLayoutRef.value) {
                updateTranslate(previousTranslate - dragOffset, 0);
            }
        }
        function handleTouchend() {
            const { value: realIndex } = realIndexRef;
            let currentIndex = realIndex;
            if (!inTransition && dragOffset !== 0 && sequenceLayoutRef.value) {
                const currentTranslate = previousTranslate - dragOffset;
                const translates = [
                    ...slideTranlatesRef.value.slice(0, totalViewRef.value - 1),
                    getLastViewTranslate()
                ];
                let prevOffset = null;
                for (let i = 0; i < translates.length; i++) {
                    const offset = Math.abs(translates[i] - currentTranslate);
                    if (prevOffset !== null && prevOffset < offset) {
                        break;
                    }
                    prevOffset = offset;
                    currentIndex = i;
                }
            }
            if (currentIndex === realIndex) {
                const timeElapsed = Date.now() - dragStartTime;
                const { value: axis } = sizeAxisRef;
                const perViewSize = perViewSizeRef.value[axis];
                // more than 50% width or faster than 0.4px per ms
                if (dragOffset > perViewSize / 2 || dragOffset / timeElapsed > 0.4) {
                    prev();
                }
                else if (dragOffset < -perViewSize / 2
                    || dragOffset / timeElapsed < -0.4) {
                    next();
                }
            }
            if (currentIndex !== null && currentIndex !== realIndex) {
                isEffectiveDrag = true;
                toRealIndex(currentIndex);
                void (0, vue_1.nextTick)(() => {
                    if (!duplicatedableRef.value
                        || uncontrolledDisplayIndexRef.value !== mergedDisplayIndexRef.value) {
                        fixTranslate(speedRef.value);
                    }
                });
            }
            else {
                fixTranslate(speedRef.value);
            }
            resetDragStatus();
            resetAutoplay();
        }
        function resetDragStatus() {
            if (dragging) {
                globalDragging = false;
            }
            dragging = false;
            dragStartX = 0;
            dragStartY = 0;
            dragOffset = 0;
            dragStartTime = 0;
            (0, evtd_1.off)('touchmove', document, handleTouchmove);
            (0, evtd_1.off)('touchend', document, handleTouchend);
            (0, evtd_1.off)('touchcancel', document, handleTouchend);
            (0, evtd_1.off)('mousemove', document, handleTouchmove);
            (0, evtd_1.off)('mouseup', document, handleTouchend);
        }
        function handleTransitionEnd() {
            if (sequenceLayoutRef.value && inTransition) {
                const { value: realIndex } = realIndexRef;
                translateTo(realIndex, 0);
            }
            else {
                resetAutoplay();
            }
            if (sequenceLayoutRef.value) {
                translateStyleRef.value.transitionDuration = '0ms';
            }
            inTransition = false;
        }
        function handleMousewheel(event) {
            event.preventDefault();
            if (inTransition)
                return;
            let { deltaX, deltaY } = event;
            if (event.shiftKey && !deltaX) {
                deltaX = deltaY;
            }
            const prevMultiplier = -1;
            const nextMultiplier = 1;
            const m = (deltaX || deltaY) > 0 ? nextMultiplier : prevMultiplier;
            let rx = 0;
            let ry = 0;
            if (verticalRef.value) {
                ry = m;
            }
            else {
                rx = m;
            }
            const responseStep = 10;
            if (ry * deltaY >= responseStep || rx * deltaX >= responseStep) {
                if (m === nextMultiplier && !isNextDisabled()) {
                    next();
                }
                else if (m === prevMultiplier && !isPrevDisabled()) {
                    prev();
                }
            }
        }
        function handleResize() {
            perViewSizeRef.value = (0, utils_1.calculateSize)(selfElRef.value, true);
            resetAutoplay();
        }
        function handleSlideResize() {
            if (autoSlideSizeRef.value) {
                slideSizesTrigger.value++;
            }
        }
        function handleMouseenter() {
            if (props.autoplay) {
                stopAutoplay();
            }
        }
        function handleMouseleave() {
            if (props.autoplay) {
                resetAutoplay();
            }
        }
        (0, vue_1.onMounted)(() => {
            (0, vue_1.watchEffect)(resetAutoplay);
            requestAnimationFrame(() => (isMountedRef.value = true));
        });
        (0, vue_1.onBeforeUnmount)(() => {
            resetDragStatus();
            stopAutoplay();
        });
        // Fix index when remounting
        (0, vue_1.onUpdated)(() => {
            const { value: slidesEls } = slideElsRef;
            const { value: slideVNodes } = slideVNodesRef;
            const indexMap = new Map();
            const getDisplayIndex = (el) => indexMap.has(el) ? indexMap.get(el) : -1;
            let isChanged = false;
            for (let i = 0; i < slidesEls.length; i++) {
                const index = slideVNodes.findIndex(v => v.el === slidesEls[i]);
                if (index !== i) {
                    isChanged = true;
                }
                indexMap.set(slidesEls[i], index);
            }
            if (isChanged) {
                slidesEls.sort((a, b) => getDisplayIndex(a) - getDisplayIndex(b));
            }
        });
        (0, vue_1.watch)(realIndexRef, (nextRealIndex, lastRealIndex) => {
            if (nextRealIndex === lastRealIndex) {
                expectedTransitionDirection = 0;
                return;
            }
            resetAutoplay();
            if (sequenceLayoutRef.value) {
                if (duplicatedableRef.value) {
                    const { value: length } = totalViewRef;
                    if (expectedTransitionDirection === -1
                        && lastRealIndex === 1
                        && nextRealIndex === length - 2) {
                        nextRealIndex = 0;
                    }
                    else if (expectedTransitionDirection === 1
                        && lastRealIndex === length - 2
                        && nextRealIndex === 1) {
                        nextRealIndex = length - 1;
                    }
                }
                translateTo(nextRealIndex, speedRef.value);
            }
            else {
                fixTranslate();
            }
            expectedTransitionDirection = 0;
        }, { immediate: true });
        (0, vue_1.watch)([duplicatedableRef, displaySlidesPerViewRef], () => void (0, vue_1.nextTick)(() => {
            toRealIndex(realIndexRef.value);
        }));
        (0, vue_1.watch)(slideTranlatesRef, () => {
            if (sequenceLayoutRef.value) {
                fixTranslate();
            }
        }, {
            deep: true
        });
        (0, vue_1.watch)(sequenceLayoutRef, (value) => {
            if (!value) {
                inTransition = false;
                // if the current mode does not support translate, reset the position of the wrapper
                updateTranslate((previousTranslate = 0));
            }
            else {
                fixTranslate();
            }
        });
        const slidesControlListenersRef = (0, vue_1.computed)(() => {
            return {
                onTouchstartPassive: props.touchable ? handleTouchstart : undefined,
                onMousedown: props.draggable ? handleTouchstart : undefined,
                onWheel: props.mousewheel ? handleMousewheel : undefined
            };
        });
        const arrowSlotPropsRef = (0, vue_1.computed)(() => (Object.assign(Object.assign({}, (0, _utils_1.keep)(carouselContext, [
            'to',
            'prev',
            'next',
            'isPrevDisabled',
            'isNextDisabled'
        ])), { total: displayTotalViewRef.value, currentIndex: mergedDisplayIndexRef.value })));
        const dotSlotPropsRef = (0, vue_1.computed)(() => ({
            total: displayTotalViewRef.value,
            currentIndex: mergedDisplayIndexRef.value,
            to: carouselContext.to
        }));
        const caroulseExposedMethod = {
            getCurrentIndex: () => mergedDisplayIndexRef.value,
            to,
            prev,
            next
        };
        const themeRef = (0, _mixins_1.useTheme)('Carousel', '-carousel', index_cssr_1.default, styles_1.carouselLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { dotSize, dotColor, dotColorActive, dotColorFocus, dotLineWidth, dotLineWidthActive, arrowColor } } = themeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-dot-color': dotColor,
                '--n-dot-color-focus': dotColorFocus,
                '--n-dot-color-active': dotColorActive,
                '--n-dot-size': dotSize,
                '--n-dot-line-width': dotLineWidth,
                '--n-dot-line-width-active': dotLineWidthActive,
                '--n-arrow-color': arrowColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('carousel', undefined, cssVarsRef, props)
            : undefined;
        return Object.assign(Object.assign({ mergedClsPrefix: mergedClsPrefixRef, selfElRef,
            slidesElRef, slideVNodes: slideVNodesRef, duplicatedable: duplicatedableRef, userWantsControl: userWantsControlRef, autoSlideSize: autoSlideSizeRef, realIndex: realIndexRef, slideStyles: slideStylesRef, translateStyle: translateStyleRef, slidesControlListeners: slidesControlListenersRef, handleTransitionEnd,
            handleResize,
            handleSlideResize,
            handleMouseenter,
            handleMouseleave, isActive: isDisplayActive, arrowSlotProps: arrowSlotPropsRef, dotSlotProps: dotSlotPropsRef }, caroulseExposedMethod), { cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        var _a;
        const { mergedClsPrefix, showArrow, userWantsControl, slideStyles, dotType, dotPlacement, slidesControlListeners, transitionProps = {}, arrowSlotProps, dotSlotProps, $slots: { default: defaultSlot, dots: dotsSlot, arrow: arrowSlot } } = this;
        const children = (defaultSlot && (0, _utils_1.flatten)(defaultSlot())) || [];
        let slides = filterCarouselItem(children);
        if (!slides.length) {
            slides = children.map(ch => ((0, vue_1.h)(CarouselItem_1.default, null, {
                default: () => (0, vue_1.cloneVNode)(ch)
            })));
        }
        if (this.duplicatedable) {
            slides = (0, utils_1.addDuplicateSlides)(slides);
        }
        this.slideVNodes.value = slides;
        // When users need to customize the size of the slide,
        // we listen to them to fix the current translate
        if (this.autoSlideSize) {
            slides = slides.map(slide => ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleSlideResize }, {
                default: () => slide
            })));
        }
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", Object.assign({ ref: "selfElRef", class: [
                this.themeClass,
                `${mergedClsPrefix}-carousel`,
                this.direction === 'vertical'
                    && `${mergedClsPrefix}-carousel--vertical`,
                this.showArrow && `${mergedClsPrefix}-carousel--show-arrow`,
                `${mergedClsPrefix}-carousel--${dotPlacement}`,
                `${mergedClsPrefix}-carousel--${this.direction}`,
                `${mergedClsPrefix}-carousel--${this.effect}`,
                userWantsControl && `${mergedClsPrefix}-carousel--usercontrol`
            ], style: this.cssVars }, slidesControlListeners, { onMouseenter: this.handleMouseenter, onMouseleave: this.handleMouseleave }),
            (0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleResize }, {
                default: () => ((0, vue_1.h)("div", { ref: "slidesElRef", class: `${mergedClsPrefix}-carousel__slides`, role: "listbox", style: this.translateStyle, onTransitionend: this.handleTransitionEnd }, userWantsControl
                    ? slides.map((slide, i) => ((0, vue_1.h)("div", { style: slideStyles[i], key: i }, (0, vue_1.withDirectives)((0, vue_1.h)(vue_1.Transition, Object.assign({}, transitionProps), {
                        default: () => slide
                    }), [[vue_1.vShow, this.isActive(i)]]))))
                    : slides))
            }),
            this.showDots
                && dotSlotProps.total > 1
                && (0, _utils_1.resolveSlotWithTypedProps)(dotsSlot, dotSlotProps, () => [
                    (0, vue_1.h)(CarouselDots_1.default, { key: dotType + dotPlacement, total: dotSlotProps.total, currentIndex: dotSlotProps.currentIndex, dotType: dotType, trigger: this.trigger, keyboard: this.keyboard })
                ]),
            showArrow
                && (0, _utils_1.resolveSlotWithTypedProps)(arrowSlot, arrowSlotProps, () => [
                    (0, vue_1.h)(CarouselArrow_1.default, null)
                ])));
    }
});
function filterCarouselItem(vnodes) {
    return vnodes.reduce((carouselItems, vnode) => {
        if ((0, CarouselItem_1.isCarouselItem)(vnode)) {
            carouselItems.push(vnode);
        }
        return carouselItems;
    }, []);
}
