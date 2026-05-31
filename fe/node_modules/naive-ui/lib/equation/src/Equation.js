"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equation = exports.equationProps = void 0;
const vue_1 = require("vue");
const context_1 = require("../../config-provider/src/context");
exports.equationProps = {
    value: String,
    katex: Object,
    katexOptions: Object
};
exports.Equation = (0, vue_1.defineComponent)({
    name: 'Equation',
    props: exports.equationProps,
    setup(props) {
        const configProviderContext = (0, vue_1.inject)(context_1.configProviderInjectionKey);
        const extractedHtmlInfo = (0, vue_1.computed)(() => {
            var _a;
            const outerHtml = ((_a = (props.katex || (configProviderContext === null || configProviderContext === void 0 ? void 0 : configProviderContext.mergedKatexRef.value))) === null || _a === void 0 ? void 0 : _a.renderToString(props.value || '', Object.assign({ throwOnError: false }, props.katexOptions))) || 'no katex provided';
            const matchResult = outerHtml.match(/^<([a-z]+)[^>]+class="([^"]+)"[^>]*>/);
            const wrapperTag = (matchResult === null || matchResult === void 0 ? void 0 : matchResult[1]) || 'span';
            const wrapperClass = matchResult === null || matchResult === void 0 ? void 0 : matchResult[2];
            const innerHtml = outerHtml
                .replace(/^<[a-z]+[^>]*>/, '')
                .replace(/<\/[a-z]+>$/, '');
            return { wrapperTag, innerHtml, wrapperClass };
        });
        return () => {
            const { innerHtml, wrapperClass, wrapperTag } = extractedHtmlInfo.value;
            return (0, vue_1.h)(wrapperTag, { class: wrapperClass, innerHTML: innerHtml });
        };
    }
});
