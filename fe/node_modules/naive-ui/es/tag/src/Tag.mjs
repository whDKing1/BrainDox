import { getMargin } from 'seemly';
import { computed, defineComponent, h, provide, ref, toRef, watchEffect } from 'vue';
import { NBaseClose } from "../../_internal/close/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { call, color2Class, createInjectionKey, createKey, resolveWrappedSlot, warnOnce } from "../../_utils/index.mjs";
import { tagLight } from "../styles/index.mjs";
import commonProps from "./common-props.mjs";
import style from "./styles/index.cssr.mjs";
export const tagProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), commonProps), {
  bordered: {
    type: Boolean,
    default: undefined
  },
  checked: Boolean,
  checkable: Boolean,
  strong: Boolean,
  triggerClickOnClose: Boolean,
  onClose: [Array, Function],
  onMouseenter: Function,
  onMouseleave: Function,
  'onUpdate:checked': Function,
  onUpdateChecked: Function,
  // private
  internalCloseFocusable: {
    type: Boolean,
    default: true
  },
  internalCloseIsButtonTag: {
    type: Boolean,
    default: true
  },
  // deprecated
  onCheckedChange: Function
});
export const tagInjectionKey = createInjectionKey('n-tag');
export default defineComponent({
  name: 'Tag',
  props: tagProps,
  slots: Object,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onCheckedChange !== undefined) {
          warnOnce('tag', '`on-checked-change` is deprecated, please use `on-update:checked` instead');
        }
      });
    }
    const contentRef = ref(null);
    const {
      mergedBorderedRef,
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef,
      mergedComponentPropsRef
    } = useConfig(props);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Tag) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const themeRef = useTheme('Tag', '-tag', style, tagLight, props, mergedClsPrefixRef);
    provide(tagInjectionKey, {
      roundRef: toRef(props, 'round')
    });
    function handleClick() {
      if (!props.disabled) {
        if (props.checkable) {
          const {
            checked,
            onCheckedChange,
            onUpdateChecked,
            'onUpdate:checked': _onUpdateChecked
          } = props;
          if (onUpdateChecked) onUpdateChecked(!checked);
          if (_onUpdateChecked) _onUpdateChecked(!checked);
          // deprecated
          if (onCheckedChange) onCheckedChange(!checked);
        }
      }
    }
    function handleCloseClick(e) {
      if (!props.triggerClickOnClose) {
        e.stopPropagation();
      }
      if (!props.disabled) {
        const {
          onClose
        } = props;
        if (onClose) call(onClose, e);
      }
    }
    const tagPublicMethods = {
      setTextContent(textContent) {
        const {
          value
        } = contentRef;
        if (value) value.textContent = textContent;
      }
    };
    const rtlEnabledRef = useRtl('Tag', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        type,
        color: {
          color,
          textColor
        } = {}
      } = props;
      const size = mergedSizeRef.value;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          padding,
          closeMargin,
          borderRadius,
          opacityDisabled,
          textColorCheckable,
          textColorHoverCheckable,
          textColorPressedCheckable,
          textColorChecked,
          colorCheckable,
          colorHoverCheckable,
          colorPressedCheckable,
          colorChecked,
          colorCheckedHover,
          colorCheckedPressed,
          closeBorderRadius,
          fontWeightStrong,
          [createKey('colorBordered', type)]: colorBordered,
          [createKey('closeSize', size)]: closeSize,
          [createKey('closeIconSize', size)]: closeIconSize,
          [createKey('fontSize', size)]: fontSize,
          [createKey('height', size)]: height,
          [createKey('color', type)]: typedColor,
          [createKey('textColor', type)]: typeTextColor,
          [createKey('border', type)]: border,
          [createKey('closeIconColor', type)]: closeIconColor,
          [createKey('closeIconColorHover', type)]: closeIconColorHover,
          [createKey('closeIconColorPressed', type)]: closeIconColorPressed,
          [createKey('closeColorHover', type)]: closeColorHover,
          [createKey('closeColorPressed', type)]: closeColorPressed
        }
      } = themeRef.value;
      const closeMarginDiscrete = getMargin(closeMargin);
      return {
        '--n-font-weight-strong': fontWeightStrong,
        '--n-avatar-size-override': `calc(${height} - 8px)`,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-border-radius': borderRadius,
        '--n-border': border,
        '--n-close-icon-size': closeIconSize,
        '--n-close-color-pressed': closeColorPressed,
        '--n-close-color-hover': closeColorHover,
        '--n-close-border-radius': closeBorderRadius,
        '--n-close-icon-color': closeIconColor,
        '--n-close-icon-color-hover': closeIconColorHover,
        '--n-close-icon-color-pressed': closeIconColorPressed,
        '--n-close-icon-color-disabled': closeIconColor,
        '--n-close-margin-top': closeMarginDiscrete.top,
        '--n-close-margin-right': closeMarginDiscrete.right,
        '--n-close-margin-bottom': closeMarginDiscrete.bottom,
        '--n-close-margin-left': closeMarginDiscrete.left,
        '--n-close-size': closeSize,
        '--n-color': color || (mergedBorderedRef.value ? colorBordered : typedColor),
        '--n-color-checkable': colorCheckable,
        '--n-color-checked': colorChecked,
        '--n-color-checked-hover': colorCheckedHover,
        '--n-color-checked-pressed': colorCheckedPressed,
        '--n-color-hover-checkable': colorHoverCheckable,
        '--n-color-pressed-checkable': colorPressedCheckable,
        '--n-font-size': fontSize,
        '--n-height': height,
        '--n-opacity-disabled': opacityDisabled,
        '--n-padding': padding,
        '--n-text-color': textColor || typeTextColor,
        '--n-text-color-checkable': textColorCheckable,
        '--n-text-color-checked': textColorChecked,
        '--n-text-color-hover-checkable': textColorHoverCheckable,
        '--n-text-color-pressed-checkable': textColorPressedCheckable
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('tag', computed(() => {
      let hash = '';
      const {
        type,
        color: {
          color,
          textColor
        } = {}
      } = props;
      hash += type[0];
      hash += mergedSizeRef.value[0];
      if (color) {
        hash += `a${color2Class(color)}`;
      }
      if (textColor) {
        hash += `b${color2Class(textColor)}`;
      }
      if (mergedBorderedRef.value) {
        hash += 'c';
      }
      return hash;
    }), cssVarsRef, props) : undefined;
    return Object.assign(Object.assign({}, tagPublicMethods), {
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      contentRef,
      mergedBordered: mergedBorderedRef,
      handleClick,
      handleCloseClick,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    });
  },
  render() {
    var _a, _b;
    const {
      mergedClsPrefix,
      rtlEnabled,
      closable,
      color: {
        borderColor
      } = {},
      round,
      onRender,
      $slots
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const avatarNode = resolveWrappedSlot($slots.avatar, children => children && h("div", {
      class: `${mergedClsPrefix}-tag__avatar`
    }, children));
    const iconNode = resolveWrappedSlot($slots.icon, children => children && h("div", {
      class: `${mergedClsPrefix}-tag__icon`
    }, children));
    return h("div", {
      class: [`${mergedClsPrefix}-tag`, this.themeClass, {
        [`${mergedClsPrefix}-tag--rtl`]: rtlEnabled,
        [`${mergedClsPrefix}-tag--strong`]: this.strong,
        [`${mergedClsPrefix}-tag--disabled`]: this.disabled,
        [`${mergedClsPrefix}-tag--checkable`]: this.checkable,
        [`${mergedClsPrefix}-tag--checked`]: this.checkable && this.checked,
        [`${mergedClsPrefix}-tag--round`]: round,
        [`${mergedClsPrefix}-tag--avatar`]: avatarNode,
        [`${mergedClsPrefix}-tag--icon`]: iconNode,
        [`${mergedClsPrefix}-tag--closable`]: closable
      }],
      style: this.cssVars,
      onClick: this.handleClick,
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseleave
    }, iconNode || avatarNode, h("span", {
      class: `${mergedClsPrefix}-tag__content`,
      ref: "contentRef"
    }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)), !this.checkable && closable ? h(NBaseClose, {
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-tag__close`,
      disabled: this.disabled,
      onClick: this.handleCloseClick,
      focusable: this.internalCloseFocusable,
      round: round,
      isButtonTag: this.internalCloseIsButtonTag,
      absolute: true
    }) : null, !this.checkable && this.mergedBordered ? h("div", {
      class: `${mergedClsPrefix}-tag__border`,
      style: {
        borderColor
      }
    }) : null);
  }
});