import { repeat } from 'seemly';
import { computed, defineComponent, h, nextTick, ref } from 'vue';
import { VResizeObserver } from 'vueuc';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { marqueeLight } from "../styles/index.mjs";
import { marqueeProps } from "./props.mjs";
import style from "./styles/index.cssr.mjs";
export default defineComponent({
  name: 'Marquee',
  props: marqueeProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    useTheme('Marquee', '-marquee', style, marqueeLight, props, mergedClsPrefixRef);
    const containerElRef = ref(null);
    const contentWidthRef = ref(-1);
    const containerWidthRef = ref(-1);
    const playStateRef = ref('running');
    const repeatCountInOneGroupRef = computed(() => {
      if (!props.autoFill) return 1;
      const {
        value: contentWidth
      } = contentWidthRef;
      const {
        value: containerWidth
      } = containerWidthRef;
      if (contentWidth === -1 || containerWidth === -1) return 1;
      return Math.ceil(containerWidthRef.value / contentWidth);
    });
    const durationRef = computed(() => {
      const {
        value: contentWidth
      } = contentWidthRef;
      if (contentWidth === -1) return 0;
      return contentWidth * repeatCountInOneGroupRef.value / props.speed;
    });
    const animationCssVarsRef = computed(() => {
      return {
        '--n-play': playStateRef.value,
        '--n-direction': 'normal',
        '--n-duration': `${durationRef.value}s`,
        '--n-delay': '0s',
        '--n-iteration-count': 'infinite',
        '--n-min-width': 'auto'
      };
    });
    function resetScrollState() {
      playStateRef.value = 'paused';
      nextTick().then(() => {
        var _a;
        void ((_a = containerElRef.value) === null || _a === void 0 ? void 0 : _a.offsetTop);
        playStateRef.value = 'running';
      });
    }
    function handleContainerResize(entry) {
      containerWidthRef.value = entry.contentRect.width;
    }
    function handleContentResize(entry) {
      contentWidthRef.value = entry.contentRect.width;
    }
    function handleAnimationIteration() {
      resetScrollState();
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      animationCssVars: animationCssVarsRef,
      containerElRef,
      repeatCountInOneGroup: repeatCountInOneGroupRef,
      handleContainerResize,
      handleContentResize,
      handleAnimationIteration
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix,
      animationCssVars,
      repeatCountInOneGroup,
      handleAnimationIteration
    } = this;
    const originalNode = h(VResizeObserver, {
      onResize: this.handleContentResize
    }, {
      default: () => h("div", {
        class: `${mergedClsPrefix}-marquee__item ${mergedClsPrefix}-marquee__original-item`
      }, $slots)
    });
    const mirrorNode = h("div", {
      class: `${mergedClsPrefix}-marquee__item`
    }, $slots);
    if (this.autoFill) {
      return h(VResizeObserver, {
        onResize: this.handleContainerResize
      }, {
        default: () => h("div", {
          class: `${mergedClsPrefix}-marquee ${mergedClsPrefix}-marquee--auto-fill`,
          ref: "containerElRef",
          style: animationCssVars
        }, h("div", {
          class: `${mergedClsPrefix}-marquee__group`,
          onAnimationiteration: handleAnimationIteration
        }, originalNode, repeat(repeatCountInOneGroup - 1, mirrorNode)), h("div", {
          class: `${mergedClsPrefix}-marquee__group`
        }, repeat(repeatCountInOneGroup, mirrorNode)))
      });
    } else {
      return h("div", {
        class: [`${mergedClsPrefix}-marquee`],
        ref: "containerElRef",
        style: animationCssVars
      }, h("div", {
        class: `${mergedClsPrefix}-marquee__group`,
        onAnimationiteration: handleAnimationIteration
      }, originalNode), h("div", {
        class: `${mergedClsPrefix}-marquee__group`
      }, mirrorNode));
    }
  }
});