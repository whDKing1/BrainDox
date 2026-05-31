"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaceProps = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const utils_1 = require("./utils");
exports.spaceProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { align: String, justify: {
        type: String,
        default: 'start'
    }, inline: Boolean, vertical: Boolean, reverse: Boolean, size: [String, Number, Array], wrapItem: {
        type: Boolean,
        default: true
    }, itemClass: String, itemStyle: [String, Object], wrap: {
        type: Boolean,
        default: true
    }, 
    // internal
    internalUseGap: {
        type: Boolean,
        default: undefined
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Space',
    props: exports.spaceProps,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const mergedSizeRef = (0, vue_1.computed)(() => {
            var _a, _b;
            return (props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Space) === null || _b === void 0 ? void 0 : _b.size) || 'medium');
        });
        const themeRef = (0, _mixins_1.useTheme)('Space', '-space', undefined, styles_1.spaceLight, props, mergedClsPrefixRef);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Space', mergedRtlRef, mergedClsPrefixRef);
        return {
            useGap: (0, utils_1.ensureSupportFlexGap)(),
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            margin: (0, vue_1.computed)(() => {
                const size = mergedSizeRef.value;
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
        const { vertical, reverse, align, inline, justify, itemClass, itemStyle, margin, wrap, mergedClsPrefix, rtlEnabled, useGap, wrapItem, internalUseGap } = this;
        const children = (0, _utils_1.flatten)((0, _utils_1.getSlot)(this), false);
        if (!children.length)
            return null;
        const horizontalMargin = `${margin.horizontal}px`;
        const semiHorizontalMargin = `${margin.horizontal / 2}px`;
        const verticalMargin = `${margin.vertical}px`;
        const semiVerticalMargin = `${margin.vertical / 2}px`;
        const lastIndex = children.length - 1;
        const isJustifySpace = justify.startsWith('space-');
        return ((0, vue_1.h)("div", { role: "none", class: [
                `${mergedClsPrefix}-space`,
                rtlEnabled && `${mergedClsPrefix}-space--rtl`
            ], style: {
                display: inline ? 'inline-flex' : 'flex',
                flexDirection: (() => {
                    if (vertical && !reverse)
                        return 'column';
                    if (vertical && reverse)
                        return 'column-reverse';
                    if (!vertical && reverse)
                        return 'row-reverse';
                    /** (!vertical && !reverse) */ else
                        return 'row';
                })(),
                justifyContent: ['start', 'end'].includes(justify)
                    ? `flex-${justify}`
                    : justify,
                flexWrap: !wrap || vertical ? 'nowrap' : 'wrap',
                marginTop: useGap || vertical ? '' : `-${semiVerticalMargin}`,
                marginBottom: useGap || vertical ? '' : `-${semiVerticalMargin}`,
                alignItems: align,
                gap: useGap ? `${margin.vertical}px ${margin.horizontal}px` : ''
            } }, !wrapItem && (useGap || internalUseGap)
            ? children
            : children.map((child, index) => child.type === vue_1.Comment ? (child) : ((0, vue_1.h)("div", { role: "none", class: itemClass, style: [
                    itemStyle,
                    {
                        maxWidth: '100%'
                    },
                    useGap
                        ? ''
                        : vertical
                            ? {
                                marginBottom: index !== lastIndex ? verticalMargin : ''
                            }
                            : rtlEnabled
                                ? {
                                    marginLeft: isJustifySpace
                                        ? justify === 'space-between'
                                            && index === lastIndex
                                            ? ''
                                            : semiHorizontalMargin
                                        : index !== lastIndex
                                            ? horizontalMargin
                                            : '',
                                    marginRight: isJustifySpace
                                        ? justify === 'space-between' && index === 0
                                            ? ''
                                            : semiHorizontalMargin
                                        : '',
                                    paddingTop: semiVerticalMargin,
                                    paddingBottom: semiVerticalMargin
                                }
                                : {
                                    marginRight: isJustifySpace
                                        ? justify === 'space-between'
                                            && index === lastIndex
                                            ? ''
                                            : semiHorizontalMargin
                                        : index !== lastIndex
                                            ? horizontalMargin
                                            : '',
                                    marginLeft: isJustifySpace
                                        ? justify === 'space-between' && index === 0
                                            ? ''
                                            : semiHorizontalMargin
                                        : '',
                                    paddingTop: semiVerticalMargin,
                                    paddingBottom: semiVerticalMargin
                                }
                ] }, child)))));
    }
});
