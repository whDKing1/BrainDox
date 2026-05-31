import { pxfy } from 'seemly';
import { computed, defineComponent, getCurrentInstance, h, inject } from 'vue';
import { keysOf } from "../../_utils/index.mjs";
import { gridInjectionKey } from "./config.mjs";
export const defaultSpan = 1;
export const gridItemProps = {
  span: {
    type: [Number, String],
    default: defaultSpan
  },
  offset: {
    type: [Number, String],
    default: 0
  },
  suffix: Boolean,
  // private props
  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: {
    type: Boolean,
    default: true
  }
};
export const gridItemPropKeys = keysOf(gridItemProps);
export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup() {
    const {
      isSsrRef,
      xGapRef,
      itemStyleRef,
      overflowRef,
      layoutShiftDisabledRef
    } = inject(gridInjectionKey);
    const self = getCurrentInstance();
    return {
      overflow: overflowRef,
      itemStyle: itemStyleRef,
      layoutShiftDisabled: layoutShiftDisabledRef,
      mergedXGap: computed(() => {
        return pxfy(xGapRef.value || 0);
      }),
      deriveStyle: () => {
        void isSsrRef.value;
        // Here is quite a hack, I hope there is a better way to solve it
        const {
          privateSpan = defaultSpan,
          privateShow = true,
          privateColStart = undefined,
          privateOffset = 0
        } = self.vnode.props;
        const {
          value: xGap
        } = xGapRef;
        const mergedXGap = pxfy(xGap || 0);
        return {
          display: !privateShow ? 'none' : '',
          gridColumn: `${privateColStart !== null && privateColStart !== void 0 ? privateColStart : `span ${privateSpan}`} / span ${privateSpan}`,
          marginLeft: privateOffset ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})` : ''
        };
      }
    };
  },
  render() {
    var _a, _b;
    if (this.layoutShiftDisabled) {
      const {
        span,
        offset,
        mergedXGap
      } = this;
      return h("div", {
        style: {
          gridColumn: `span ${span} / span ${span}`,
          marginLeft: offset ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})` : ''
        }
      }, this.$slots);
    }
    return h("div", {
      style: [this.itemStyle, this.deriveStyle()]
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, {
      overflow: this.overflow
    }));
  }
});