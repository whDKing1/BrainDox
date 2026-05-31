import { off, on } from 'evtd';
import { useIsMounted, useMergedState } from 'vooks';
import { computed, defineComponent, h, nextTick, onBeforeUnmount, ref, toRef, Transition, watch } from 'vue';
import { VBinder, VFollower, VTarget } from 'vueuc';
import { useConfig, useFormItem, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, resolveSlot, useAdjustedTo } from "../../_utils/index.mjs";
import { sliderLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
import { isTouchEvent, useRefs } from "./utils.mjs";
// ref: https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent/button
const eventButtonLeft = 0;
export const sliderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: useAdjustedTo.propTo,
  defaultValue: {
    type: [Number, Array],
    default: 0
  },
  marks: Object,
  disabled: {
    type: Boolean,
    default: undefined
  },
  formatTooltip: Function,
  keyboard: {
    type: Boolean,
    default: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: [Number, String],
    default: 1
  },
  range: Boolean,
  value: [Number, Array],
  placement: String,
  showTooltip: {
    type: Boolean,
    default: undefined
  },
  tooltip: {
    type: Boolean,
    default: true
  },
  vertical: Boolean,
  reverse: Boolean,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onDragstart: [Function],
  onDragend: [Function]
});
export default defineComponent({
  name: 'Slider',
  props: sliderProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      namespaceRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Slider', '-slider', style, sliderLight, props, mergedClsPrefixRef);
    // dom ref
    const handleRailRef = ref(null);
    const [handleRefs, setHandleRefs] = useRefs();
    const [followerRefs, setFollowerRefs] = useRefs();
    const followerEnabledIndexSetRef = ref(new Set());
    // data ref
    const formItem = useFormItem(props);
    const {
      mergedDisabledRef
    } = formItem;
    const precisionRef = computed(() => {
      const {
        step
      } = props;
      if (Number(step) <= 0 || step === 'mark') return 0;
      const stepString = step.toString();
      let precision = 0;
      if (stepString.includes('.')) {
        precision = stepString.length - stepString.indexOf('.') - 1;
      }
      return precision;
    });
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const arrifiedValueRef = computed(() => {
      const {
        value: mergedValue
      } = mergedValueRef;
      return (props.range ? mergedValue : [mergedValue]).map(clampValue);
    });
    const handleCountExceeds2Ref = computed(() => arrifiedValueRef.value.length > 2);
    const mergedPlacementRef = computed(() => {
      return props.placement === undefined ? props.vertical ? 'right' : 'top' : props.placement;
    });
    const markValuesRef = computed(() => {
      const {
        marks
      } = props;
      return marks ? Object.keys(marks).map(Number.parseFloat) : null;
    });
    // status ref
    const activeIndexRef = ref(-1);
    const previousIndexRef = ref(-1);
    const hoverIndexRef = ref(-1);
    const draggingRef = ref(false);
    // style ref
    const dotTransitionDisabledRef = ref(false);
    const styleDirectionRef = computed(() => {
      const {
        vertical,
        reverse
      } = props;
      const left = reverse ? 'right' : 'left';
      const bottom = reverse ? 'top' : 'bottom';
      return vertical ? bottom : left;
    });
    const fillStyleRef = computed(() => {
      if (handleCountExceeds2Ref.value) return;
      const values = arrifiedValueRef.value;
      const start = valueToPercentage(props.range ? Math.min(...values) : props.min);
      const end = valueToPercentage(props.range ? Math.max(...values) : values[0]);
      const {
        value: styleDirection
      } = styleDirectionRef;
      return props.vertical ? {
        [styleDirection]: `${start}%`,
        height: `${end - start}%`
      } : {
        [styleDirection]: `${start}%`,
        width: `${end - start}%`
      };
    });
    const markInfosRef = computed(() => {
      const mergedMarks = [];
      const {
        marks
      } = props;
      if (marks) {
        const orderValues = arrifiedValueRef.value.slice();
        orderValues.sort((a, b) => a - b);
        const {
          value: styleDirection
        } = styleDirectionRef;
        const {
          value: handleCountExceeds2
        } = handleCountExceeds2Ref;
        const {
          range
        } = props;
        const isActive = handleCountExceeds2 ? () => false : num => range ? num >= orderValues[0] && num <= orderValues[orderValues.length - 1] : num <= orderValues[0];
        for (const key of Object.keys(marks)) {
          const num = Number(key);
          mergedMarks.push({
            active: isActive(num),
            key: num,
            label: marks[key],
            style: {
              [styleDirection]: `${valueToPercentage(num)}%`
            }
          });
        }
      }
      return mergedMarks;
    });
    function getHandleStyle(value, index) {
      const percentage = valueToPercentage(value);
      const {
        value: styleDirection
      } = styleDirectionRef;
      return {
        [styleDirection]: `${percentage}%`,
        zIndex: index === activeIndexRef.value ? 1 : 0
      };
    }
    function isShowTooltip(index) {
      return props.showTooltip || hoverIndexRef.value === index || activeIndexRef.value === index && draggingRef.value;
    }
    function shouldKeepTooltipTransition(index) {
      if (!draggingRef.value) return true;
      return !(activeIndexRef.value === index && previousIndexRef.value === index);
    }
    function focusActiveHandle(index) {
      var _a;
      if (~index) {
        activeIndexRef.value = index;
        (_a = handleRefs.get(index)) === null || _a === void 0 ? void 0 : _a.focus();
      }
    }
    function syncPosition() {
      followerRefs.forEach((inst, index) => {
        if (isShowTooltip(index)) inst.syncPosition();
      });
    }
    function doUpdateValue(value) {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props;
      const {
        nTriggerFormInput,
        nTriggerFormChange
      } = formItem;
      if (onUpdateValue) call(onUpdateValue, value);
      if (_onUpdateValue) call(_onUpdateValue, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function dispatchValueUpdate(value) {
      const {
        range
      } = props;
      if (range) {
        if (Array.isArray(value)) {
          const {
            value: oldValues
          } = arrifiedValueRef;
          if (value.join() !== oldValues.join()) {
            doUpdateValue(value);
          }
        }
      } else if (!Array.isArray(value)) {
        const oldValue = arrifiedValueRef.value[0];
        if (oldValue !== value) {
          doUpdateValue(value);
        }
      }
    }
    function doDispatchValue(value, index) {
      if (props.range) {
        const values = arrifiedValueRef.value.slice();
        values.splice(index, 1, value);
        dispatchValueUpdate(values);
      } else {
        dispatchValueUpdate(value);
      }
    }
    // value conversion
    function sanitizeValue(value, currentValue, stepBuffer) {
      const stepping = stepBuffer !== undefined;
      if (!stepBuffer) {
        stepBuffer = value - currentValue > 0 ? 1 : -1;
      }
      const markValues = markValuesRef.value || [];
      const {
        step
      } = props;
      if (step === 'mark') {
        const closestMark = getClosestMark(value, markValues.concat(currentValue), stepping ? stepBuffer : undefined);
        return closestMark ? closestMark.value : currentValue;
      }
      if (step <= 0) return currentValue;
      const {
        value: precision
      } = precisionRef;
      let closestMark;
      // if it is a stepping, priority will be given to the marks
      // on the rail, otherwise take the nearest one
      if (stepping) {
        const currentStep = Number((currentValue / step).toFixed(precision));
        const actualStep = Math.floor(currentStep);
        const leftStep = currentStep > actualStep ? actualStep : actualStep - 1;
        const rightStep = currentStep < actualStep ? actualStep : actualStep + 1;
        closestMark = getClosestMark(currentValue, [Number((leftStep * step).toFixed(precision)), Number((rightStep * step).toFixed(precision)), ...markValues], stepBuffer);
      } else {
        const roundValue = getRoundValue(value);
        closestMark = getClosestMark(value, [...markValues, roundValue]);
      }
      return closestMark ? clampValue(closestMark.value) : currentValue;
    }
    function clampValue(value) {
      return Math.min(props.max, Math.max(props.min, value));
    }
    function valueToPercentage(value) {
      const {
        max,
        min
      } = props;
      return (value - min) / (max - min) * 100;
    }
    function percentageToValue(percentage) {
      const {
        max,
        min
      } = props;
      return min + (max - min) * percentage;
    }
    function getRoundValue(value) {
      const {
        step,
        min
      } = props;
      if (Number(step) <= 0 || step === 'mark') return value;
      const newValue = Math.round((value - min) / step) * step + min;
      return Number(newValue.toFixed(precisionRef.value));
    }
    function getClosestMark(currentValue, markValues = markValuesRef.value, buffer) {
      if (!(markValues === null || markValues === void 0 ? void 0 : markValues.length)) return null;
      let closestMark = null;
      let index = -1;
      while (++index < markValues.length) {
        const diff = markValues[index] - currentValue;
        const distance = Math.abs(diff);
        if (
        // find marks in the same direction
        (buffer === undefined || diff * buffer > 0) && (closestMark === null || distance < closestMark.distance)) {
          closestMark = {
            index,
            distance,
            value: markValues[index]
          };
        }
      }
      return closestMark;
    }
    function getPointValue(event) {
      const railEl = handleRailRef.value;
      if (!railEl) return;
      const touchEvent = isTouchEvent(event) ? event.touches[0] : event;
      const railRect = railEl.getBoundingClientRect();
      let percentage;
      if (props.vertical) {
        percentage = (railRect.bottom - touchEvent.clientY) / railRect.height;
      } else {
        percentage = (touchEvent.clientX - railRect.left) / railRect.width;
      }
      if (props.reverse) {
        percentage = 1 - percentage;
      }
      return percentageToValue(percentage);
    }
    // dom event handle
    function handleRailKeyDown(e) {
      if (mergedDisabledRef.value || !props.keyboard) return;
      const {
        vertical,
        reverse
      } = props;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          handleStepValue(vertical && reverse ? -1 : 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleStepValue(!vertical && reverse ? -1 : 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleStepValue(vertical && reverse ? 1 : -1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleStepValue(!vertical && reverse ? 1 : -1);
          break;
      }
    }
    function handleStepValue(ratio) {
      const activeIndex = activeIndexRef.value;
      if (activeIndex === -1) return;
      const {
        step
      } = props;
      const currentValue = arrifiedValueRef.value[activeIndex];
      const nextValue = Number(step) <= 0 || step === 'mark' ? currentValue : currentValue + step * ratio;
      doDispatchValue(
      // Avoid the number of value does not change when `step` is null
      sanitizeValue(nextValue, currentValue, ratio > 0 ? 1 : -1), activeIndex);
    }
    function handleRailMouseDown(event) {
      var _a, _b;
      if (mergedDisabledRef.value) return;
      if (!isTouchEvent(event) && event.button !== eventButtonLeft) {
        return;
      }
      const pointValue = getPointValue(event);
      if (pointValue === undefined) return;
      const values = arrifiedValueRef.value.slice();
      const activeIndex = props.range ? (_b = (_a = getClosestMark(pointValue, values)) === null || _a === void 0 ? void 0 : _a.index) !== null && _b !== void 0 ? _b : -1 : 0;
      if (activeIndex !== -1) {
        // avoid triggering scrolling on touch
        event.preventDefault();
        focusActiveHandle(activeIndex);
        startDragging();
        doDispatchValue(sanitizeValue(pointValue, arrifiedValueRef.value[activeIndex]), activeIndex);
      }
    }
    function startDragging() {
      if (!draggingRef.value) {
        draggingRef.value = true;
        if (props.onDragstart) call(props.onDragstart);
        on('touchend', document, handleMouseUp);
        on('mouseup', document, handleMouseUp);
        on('touchmove', document, handleMouseMove);
        on('mousemove', document, handleMouseMove);
      }
    }
    function stopDragging() {
      if (draggingRef.value) {
        draggingRef.value = false;
        if (props.onDragend) call(props.onDragend);
        off('touchend', document, handleMouseUp);
        off('mouseup', document, handleMouseUp);
        off('touchmove', document, handleMouseMove);
        off('mousemove', document, handleMouseMove);
      }
    }
    function handleMouseMove(event) {
      const {
        value: activeIndex
      } = activeIndexRef;
      if (!draggingRef.value || activeIndex === -1) {
        stopDragging();
        return;
      }
      const pointValue = getPointValue(event);
      if (pointValue === undefined) return;
      doDispatchValue(sanitizeValue(pointValue, arrifiedValueRef.value[activeIndex]), activeIndex);
    }
    function handleMouseUp() {
      stopDragging();
    }
    function handleHandleFocus(index) {
      activeIndexRef.value = index;
      // Wake focus style
      if (!mergedDisabledRef.value) {
        hoverIndexRef.value = index;
      }
    }
    function handleHandleBlur(index) {
      if (activeIndexRef.value === index) {
        activeIndexRef.value = -1;
        stopDragging();
      }
      if (hoverIndexRef.value === index) {
        hoverIndexRef.value = -1;
      }
    }
    function handleHandleMouseEnter(index) {
      hoverIndexRef.value = index;
    }
    function handleHandleMouseLeave(index) {
      if (hoverIndexRef.value === index) {
        hoverIndexRef.value = -1;
      }
    }
    watch(activeIndexRef, (_, previous) => void nextTick(() => previousIndexRef.value = previous));
    watch(mergedValueRef, () => {
      if (props.marks) {
        if (dotTransitionDisabledRef.value) return;
        dotTransitionDisabledRef.value = true;
        void nextTick(() => {
          dotTransitionDisabledRef.value = false;
        });
      }
      void nextTick(syncPosition);
    });
    onBeforeUnmount(() => {
      stopDragging();
    });
    const cssVarsRef = computed(() => {
      const {
        self: {
          markFontSize,
          railColor,
          railColorHover,
          fillColor,
          fillColorHover,
          handleColor,
          opacityDisabled,
          dotColor,
          dotColorModal,
          handleBoxShadow,
          handleBoxShadowHover,
          handleBoxShadowActive,
          handleBoxShadowFocus,
          dotBorder,
          dotBoxShadow,
          railHeight,
          railWidthVertical,
          handleSize,
          dotHeight,
          dotWidth,
          dotBorderRadius,
          fontSize,
          dotBorderActive,
          dotColorPopover
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-dot-border': dotBorder,
        '--n-dot-border-active': dotBorderActive,
        '--n-dot-border-radius': dotBorderRadius,
        '--n-dot-box-shadow': dotBoxShadow,
        '--n-dot-color': dotColor,
        '--n-dot-color-modal': dotColorModal,
        '--n-dot-color-popover': dotColorPopover,
        '--n-dot-height': dotHeight,
        '--n-dot-width': dotWidth,
        '--n-fill-color': fillColor,
        '--n-fill-color-hover': fillColorHover,
        '--n-font-size': fontSize,
        '--n-handle-box-shadow': handleBoxShadow,
        '--n-handle-box-shadow-active': handleBoxShadowActive,
        '--n-handle-box-shadow-focus': handleBoxShadowFocus,
        '--n-handle-box-shadow-hover': handleBoxShadowHover,
        '--n-handle-color': handleColor,
        '--n-handle-size': handleSize,
        '--n-opacity-disabled': opacityDisabled,
        '--n-rail-color': railColor,
        '--n-rail-color-hover': railColorHover,
        '--n-rail-height': railHeight,
        '--n-rail-width-vertical': railWidthVertical,
        '--n-mark-font-size': markFontSize
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('slider', undefined, cssVarsRef, props) : undefined;
    const indicatorCssVarsRef = computed(() => {
      const {
        self: {
          fontSize,
          indicatorColor,
          indicatorBoxShadow,
          indicatorTextColor,
          indicatorBorderRadius
        }
      } = themeRef.value;
      return {
        '--n-font-size': fontSize,
        '--n-indicator-border-radius': indicatorBorderRadius,
        '--n-indicator-box-shadow': indicatorBoxShadow,
        '--n-indicator-color': indicatorColor,
        '--n-indicator-text-color': indicatorTextColor
      };
    });
    const indicatorThemeClassHandle = inlineThemeDisabled ? useThemeClass('slider-indicator', undefined, indicatorCssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      namespace: namespaceRef,
      uncontrolledValue: uncontrolledValueRef,
      mergedValue: mergedValueRef,
      mergedDisabled: mergedDisabledRef,
      mergedPlacement: mergedPlacementRef,
      isMounted: useIsMounted(),
      adjustedTo: useAdjustedTo(props),
      dotTransitionDisabled: dotTransitionDisabledRef,
      markInfos: markInfosRef,
      isShowTooltip,
      shouldKeepTooltipTransition,
      handleRailRef,
      setHandleRefs,
      setFollowerRefs,
      fillStyle: fillStyleRef,
      getHandleStyle,
      activeIndex: activeIndexRef,
      arrifiedValues: arrifiedValueRef,
      followerEnabledIndexSet: followerEnabledIndexSetRef,
      handleRailMouseDown,
      handleHandleFocus,
      handleHandleBlur,
      handleHandleMouseEnter,
      handleHandleMouseLeave,
      handleRailKeyDown,
      indicatorCssVars: inlineThemeDisabled ? undefined : indicatorCssVarsRef,
      indicatorThemeClass: indicatorThemeClassHandle === null || indicatorThemeClassHandle === void 0 ? void 0 : indicatorThemeClassHandle.themeClass,
      indicatorOnRender: indicatorThemeClassHandle === null || indicatorThemeClassHandle === void 0 ? void 0 : indicatorThemeClassHandle.onRender,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      themeClass,
      formatTooltip
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${mergedClsPrefix}-slider`, themeClass, {
        [`${mergedClsPrefix}-slider--disabled`]: this.mergedDisabled,
        [`${mergedClsPrefix}-slider--active`]: this.activeIndex !== -1,
        [`${mergedClsPrefix}-slider--with-mark`]: this.marks,
        [`${mergedClsPrefix}-slider--vertical`]: this.vertical,
        [`${mergedClsPrefix}-slider--reverse`]: this.reverse
      }],
      style: this.cssVars,
      onKeydown: this.handleRailKeyDown,
      onMousedown: this.handleRailMouseDown,
      onTouchstart: this.handleRailMouseDown
    }, h("div", {
      class: `${mergedClsPrefix}-slider-rail`
    }, h("div", {
      class: `${mergedClsPrefix}-slider-rail__fill`,
      style: this.fillStyle
    }), this.marks ? h("div", {
      class: [`${mergedClsPrefix}-slider-dots`, this.dotTransitionDisabled && `${mergedClsPrefix}-slider-dots--transition-disabled`]
    }, this.markInfos.map(mark => h("div", {
      key: mark.key,
      class: [`${mergedClsPrefix}-slider-dot`, {
        [`${mergedClsPrefix}-slider-dot--active`]: mark.active
      }],
      style: mark.style
    }))) : null, h("div", {
      ref: "handleRailRef",
      class: `${mergedClsPrefix}-slider-handles`
    }, this.arrifiedValues.map((value, index) => {
      const showTooltip = this.isShowTooltip(index);
      return h(VBinder, null, {
        default: () => [h(VTarget, null, {
          default: () => h("div", {
            ref: this.setHandleRefs(index),
            class: `${mergedClsPrefix}-slider-handle-wrapper`,
            tabindex: this.mergedDisabled ? -1 : 0,
            role: "slider",
            "aria-valuenow": value,
            "aria-valuemin": this.min,
            "aria-valuemax": this.max,
            "aria-orientation": this.vertical ? 'vertical' : 'horizontal',
            "aria-disabled": this.disabled,
            style: this.getHandleStyle(value, index),
            onFocus: () => {
              this.handleHandleFocus(index);
            },
            onBlur: () => {
              this.handleHandleBlur(index);
            },
            onMouseenter: () => {
              this.handleHandleMouseEnter(index);
            },
            onMouseleave: () => {
              this.handleHandleMouseLeave(index);
            }
          }, resolveSlot(this.$slots.thumb, () => [h("div", {
            class: `${mergedClsPrefix}-slider-handle`
          })]))
        }), this.tooltip && h(VFollower, {
          ref: this.setFollowerRefs(index),
          show: showTooltip,
          to: this.adjustedTo,
          enabled: this.showTooltip && !this.range || this.followerEnabledIndexSet.has(index),
          teleportDisabled: this.adjustedTo === useAdjustedTo.tdkey,
          placement: this.mergedPlacement,
          containerClass: this.namespace
        }, {
          default: () => h(Transition, {
            name: "fade-in-scale-up-transition",
            appear: this.isMounted,
            css: this.shouldKeepTooltipTransition(index),
            onEnter: () => {
              this.followerEnabledIndexSet.add(index);
            },
            onAfterLeave: () => {
              this.followerEnabledIndexSet.delete(index);
            }
          }, {
            default: () => {
              var _a;
              if (showTooltip) {
                (_a = this.indicatorOnRender) === null || _a === void 0 ? void 0 : _a.call(this);
                return h("div", {
                  class: [`${mergedClsPrefix}-slider-handle-indicator`, this.indicatorThemeClass, `${mergedClsPrefix}-slider-handle-indicator--${this.mergedPlacement}`],
                  style: this.indicatorCssVars
                }, typeof formatTooltip === 'function' ? formatTooltip(value) : value);
              }
              return null;
            }
          })
        })]
      });
    })), this.marks ? h("div", {
      class: `${mergedClsPrefix}-slider-marks`
    }, this.markInfos.map(mark => h("div", {
      key: mark.key,
      class: `${mergedClsPrefix}-slider-mark`,
      style: mark.style
    }, typeof mark.label === 'function' ? mark.label() : mark.label))) : null));
  }
});