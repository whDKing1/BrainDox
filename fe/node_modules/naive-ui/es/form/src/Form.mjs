var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
import { defineComponent, h, provide, ref } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { keysOf } from "../../_utils/index.mjs";
import { formLight } from "../styles/index.mjs";
import { formInjectionKey, formItemInstsInjectionKey } from "./context.mjs";
import style from "./styles/form.cssr.mjs";
export const formProps = Object.assign(Object.assign({}, useTheme.props), {
  inline: Boolean,
  labelWidth: [Number, String],
  labelAlign: String,
  labelPlacement: {
    type: String,
    default: 'top'
  },
  model: {
    type: Object,
    default: () => {}
  },
  rules: Object,
  disabled: Boolean,
  size: String,
  showRequireMark: {
    type: Boolean,
    default: undefined
  },
  requireMarkPlacement: String,
  showFeedback: {
    type: Boolean,
    default: true
  },
  onSubmit: {
    type: Function,
    default: e => {
      e.preventDefault();
    }
  },
  showLabel: {
    type: Boolean,
    default: undefined
  },
  validateMessages: Object
});
export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    useTheme('Form', '-form', style, formLight, props, mergedClsPrefixRef);
    // from path to form-item
    const formItems = {};
    // for label-width = 'auto'
    const maxChildLabelWidthRef = ref(undefined);
    const deriveMaxChildLabelWidth = currentWidth => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
      if (currentMaxChildLabelWidth === undefined || currentWidth >= currentMaxChildLabelWidth) {
        maxChildLabelWidthRef.value = currentWidth;
      }
    };
    function invalidateLabelWidth() {
      var _a;
      for (const key of keysOf(formItems)) {
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
          for (const key of keysOf(formItems)) {
            const formItemInstances = formItems[key];
            for (const formItemInstance of formItemInstances) {
              if (formItemInstance.path) {
                formItemValidationPromises.push(formItemInstance.internalValidate(null, shouldRuleBeApplied));
              }
            }
          }
          void Promise.all(formItemValidationPromises).then(results => {
            const formInvalid = results.some(result => !result.valid);
            const errors = [];
            const warnings = [];
            results.forEach(result => {
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
            } else {
              resolve({
                warnings: warnings.length ? warnings : undefined
              });
            }
          });
        });
      });
    }
    function restoreValidation() {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key];
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation();
        }
      }
    }
    provide(formInjectionKey, {
      props,
      maxChildLabelWidthRef,
      deriveMaxChildLabelWidth
    });
    provide(formItemInstsInjectionKey, {
      formItems
    });
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
    const {
      mergedClsPrefix
    } = this;
    return h("form", {
      class: [`${mergedClsPrefix}-form`, this.inline && `${mergedClsPrefix}-form--inline`],
      onSubmit: this.onSubmit
    }, this.$slots);
  }
});