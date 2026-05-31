import { camelCase } from 'lodash-es';
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useConfig } from "../../_mixins/index.mjs";
import { useCarouselContext } from "./CarouselContext.mjs";
const CarouselItemName = 'CarouselItem';
export function isCarouselItem(child) {
  var _a;
  return ((_a = child.type) === null || _a === void 0 ? void 0 : _a.name) === CarouselItemName;
}
export default defineComponent({
  name: CarouselItemName,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const NCarousel = useCarouselContext(camelCase(CarouselItemName), `n-${camelCase(CarouselItemName)}`);
    const selfElRef = ref();
    const indexRef = computed(() => {
      const {
        value: selfEl
      } = selfElRef;
      return selfEl ? NCarousel.getSlideIndex(selfEl) : -1;
    });
    const isPrevRef = computed(() => NCarousel.isPrev(indexRef.value));
    const isNextRef = computed(() => NCarousel.isNext(indexRef.value));
    const isActiveRef = computed(() => NCarousel.isActive(indexRef.value));
    const styleRef = computed(() => NCarousel.getSlideStyle(indexRef.value));
    onMounted(() => {
      NCarousel.addSlide(selfElRef.value);
    });
    onBeforeUnmount(() => {
      NCarousel.removeSlide(selfElRef.value);
    });
    function handleClick(event) {
      const {
        value: index
      } = indexRef;
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
    const {
      $slots: slots,
      mergedClsPrefix,
      isPrev,
      isNext,
      isActive,
      index,
      style
    } = this;
    const className = [`${mergedClsPrefix}-carousel__slide`, {
      [`${mergedClsPrefix}-carousel__slide--current`]: isActive,
      [`${mergedClsPrefix}-carousel__slide--prev`]: isPrev,
      [`${mergedClsPrefix}-carousel__slide--next`]: isNext
    }];
    return h("div", {
      ref: "selfElRef",
      class: className,
      role: "option",
      tabindex: "-1",
      "data-index": index,
      "aria-hidden": !isActive,
      style: style,
      // We use ts-ignore for vue-tsc, since it seems to patch native event
      // for vue components
      // @ts-expect-error vue's tsx has type for capture events
      onClickCapture: this.handleClick
    }, (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
      isPrev,
      isNext,
      isActive,
      index
    }));
  }
});