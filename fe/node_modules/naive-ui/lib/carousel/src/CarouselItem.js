"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCarouselItem = isCarouselItem;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const CarouselContext_1 = require("./CarouselContext");
const CarouselItemName = 'CarouselItem';
function isCarouselItem(child) {
    var _a;
    return ((_a = child.type) === null || _a === void 0 ? void 0 : _a.name) === CarouselItemName;
}
exports.default = (0, vue_1.defineComponent)({
    name: CarouselItemName,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        const NCarousel = (0, CarouselContext_1.useCarouselContext)((0, lodash_1.camelCase)(CarouselItemName), `n-${(0, lodash_1.camelCase)(CarouselItemName)}`);
        const selfElRef = (0, vue_1.ref)();
        const indexRef = (0, vue_1.computed)(() => {
            const { value: selfEl } = selfElRef;
            return selfEl ? NCarousel.getSlideIndex(selfEl) : -1;
        });
        const isPrevRef = (0, vue_1.computed)(() => NCarousel.isPrev(indexRef.value));
        const isNextRef = (0, vue_1.computed)(() => NCarousel.isNext(indexRef.value));
        const isActiveRef = (0, vue_1.computed)(() => NCarousel.isActive(indexRef.value));
        const styleRef = (0, vue_1.computed)(() => NCarousel.getSlideStyle(indexRef.value));
        (0, vue_1.onMounted)(() => {
            NCarousel.addSlide(selfElRef.value);
        });
        (0, vue_1.onBeforeUnmount)(() => {
            NCarousel.removeSlide(selfElRef.value);
        });
        function handleClick(event) {
            const { value: index } = indexRef;
            if (index !== undefined) {
                NCarousel === null || NCarousel === void 0 ? void 0 : NCarousel.onCarouselItemClick(index, event);
            }
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            selfElRef,
            isPrev: isPrevRef,
            isNext: isNextRef,
            isActive: isActiveRef,
            index: indexRef,
            style: styleRef,
            handleClick
        };
    },
    render() {
        var _a;
        const { $slots: slots, mergedClsPrefix, isPrev, isNext, isActive, index, style } = this;
        const className = [
            `${mergedClsPrefix}-carousel__slide`,
            {
                [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
                [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
                [`${mergedClsPrefix}-carousel__slide--next`]: isNext
            }
        ];
        return ((0, vue_1.h)("div", { ref: "selfElRef", class: className, role: "option", tabindex: "-1", "data-index": index, "aria-hidden": !isActive, style: style, 
            // We use ts-ignore for vue-tsc, since it seems to patch native event
            // for vue components
            // @ts-expect-error vue's tsx has type for capture events
            onClickCapture: this.handleClick }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
            isPrev,
            isNext,
            isActive,
            index
        })));
    }
});
