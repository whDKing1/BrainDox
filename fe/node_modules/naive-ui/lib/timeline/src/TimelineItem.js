"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineItemProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const Timeline_1 = require("./Timeline");
exports.timelineItemProps = {
    time: [String, Number],
    title: String,
    content: String,
    color: String,
    lineType: {
        type: String,
        default: 'default'
    },
    type: {
        type: String,
        default: 'default'
    }
};
exports.default = (0, vue_1.defineComponent)({
    name: 'TimelineItem',
    props: exports.timelineItemProps,
    slots: Object,
    setup(props) {
        const NTimeline = (0, vue_1.inject)(Timeline_1.timelineInjectionKey);
        if (!NTimeline) {
            (0, _utils_1.throwError)('timeline-item', '`n-timeline-item` must be placed inside `n-timeline`.');
        }
        (0, _utils_1.useHoudini)();
        const { inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { props: { size, iconSize: iconSizeProp }, mergedThemeRef } = NTimeline;
            const { type } = props;
            const { self: { titleTextColor, contentTextColor, metaTextColor, lineColor, titleFontWeight, contentFontSize, [(0, _utils_1.createKey)('iconSize', size)]: iconSize, [(0, _utils_1.createKey)('titleMargin', size)]: titleMargin, [(0, _utils_1.createKey)('titleFontSize', size)]: titleFontSize, [(0, _utils_1.createKey)('circleBorder', type)]: circleBorder, [(0, _utils_1.createKey)('iconColor', type)]: iconColor }, common: { cubicBezierEaseInOut } } = mergedThemeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-circle-border': circleBorder,
                '--n-icon-color': iconColor,
                '--n-content-font-size': contentFontSize,
                '--n-content-text-color': contentTextColor,
                '--n-line-color': lineColor,
                '--n-meta-text-color': metaTextColor,
                '--n-title-font-size': titleFontSize,
                '--n-title-font-weight': titleFontWeight,
                '--n-title-margin': titleMargin,
                '--n-title-text-color': titleTextColor,
                '--n-icon-size': (0, _utils_1.formatLength)(iconSizeProp) || iconSize
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('timeline-item', (0, vue_1.computed)(() => {
                const { props: { size, iconSize: iconSizeProp } } = NTimeline;
                const { type } = props;
                return `${size[0]}${iconSizeProp || 'a'}${type[0]}`;
            }), cssVarsRef, NTimeline.props)
            : undefined;
        return {
            mergedClsPrefix: NTimeline.mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { mergedClsPrefix, color, onRender, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-timeline-item`,
                this.themeClass,
                `${mergedClsPrefix}-timeline-item--${this.type}-type`,
                `${mergedClsPrefix}-timeline-item--${this.lineType}-line-type`
            ], style: this.cssVars },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-timeline` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-timeline__line` }),
                (0, _utils_1.resolveWrappedSlot)($slots.icon, (children) => {
                    return children ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-timeline__icon`, style: { color } }, children)) : ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-timeline__circle`, style: { borderColor: color } }));
                })),
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-content` },
                (0, _utils_1.resolveWrappedSlot)($slots.header, (children) => {
                    const mergedChildren = children || this.title;
                    if (mergedChildren) {
                        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-content__title` }, children || this.title));
                    }
                    return null;
                }),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-content__content` }, (0, _utils_1.resolveSlot)($slots.default, () => [this.content])),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-timeline-item-content__meta` }, (0, _utils_1.resolveSlot)($slots.footer, () => [this.time])))));
    }
});
