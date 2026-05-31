import { useMergedState } from 'vooks';
import { computed, defineComponent, h, ref, renderList, toRef } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { useConfig, useFormItem, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, color2Class, createKey } from "../../_utils/index.mjs";
import { rateLight } from "../styles/index.mjs";
import renderStarIcon from "./StarIcon.mjs";
import style from "./styles/index.cssr.mjs";
export const rateProps = Object.assign(Object.assign({}, useTheme.props), {
  allowHalf: Boolean,
  count: {
    type: Number,
    default: 5
  },
  value: Number,
  defaultValue: {
    type: Number,
    default: null
  },
  readonly: Boolean,
  size: [String, Number],
  clearable: Boolean,
  color: String,
  onClear: Function,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array]
});
export default defineComponent({
  name: 'Rate',
  props: rateProps,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const themeRef = useTheme('Rate', '-rate', style, rateLight, props, mergedClsPrefixRef);
    const controlledValueRef = toRef(props, 'value');
    const uncontrolledValueRef = ref(props.defaultValue);
    const hoverIndexRef = ref(null);
    const formItem = useFormItem(props, {
      mergedSize(NFormItem) {
        var _a, _b;
        if (props.size !== undefined) return props.size;
        if (NFormItem) {
          return NFormItem.mergedSize.value;
        }
        const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Rate) === null || _b === void 0 ? void 0 : _b.size;
        if (configSize !== undefined) return configSize;
        return 'medium';
      }
    });
    const mergedValue = useMergedState(controlledValueRef, uncontrolledValueRef);
    function doUpdateValue(value) {
      const {
        'onUpdate:value': _onUpdateValue,
        onUpdateValue
      } = props;
      const {
        nTriggerFormChange,
        nTriggerFormInput
      } = formItem;
      if (_onUpdateValue) {
        call(_onUpdateValue, value);
      }
      if (onUpdateValue) {
        call(onUpdateValue, value);
      }
      uncontrolledValueRef.value = value;
      nTriggerFormChange();
      nTriggerFormInput();
    }
    function getDerivedValue(index, e) {
      if (props.allowHalf) {
        if (e.offsetX >= Math.floor(e.currentTarget.offsetWidth / 2)) {
          return index + 1;
        } else {
          return index + 0.5;
        }
      } else {
        return index + 1;
      }
    }
    let cleared = false;
    function handleMouseMove(index, e) {
      if (cleared) return;
      hoverIndexRef.value = getDerivedValue(index, e);
    }
    function handleMouseLeave() {
      hoverIndexRef.value = null;
    }
    function handleClick(index, e) {
      var _a;
      const {
        clearable
      } = props;
      const derivedValue = getDerivedValue(index, e);
      if (clearable && derivedValue === mergedValue.value) {
        cleared = true;
        (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
        hoverIndexRef.value = null;
        doUpdateValue(null);
      } else {
        doUpdateValue(derivedValue);
      }
    }
    function handleMouseEnterSomeStar() {
      cleared = false;
    }
    const {
      mergedSizeRef: _mergedSizeRef
    } = formItem;
    const mergedSizeRef = computed(() => {
      const size = _mergedSizeRef.value;
      const {
        self
      } = themeRef.value;
      if (typeof size === 'number') {
        return `${size}px`;
      } else {
        return self[createKey('size', size)];
      }
    });
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const {
        itemColor,
        itemColorActive
      } = self;
      const {
        color
      } = props;
      return {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-item-color': itemColor,
        '--n-item-color-active': color || itemColorActive,
        '--n-item-size': mergedSizeRef.value
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('rate', computed(() => {
      const size = mergedSizeRef.value;
      const {
        color
      } = props;
      let hash = '';
      if (size) {
        hash += size[0];
      }
      if (color) {
        hash += color2Class(color);
      }
      return hash;
    }), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue,
      hoverIndex: hoverIndexRef,
      handleMouseMove,
      handleClick,
      handleMouseLeave,
      handleMouseEnterSomeStar,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const {
      readonly,
      hoverIndex,
      mergedValue,
      mergedClsPrefix,
      onRender,
      $slots: {
        default: defaultSlot
      }
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    return h("div", {
      class: [`${mergedClsPrefix}-rate`, {
        [`${mergedClsPrefix}-rate--readonly`]: readonly
      }, this.themeClass],
      style: this.cssVars,
      onMouseleave: this.handleMouseLeave
    }, renderList(this.count, (_, index) => {
      const icon = defaultSlot ? defaultSlot({
        index
      }) : h(NBaseIcon, {
        clsPrefix: mergedClsPrefix
      }, {
        default: renderStarIcon
      });
      const entireStarActive = hoverIndex !== null ? index + 1 <= hoverIndex : index + 1 <= (mergedValue || 0);
      return h("div", {
        key: index,
        class: [`${mergedClsPrefix}-rate__item`, entireStarActive && `${mergedClsPrefix}-rate__item--active`],
        onClick: readonly ? undefined : e => {
          this.handleClick(index, e);
        },
        onMouseenter: this.handleMouseEnterSomeStar,
        onMousemove: readonly ? undefined : e => {
          this.handleMouseMove(index, e);
        }
      }, icon, this.allowHalf ? h("div", {
        class: [`${mergedClsPrefix}-rate__half`, {
          [`${mergedClsPrefix}-rate__half--active`]: !entireStarActive && hoverIndex !== null ? index + 0.5 <= hoverIndex : index + 0.5 <= (mergedValue || 0)
        }]
      }, icon) : null);
    }));
  }
});