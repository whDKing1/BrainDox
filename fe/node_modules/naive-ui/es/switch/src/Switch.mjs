import { depx, pxfy } from 'seemly';
import { useMergedState } from 'vooks';
import { computed, defineComponent, h, ref, toRef, watchEffect } from 'vue';
import { NBaseLoading, NIconSwitchTransition } from "../../_internal/index.mjs";
import { useConfig, useFormItem, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, createKey, isSlotEmpty, resolveWrappedSlot, warnOnce } from "../../_utils/index.mjs";
import { switchLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const switchProps = Object.assign(Object.assign({}, useTheme.props), {
  size: String,
  value: {
    type: [String, Number, Boolean],
    default: undefined
  },
  loading: Boolean,
  defaultValue: {
    type: [String, Number, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: undefined
  },
  round: {
    type: Boolean,
    default: true
  },
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  checkedValue: {
    type: [String, Number, Boolean],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: false
  },
  railStyle: Function,
  rubberBand: {
    type: Boolean,
    default: true
  },
  spinProps: Object,
  /** @deprecated */
  onChange: [Function, Array]
});
let supportCssMax;
export default defineComponent({
  name: 'Switch',
  props: switchProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onChange) {
          warnOnce('switch', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
      });
    }
    if (supportCssMax === undefined) {
      if (typeof CSS !== 'undefined') {
        if (typeof CSS.supports !== 'undefined') {
          supportCssMax = CSS.supports('width', 'max(1px)');
        } else {
          supportCssMax = false;
        }
      } else {
        // If you are using SSR, we assume that you are targeting browsers with
        // recent versions
        supportCssMax = true;
      }
    }
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Switch', '-switch', style, switchLight, props, mergedClsPrefixRef);
    const formItem = useFormItem(props, {
      mergedSize(NFormItem) {
        var _a, _b;
        if (props.size !== undefined) return props.size;
        if (NFormItem) {
          return NFormItem.mergedSize.value;
        }
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Switch) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const {
      mergedSizeRef,
      mergedDisabledRef
    } = formItem;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const checkedRef = computed(() => {
      return mergedValueRef.value === props.checkedValue;
    });
    const pressedRef = ref(false);
    const focusedRef = ref(false);
    const mergedRailStyleRef = computed(() => {
      const {
        railStyle
      } = props;
      if (!railStyle) return undefined;
      return railStyle({
        focused: focusedRef.value,
        checked: checkedRef.value
      });
    });
    function doUpdateValue(value) {
      const {
        'onUpdate:value': _onUpdateValue,
        onChange,
        onUpdateValue
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (_onUpdateValue) call(_onUpdateValue, value);
      if (onUpdateValue) call(onUpdateValue, value);
      if (onChange) call(onChange, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function doFocus() {
      const {
        nTriggerFormFocus
      } = formItem;
      nTriggerFormFocus();
    }
    function doBlur() {
      const {
        nTriggerFormBlur
      } = formItem;
      nTriggerFormBlur();
    }
    function handleClick() {
      if (props.loading || mergedDisabledRef.value) return;
      if (mergedValueRef.value !== props.checkedValue) {
        doUpdateValue(props.checkedValue);
      } else {
        doUpdateValue(props.uncheckedValue);
      }
    }
    function handleFocus() {
      focusedRef.value = true;
      doFocus();
    }
    function handleBlur() {
      focusedRef.value = false;
      doBlur();
      pressedRef.value = false;
    }
    function handleKeyup(e) {
      if (props.loading || mergedDisabledRef.value) return;
      if (e.key === ' ') {
        if (mergedValueRef.value !== props.checkedValue) {
          doUpdateValue(props.checkedValue);
        } else {
          doUpdateValue(props.uncheckedValue);
        }
        pressedRef.value = false;
      }
    }
    function handleKeydown(e) {
      if (props.loading || mergedDisabledRef.value) return;
      if (e.key === ' ') {
        e.preventDefault();
        pressedRef.value = true;
      }
    }
    const cssVarsRef = computed(() => {
      const {
        value: size
      } = mergedSizeRef;
      const {
        self: {
          opacityDisabled,
          railColor,
          railColorActive,
          buttonBoxShadow,
          buttonColor,
          boxShadowFocus,
          loadingColor,
          textColor,
          iconColor,
          [createKey('buttonHeight', size)]: buttonHeight,
          [createKey('buttonWidth', size)]: buttonWidth,
          [createKey('buttonWidthPressed', size)]: buttonWidthPressed,
          [createKey('railHeight', size)]: railHeight,
          [createKey('railWidth', size)]: railWidth,
          [createKey('railBorderRadius', size)]: railBorderRadius,
          [createKey('buttonBorderRadius', size)]: buttonBorderRadius
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      let offset;
      let height;
      let width;
      if (supportCssMax) {
        offset = `calc((${railHeight} - ${buttonHeight}) / 2)`;
        height = `max(${railHeight}, ${buttonHeight})`;
        width = `max(${railWidth}, calc(${railWidth} + ${buttonHeight} - ${railHeight}))`;
      } else {
        offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2);
        height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)));
        width = depx(railHeight) > depx(buttonHeight) ? railWidth : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight));
      }
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-button-border-radius': buttonBorderRadius,
        '--n-button-box-shadow': buttonBoxShadow,
        '--n-button-color': buttonColor,
        '--n-button-width': buttonWidth,
        '--n-button-width-pressed': buttonWidthPressed,
        '--n-button-height': buttonHeight,
        '--n-height': height,
        '--n-offset': offset,
        '--n-opacity-disabled': opacityDisabled,
        '--n-rail-border-radius': railBorderRadius,
        '--n-rail-color': railColor,
        '--n-rail-color-active': railColorActive,
        '--n-rail-height': railHeight,
        '--n-rail-width': railWidth,
        '--n-width': width,
        '--n-box-shadow-focus': boxShadowFocus,
        '--n-loading-color': loadingColor,
        '--n-text-color': textColor,
        '--n-icon-color': iconColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('switch', computed(() => {
      return mergedSizeRef.value[0];
    }), cssVarsRef, props) : undefined;
    return {
      handleClick,
      handleBlur,
      handleFocus,
      handleKeyup,
      handleKeydown,
      mergedRailStyle: mergedRailStyleRef,
      pressed: pressedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      checked: checkedRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix,
      mergedDisabled,
      checked,
      mergedRailStyle,
      onRender,
      $slots
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const {
      checked: checkedSlot,
      unchecked: uncheckedSlot,
      icon: iconSlot,
      'checked-icon': checkedIconSlot,
      'unchecked-icon': uncheckedIconSlot
    } = $slots;
    const hasIcon = !(isSlotEmpty(iconSlot) && isSlotEmpty(checkedIconSlot) && isSlotEmpty(uncheckedIconSlot));
    return h("div", {
      role: "switch",
      "aria-checked": checked,
      class: [`${mergedClsPrefix}-switch`, this.themeClass, hasIcon && `${mergedClsPrefix}-switch--icon`, checked && `${mergedClsPrefix}-switch--active`, mergedDisabled && `${mergedClsPrefix}-switch--disabled`, this.round && `${mergedClsPrefix}-switch--round`, this.loading && `${mergedClsPrefix}-switch--loading`, this.pressed && `${mergedClsPrefix}-switch--pressed`, this.rubberBand && `${mergedClsPrefix}-switch--rubber-band`],
      tabindex: !this.mergedDisabled ? 0 : undefined,
      style: this.cssVars,
      onClick: this.handleClick,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyup: this.handleKeyup,
      onKeydown: this.handleKeydown
    }, h("div", {
      class: `${mergedClsPrefix}-switch__rail`,
      "aria-hidden": "true",
      style: mergedRailStyle
    }, resolveWrappedSlot(checkedSlot, checkedSlotChildren => resolveWrappedSlot(uncheckedSlot, uncheckedSlotChildren => {
      if (checkedSlotChildren || uncheckedSlotChildren) {
        return h("div", {
          "aria-hidden": true,
          class: `${mergedClsPrefix}-switch__children-placeholder`
        }, h("div", {
          class: `${mergedClsPrefix}-switch__rail-placeholder`
        }, h("div", {
          class: `${mergedClsPrefix}-switch__button-placeholder`
        }), checkedSlotChildren), h("div", {
          class: `${mergedClsPrefix}-switch__rail-placeholder`
        }, h("div", {
          class: `${mergedClsPrefix}-switch__button-placeholder`
        }), uncheckedSlotChildren));
      }
      return null;
    })), h("div", {
      class: `${mergedClsPrefix}-switch__button`
    }, resolveWrappedSlot(iconSlot, icon => resolveWrappedSlot(checkedIconSlot, checkedIcon => resolveWrappedSlot(uncheckedIconSlot, uncheckedIcon => {
      return h(NIconSwitchTransition, null, {
        default: () => this.loading ? h(NBaseLoading, Object.assign({
          key: "loading",
          clsPrefix: mergedClsPrefix,
          strokeWidth: 20
        }, this.spinProps)) : this.checked && (checkedIcon || icon) ? h("div", {
          class: `${mergedClsPrefix}-switch__button-icon`,
          key: checkedIcon ? 'checked-icon' : 'icon'
        }, checkedIcon || icon) : !this.checked && (uncheckedIcon || icon) ? h("div", {
          class: `${mergedClsPrefix}-switch__button-icon`,
          key: uncheckedIcon ? 'unchecked-icon' : 'icon'
        }, uncheckedIcon || icon) : null
      });
    }))), resolveWrappedSlot(checkedSlot, children => children && h("div", {
      key: "checked",
      class: `${mergedClsPrefix}-switch__checked`
    }, children)), resolveWrappedSlot(uncheckedSlot, children => children && h("div", {
      key: "unchecked",
      class: `${mergedClsPrefix}-switch__unchecked`
    }, children)))));
  }
});