"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formItemSize = formItemSize;
exports.formItemMisc = formItemMisc;
exports.formItemRule = formItemRule;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
function formItemSize(props) {
    const NForm = (0, vue_1.inject)(context_1.formInjectionKey, null);
    const { mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
    return {
        mergedSize: (0, vue_1.computed)(() => {
            var _a, _b;
            if (props.size !== undefined)
                return props.size;
            if ((NForm === null || NForm === void 0 ? void 0 : NForm.props.size) !== undefined)
                return NForm.props.size;
            const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Form) === null || _b === void 0 ? void 0 : _b.size;
            if (configSize)
                return configSize;
            return 'medium';
        })
    };
}
function formItemMisc(props) {
    const NForm = (0, vue_1.inject)(context_1.formInjectionKey, null);
    const mergedLabelPlacementRef = (0, vue_1.computed)(() => {
        const { labelPlacement } = props;
        if (labelPlacement !== undefined)
            return labelPlacement;
        if (NForm === null || NForm === void 0 ? void 0 : NForm.props.labelPlacement)
            return NForm.props.labelPlacement;
        return 'top';
    });
    const isAutoLabelWidthRef = (0, vue_1.computed)(() => {
        return (mergedLabelPlacementRef.value === 'left'
            && (props.labelWidth === 'auto' || (NForm === null || NForm === void 0 ? void 0 : NForm.props.labelWidth) === 'auto'));
    });
    const mergedLabelWidthRef = (0, vue_1.computed)(() => {
        if (mergedLabelPlacementRef.value === 'top')
            return;
        const { labelWidth } = props;
        if (labelWidth !== undefined && labelWidth !== 'auto') {
            return (0, _utils_1.formatLength)(labelWidth);
        }
        if (isAutoLabelWidthRef.value) {
            const autoComputedWidth = NForm === null || NForm === void 0 ? void 0 : NForm.maxChildLabelWidthRef.value;
            if (autoComputedWidth !== undefined) {
                return (0, _utils_1.formatLength)(autoComputedWidth);
            }
            else {
                return undefined;
            }
        }
        if ((NForm === null || NForm === void 0 ? void 0 : NForm.props.labelWidth) !== undefined) {
            return (0, _utils_1.formatLength)(NForm.props.labelWidth);
        }
        return undefined;
    });
    const mergedLabelAlignRef = (0, vue_1.computed)(() => {
        const { labelAlign } = props;
        if (labelAlign)
            return labelAlign;
        if (NForm === null || NForm === void 0 ? void 0 : NForm.props.labelAlign)
            return NForm.props.labelAlign;
        return undefined;
    });
    const mergedLabelStyleRef = (0, vue_1.computed)(() => {
        var _a;
        return [
            (_a = props.labelProps) === null || _a === void 0 ? void 0 : _a.style,
            props.labelStyle,
            {
                width: mergedLabelWidthRef.value
            }
        ];
    });
    const mergedShowRequireMarkRef = (0, vue_1.computed)(() => {
        const { showRequireMark } = props;
        if (showRequireMark !== undefined)
            return showRequireMark;
        return NForm === null || NForm === void 0 ? void 0 : NForm.props.showRequireMark;
    });
    const mergedRequireMarkPlacementRef = (0, vue_1.computed)(() => {
        const { requireMarkPlacement } = props;
        if (requireMarkPlacement !== undefined)
            return requireMarkPlacement;
        return (NForm === null || NForm === void 0 ? void 0 : NForm.props.requireMarkPlacement) || 'right';
    });
    const validationErroredRef = (0, vue_1.ref)(false);
    const validationWarnedRef = (0, vue_1.ref)(false);
    const mergedValidationStatusRef = (0, vue_1.computed)(() => {
        const { validationStatus } = props;
        if (validationStatus !== undefined)
            return validationStatus;
        if (validationErroredRef.value)
            return 'error';
        if (validationWarnedRef.value)
            return 'warning';
        return undefined;
    });
    const mergedShowFeedbackRef = (0, vue_1.computed)(() => {
        const { showFeedback } = props;
        if (showFeedback !== undefined)
            return showFeedback;
        if ((NForm === null || NForm === void 0 ? void 0 : NForm.props.showFeedback) !== undefined)
            return NForm.props.showFeedback;
        return true;
    });
    const mergedShowLabelRef = (0, vue_1.computed)(() => {
        const { showLabel } = props;
        if (showLabel !== undefined)
            return showLabel;
        if ((NForm === null || NForm === void 0 ? void 0 : NForm.props.showLabel) !== undefined)
            return NForm.props.showLabel;
        return true;
    });
    return {
        validationErrored: validationErroredRef,
        validationWarned: validationWarnedRef,
        mergedLabelStyle: mergedLabelStyleRef,
        mergedLabelPlacement: mergedLabelPlacementRef,
        mergedLabelAlign: mergedLabelAlignRef,
        mergedShowRequireMark: mergedShowRequireMarkRef,
        mergedRequireMarkPlacement: mergedRequireMarkPlacementRef,
        mergedValidationStatus: mergedValidationStatusRef,
        mergedShowFeedback: mergedShowFeedbackRef,
        mergedShowLabel: mergedShowLabelRef,
        isAutoLabelWidth: isAutoLabelWidthRef
    };
}
function formItemRule(props) {
    const NForm = (0, vue_1.inject)(context_1.formInjectionKey, null);
    const compatibleRulePathRef = (0, vue_1.computed)(() => {
        const { rulePath } = props;
        if (rulePath !== undefined)
            return rulePath;
        const { path } = props;
        if (path !== undefined)
            return path;
        return undefined;
    });
    const mergedRulesRef = (0, vue_1.computed)(() => {
        const rules = [];
        const { rule } = props;
        if (rule !== undefined) {
            if (Array.isArray(rule))
                rules.push(...rule);
            else
                rules.push(rule);
        }
        if (NForm) {
            const { rules: formRules } = NForm.props;
            const { value: rulePath } = compatibleRulePathRef;
            if (formRules !== undefined && rulePath !== undefined) {
                const formRule = (0, lodash_1.get)(formRules, rulePath);
                if (formRule !== undefined) {
                    if (Array.isArray(formRule)) {
                        rules.push(...formRule);
                    }
                    else {
                        // terminate object must be a form item rule
                        rules.push(formRule);
                    }
                }
            }
        }
        return rules;
    });
    const hasRequiredRuleRef = (0, vue_1.computed)(() => {
        return mergedRulesRef.value.some(rule => rule.required);
    });
    // deprecated
    const mergedRequiredRef = (0, vue_1.computed)(() => {
        return hasRequiredRuleRef.value || props.required;
    });
    return {
        mergedRules: mergedRulesRef,
        mergedRequired: mergedRequiredRef
    };
}
