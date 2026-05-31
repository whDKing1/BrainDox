import { defineComponent, h } from 'vue';
import { useConfig } from "../../_mixins/index.mjs";
import { useCarouselContext } from "./CarouselContext.mjs";
function renderBackwardIcon() {
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none"
  }, h("path", {
    d: "M10.26 3.2a.75.75 0 0 1 .04 1.06L6.773 8l3.527 3.74a.75.75 0 1 1-1.1 1.02l-4-4.25a.75.75 0 0 1 0-1.02l4-4.25a.75.75 0 0 1 1.06-.04z",
    fill: "currentColor"
  })));
}
function renderForwardIcon() {
  return h("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none"
  }, h("path", {
    d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.227 8L5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04z",
    fill: "currentColor"
  })));
}
export default defineComponent({
  name: 'CarouselArrow',
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const {
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    } = useCarouselContext();
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      isVertical,
      isPrevDisabled,
      isNextDisabled,
      prev,
      next
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      class: `${mergedClsPrefix}-carousel__arrow-group`
    }, h("div", {
      class: [`${mergedClsPrefix}-carousel__arrow`, this.isPrevDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`],
      role: "button",
      onClick: this.prev
    }, renderBackwardIcon()), h("div", {
      class: [`${mergedClsPrefix}-carousel__arrow`, this.isNextDisabled() && `${mergedClsPrefix}-carousel__arrow--disabled`],
      role: "button",
      onClick: this.next
    }, renderForwardIcon()));
  }
});