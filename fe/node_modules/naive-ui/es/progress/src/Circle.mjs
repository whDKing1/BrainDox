import { hash } from 'css-render';
import { computed, defineComponent, h } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../_internal/icons/index.mjs";
const iconMap = {
  success: h(SuccessIcon, null),
  error: h(ErrorIcon, null),
  warning: h(WarningIcon, null),
  info: h(InfoIcon, null)
};
export default defineComponent({
  name: 'ProgressCircle',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    fillColor: [String, Object],
    railColor: String,
    railStyle: [String, Object],
    percentage: {
      type: Number,
      default: 0
    },
    offsetDegree: {
      type: Number,
      default: 0
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    indicatorTextColor: String,
    unit: String,
    viewBoxWidth: {
      type: Number,
      required: true
    },
    gapDegree: {
      type: Number,
      required: true
    },
    gapOffsetDegree: {
      type: Number,
      default: 0
    }
  },
  setup(props, {
    slots
  }) {
    const gradientIdRef = computed(() => {
      const base = 'gradient';
      const {
        fillColor
      } = props;
      if (typeof fillColor === 'object') {
        return `${base}-${hash(JSON.stringify(fillColor))}`;
      }
      return base;
    });
    function getPathStyles(percent, offsetDegree, strokeColor, type) {
      const {
        gapDegree,
        viewBoxWidth,
        strokeWidth
      } = props;
      const radius = 50;
      const beginPositionX = 0;
      const beginPositionY = radius;
      const endPositionX = 0;
      const endPositionY = 2 * radius;
      const centerX = 50 + strokeWidth / 2;
      const pathString = `M ${centerX},${centerX} m ${beginPositionX},${beginPositionY}
      a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
      a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
      const len = Math.PI * 2 * radius;
      const pathStyle = {
        stroke: type === 'rail' ? strokeColor : typeof props.fillColor === 'object' ? `url(#${gradientIdRef.value})` : strokeColor,
        strokeDasharray: `${Math.min(percent, 100) / 100 * (len - gapDegree)}px ${viewBoxWidth * 8}px`,
        strokeDashoffset: `-${gapDegree / 2}px`,
        transformOrigin: offsetDegree ? 'center' : undefined,
        transform: offsetDegree ? `rotate(${offsetDegree}deg)` : undefined
      };
      return {
        pathString,
        pathStyle
      };
    }
    const createGradientNode = () => {
      const isGradient = typeof props.fillColor === 'object';
      const from = isGradient ? props.fillColor.stops[0] : '';
      const to = isGradient ? props.fillColor.stops[1] : '';
      return isGradient && h("defs", null, h("linearGradient", {
        id: gradientIdRef.value,
        x1: "0%",
        y1: "100%",
        x2: "100%",
        y2: "0%"
      }, h("stop", {
        offset: "0%",
        "stop-color": from
      }), h("stop", {
        offset: "100%",
        "stop-color": to
      })));
    };
    return () => {
      const {
        fillColor,
        railColor,
        strokeWidth,
        offsetDegree,
        status,
        percentage,
        showIndicator,
        indicatorTextColor,
        unit,
        gapOffsetDegree,
        clsPrefix
      } = props;
      const {
        pathString: railPathString,
        pathStyle: railPathStyle
      } = getPathStyles(100, 0, railColor, 'rail');
      const {
        pathString: fillPathString,
        pathStyle: fillPathStyle
      } = getPathStyles(percentage, offsetDegree, fillColor, 'fill');
      const viewBoxSize = 100 + strokeWidth;
      return h("div", {
        class: `${clsPrefix}-progress-content`,
        role: "none"
      }, h("div", {
        class: `${clsPrefix}-progress-graph`,
        "aria-hidden": true
      }, h("div", {
        class: `${clsPrefix}-progress-graph-circle`,
        style: {
          transform: gapOffsetDegree ? `rotate(${gapOffsetDegree}deg)` : undefined
        }
      }, h("svg", {
        viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`
      }, createGradientNode(), h("g", null, h("path", {
        class: `${clsPrefix}-progress-graph-circle-rail`,
        d: railPathString,
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        fill: "none",
        style: railPathStyle
      })), h("g", null, h("path", {
        class: [`${clsPrefix}-progress-graph-circle-fill`, percentage === 0 && `${clsPrefix}-progress-graph-circle-fill--empty`],
        d: fillPathString,
        "stroke-width": strokeWidth,
        "stroke-linecap": "round",
        fill: "none",
        style: fillPathStyle
      }))))), showIndicator ? h("div", null, slots.default ? h("div", {
        class: `${clsPrefix}-progress-custom-content`,
        role: "none"
      }, slots.default()) : status !== 'default' ? h("div", {
        class: `${clsPrefix}-progress-icon`,
        "aria-hidden": true
      }, h(NBaseIcon, {
        clsPrefix: clsPrefix
      }, {
        default: () => iconMap[status]
      })) : h("div", {
        class: `${clsPrefix}-progress-text`,
        style: {
          color: indicatorTextColor
        },
        role: "none"
      }, h("span", {
        class: `${clsPrefix}-progress-text__percentage`
      }, percentage), h("span", {
        class: `${clsPrefix}-progress-text__unit`
      }, unit))) : null);
    };
  }
});