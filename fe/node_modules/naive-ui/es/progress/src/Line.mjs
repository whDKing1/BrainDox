import { computed, defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ErrorIcon as ErrorCircleIcon, InfoIcon as InfoCircleIcon, SuccessIcon as SuccessCircleIcon, WarningIcon } from "../../_internal/icons/index.mjs";
import { formatLength } from "../../_utils/index.mjs";
const iconMap = {
  success: h(SuccessCircleIcon, null),
  error: h(ErrorCircleIcon, null),
  warning: h(WarningIcon, null),
  info: h(InfoCircleIcon, null)
};
export default defineComponent({
  name: 'ProgressLine',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    percentage: {
      type: Number,
      default: 0
    },
    railColor: String,
    railStyle: [String, Object],
    fillColor: [String, Object],
    status: {
      type: String,
      required: true
    },
    indicatorPlacement: {
      type: String,
      required: true
    },
    indicatorTextColor: String,
    unit: {
      type: String,
      default: '%'
    },
    processing: {
      type: Boolean,
      required: true
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    height: [String, Number],
    railBorderRadius: [String, Number],
    fillBorderRadius: [String, Number]
  },
  setup(props, {
    slots
  }) {
    const styleHeightRef = computed(() => {
      return formatLength(props.height);
    });
    const styleFillColorRef = computed(() => {
      var _a, _b;
      return typeof props.fillColor === 'object' ? `linear-gradient(to right, ${(_a = props.fillColor) === null || _a === void 0 ? void 0 : _a.stops[0]} , ${(_b = props.fillColor) === null || _b === void 0 ? void 0 : _b.stops[1]})` : props.fillColor;
    });
    const styleRailBorderRadiusRef = computed(() => {
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius);
      }
      if (props.height !== undefined) {
        return formatLength(props.height, {
          c: 0.5
        });
      }
      return '';
    });
    const styleFillBorderRadiusRef = computed(() => {
      if (props.fillBorderRadius !== undefined) {
        return formatLength(props.fillBorderRadius);
      }
      if (props.railBorderRadius !== undefined) {
        return formatLength(props.railBorderRadius);
      }
      if (props.height !== undefined) {
        return formatLength(props.height, {
          c: 0.5
        });
      }
      return '';
    });
    return () => {
      const {
        indicatorPlacement,
        railColor,
        railStyle,
        percentage,
        unit,
        indicatorTextColor,
        status,
        showIndicator,
        processing,
        clsPrefix
      } = props;
      return h("div", {
        class: `${clsPrefix}-progress-content`,
        role: "none"
      }, h("div", {
        class: `${clsPrefix}-progress-graph`,
        "aria-hidden": true
      }, h("div", {
        class: [`${clsPrefix}-progress-graph-line`, {
          [`${clsPrefix}-progress-graph-line--indicator-${indicatorPlacement}`]: true
        }]
      }, h("div", {
        class: `${clsPrefix}-progress-graph-line-rail`,
        style: [{
          backgroundColor: railColor,
          height: styleHeightRef.value,
          borderRadius: styleRailBorderRadiusRef.value
        }, railStyle]
      }, h("div", {
        class: [`${clsPrefix}-progress-graph-line-fill`, processing && `${clsPrefix}-progress-graph-line-fill--processing`],
        style: {
          maxWidth: `${props.percentage}%`,
          background: styleFillColorRef.value,
          height: styleHeightRef.value,
          lineHeight: styleHeightRef.value,
          borderRadius: styleFillBorderRadiusRef.value
        }
      }, indicatorPlacement === 'inside' ? h("div", {
        class: `${clsPrefix}-progress-graph-line-indicator`,
        style: {
          color: indicatorTextColor
        }
      }, slots.default ? slots.default() : `${percentage}${unit}`) : null)))), showIndicator && indicatorPlacement === 'outside' ? h("div", null, slots.default ? h("div", {
        class: `${clsPrefix}-progress-custom-content`,
        style: {
          color: indicatorTextColor
        },
        role: "none"
      }, slots.default()) : status === 'default' ? h("div", {
        role: "none",
        class: `${clsPrefix}-progress-icon ${clsPrefix}-progress-icon--as-text`,
        style: {
          color: indicatorTextColor
        }
      }, percentage, unit) : h("div", {
        class: `${clsPrefix}-progress-icon`,
        "aria-hidden": true
      }, h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => iconMap[status]
      }))) : null);
    };
  }
});