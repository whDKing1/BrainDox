"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
exports.flexProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { align: String, justify: {
        type: String,
        default: 'start'
    }, inline: Boolean, vertical: Boolean, reverse: Boolean, size: {
        type: [String, Number, Array],
        default: 'medium'
    }, wrap: {
        type: Boolean,
        default: true
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Flex',
    props: exports.flexProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Flex', '-flex', undefined, styles_1.flexLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Flex', mergedRtlRef, mergedClsPrefixRef);
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            margin: (0, vue_1.computed)(() => {
                const { size } = props;
                if (Array.isArray(size)) {
                    return {
                        horizontal: size[0],
                        vertical: size[1]
                    };
                }
                if (typeof size === 'number') {
                    return {
                        horizontal: size,
                        vertical: size
                    };
                }
                const { self: { [(0, _utils_1.createKey)('gap', size)]: gap } } = themeRef.value;
                const { row, col } = (0, seemly_1.getGap)(gap);
                return {
                    horizontal: (0, seemly_1.depx)(col),
                    vertical: (0, seemly_1.depx)(row)
                };
            })
        };
    },
    render() {
        const { vertical, reverse, align, inline, justify, margin, wrap, mergedClsPrefix, rtlEnabled } = this;
        const children = (0, _utils_1.flatten)((0, _utils_1.getSlot)(this), false);
        if (!children.length)
            return null;
        return ((0, vue_1.h)("div", { role: "none", class: [
                `${mergedClsPrefix}-flex`,
                rtlEnabled && `${mergedClsPrefix}-flex--rtl`
            ], style: {
                display: inline ? 'inline-flex' : 'flex',
                flexDirection: (() => {
                    if (vertical && !reverse)
                        return 'column';
                    if (vertical && reverse)
                        return 'column-reverse';
                    if (!vertical && reverse)
                        return 'row-reverse';
                    else
                        return 'row';
                })(),
                justifyContent: justify,
                flexWrap: !wrap || vertical ? 'nowrap' : 'wrap',
                alignItems: align,
                gap: `${margin.vertical}px ${margin.horizontal}px`
            } }, children));
    }
});
