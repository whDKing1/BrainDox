import { defineComponent, h } from 'vue';
import { NBaseLoading } from "../../_internal/index.mjs";
import { useLocale } from "../../_mixins/index.mjs";
export default defineComponent({
  name: 'LogLoader',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    spinProps: Object
  },
  setup() {
    return {
      locale: useLocale('Log').localeRef
    };
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: `${clsPrefix}-log-loader`
    }, h(NBaseLoading, Object.assign({
      clsPrefix: clsPrefix,
      strokeWidth: 24,
      scale: 0.85
    }, this.spinProps)), h("span", {
      class: `${clsPrefix}-log-loader__content`
    }, this.locale.loading));
  }
});