import { happensIn } from 'seemly';
import { createTreeMate } from 'treemate';
import { computed, defineComponent, h, inject, nextTick, toRef, watch, watchEffect } from 'vue';
import { NInternalSelectMenu } from "../../_internal/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, keysOf, warn } from "../../_utils/index.mjs";
import { createTmOptions } from "../../select/src/utils.mjs";
import { popselectLight } from "../styles/index.mjs";
import { popselectInjectionKey } from "./interface.mjs";
import style from "./styles/index.cssr.mjs";
export const panelProps = {
  multiple: Boolean,
  value: {
    type: [String, Number, Array],
    default: null
  },
  cancelable: Boolean,
  options: {
    type: Array,
    default: () => []
  },
  size: String,
  scrollable: Boolean,
  'onUpdate:value': [Function, Array],
  onUpdateValue: [Function, Array],
  onMouseenter: Function,
  onMouseleave: Function,
  renderLabel: Function,
  showCheckmark: {
    type: Boolean,
    default: undefined
  },
  nodeProps: Function,
  virtualScroll: Boolean,
  // deprecated
  onChange: [Function, Array]
};
export const panelPropKeys = keysOf(panelProps);
export default defineComponent({
  name: 'PopselectPanel',
  props: panelProps,
  setup(props) {
    if (process.env.NODE_ENV !== 'production') {
      watchEffect(() => {
        if (props.onChange !== undefined) {
          warn('popselect', '`on-change` is deprecated, please use `on-update:value` instead.');
        }
      });
    }
    const NPopselect = inject(popselectInjectionKey);
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Popselect) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const themeRef = useTheme('Popselect', '-pop-select', style, popselectLight, NPopselect.props, mergedClsPrefixRef);
    const treeMateRef = computed(() => {
      return createTreeMate(props.options, createTmOptions('value', 'children'));
    });
    function doUpdateValue(value, option) {
      const {
        onUpdateValue,
        'onUpdate:value': _onUpdateValue,
        onChange
      } = props;
      if (onUpdateValue) call(onUpdateValue, value, option);
      if (_onUpdateValue) {
        call(_onUpdateValue, value, option);
      }
      if (onChange) call(onChange, value, option);
    }
    function handleToggle(tmNode) {
      toggle(tmNode.key);
    }
    function handleMenuMousedown(e) {
      if (!happensIn(e, 'action') && !happensIn(e, 'empty') && !happensIn(e, 'header')) {
        e.preventDefault();
      }
    }
    function toggle(value) {
      const {
        value: {
          getNode
        }
      } = treeMateRef;
      if (props.multiple) {
        if (Array.isArray(props.value)) {
          const newValue = [];
          const newOptions = [];
          let shouldAddValue = true;
          props.value.forEach(v => {
            if (v === value) {
              shouldAddValue = false;
              return;
            }
            const tmNode = getNode(v);
            if (tmNode) {
              newValue.push(tmNode.key);
              newOptions.push(tmNode.rawNode);
            }
          });
          if (shouldAddValue) {
            newValue.push(value);
            newOptions.push(getNode(value).rawNode);
          }
          doUpdateValue(newValue, newOptions);
        } else {
          const tmNode = getNode(value);
          if (tmNode) {
            doUpdateValue([value], [tmNode.rawNode]);
          }
        }
      } else {
        if (props.value === value && props.cancelable) {
          doUpdateValue(null, null);
        } else {
          const tmNode = getNode(value);
          if (tmNode) {
            doUpdateValue(value, tmNode.rawNode);
          }
          const {
            'onUpdate:show': _onUpdateShow,
            onUpdateShow
          } = NPopselect.props;
          if (_onUpdateShow) call(_onUpdateShow, false);
          if (onUpdateShow) call(onUpdateShow, false);
          NPopselect.setShow(false);
        }
      }
      void nextTick(() => {
        NPopselect.syncPosition();
      });
    }
    watch(toRef(props, 'options'), () => {
      void nextTick(() => {
        NPopselect.syncPosition();
      });
    });
    const cssVarsRef = computed(() => {
      const {
        self: {
          menuBoxShadow
        }
      } = themeRef.value;
      return {
        '--n-menu-box-shadow': menuBoxShadow
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('select', undefined, cssVarsRef, NPopselect.props) : undefined;
    return {
      mergedTheme: NPopselect.mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      treeMate: treeMateRef,
      handleToggle,
      handleMenuMousedown,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      mergedSize: mergedSizeRef,
      scrollbarProps: NPopselect.props.scrollbarProps
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h(NInternalSelectMenu, {
      clsPrefix: this.mergedClsPrefix,
      focusable: true,
      nodeProps: this.nodeProps,
      class: [`${this.mergedClsPrefix}-popselect-menu`, this.themeClass],
      style: this.cssVars,
      theme: this.mergedTheme.peers.InternalSelectMenu,
      themeOverrides: this.mergedTheme.peerOverrides.InternalSelectMenu,
      multiple: this.multiple,
      treeMate: this.treeMate,
      size: this.mergedSize,
      value: this.value,
      virtualScroll: this.virtualScroll,
      scrollable: this.scrollable,
      scrollbarProps: this.scrollbarProps,
      renderLabel: this.renderLabel,
      onToggle: this.handleToggle,
      onMouseenter: this.onMouseenter,
      onMouseleave: this.onMouseenter,
      onMousedown: this.handleMenuMousedown,
      showCheckmark: this.showCheckmark
    }, {
      header: () => {
        var _a, _b;
        return ((_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a)) || [];
      },
      action: () => {
        var _a, _b;
        return ((_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a)) || [];
      },
      empty: () => {
        var _a, _b;
        return ((_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a)) || [];
      }
    });
  }
});