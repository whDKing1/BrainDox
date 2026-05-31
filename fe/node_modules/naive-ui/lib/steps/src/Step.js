"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const Steps_1 = require("./Steps");
exports.stepProps = {
    status: String,
    title: String,
    description: String,
    disabled: Boolean,
    // index will be filled by parent steps, not user
    internalIndex: {
        type: Number,
        default: 0
    }
};
exports.default = (0, vue_1.defineComponent)({
    name: 'Step',
    props: exports.stepProps,
    slots: Object,
    setup(props) {
        const NSteps = (0, vue_1.inject)(Steps_1.stepsInjectionKey, null);
        if (!NSteps)
            (0, _utils_1.throwError)('step', '`n-step` must be placed inside `n-steps`.');
        const { inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const { props: stepsProps, mergedThemeRef, mergedClsPrefixRef, stepsSlots } = NSteps;
        const verticalRef = (0, vue_1.toRef)(stepsProps, 'vertical');
        const contentPlacementRef = (0, vue_1.toRef)(stepsProps, 'contentPlacement');
        const mergedStatusRef = (0, vue_1.computed)(() => {
            const { status } = props;
            if (status) {
                return status;
            }
            else {
                const { internalIndex } = props;
                const { current } = stepsProps;
                if (current === undefined)
                    return 'process';
                if (internalIndex < current) {
                    return 'finish';
                }
                else if (internalIndex === current) {
                    return stepsProps.status || 'process';
                }
                else if (internalIndex > current) {
                    return 'wait';
                }
            }
            return 'process';
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { value: status } = mergedStatusRef;
            const { size } = stepsProps;
            const { common: { cubicBezierEaseInOut }, self: { stepHeaderFontWeight, [(0, _utils_1.createKey)('stepHeaderFontSize', size)]: stepHeaderFontSize, [(0, _utils_1.createKey)('indicatorIndexFontSize', size)]: indicatorIndexFontSize, [(0, _utils_1.createKey)('indicatorSize', size)]: indicatorSize, [(0, _utils_1.createKey)('indicatorIconSize', size)]: indicatorIconSize, [(0, _utils_1.createKey)('indicatorTextColor', status)]: indicatorTextColor, [(0, _utils_1.createKey)('indicatorBorderColor', status)]: indicatorBorderColor, [(0, _utils_1.createKey)('headerTextColor', status)]: headerTextColor, [(0, _utils_1.createKey)('splitorColor', status)]: splitorColor, [(0, _utils_1.createKey)('indicatorColor', status)]: indicatorColor, [(0, _utils_1.createKey)('descriptionTextColor', status)]: descriptionTextColor } } = mergedThemeRef.value;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-description-text-color': descriptionTextColor,
                '--n-header-text-color': headerTextColor,
                '--n-indicator-border-color': indicatorBorderColor,
                '--n-indicator-color': indicatorColor,
                '--n-indicator-icon-size': indicatorIconSize,
                '--n-indicator-index-font-size': indicatorIndexFontSize,
                '--n-indicator-size': indicatorSize,
                '--n-indicator-text-color': indicatorTextColor,
                '--n-splitor-color': splitorColor,
                '--n-step-header-font-size': stepHeaderFontSize,
                '--n-step-header-font-weight': stepHeaderFontWeight
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('step', (0, vue_1.computed)(() => {
                const { value: status } = mergedStatusRef;
                const { size } = stepsProps;
                return `${status[0]}${size[0]}`;
            }), cssVarsRef, stepsProps)
            : undefined;
        const handleStepClick = (0, vue_1.computed)(() => {
            if (props.disabled)
                return undefined;
            const { onUpdateCurrent, 'onUpdate:current': _onUpdateCurrent } = stepsProps;
            return onUpdateCurrent || _onUpdateCurrent
                ? () => {
                    if (onUpdateCurrent) {
                        (0, _utils_1.call)(onUpdateCurrent, props.internalIndex);
                    }
                    if (_onUpdateCurrent) {
                        (0, _utils_1.call)(_onUpdateCurrent, props.internalIndex);
                    }
                }
                : undefined;
        });
        return {
            stepsSlots,
            mergedClsPrefix: mergedClsPrefixRef,
            vertical: verticalRef,
            mergedStatus: mergedStatusRef,
            handleStepClick,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            contentPlacement: contentPlacementRef
        };
    },
    render() {
        const { mergedClsPrefix, onRender, handleStepClick, disabled, contentPlacement, vertical } = this;
        const descriptionNode = (0, _utils_1.resolveWrappedSlot)(this.$slots.default, (children) => {
            const mergedDescription = children || this.description;
            if (mergedDescription) {
                return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-content__description` }, mergedDescription));
            }
            return null;
        });
        const splitorNode = (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-splitor` });
        const indicatorNode = (
        // We need a key here to prevent reconcile progress from affecting styling.
        // A DOM can be reused so if it is used both for A component & B component,
        // the styling transition bewteen two components may be incorrect.
        (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-indicator`, key: contentPlacement },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-indicator-slot` },
                (0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                    default: () => {
                        return (0, _utils_1.resolveWrappedSlot)(this.$slots.icon, (icon) => {
                            const { mergedStatus, stepsSlots } = this;
                            return !(mergedStatus === 'finish' || mergedStatus === 'error') ? (icon || ((0, vue_1.h)("div", { key: this.internalIndex, class: `${mergedClsPrefix}-step-indicator-slot__index` }, this.internalIndex))) : mergedStatus === 'finish' ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, key: "finish" }, {
                                default: () => (0, _utils_1.resolveSlot)(stepsSlots['finish-icon'], () => [
                                    (0, vue_1.h)(icons_1.CheckmarkIcon, null)
                                ])
                            })) : mergedStatus === 'error' ? ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix, key: "error" }, {
                                default: () => (0, _utils_1.resolveSlot)(stepsSlots['error-icon'], () => [
                                    (0, vue_1.h)(icons_1.CloseIcon, null)
                                ])
                            })) : null;
                        });
                    }
                })),
            vertical ? splitorNode : null));
        const contentNode = ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-content` },
            (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-content-header` },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-content-header__title` }, (0, _utils_1.resolveSlot)(this.$slots.title, () => [this.title])),
                !vertical && contentPlacement === 'right' ? splitorNode : null),
            descriptionNode));
        let stepNode;
        if (!vertical && contentPlacement === 'bottom') {
            stepNode = ((0, vue_1.h)(vue_1.Fragment, null,
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-step-line` },
                    indicatorNode,
                    splitorNode),
                contentNode));
        }
        else {
            stepNode = ((0, vue_1.h)(vue_1.Fragment, null,
                indicatorNode,
                contentNode));
        }
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-step`,
                disabled && `${mergedClsPrefix}-step--disabled`,
                !disabled && handleStepClick && `${mergedClsPrefix}-step--clickable`,
                this.themeClass,
                descriptionNode && `${mergedClsPrefix}-step--show-description`,
                `${mergedClsPrefix}-step--${this.mergedStatus}-status`
            ], style: this.cssVars, onClick: handleStepClick }, stepNode));
    }
});
