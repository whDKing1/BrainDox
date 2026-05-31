import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'HeatmapColorIndicator',
  slots: Object,
  props: {
    colors: {
      type: Array,
      required: true
    },
    clsPrefix: {
      type: String,
      required: true
    }
  },
  setup(props, {
    slots
  }) {
    return () => {
      var _a, _b;
      const {
        colors,
        clsPrefix
      } = props;
      return h("div", {
        class: `${clsPrefix}-heatmap-color-indicator`
      }, h("span", {
        class: `${clsPrefix}-heatmap-color-indicator__label`
      }, (_a = slots['leading-text']) === null || _a === void 0 ? void 0 : _a.call(slots)), h("div", {
        class: `${clsPrefix}-heatmap-color-indicator__cells`
      }, colors.map((color, index) => h("div", {
        key: index,
        class: `${clsPrefix}-heatmap-color-indicator__cell`,
        style: {
          backgroundColor: color
        }
      }))), h("span", {
        class: `${clsPrefix}-heatmap-color-indicator__label`
      }, (_b = slots['trailing-text']) === null || _b === void 0 ? void 0 : _b.call(slots)));
    };
  }
});