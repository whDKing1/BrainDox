"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colPropKeys = exports.colProps = void 0;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const Row_1 = require("./Row");
exports.colProps = {
    span: {
        type: [String, Number],
        default: 1
    },
    push: {
        type: [String, Number],
        default: 0
    },
    pull: {
        type: [String, Number],
        default: 0
    },
    offset: {
        type: [String, Number],
        default: 0
    }
};
exports.colPropKeys = (0, _utils_1.keysOf)(exports.colProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Col',
    props: exports.colProps,
    setup(props) {
        const NRow = (0, vue_1.inject)(Row_1.rowInjectionKey, null);
        if (!NRow)
            (0, _utils_1.throwError)('col', '`n-col` must be placed inside `n-row`.');
        return {
            mergedClsPrefix: NRow.mergedClsPrefixRef,
            gutter: NRow.gutterRef,
            stylePadding: (0, vue_1.computed)(() => `${(0, _utils_1.formatLength)(NRow.verticalGutterRef.value, {
                c: 0.5
            })} ${(0, _utils_1.formatLength)(NRow.horizontalGutterRef.value, { c: 0.5 })}`),
            mergedPush: (0, vue_1.computed)(() => Number(props.push) - Number(props.pull))
        };
    },
    render() {
        const { $slots, span, mergedPush, offset, stylePadding, gutter, mergedClsPrefix } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-col`,
                {
                    [`${mergedClsPrefix}-col--${span}-span`]: true,
                    [`${mergedClsPrefix}-col--${mergedPush}-push`]: mergedPush > 0,
                    [`${mergedClsPrefix}-col--${-mergedPush}-pull`]: mergedPush < 0,
                    [`${mergedClsPrefix}-col--${offset}-offset`]: offset
                }
            ], style: {
                padding: stylePadding
            } }, gutter ? (0, vue_1.h)("div", null, $slots) : $slots));
    }
});
