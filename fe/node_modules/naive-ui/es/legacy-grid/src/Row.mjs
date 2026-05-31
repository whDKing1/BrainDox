import { useMemo } from 'vooks';
import { defineComponent, h, provide, toRef } from 'vue';
import { useConfig, useRtl, useStyle } from "../../_mixins/index.mjs";
import { createInjectionKey, formatLength, keysOf } from "../../_utils/index.mjs";
import style from "./styles/index.cssr.mjs";
export const rowInjectionKey = createInjectionKey('n-row');
export const rowProps = {
  gutter: {
    type: [Array, Number, String],
    default: 0
  },
  alignItems: String,
  justifyContent: String
};
export const rowPropKeys = keysOf(rowProps);
export default defineComponent({
  name: 'Row',
  props: rowProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    useStyle('-legacy-grid', style, mergedClsPrefixRef);
    const rtlEnabledRef = useRtl('Row', mergedRtlRef, mergedClsPrefixRef);
    const verticalGutterRef = useMemo(() => {
      const {
        gutter
      } = props;
      if (Array.isArray(gutter)) {
        return gutter[1] || 0;
      }
      return 0;
    });
    const horizontalGutterRef = useMemo(() => {
      const {
        gutter
      } = props;
      if (Array.isArray(gutter)) {
        return gutter[0];
      }
      return Number(gutter);
    });
    provide(rowInjectionKey, {
      mergedClsPrefixRef,
      gutterRef: toRef(props, 'gutter'),
      verticalGutterRef,
      horizontalGutterRef
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      rtlEnabled: rtlEnabledRef,
      styleMargin: useMemo(() => `-${formatLength(verticalGutterRef.value, {
        c: 0.5
      })} -${formatLength(horizontalGutterRef.value, {
        c: 0.5
      })}`),
      styleWidth: useMemo(() => `calc(100% + ${formatLength(horizontalGutterRef.value)})`)
    };
  },
  render() {
    return h("div", {
      class: [`${this.mergedClsPrefix}-row`, this.rtlEnabled && `${this.mergedClsPrefix}-row--rtl`],
      style: {
        margin: this.styleMargin,
        width: this.styleWidth,
        alignItems: this.alignItems,
        justifyContent: this.justifyContent
      }
    }, this.$slots);
  }
});