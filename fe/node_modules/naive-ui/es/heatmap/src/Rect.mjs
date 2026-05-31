import { computed, defineComponent, h } from 'vue';
import { resolveSlotWithTypedProps } from "../../_utils/index.mjs";
import Tooltip from "../../tooltip/src/Tooltip.mjs";
export default defineComponent({
  name: 'HeatmapRect',
  slots: Object,
  props: {
    mergedClsPrefix: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    style: Object,
    loading: Boolean,
    loadingClass: String,
    tooltip: {
      type: [Boolean, Object],
      default: true
    }
  },
  setup(props) {
    const cssVarsRef = computed(() => ({
      '--n-rect-color': props.color
    }));
    const tooltipPropsRef = computed(() => {
      return typeof props.tooltip === 'object' ? props.tooltip : {};
    });
    const defaultTooltipContentRef = computed(() => {
      const date = new Date(props.data.timestamp).toLocaleDateString();
      return props.data.value !== null ? `${date} ${props.data.value}` : date;
    });
    return {
      cssVars: cssVarsRef,
      tooltipProps: tooltipPropsRef,
      defaultTooltipContent: defaultTooltipContentRef
    };
  },
  render() {
    const {
      mergedClsPrefix,
      style,
      cssVars,
      tooltip,
      tooltipProps,
      defaultTooltipContent,
      loading,
      data
    } = this;
    const triggerNode = h("div", {
      class: [`${mergedClsPrefix}-heatmap-rect`, loading && `${mergedClsPrefix}-heatmap-rect--loading`, loading && this.loadingClass],
      style: [cssVars, style]
    });
    return tooltip === false || loading ? triggerNode : h(Tooltip, Object.assign({
      trigger: "hover"
    }, tooltipProps), {
      default: () => resolveSlotWithTypedProps(this.$slots.tooltip, data, () => [h("div", null, defaultTooltipContent)]),
      trigger: () => triggerNode
    });
  }
});