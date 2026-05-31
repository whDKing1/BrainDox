"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formItemPropKeys = exports.formItemProps = void 0;
const async_validator_1 = __importDefault(require("async-validator"));
const lodash_1 = require("lodash");
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_form_item_1 = require("../../_mixins/use-form-item");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const context_1 = require("./context");
const form_item_cssr_1 = __importDefault(require("./styles/form-item.cssr"));
const utils_1 = require("./utils");
exports.formItemProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: {
        type: Boolean,
        default: undefined
    }, requireMarkPlacement: String, showFeedback: {
        type: Boolean,
        default: undefined
    }, rule: [Object, Array], size: String, ignorePathChange: Boolean, validationStatus: String, feedback: String, feedbackClass: String, feedbackStyle: [String, Object], showLabel: {
        type: Boolean,
        default: undefined
    }, labelProps: Object, contentClass: String, contentStyle: [String, Object] });
exports.formItemPropKeys = (0, _utils_1.keysOf)(exports.formItemProps);
// wrap sync validator
function wrapValidator(validator, async) {
    return (...args) => {
        try {
            const validateResult = validator(...args);
            if ((!async
                && (typeof validateResult === 'boolean'
                    || validateResult instanceof Error
                    || Array.isArray(validateResult))) // Error[]
                || (validateResult === null || validateResult === void 0 ? void 0 : validateResult.then)) {
                return validateResult;
            }
            else if (validateResult === undefined) {
                return true;
            }
            else {
                (0, _utils_1.warn)('form-item/validate', `You return a ${typeof validateResult} `
                    + `typed value in the validator method, which is not recommended. Please use ${async ? '`Promise`' : '`boolean`, `Error` or `Promise`'} typed value instead.`);
                return true;
            }
        }
        catch (err) {
            (0, _utils_1.warn)('form-item/validate', 'An error is catched in the validation, '
                + 'so the validation won\'t be done. Your callback in `validate` method of '
                + '`n-form` or `n-form-item` won\'t be called in this validation.');
            console.error(err);
            // If returns undefined, async-validator won't trigger callback
            // so the result will be abandoned, which means not true and not false
            return undefined;
        }
    };
}
exports.default = (0, vue_1.defineComponent)({
    name: 'FormItem',
    props: exports.formItemProps,
    slots: Object,
    setup(props) {
        (0, _utils_1.useInjectionInstanceCollection)(context_1.formItemInstsInjectionKey, 'formItems', (0, vue_1.toRef)(props, 'path'));
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const NForm = (0, vue_1.inject)(context_1.formInjectionKey, null);
        const formItemSizeRefs = (0, utils_1.formItemSize)(props);
        const formItemMiscRefs = (0, utils_1.formItemMisc)(props);
        const { validationErrored: validationErroredRef, validationWarned: validationWarnedRef } = formItemMiscRefs;
        const { mergedRequired: mergedRequiredRef, mergedRules: mergedRulesRef } = (0, utils_1.formItemRule)(props);
        const { mergedSize: mergedSizeRef } = formItemSizeRefs;
        const { mergedLabelPlacement: labelPlacementRef, mergedLabelAlign: labelTextAlignRef, mergedRequireMarkPlacement: mergedRequireMarkPlacementRef } = formItemMiscRefs;
        const renderExplainsRef = (0, vue_1.ref)([]);
        const feedbackIdRef = (0, vue_1.ref)((0, seemly_1.createId)());
        const labelElementRef = (0, vue_1.ref)(null);
        const mergedDisabledRef = NForm
            ? (0, vue_1.toRef)(NForm.props, 'disabled')
            : (0, vue_1.ref)(false);
        const themeRef = (0, _mixins_1.useTheme)('Form', '-form-item', form_item_cssr_1.default, styles_1.formLight, props, mergedClsPrefixRef);
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'path'), () => {
            if (props.ignorePathChange)
                return;
            restoreValidation();
        });
        function invalidateLabelWidth() {
            if (!formItemMiscRefs.isAutoLabelWidth.value)
                return;
            const labelElement = labelElementRef.value;
            if (labelElement !== null) {
                const memoizedWhitespace = labelElement.style.whiteSpace;
                labelElement.style.whiteSpace = 'nowrap';
                labelElement.style.width = '';
                NForm === null || NForm === void 0 ? void 0 : NForm.deriveMaxChildLabelWidth(Number(getComputedStyle(labelElement).width.slice(0, -2)));
                labelElement.style.whiteSpace = memoizedWhitespace;
            }
        }
        function restoreValidation() {
            renderExplainsRef.value = [];
            validationErroredRef.value = false;
            validationWarnedRef.value = false;
            if (props.feedback) {
                feedbackIdRef.value = (0, seemly_1.createId)();
            }
        }
        const internalValidate = (...args_1) => __awaiter(this, [...args_1], void 0, function* (trigger = null, shouldRuleBeApplied = () => true, options = {
            suppressWarning: true
        }) {
            const { path } = props;
            if (!options) {
                options = {};
            }
            else {
                if (!options.first)
                    options.first = props.first;
            }
            const { value: rules } = mergedRulesRef;
            const value = NForm ? (0, lodash_1.get)(NForm.props.model, path || '') : undefined;
            const messageRenderers = {};
            const originalMessageRendersMessage = {};
            const activeRules = (!trigger
                ? rules
                : rules.filter((rule) => {
                    if (Array.isArray(rule.trigger)) {
                        return rule.trigger.includes(trigger);
                    }
                    else {
                        return rule.trigger === trigger;
                    }
                }))
                .filter(shouldRuleBeApplied)
                .map((rule, i) => {
                const shallowClonedRule = Object.assign({}, rule);
                if (shallowClonedRule.validator) {
                    shallowClonedRule.validator = wrapValidator(shallowClonedRule.validator, false);
                }
                if (shallowClonedRule.asyncValidator) {
                    shallowClonedRule.asyncValidator = wrapValidator(shallowClonedRule.asyncValidator, true);
                }
                if (shallowClonedRule.renderMessage) {
                    const rendererKey = `__renderMessage__${i}`;
                    originalMessageRendersMessage[rendererKey]
                        = shallowClonedRule.message;
                    shallowClonedRule.message = rendererKey;
                    messageRenderers[rendererKey] = shallowClonedRule.renderMessage;
                }
                return shallowClonedRule;
            });
            const activeErrorRules = activeRules.filter(r => r.level !== 'warning');
            const activeWarningRules = activeRules.filter(r => r.level === 'warning');
            const validationResult = {
                valid: true,
                errors: undefined,
                warnings: undefined
            };
            if (!activeRules.length)
                return validationResult;
            const mergedPath = path !== null && path !== void 0 ? path : '__n_no_path__';
            const validator = new async_validator_1.default({
                [mergedPath]: activeErrorRules
            });
            const warningValidator = new async_validator_1.default({
                [mergedPath]: activeWarningRules
            });
            const { validateMessages } = (NForm === null || NForm === void 0 ? void 0 : NForm.props) || {};
            if (validateMessages) {
                validator.messages(validateMessages);
                warningValidator.messages(validateMessages);
            }
            const renderMessages = (errors) => {
                renderExplainsRef.value = errors.map((error) => {
                    const transformedMessage = (error === null || error === void 0 ? void 0 : error.message) || '';
                    return {
                        key: transformedMessage,
                        render: () => {
                            if (transformedMessage.startsWith('__renderMessage__')) {
                                return messageRenderers[transformedMessage]();
                            }
                            return transformedMessage;
                        }
                    };
                });
                errors.forEach((error) => {
                    var _a;
                    if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.startsWith('__renderMessage__')) {
                        error.message = originalMessageRendersMessage[error.message];
                    }
                });
            };
            if (activeErrorRules.length) {
                const errors = yield new Promise((resolve) => {
                    void validator.validate({ [mergedPath]: value }, options, resolve);
                });
                if (errors === null || errors === void 0 ? void 0 : errors.length) {
                    validationResult.valid = false;
                    validationResult.errors = errors;
                    renderMessages(errors);
                }
            }
            // if there are already errors, warning check can be skipped
            if (activeWarningRules.length && !validationResult.errors) {
                const warnings = yield new Promise((resolve) => {
                    void warningValidator.validate({ [mergedPath]: value }, options, resolve);
                });
                if (warnings === null || warnings === void 0 ? void 0 : warnings.length) {
                    renderMessages(warnings);
                    validationResult.warnings = warnings;
                }
            }
            if (!validationResult.errors && !validationResult.warnings) {
                restoreValidation();
            }
            else {
                validationErroredRef.value = !!validationResult.errors;
                validationWarnedRef.value = !!validationResult.warnings;
            }
            return validationResult;
        });
        function handleContentBlur() {
            void internalValidate('blur');
        }
        function handleContentChange() {
            void internalValidate('change');
        }
        function handleContentFocus() {
            void internalValidate('focus');
        }
        function handleContentInput() {
            void internalValidate('input');
        }
        function validate(options, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                /** the following code is for compatibility */
                let trigger;
                let validateCallback;
                let shouldRuleBeApplied;
                let asyncValidatorOptions;
                if (typeof options === 'string') {
                    trigger = options;
                    validateCallback = callback;
                }
                else if (options !== null && typeof options === 'object') {
                    trigger = options.trigger;
                    validateCallback = options.callback;
                    shouldRuleBeApplied = options.shouldRuleBeApplied;
                    asyncValidatorOptions = options.options;
                }
                return yield new Promise((resolve, reject) => {
                    void internalValidate(trigger, shouldRuleBeApplied, asyncValidatorOptions).then(({ valid, errors, warnings }) => {
                        if (valid) {
                            if (validateCallback) {
                                validateCallback(undefined, { warnings });
                            }
                            resolve({ warnings });
                        }
                        else {
                            if (validateCallback) {
                                validateCallback(errors, { warnings });
                            }
                            reject(errors);
                        }
                    });
                });
            });
        }
        (0, vue_1.provide)(use_form_item_1.formItemInjectionKey, {
            path: (0, vue_1.toRef)(props, 'path'),
            disabled: mergedDisabledRef,
            mergedSize: formItemSizeRefs.mergedSize,
            mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
            restoreValidation,
            handleContentBlur,
            handleContentChange,
            handleContentFocus,
            handleContentInput
        });
        const exposedRef = {
            validate,
            restoreValidation,
            internalValidate,
            invalidateLabelWidth
        };
        (0, vue_1.onMounted)(invalidateLabelWidth);
        const cssVarsRef = (0, vue_1.computed)(() => {
            var _a;
            const { value: size } = mergedSizeRef;
            const { value: labelPlacement } = labelPlacementRef;
            const direction = labelPlacement === 'top' ? 'vertical' : 'horizontal';
            const { common: { cubicBezierEaseInOut }, self: { labelTextColor, asteriskColor, lineHeight, feedbackTextColor, feedbackTextColorWarning, feedbackTextColorError, feedbackPadding, labelFontWeight, [(0, _utils_1.createKey)('labelHeight', size)]: labelHeight, [(0, _utils_1.createKey)('blankHeight', size)]: blankHeight, [(0, _utils_1.createKey)('feedbackFontSize', size)]: feedbackFontSize, [(0, _utils_1.createKey)('feedbackHeight', size)]: feedbackHeight, [(0, _utils_1.createKey)('labelPadding', direction)]: labelPadding, [(0, _utils_1.createKey)('labelTextAlign', direction)]: labelTextAlign, [(0, _utils_1.createKey)((0, _utils_1.createKey)('labelFontSize', labelPlacement), size)]: labelFontSize } } = themeRef.value;
            let mergedLabelTextAlign = (_a = labelTextAlignRef.value) !== null && _a !== void 0 ? _a : labelTextAlign;
            if (labelPlacement === 'top') {
                mergedLabelTextAlign
                    = mergedLabelTextAlign === 'right' ? 'flex-end' : 'flex-start';
            }
            const cssVars = {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-line-height': lineHeight,
                '--n-blank-height': blankHeight,
                '--n-label-font-size': labelFontSize,
                '--n-label-text-align': mergedLabelTextAlign,
                '--n-label-height': labelHeight,
                '--n-label-padding': labelPadding,
                '--n-label-font-weight': labelFontWeight,
                '--n-asterisk-color': asteriskColor,
                '--n-label-text-color': labelTextColor,
                '--n-feedback-padding': feedbackPadding,
                '--n-feedback-font-size': feedbackFontSize,
                '--n-feedback-height': feedbackHeight,
                '--n-feedback-text-color': feedbackTextColor,
                '--n-feedback-text-color-warning': feedbackTextColorWarning,
                '--n-feedback-text-color-error': feedbackTextColorError
            };
            return cssVars;
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('form-item', (0, vue_1.computed)(() => {
                var _a;
                return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${((_a = labelTextAlignRef.value) === null || _a === void 0 ? void 0 : _a[0]) || ''}`;
            }), cssVarsRef, props)
            : undefined;
        const reverseColSpaceRef = (0, vue_1.computed)(() => {
            // label placement left
            // require-mark-placement | label align | areas (1fr auto)
            // left                   | left        | mark text (need reverse)
            // left                   | right       | mark text (okay)
            // right                  | left        | mark text (okay)
            // right                  | right       | mark text (okay)
            // right-hanging          | left        | text mark (okay)
            // right-hanging          | right       | text mark (okay)
            return (labelPlacementRef.value === 'left'
                && mergedRequireMarkPlacementRef.value === 'left'
                && labelTextAlignRef.value === 'left');
        });
        return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef, mergedClsPrefix: mergedClsPrefixRef, mergedRequired: mergedRequiredRef, feedbackId: feedbackIdRef, renderExplains: renderExplainsRef, reverseColSpace: reverseColSpaceRef }, formItemMiscRefs), formItemSizeRefs), exposedRef), { cssVars: inlineThemeDisabled ? undefined : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
    },
    render() {
        const { $slots, mergedClsPrefix, mergedShowLabel, mergedShowRequireMark, mergedRequireMarkPlacement, onRender } = this;
        const renderedShowRequireMark = mergedShowRequireMark !== undefined
            ? mergedShowRequireMark
            : this.mergedRequired;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const renderLabel = () => {
            const labelText = this.$slots.label ? this.$slots.label() : this.label;
            if (!labelText)
                return null;
            const textNode = ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-form-item-label__text` }, labelText));
            const markNode = renderedShowRequireMark ? ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-form-item-label__asterisk` }, mergedRequireMarkPlacement !== 'left' ? '\u00A0*' : '*\u00A0')) : (mergedRequireMarkPlacement === 'right-hanging' && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-form-item-label__asterisk-placeholder` }, '\u00A0*')));
            const { labelProps } = this;
            return ((0, vue_1.h)("label", Object.assign({}, labelProps, { class: [
                    labelProps === null || labelProps === void 0 ? void 0 : labelProps.class,
                    `${mergedClsPrefix}-form-item-label`,
                    `${mergedClsPrefix}-form-item-label--${mergedRequireMarkPlacement}-mark`,
                    this.reverseColSpace
                        && `${mergedClsPrefix}-form-item-label--reverse-columns-space`
                ], style: this.mergedLabelStyle, ref: "labelElementRef" }), mergedRequireMarkPlacement === 'left'
                ? [markNode, textNode]
                : [textNode, markNode]));
        };
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-form-item`,
                this.themeClass,
                `${mergedClsPrefix}-form-item--${this.mergedSize}-size`,
                `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`,
                this.isAutoLabelWidth
                    && `${mergedClsPrefix}-form-item--auto-label-width`,
                !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`
            ], style: this.cssVars },
            mergedShowLabel && renderLabel(),
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-form-item-blank`,
                    this.contentClass,
                    this.mergedValidationStatus
                        && `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`
                ], style: this.contentStyle }, $slots),
            this.mergedShowFeedback ? ((0, vue_1.h)("div", { key: this.feedbackId, style: this.feedbackStyle, class: [
                    `${mergedClsPrefix}-form-item-feedback-wrapper`,
                    this.feedbackClass
                ] },
                (0, vue_1.h)(vue_1.Transition, { name: "fade-down-transition", mode: "out-in" }, {
                    default: () => {
                        const { mergedValidationStatus } = this;
                        return (0, _utils_1.resolveWrappedSlot)($slots.feedback, (children) => {
                            var _a;
                            const { feedback } = this;
                            const feedbackNodes = children || feedback ? ((0, vue_1.h)("div", { key: "__feedback__", class: `${mergedClsPrefix}-form-item-feedback__line` }, children || feedback)) : this.renderExplains.length ? ((_a = this.renderExplains) === null || _a === void 0 ? void 0 : _a.map(({ key, render }) => ((0, vue_1.h)("div", { key: key, class: `${mergedClsPrefix}-form-item-feedback__line` }, render())))) : null;
                            return feedbackNodes ? (mergedValidationStatus === 'warning' ? ((0, vue_1.h)("div", { key: "controlled-warning", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning` }, feedbackNodes)) : mergedValidationStatus === 'error' ? ((0, vue_1.h)("div", { key: "controlled-error", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error` }, feedbackNodes)) : mergedValidationStatus === 'success' ? ((0, vue_1.h)("div", { key: "controlled-success", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success` }, feedbackNodes)) : ((0, vue_1.h)("div", { key: "controlled-default", class: `${mergedClsPrefix}-form-item-feedback` }, feedbackNodes))) : null;
                        });
                    }
                }))) : null));
    }
});
