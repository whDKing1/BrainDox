import { computed, defineComponent, h, inject } from 'vue';
import { configProviderInjectionKey } from "../../config-provider/src/context.mjs";
export const equationProps = {
  value: String,
  katex: Object,
  katexOptions: Object
};
export const Equation = defineComponent({
  name: 'Equation',
  props: equationProps,
  setup(props) {
    const configProviderContext = inject(configProviderInjectionKey);
    const extractedHtmlInfo = computed(() => {
      var _a;
      const outerHtml = ((_a = props.katex || (configProviderContext === null || configProviderContext === void 0 ? void 0 : configProviderContext.mergedKatexRef.value)) === null || _a === void 0 ? void 0 : _a.renderToString(props.value || '', Object.assign({
        throwOnError: false
      }, props.katexOptions))) || 'no katex provided';
      const matchResult = outerHtml.match(/^<([a-z]+)[^>]+class="([^"]+)"[^>]*>/);
      const wrapperTag = (matchResult === null || matchResult === void 0 ? void 0 : matchResult[1]) || 'span';
      const wrapperClass = matchResult === null || matchResult === void 0 ? void 0 : matchResult[2];
      const innerHtml = outerHtml.replace(/^<[a-z]+[^>]*>/, '').replace(/<\/[a-z]+>$/, '');
      return {
        wrapperTag,
        innerHtml,
        wrapperClass
      };
    });
    return () => {
      const {
        innerHtml,
        wrapperClass,
        wrapperTag
      } = extractedHtmlInfo.value;
      return h(wrapperTag, {
        class: wrapperClass,
        innerHTML: innerHtml
      });
    };
  }
});