import { computed, defineComponent, h } from 'vue';
function circlePath(r, sw, vw = 100) {
  return `m ${vw / 2} ${vw / 2 - r} a ${r} ${r} 0 1 1 0 ${2 * r} a ${r} ${r} 0 1 1 0 -${2 * r}`;
}
export default defineComponent({
  name: 'ProgressMultipleCircle',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    viewBoxWidth: {
      type: Number,
      required: true
    },
    percentage: {
      type: Array,
      default: [0]
    },
    strokeWidth: {
      type: Number,
      required: true
    },
    circleGap: {
      type: Number,
      required: true
    },
    showIndicator: {
      type: Boolean,
      required: true
    },
    fillColor: {
      type: Array,
      default: () => []
    },
    railColor: {
      type: Array,
      default: () => []
    },
    railStyle: {
      type: Array,
      default: () => []
    }
  },
  setup(props, {
    slots
  }) {
    const strokeDasharrayRef = computed(() => {
      const strokeDasharrays = props.percentage.map((v, i) => `${Math.PI * v / 100 * (props.viewBoxWidth / 2 - props.strokeWidth / 2 * (1 + 2 * i) - props.circleGap * i) * 2}, ${props.viewBoxWidth * 8}`);
      return strokeDasharrays;
    });
    const createGradientNode = (p, index) => {
      const item = props.fillColor[index];
      const form = typeof item === 'object' ? item.stops[0] : '';
      const to = typeof item === 'object' ? item.stops[1] : '';
      return typeof props.fillColor[index] === 'object' && h("linearGradient", {
        id: `gradient-${index}`,
        x1: "100%",
        y1: "0%",
        x2: "0%",
        y2: "100%"
      }, h("stop", {
        offset: "0%",
        "stop-color": form
      }), h("stop", {
        offset: "100%",
        "stop-color": to
      }));
    };
    return () => {
      const {
        viewBoxWidth,
        strokeWidth,
        circleGap,
        showIndicator,
        fillColor,
        railColor,
        railStyle,
        percentage,
        clsPrefix
      } = props;
      return h("div", {
        class: `${clsPrefix}-progress-content`,
        role: "none"
      }, h("div", {
        class: `${clsPrefix}-progress-graph`,
        "aria-hidden": true
      }, h("div", {
        class: `${clsPrefix}-progress-graph-circle`
      }, h("svg", {
        viewBox: `0 0 ${viewBoxWidth} ${viewBoxWidth}`
      }, h("defs", null, percentage.map((p, index) => {
        return createGradientNode(p, index);
      })), percentage.map((p, index) => {
        return h("g", {
          key: index
        }, h("path", {
          class: `${clsPrefix}-progress-graph-circle-rail`,
          d: circlePath(viewBoxWidth / 2 - strokeWidth / 2 * (1 + 2 * index) - circleGap * index, strokeWidth, viewBoxWidth),
          "stroke-width": strokeWidth,
          "stroke-linecap": "round",
          fill: "none",
          style: [{
            strokeDashoffset: 0,
            stroke: railColor[index]
          }, railStyle[index]]
        }), h("path", {
          class: [`${clsPrefix}-progress-graph-circle-fill`, p === 0 && `${clsPrefix}-progress-graph-circle-fill--empty`],
          d: circlePath(viewBoxWidth / 2 - strokeWidth / 2 * (1 + 2 * index) - circleGap * index, strokeWidth, viewBoxWidth),
          "stroke-width": strokeWidth,
          "stroke-linecap": "round",
          fill: "none",
          style: {
            strokeDasharray: strokeDasharrayRef.value[index],
            strokeDashoffset: 0,
            stroke: typeof fillColor[index] === 'object' ? `url(#gradient-${index})` : fillColor[index]
          }
        }));
      })))), showIndicator && slots.default ? h("div", null, h("div", {
        class: `${clsPrefix}-progress-text`
      }, slots.default())) : null);
    };
  }
});