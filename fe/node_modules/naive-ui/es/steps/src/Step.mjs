import { computed, defineComponent, Fragment, h, inject, toRef } from 'vue';
import { NBaseIcon, NIconSwitchTransition } from "../../_internal/index.mjs";
import { CloseIcon as ErrorIcon, CheckmarkIcon as FinishedIcon } from "../../_internal/icons/index.mjs";
import { useConfig, useThemeClass } from "../../_mixins/index.mjs";
import { call, createKey, resolveSlot, resolveWrappedSlot, throwError } from "../../_utils/index.mjs";
import { stepsInjectionKey } from "./Steps.mjs";
export const stepProps = {
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
export default defineComponent({
  name: 'Step',
  props: stepProps,
  slots: Object,
  setup(props) {
    const NSteps = inject(stepsInjectionKey, null);
    if (!NSteps) throwError('step', '`n-step` must be placed inside `n-steps`.');
    const {
      inlineThemeDisabled
    } = useConfig();
    const {
      props: stepsProps,
      mergedThemeRef,
      mergedClsPrefixRef,
      stepsSlots
    } = NSteps;
    const verticalRef = toRef(stepsProps, 'vertical');
    const contentPlacementRef = toRef(stepsProps, 'contentPlacement');
    const mergedStatusRef = computed(() => {
      const {
        status
      } = props;
      if (status) {
        return status;
      } else {
        const {
          internalIndex
        } = props;
        const {
          current
        } = stepsProps;
        if (current === undefined) return 'process';
        if (internalIndex < current) {
          return 'finish';
        } else if (internalIndex === current) {
          return stepsProps.status || 'process';
        } else if (internalIndex > current) {
          return 'wait';
        }
      }
      return 'process';
    });
    const cssVarsRef = computed(() => {
      const {
        value: status
      } = mergedStatusRef;
      const {
        size
      } = stepsProps;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          stepHeaderFontWeight,
          [createKey('stepHeaderFontSize', size)]: stepHeaderFontSize,
          [createKey('indicatorIndexFontSize', size)]: indicatorIndexFontSize,
          [createKey('indicatorSize', size)]: indicatorSize,
          [createKey('indicatorIconSize', size)]: indicatorIconSize,
          [createKey('indicatorTextColor', status)]: indicatorTextColor,
          [createKey('indicatorBorderColor', status)]: indicatorBorderColor,
          [createKey('headerTextColor', status)]: headerTextColor,
          [createKey('splitorColor', status)]: splitorColor,
          [createKey('indicatorColor', status)]: indicatorColor,
          [createKey('descriptionTextColor', status)]: descriptionTextColor
        }
      } = mergedThemeRef.value;
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
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('step', computed(() => {
      const {
        value: status
      } = mergedStatusRef;
      const {
        size
      } = stepsProps;
      return `${status[0]}${size[0]}`;
    }), cssVarsRef, stepsProps) : undefined;
    const handleStepClick = computed(() => {
      if (props.disabled) return undefined;
      const {
        onUpdateCurrent,
        'onUpdate:current': _onUpdateCurrent
      } = stepsProps;
      return onUpdateCurrent || _onUpdateCurrent ? () => {
        if (onUpdateCurrent) {
          call(onUpdateCurrent, props.internalIndex);
        }
        if (_onUpdateCurrent) {
          call(_onUpdateCurrent, props.internalIndex);
        }
      } : undefined;
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
    const {
      mergedClsPrefix,
      onRender,
      handleStepClick,
      disabled,
      contentPlacement,
      vertical
    } = this;
    const descriptionNode = resolveWrappedSlot(this.$slots.default, children => {
      const mergedDescription = children || this.description;
      if (mergedDescription) {
        return h("div", {
          class: `${mergedClsPrefix}-step-content__description`
        }, mergedDescription);
      }
      return null;
    });
    const splitorNode = h("div", {
      class: `${mergedClsPrefix}-step-splitor`
    });
    const indicatorNode =
    // We need a key here to prevent reconcile progress from affecting styling.
    // A DOM can be reused so if it is used both for A component & B component,
    // the styling transition bewteen two components may be incorrect.
    h("div", {
      class: `${mergedClsPrefix}-step-indicator`,
      key: contentPlacement
    }, h("div", {
      class: `${mergedClsPrefix}-step-indicator-slot`
    }, h(NIconSwitchTransition, null, {
      default: () => {
        return resolveWrappedSlot(this.$slots.icon, icon => {
          const {
            mergedStatus,
            stepsSlots
          } = this;
          return !(mergedStatus === 'finish' || mergedStatus === 'error') ? icon || h("div", {
            key: this.internalIndex,
            class: `${mergedClsPrefix}-step-indicator-slot__index`
          }, this.internalIndex) : mergedStatus === 'finish' ? h(NBaseIcon, {
            clsPrefix: mergedClsPrefix,
            key: "finish"
          }, {
            default: () => resolveSlot(stepsSlots['finish-icon'], () => [h(FinishedIcon, null)])
          }) : mergedStatus === 'error' ? h(NBaseIcon, {
            clsPrefix: mergedClsPrefix,
            key: "error"
          }, {
            default: () => resolveSlot(stepsSlots['error-icon'], () => [h(ErrorIcon, null)])
          }) : null;
        });
      }
    })), vertical ? splitorNode : null);
    const contentNode = h("div", {
      class: `${mergedClsPrefix}-step-content`
    }, h("div", {
      class: `${mergedClsPrefix}-step-content-header`
    }, h("div", {
      class: `${mergedClsPrefix}-step-content-header__title`
    }, resolveSlot(this.$slots.title, () => [this.title])), !vertical && contentPlacement === 'right' ? splitorNode : null), descriptionNode);
    let stepNode;
    if (!vertical && contentPlacement === 'bottom') {
      stepNode = h(Fragment, null, h("div", {
        class: `${mergedClsPrefix}-step-line`
      }, indicatorNode, splitorNode), contentNode);
    } else {
      stepNode = h(Fragment, null, indicatorNode, contentNode);
    }
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-step`, disabled && `${mergedClsPrefix}-step--disabled`, !disabled && handleStepClick && `${mergedClsPrefix}-step--clickable`, this.themeClass, descriptionNode && `${mergedClsPrefix}-step--show-description`, `${mergedClsPrefix}-step--${this.mergedStatus}-status`],
      style: this.cssVars,
      onClick: handleStepClick
    }, stepNode);
  }
});