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
exports.formProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const context_1 = require("./context");
const form_cssr_1 = __importDefault(require("./styles/form.cssr"));
exports.formProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { inline: Boolean, labelWidth: [Number, String], labelAlign: String, labelPlacement: {
        type: String,
        default: 'top'
    }, model: {
        type: Object,
        default: () => { }
    }, rules: Object, disabled: Boolean, size: String, showRequireMark: {
        type: Boolean,
        default: undefined
    }, requireMarkPlacement: String, showFeedback: {
        type: Boolean,
        default: true
    }, onSubmit: {
        type: Function,
        default: (e) => {
            e.preventDefault();
        }
    }, showLabel: {
        type: Boolean,
        default: undefined
    }, validateMessages: Object });
exports.default = (0, vue_1.defineComponent)({
    name: 'Form',
    props: exports.formProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useTheme)('Form', '-form', form_cssr_1.default, styles_1.formLight, props, mergedClsPrefixRef);
        // from path to form-item
        const formItems = {};
        // for label-width = 'auto'
        const maxChildLabelWidthRef = (0, vue_1.ref)(undefined);
        const deriveMaxChildLabelWidth = (currentWidth) => {
            const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
            if (currentMaxChildLabelWidth === undefined
                || currentWidth >= currentMaxChildLabelWidth) {
                maxChildLabelWidthRef.value = currentWidth;
            }
        };
        function invalidateLabelWidth() {
            var _a;
            for (const key of (0, _utils_1.keysOf)(formItems)) {
                const formItemInstances = formItems[key];
                for (const formItemInstance of formItemInstances) {
                    (_a = formItemInstance.invalidateLabelWidth) === null || _a === void 0 ? void 0 : _a.call(formItemInstance);
                }
            }
        }
        function validate(validateCallback_1) {
            return __awaiter(this, arguments, void 0, function* (validateCallback, shouldRuleBeApplied = () => true) {
                return yield new Promise((resolve, reject) => {
                    const formItemValidationPromises = [];
                    for (const key of (0, _utils_1.keysOf)(formItems)) {
                        const formItemInstances = formItems[key];
                        for (const formItemInstance of formItemInstances) {
                            if (formItemInstance.path) {
                                formItemValidationPromises.push(formItemInstance.internalValidate(null, shouldRuleBeApplied));
                            }
                        }
                    }
                    void Promise.all(formItemValidationPromises).then((results) => {
                        const formInvalid = results.some(result => !result.valid);
                        const errors = [];
                        const warnings = [];
                        results.forEach((result) => {
                            var _a, _b;
                            if ((_a = result.errors) === null || _a === void 0 ? void 0 : _a.length) {
                                errors.push(result.errors);
                            }
                            if ((_b = result.warnings) === null || _b === void 0 ? void 0 : _b.length) {
                                warnings.push(result.warnings);
                            }
                        });
                        if (validateCallback) {
                            validateCallback(errors.length ? errors : undefined, {
                                warnings: warnings.length ? warnings : undefined
                            });
                        }
                        if (formInvalid) {
                            reject(errors.length ? errors : undefined);
                        }
                        else {
                            resolve({
                                warnings: warnings.length ? warnings : undefined
                            });
                        }
                    });
                });
            });
        }
        function restoreValidation() {
            for (const key of (0, _utils_1.keysOf)(formItems)) {
                const formItemInstances = formItems[key];
                for (const formItemInstance of formItemInstances) {
                    formItemInstance.restoreValidation();
                }
            }
        }
        (0, vue_1.provide)(context_1.formInjectionKey, {
            props,
            maxChildLabelWidthRef,
            deriveMaxChildLabelWidth
        });
        (0, vue_1.provide)(context_1.formItemInstsInjectionKey, { formItems });
        const formExposedMethod = {
            validate,
            restoreValidation,
            invalidateLabelWidth
        };
        return Object.assign(formExposedMethod, {
            mergedClsPrefix: mergedClsPrefixRef
        });
    },
    render() {
        const { mergedClsPrefix } = this;
        return ((0, vue_1.h)("form", { class: [
                `${mergedClsPrefix}-form`,
                this.inline && `${mergedClsPrefix}-form--inline`
            ], onSubmit: this.onSubmit }, this.$slots));
    }
});
