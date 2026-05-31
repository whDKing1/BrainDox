import { defineComponent, h, provide, ref } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { createRefSetter, keep, mergeEventHandlers, omit } from "../../_utils/index.mjs";
import { NPopover } from "../../popover/index.mjs";
import { popoverBaseProps } from "../../popover/src/Popover.mjs";
import { popselectLight } from "../styles/index.mjs";
import { popselectInjectionKey } from "./interface.mjs";
import NPopselectPanel, { panelPropKeys, panelProps } from "./PopselectPanel.mjs";
export const popselectProps = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), omit(popoverBaseProps, ['showArrow', 'arrow'])), {
  placement: Object.assign(Object.assign({}, popoverBaseProps.placement), {
    default: 'bottom'
  }),
  trigger: {
    type: String,
    default: 'hover'
  }
}), panelProps), {
  scrollbarProps: Object
});
export default defineComponent({
  name: 'Popselect',
  props: popselectProps,
  slots: Object,
  inheritAttrs: false,
  __popover__: true,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const themeRef = useTheme('Popselect', '-popselect', undefined, popselectLight, props, mergedClsPrefixRef);
    const popoverInstRef = ref(null);
    function syncPosition() {
      var _a;
      (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.syncPosition();
    }
    function setShow(value) {
      var _a;
      (_a = popoverInstRef.value) === null || _a === void 0 ? void 0 : _a.setShow(value);
    }
    provide(popselectInjectionKey, {
      props,
      mergedThemeRef: themeRef,
      syncPosition,
      setShow
    });
    const exposedMethods = {
      syncPosition,
      setShow
    };
    return Object.assign(Object.assign({}, exposedMethods), {
      popoverInstRef,
      mergedTheme: themeRef
    });
  },
  render() {
    const {
      mergedTheme
    } = this;
    const popoverProps = {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: {
        padding: '0'
      },
      ref: 'popoverInstRef',
      internalRenderBody: (className, ref, style, onMouseenter, onMouseleave) => {
        const {
          $attrs
        } = this;
        return h(NPopselectPanel, Object.assign({}, $attrs, {
          class: [$attrs.class, className],
          style: [$attrs.style, ...style]
        }, keep(this.$props, panelPropKeys), {
          ref: createRefSetter(ref),
          onMouseenter: mergeEventHandlers([onMouseenter, $attrs.onMouseenter]),
          onMouseleave: mergeEventHandlers([onMouseleave, $attrs.onMouseleave])
        }), {
          header: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).header) === null || _b === void 0 ? void 0 : _b.call(_a);
          },
          action: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).action) === null || _b === void 0 ? void 0 : _b.call(_a);
          },
          empty: () => {
            var _a, _b;
            return (_b = (_a = this.$slots).empty) === null || _b === void 0 ? void 0 : _b.call(_a);
          }
        });
      }
    };
    return h(NPopover, Object.assign({}, omit(this.$props, panelPropKeys), popoverProps, {
      internalDeactivateImmediately: true
    }), {
      trigger: () => {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });
  }
});