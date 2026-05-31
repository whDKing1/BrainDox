"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const CarouselContext_1 = require("./CarouselContext");
const carouselDotsProps = {
    total: {
        type: Number,
        default: 0
    },
    currentIndex: {
        type: Number,
        default: 0
    },
    dotType: {
        type: String,
        default: 'dot'
    },
    trigger: {
        type: String,
        default: 'click'
    },
    keyboard: Boolean
};
exports.default = (0, vue_1.defineComponent)({
    name: 'CarouselDots',
    props: carouselDotsProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const dotElsRef = (0, vue_1.ref)([]);
        const NCarousel = (0, CarouselContext_1.useCarouselContext)();
        function handleKeydown(e, current) {
            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    NCarousel.to(current);
                    return;
            }
            if (props.keyboard) {
                handleKeyboard(e);
            }
        }
        function handleMouseenter(current) {
            if (props.trigger === 'hover') {
                NCarousel.to(current);
            }
        }
        function handleClick(current) {
            if (props.trigger === 'click') {
                NCarousel.to(current);
            }
        }
        function handleKeyboard(e) {
            var _a;
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            const nodeName = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.nodeName.toLowerCase();
            if (nodeName === 'input' || nodeName === 'textarea') {
                return;
            }
            const { code: keycode } = e;
            const isVerticalNext = keycode === 'PageUp' || keycode === 'ArrowUp';
            const isVerticalPrev = keycode === 'PageDown' || keycode === 'ArrowDown';
            const isHorizontalNext = keycode === 'PageUp' || keycode === 'ArrowRight';
            const isHorizontalPrev = keycode === 'PageDown' || keycode === 'ArrowLeft';
            const vertical = NCarousel.isVertical();
            const wantToNext = vertical ? isVerticalNext : isHorizontalNext;
            const wantToPrev = vertical ? isVerticalPrev : isHorizontalPrev;
            if (!wantToNext && !wantToPrev) {
                return;
            }
            e.preventDefault();
            if (wantToNext && !NCarousel.isNextDisabled()) {
                NCarousel.next();
                focusDot(NCarousel.currentIndexRef.value);
            }
            else if (wantToPrev && !NCarousel.isPrevDisabled()) {
                NCarousel.prev();
                focusDot(NCarousel.currentIndexRef.value);
            }
        }
        function focusDot(index) {
            var _a;
            (_a = dotElsRef.value[index]) === null || _a === void 0 ? void 0 : _a.focus();
        }
        (0, vue_1.onBeforeUpdate)(() => (dotElsRef.value.length = 0));
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            dotEls: dotElsRef,
            handleKeydown,
            handleMouseenter,
            handleClick
        };
    },
    render() {
        const { mergedClsPrefix, dotEls } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-carousel__dots`,
                `${mergedClsPrefix}-carousel__dots--${this.dotType}`
            ], role: "tablist" }, (0, seemly_1.indexMap)(this.total, (i) => {
            const selected = i === this.currentIndex;
            return ((0, vue_1.h)("div", { "aria-selected": selected, ref: el => dotEls.push(el), role: "button", tabindex: "0", class: [
                    `${mergedClsPrefix}-carousel__dot`,
                    selected && `${mergedClsPrefix}-carousel__dot--active`
                ], key: i, onClick: () => {
                    this.handleClick(i);
                }, onMouseenter: () => {
                    this.handleMouseenter(i);
                }, onKeydown: (e) => {
                    this.handleKeydown(e, i);
                } }));
        })));
    }
});
