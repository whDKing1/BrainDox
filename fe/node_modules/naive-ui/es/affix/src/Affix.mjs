import { beforeNextFrameOnce, unwrapElement } from 'seemly';
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useConfig, useStyle } from "../../_mixins/index.mjs";
import { keysOf, warn } from "../../_utils/index.mjs";
import style from "./styles/index.cssr.mjs";
import { getRect, getScrollTop } from "./utils.mjs";
export const affixProps = {
  listenTo: [String, Object, Function],
  top: Number,
  bottom: Number,
  triggerTop: Number,
  triggerBottom: Number,
  position: {
    type: String,
    default: 'fixed'
  },
  // deprecated
  offsetTop: {
    type: Number,
    validator: () => {
      if (process.env.NODE_ENV !== 'production') {
        warn('affix', '`offset-top` is deprecated, please use `trigger-top` instead.');
      }
      return true;
    },
    default: undefined
  },
  offsetBottom: {
    type: Number,
    validator: () => {
      if (process.env.NODE_ENV !== 'production') {
        warn('affix', '`offset-bottom` is deprecated, please use `trigger-bottom` instead.');
      }
      return true;
    },
    default: undefined
  },
  target: {
    type: Function,
    validator: () => {
      if (process.env.NODE_ENV !== 'production') {
        warn('affix', '`target` is deprecated, please use `listen-to` instead.');
      }
      return true;
    },
    default: undefined
  }
};
export const affixPropKeys = keysOf(affixProps);
export default defineComponent({
  name: 'Affix',
  props: affixProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    useStyle('-affix', style, mergedClsPrefixRef);
    let scrollTarget = null;
    const stickToTopRef = ref(false);
    const stickToBottomRef = ref(false);
    const bottomAffixedTriggerScrollTopRef = ref(null);
    const topAffixedTriggerScrollTopRef = ref(null);
    const affixedRef = computed(() => {
      return stickToBottomRef.value || stickToTopRef.value;
    });
    const mergedOffsetTopRef = computed(() => {
      var _a, _b;
      return (_b = (_a = props.triggerTop) !== null && _a !== void 0 ? _a : props.offsetTop) !== null && _b !== void 0 ? _b : props.top;
    });
    const mergedTopRef = computed(() => {
      var _a, _b;
      return (_b = (_a = props.top) !== null && _a !== void 0 ? _a : props.triggerTop) !== null && _b !== void 0 ? _b : props.offsetTop;
    });
    const mergedBottomRef = computed(() => {
      var _a, _b;
      return (_b = (_a = props.bottom) !== null && _a !== void 0 ? _a : props.triggerBottom) !== null && _b !== void 0 ? _b : props.offsetBottom;
    });
    const mergedOffsetBottomRef = computed(() => {
      var _a, _b;
      return (_b = (_a = props.triggerBottom) !== null && _a !== void 0 ? _a : props.offsetBottom) !== null && _b !== void 0 ? _b : props.bottom;
    });
    const selfRef = ref(null);
    const init = () => {
      const {
        target: getScrollTarget,
        listenTo
      } = props;
      if (getScrollTarget) {
        // deprecated
        scrollTarget = getScrollTarget();
      } else if (listenTo) {
        scrollTarget = unwrapElement(listenTo);
      } else {
        scrollTarget = document;
      }
      if (scrollTarget) {
        scrollTarget.addEventListener('scroll', handleScroll);
        handleScroll();
      } else if (process.env.NODE_ENV !== 'production') {
        warn('affix', 'Target to be listened to is not valid.');
      }
    };
    function handleScroll() {
      beforeNextFrameOnce(_handleScroll);
    }
    function _handleScroll() {
      const {
        value: selfEl
      } = selfRef;
      if (!scrollTarget || !selfEl) return;
      const scrollTop = getScrollTop(scrollTarget);
      if (affixedRef.value) {
        if (topAffixedTriggerScrollTopRef.value !== null && scrollTop < topAffixedTriggerScrollTopRef.value) {
          stickToTopRef.value = false;
          topAffixedTriggerScrollTopRef.value = null;
        }
        if (bottomAffixedTriggerScrollTopRef.value !== null && scrollTop > bottomAffixedTriggerScrollTopRef.value) {
          stickToBottomRef.value = false;
          bottomAffixedTriggerScrollTopRef.value = null;
        }
        return;
      }
      const containerRect = getRect(scrollTarget);
      const affixRect = selfEl.getBoundingClientRect();
      const pxToTop = affixRect.top - containerRect.top;
      const pxToBottom = containerRect.bottom - affixRect.bottom;
      const mergedOffsetTop = mergedOffsetTopRef.value;
      const mergedOffsetBottom = mergedOffsetBottomRef.value;
      if (mergedOffsetTop !== undefined && pxToTop <= mergedOffsetTop) {
        stickToTopRef.value = true;
        topAffixedTriggerScrollTopRef.value = scrollTop - (mergedOffsetTop - pxToTop);
      } else {
        stickToTopRef.value = false;
        topAffixedTriggerScrollTopRef.value = null;
      }
      if (mergedOffsetBottom !== undefined && pxToBottom <= mergedOffsetBottom) {
        stickToBottomRef.value = true;
        bottomAffixedTriggerScrollTopRef.value = scrollTop + mergedOffsetBottom - pxToBottom;
      } else {
        stickToBottomRef.value = false;
        bottomAffixedTriggerScrollTopRef.value = null;
      }
    }
    onMounted(() => {
      init();
    });
    onBeforeUnmount(() => {
      if (!scrollTarget) return;
      scrollTarget.removeEventListener('scroll', handleScroll);
    });
    return {
      selfRef,
      affixed: affixedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedstyle: computed(() => {
        const style = {};
        if (stickToTopRef.value && mergedOffsetTopRef.value !== undefined && mergedTopRef.value !== undefined) {
          style.top = `${mergedTopRef.value}px`;
        }
        if (stickToBottomRef.value && mergedOffsetBottomRef.value !== undefined && mergedBottomRef.value !== undefined) {
          style.bottom = `${mergedBottomRef.value}px`;
        }
        return style;
      })
    };
  },
  render() {
    const {
      mergedClsPrefix
    } = this;
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-affix`, {
        [`${mergedClsPrefix}-affix--affixed`]: this.affixed,
        [`${mergedClsPrefix}-affix--absolute-positioned`]: this.position === 'absolute'
      }],
      style: this.mergedstyle
    }, this.$slots);
  }
});