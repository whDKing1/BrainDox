import { getPreciseEventTarget, hsl2hsv, hsl2rgb, hsla, hsv2hsl, hsv2rgb, hsva, rgb2hsl, rgb2hsv, rgba, toHexaString, toHexString, toHslaString, toHslString, toHsvaString, toHsvString, toRgbaString, toRgbString } from 'seemly';
import { clickoutside } from 'vdirs';
import { useIsMounted, useMergedState } from 'vooks';
import { computed, defineComponent, h, nextTick, provide, ref, toRef, Transition, watch, watchEffect, withDirectives } from 'vue';
import { VBinder, VFollower, VTarget } from 'vueuc';
import { useConfig, useFormItem, useLocale, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, createKey, resolveWrappedSlotWithProps, useAdjustedTo } from "../../_utils/index.mjs";
import { NButton } from "../../button/index.mjs";
import { colorPickerLight } from "../styles/index.mjs";
import AlphaSlider from "./AlphaSlider.mjs";
import ColorInput from "./ColorInput.mjs";
import ColorPickerSwatches from "./ColorPickerSwatches.mjs";
import ColorPickerTrigger from "./ColorPickerTrigger.mjs";
import ColorPreview from "./ColorPreview.mjs";
import { colorPickerInjectionKey } from "./context.mjs";
import HueSlider from "./HueSlider.mjs";
import Pallete from "./Pallete.mjs";
import style from "./styles/index.cssr.mjs";
import { deriveDefaultValue, getModeFromValue } from "./utils.mjs";
export const colorPickerProps = Object.assign(Object.assign({}, useTheme.props), {
  value: String,
  show: {
    type: Boolean,
    default: undefined
  },
  defaultShow: Boolean,
  defaultValue: String,
  modes: {
    type: Array,
    // no hsva by default since browser doesn't support it
    default: () => ['rgb', 'hex', 'hsl']
  },
  placement: {
    type: String,
    default: 'bottom-start'
  },
  to: useAdjustedTo.propTo,
  showAlpha: {
    type: Boolean,
    default: true
  },
  showPreview: Boolean,
  swatches: Array,
  disabled: {
    type: Boolean,
    default: undefined
  },
  actions: {
    type: Array,
    default: null
  },
  internalActions: Array,
  size: String,
  renderLabel: Function,
  onComplete: Function,
  onConfirm: Function,
  onClear: Function,
  'onUpdate:show': [Function, Array],
  onUpdateShow: [Function, Array],
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array]
});
export default defineComponent({
  name: 'ColorPicker',
  props: colorPickerProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    let triggerRef = null;
    function setTriggerRef(el) {
      triggerRef = el;
    }
    let upcomingValue = null;
    const {
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const formItem = useFormItem(props, {
      mergedSize: NFormItem => {
        var _a, _b;
        const {
          size
        } = props;
        if (size) return size;
        const {
          mergedSize: formItemSize
        } = NFormItem || {};
        if (formItemSize === null || formItemSize === void 0 ? void 0 : formItemSize.value) return formItemSize.value;
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.ColorPicker) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize) return configSize;
        return 'medium';
      }
    });
    const {
      mergedSizeRef,
      mergedDisabledRef
    } = formItem;
    const {
      localeRef
    } = useLocale('global');
    const themeRef = useTheme('ColorPicker', '-color-picker', style, colorPickerLight, props, mergedClsPrefixRef);
    provide(colorPickerInjectionKey, {
      themeRef,
      renderLabelRef: toRef(props, 'renderLabel'),
      colorPickerSlots: slots
    });
    const uncontrolledShowRef = ref(props.defaultShow);
    const mergedShowRef = useMergedState(toRef(props, 'show'), uncontrolledShowRef);
    function doUpdateShow(value) {
      const {
        onUpdateShow,
        'onUpdate:show': _onUpdateShow
      } = props;
      if (onUpdateShow) call(onUpdateShow, value);
      if (_onUpdateShow) call(_onUpdateShow, value);
      uncontrolledShowRef.value = value;
    }
    const {
      defaultValue
    } = props;
    const uncontrolledValueRef = ref(defaultValue === undefined ? deriveDefaultValue(props.modes, props.showAlpha) : defaultValue);
    const mergedValueRef = useMergedState(toRef(props, 'value'), uncontrolledValueRef);
    const undoStackRef = ref([mergedValueRef.value]);
    const valueIndexRef = ref(0);
    const valueModeRef = computed(() => getModeFromValue(mergedValueRef.value));
    const {
      modes
    } = props;
    const displayedModeRef = ref(getModeFromValue(mergedValueRef.value) || modes[0] || 'rgb');
    function handleUpdateDisplayedMode() {
      const {
        modes
      } = props;
      const {
        value: displayedMode
      } = displayedModeRef;
      const currentModeIndex = modes.findIndex(mode => mode === displayedMode);
      if (~currentModeIndex) {
        displayedModeRef.value = modes[(currentModeIndex + 1) % modes.length];
      } else {
        displayedModeRef.value = 'rgb';
      }
    }
    let _h,
      // avoid conflict with render function's h
      s, l, v, r, g, b, a;
    const hsvaRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (!mergedValue) return null;
      switch (valueModeRef.value) {
        case 'hsv':
          return hsva(mergedValue);
        case 'hsl':
          ;
          [_h, s, l, a] = hsla(mergedValue);
          return [...hsl2hsv(_h, s, l), a];
        case 'rgb':
        case 'hex':
          ;
          [r, g, b, a] = rgba(mergedValue);
          return [...rgb2hsv(r, g, b), a];
      }
    });
    const rgbaRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (!mergedValue) return null;
      switch (valueModeRef.value) {
        case 'rgb':
        case 'hex':
          return rgba(mergedValue);
        case 'hsv':
          ;
          [_h, s, v, a] = hsva(mergedValue);
          return [...hsv2rgb(_h, s, v), a];
        case 'hsl':
          ;
          [_h, s, l, a] = hsla(mergedValue);
          return [...hsl2rgb(_h, s, l), a];
      }
    });
    const hslaRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      if (!mergedValue) return null;
      switch (valueModeRef.value) {
        case 'hsl':
          return hsla(mergedValue);
        case 'hsv':
          ;
          [_h, s, v, a] = hsva(mergedValue);
          return [...hsv2hsl(_h, s, v), a];
        case 'rgb':
        case 'hex':
          ;
          [r, g, b, a] = rgba(mergedValue);
          return [...rgb2hsl(r, g, b), a];
      }
    });
    const mergedValueArrRef = computed(() => {
      switch (displayedModeRef.value) {
        case 'rgb':
        case 'hex':
          return rgbaRef.value;
        case 'hsv':
          return hsvaRef.value;
        case 'hsl':
          return hslaRef.value;
      }
    });
    const displayedHueRef = ref(0);
    const displayedAlphaRef = ref(1);
    const displayedSvRef = ref([0, 0]);
    function handleUpdateSv(s, v) {
      const {
        value: hsvaArr
      } = hsvaRef;
      const hue = displayedHueRef.value;
      const alpha = hsvaArr ? hsvaArr[3] : 1;
      displayedSvRef.value = [s, v];
      const {
        showAlpha
      } = props;
      switch (displayedModeRef.value) {
        case 'hsv':
          doUpdateValue((showAlpha ? toHsvaString : toHsvString)([hue, s, v, alpha]), 'cursor');
          break;
        case 'hsl':
          doUpdateValue((showAlpha ? toHslaString : toHslString)([...hsv2hsl(hue, s, v), alpha]), 'cursor');
          break;
        case 'rgb':
          doUpdateValue((showAlpha ? toRgbaString : toRgbString)([...hsv2rgb(hue, s, v), alpha]), 'cursor');
          break;
        case 'hex':
          doUpdateValue((showAlpha ? toHexaString : toHexString)([...hsv2rgb(hue, s, v), alpha]), 'cursor');
          break;
      }
    }
    function handleUpdateHue(hue) {
      displayedHueRef.value = hue;
      const {
        value: hsvaArr
      } = hsvaRef;
      if (!hsvaArr) {
        return;
      }
      const [, s, v, a] = hsvaArr;
      const {
        showAlpha
      } = props;
      switch (displayedModeRef.value) {
        case 'hsv':
          doUpdateValue((showAlpha ? toHsvaString : toHsvString)([hue, s, v, a]), 'cursor');
          break;
        case 'rgb':
          doUpdateValue((showAlpha ? toRgbaString : toRgbString)([...hsv2rgb(hue, s, v), a]), 'cursor');
          break;
        case 'hex':
          doUpdateValue((showAlpha ? toHexaString : toHexString)([...hsv2rgb(hue, s, v), a]), 'cursor');
          break;
        case 'hsl':
          doUpdateValue((showAlpha ? toHslaString : toHslString)([...hsv2hsl(hue, s, v), a]), 'cursor');
          break;
      }
    }
    function handleUpdateAlpha(alpha) {
      switch (displayedModeRef.value) {
        case 'hsv':
          ;
          [_h, s, v] = hsvaRef.value;
          doUpdateValue(toHsvaString([_h, s, v, alpha]), 'cursor');
          break;
        case 'rgb':
          ;
          [r, g, b] = rgbaRef.value;
          doUpdateValue(toRgbaString([r, g, b, alpha]), 'cursor');
          break;
        case 'hex':
          ;
          [r, g, b] = rgbaRef.value;
          doUpdateValue(toHexaString([r, g, b, alpha]), 'cursor');
          break;
        case 'hsl':
          ;
          [_h, s, l] = hslaRef.value;
          doUpdateValue(toHslaString([_h, s, l, alpha]), 'cursor');
          break;
      }
      displayedAlphaRef.value = alpha;
    }
    function doUpdateValue(value, updateSource) {
      if (updateSource === 'cursor') {
        upcomingValue = value;
      } else {
        upcomingValue = null;
      }
      const {
        nTriggerFormChange,
        nTriggerFormInput
      } = formItem;
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue
      } = props;
      if (onUpdateValue) call(onUpdateValue, value);
      if (_onUpdateValue) call(_onUpdateValue, value);
      nTriggerFormChange();
      nTriggerFormInput();
      uncontrolledValueRef.value = value;
    }
    function handleInputUpdateValue(value) {
      doUpdateValue(value, 'input');
      void nextTick(handleComplete);
    }
    function handleComplete(pushStack = true) {
      const {
        value
      } = mergedValueRef;
      // no value & only hue changes will complete with no value
      if (value) {
        const {
          nTriggerFormChange,
          nTriggerFormInput
        } = formItem;
        const {
          onComplete
        } = props;
        if (onComplete) {
          ;
          onComplete(value);
        }
        const {
          value: undoStack
        } = undoStackRef;
        const {
          value: valueIndex
        } = valueIndexRef;
        if (pushStack) {
          undoStack.splice(valueIndex + 1, undoStack.length, value);
          valueIndexRef.value = valueIndex + 1;
        }
        nTriggerFormChange();
        nTriggerFormInput();
      }
    }
    function undo() {
      const {
        value: valueIndex
      } = valueIndexRef;
      if (valueIndex - 1 < 0) return;
      doUpdateValue(undoStackRef.value[valueIndex - 1], 'input');
      handleComplete(false);
      valueIndexRef.value = valueIndex - 1;
    }
    function redo() {
      const {
        value: valueIndex
      } = valueIndexRef;
      if (valueIndex < 0 || valueIndex + 1 >= undoStackRef.value.length) return;
      doUpdateValue(undoStackRef.value[valueIndex + 1], 'input');
      handleComplete(false);
      valueIndexRef.value = valueIndex + 1;
    }
    function handleClear() {
      doUpdateValue(null, 'input');
      const {
        onClear
      } = props;
      if (onClear) {
        onClear();
      }
      doUpdateShow(false);
    }
    function handleConfirm() {
      const {
        value
      } = mergedValueRef;
      const {
        onConfirm
      } = props;
      if (onConfirm) {
        ;
        onConfirm(value);
      }
      doUpdateShow(false);
    }
    const undoableRef = computed(() => valueIndexRef.value >= 1);
    const redoableRef = computed(() => {
      const {
        value: undoStack
      } = undoStackRef;
      return undoStack.length > 1 && valueIndexRef.value < undoStack.length - 1;
    });
    watch(mergedShowRef, value => {
      if (!value) {
        undoStackRef.value = [mergedValueRef.value];
        valueIndexRef.value = 0;
      }
    });
    watchEffect(() => {
      if (upcomingValue && upcomingValue === mergedValueRef.value) {
        // let it works in uncontrolled mode
      } else {
        const {
          value
        } = hsvaRef;
        if (value) {
          displayedHueRef.value = value[0];
          displayedAlphaRef.value = value[3];
          displayedSvRef.value = [value[1], value[2]];
        }
      }
      upcomingValue = null;
    });
    const cssVarsRef = computed(() => {
      const {
        value: mergedSize
      } = mergedSizeRef;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          textColor,
          color,
          panelFontSize,
          boxShadow,
          border,
          borderRadius,
          dividerColor,
          [createKey('height', mergedSize)]: height,
          [createKey('fontSize', mergedSize)]: fontSize
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-color': color,
        '--n-panel-font-size': panelFontSize,
        '--n-font-size': fontSize,
        '--n-box-shadow': boxShadow,
        '--n-border': border,
        '--n-border-radius': borderRadius,
        '--n-height': height,
        '--n-divider-color': dividerColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('color-picker', computed(() => {
      return mergedSizeRef.value[0];
    }), cssVarsRef, props) : undefined;
    function renderPanel() {
      var _a;
      const {
        value: rgba
      } = rgbaRef;
      const {
        value: displayedHue
      } = displayedHueRef;
      const {
        internalActions,
        modes,
        actions
      } = props;
      const {
        value: mergedTheme
      } = themeRef;
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      return h("div", {
        class: [`${mergedClsPrefix}-color-picker-panel`, themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value],
        onDragstart: e => {
          e.preventDefault();
        },
        style: inlineThemeDisabled ? undefined : cssVarsRef.value
      }, h("div", {
        class: `${mergedClsPrefix}-color-picker-control`
      }, h(Pallete, {
        clsPrefix: mergedClsPrefix,
        rgba: rgba,
        displayedHue: displayedHue,
        displayedSv: displayedSvRef.value,
        onUpdateSV: handleUpdateSv,
        onComplete: handleComplete
      }), h("div", {
        class: `${mergedClsPrefix}-color-picker-preview`
      }, h("div", {
        class: `${mergedClsPrefix}-color-picker-preview__sliders`
      }, h(HueSlider, {
        clsPrefix: mergedClsPrefix,
        hue: displayedHue,
        onUpdateHue: handleUpdateHue,
        onComplete: handleComplete
      }), props.showAlpha ? h(AlphaSlider, {
        clsPrefix: mergedClsPrefix,
        rgba: rgba,
        alpha: displayedAlphaRef.value,
        onUpdateAlpha: handleUpdateAlpha,
        onComplete: handleComplete
      }) : null), props.showPreview ? h(ColorPreview, {
        clsPrefix: mergedClsPrefix,
        mode: displayedModeRef.value,
        color: rgbaRef.value && toHexString(rgbaRef.value),
        onUpdateColor: color => {
          doUpdateValue(color, 'input');
        }
      }) : null), h(ColorInput, {
        clsPrefix: mergedClsPrefix,
        showAlpha: props.showAlpha,
        mode: displayedModeRef.value,
        modes: modes,
        onUpdateMode: handleUpdateDisplayedMode,
        value: mergedValueRef.value,
        valueArr: mergedValueArrRef.value,
        onUpdateValue: handleInputUpdateValue
      }), ((_a = props.swatches) === null || _a === void 0 ? void 0 : _a.length) && h(ColorPickerSwatches, {
        clsPrefix: mergedClsPrefix,
        mode: displayedModeRef.value,
        swatches: props.swatches,
        onUpdateColor: color => {
          doUpdateValue(color, 'input');
        }
      })), (actions === null || actions === void 0 ? void 0 : actions.length) ? h("div", {
        class: `${mergedClsPrefix}-color-picker-action`
      }, actions.includes('confirm') && h(NButton, {
        size: "small",
        onClick: handleConfirm,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        default: () => localeRef.value.confirm
      }), actions.includes('clear') && h(NButton, {
        size: "small",
        onClick: handleClear,
        disabled: !mergedValueRef.value,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        default: () => localeRef.value.clear
      })) : null, slots.action ? h("div", {
        class: `${mergedClsPrefix}-color-picker-action`
      }, {
        default: slots.action
      }) : internalActions ? h("div", {
        class: `${mergedClsPrefix}-color-picker-action`
      }, internalActions.includes('undo') && h(NButton, {
        size: "small",
        onClick: undo,
        disabled: !undoableRef.value,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        default: () => localeRef.value.undo
      }), internalActions.includes('redo') && h(NButton, {
        size: "small",
        onClick: redo,
        disabled: !redoableRef.value,
        theme: mergedTheme.peers.Button,
        themeOverrides: mergedTheme.peerOverrides.Button
      }, {
        default: () => localeRef.value.redo
      })) : null);
    }
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      hsla: hslaRef,
      rgba: rgbaRef,
      mergedShow: mergedShowRef,
      mergedDisabled: mergedDisabledRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      mergedValue: mergedValueRef,
      handleTriggerClick() {
        if (mergedDisabledRef.value) {
          return;
        }
        doUpdateShow(true);
      },
      setTriggerRef,
      handleClickOutside(e) {
        if (triggerRef instanceof Element) {
          if (triggerRef.contains(getPreciseEventTarget(e))) {
            return;
          }
        } else if (triggerRef) {
          if (triggerRef.$el.contains(getPreciseEventTarget(e))) {
            return;
          }
        }
        doUpdateShow(false);
      },
      renderPanel,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      mergedClsPrefix,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h(VBinder, null, {
      default: () => [h(VTarget, null, {
        default: () => resolveWrappedSlotWithProps(this.$slots.trigger, {
          value: this.mergedValue,
          onClick: this.handleTriggerClick,
          ref: this.setTriggerRef
        }, children => {
          const triggerNode = children || h(ColorPickerTrigger, {
            clsPrefix: mergedClsPrefix,
            value: this.mergedValue,
            hsla: this.hsla,
            style: this.cssVars,
            ref: this.setTriggerRef,
            disabled: this.mergedDisabled,
            class: this.themeClass,
            onClick: this.mergedDisabled ? undefined : this.handleTriggerClick
          });
          return triggerNode;
        })
      }), h(VFollower, {
        placement: this.placement,
        show: this.mergedShow,
        containerClass: this.namespace,
        teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
        to: this.adjustedTo
      }, {
        default: () => h(Transition, {
          name: "fade-in-scale-up-transition",
          appear: this.isMounted
        }, {
          default: () => this.mergedShow ? withDirectives(this.renderPanel(), [[clickoutside, this.handleClickOutside, undefined, {
            capture: true
          }]]) : null
        })
      })]
    });
  }
});