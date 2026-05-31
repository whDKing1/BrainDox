import { defineComponent, h, provide, ref } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { call, keep, omit } from "../../_utils/index.mjs";
import { NPopover } from "../../popover/index.mjs";
import { popoverBaseProps } from "../../popover/src/Popover.mjs";
import { popconfirmLight } from "../styles/index.mjs";
import { popconfirmInjectionKey } from "./interface.mjs";
import PopconfirmPanel, { panelPropKeys } from "./PopconfirmPanel.mjs";
import style from "./styles/index.cssr.mjs";
export const popconfirmProps = Object.assign(Object.assign(Object.assign({}, useTheme.props), popoverBaseProps), {
  positiveText: String,
  negativeText: String,
  showIcon: {
    type: Boolean,
    default: true
  },
  trigger: {
    type: String,
    default: 'click'
  },
  positiveButtonProps: Object,
  negativeButtonProps: Object,
  onPositiveClick: Function,
  onNegativeClick: Function
});
export default defineComponent({
  name: 'Popconfirm',
  props: popconfirmProps,
  slots: Object,
  __popover__: true,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig();
    const themeRef = useTheme('Popconfirm', '-popconfirm', style, popconfirmLight, props, mergedClsPrefixRef);
    const popoverInstRef = ref(null);
    function handlePositiveClick(e) {
      var _a;
      if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow())) return;
      const {
        onPositiveClick,
        'onUpdate:show': onUpdateShow
      } = props;
      void Promise.resolve(onPositiveClick ? onPositiveClick(e) : true).then(value => {
        var _a;
        if (value === false) return;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
        if (onUpdateShow) call(onUpdateShow, false);
      });
    }
    function handleNegativeClick(e) {
      var _a;
      if (!((_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.getMergedShow())) return;
      const {
        onNegativeClick,
        'onUpdate:show': onUpdateShow
      } = props;
      void Promise.resolve(onNegativeClick ? onNegativeClick(e) : true).then(value => {
        var _a;
        if (value === false) return;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(false);
        if (onUpdateShow) call(onUpdateShow, false);
      });
    }
    provide(popconfirmInjectionKey, {
      mergedThemeRef: themeRef,
      mergedClsPrefixRef,
      props
    });
    const returned = {
      setShow(value) {
        var _a;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
      },
      syncPosition() {
        var _a;
        (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
      },
      mergedTheme: themeRef,
      popoverInstRef,
      handlePositiveClick,
      handleNegativeClick
    };
    return returned;
  },
  render() {
    const {
      $slots: slots,
      $props: props,
      mergedTheme
    } = this;
    return h(NPopover, Object.assign({}, omit(props, panelPropKeys), {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      internalExtraClass: ['popconfirm'],
      ref: "popoverInstRef"
    }), {
      trigger: slots.trigger,
      default: () => {
        const panelProps = keep(props, panelPropKeys);
        return h(PopconfirmPanel, Object.assign({}, panelProps, {
          onPositiveClick: this.handlePositiveClick,
          onNegativeClick: this.handleNegativeClick
        }), slots);
      }
    });
  }
});