// Tooltip: popover wearing waistcoat
import { computed, defineComponent, h, ref } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { NPopover } from "../../popover/index.mjs";
import { popoverBaseProps } from "../../popover/src/Popover.mjs";
import { tooltipLight } from "../styles/index.mjs";
export const tooltipProps = Object.assign(Object.assign({}, popoverBaseProps), useTheme.props);
export default defineComponent({
  name: 'Tooltip',
  props: tooltipProps,
  slots: Object,
  __popover__: true,
  setup(props) {
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    const themeRef = useTheme('Tooltip', '-tooltip', undefined, tooltipLight, props, mergedClsPrefixRef);
    const popoverRef = ref(null);
    const tooltipExposedMethod = {
      syncPosition() {
        popoverRef.value.syncPosition();
      },
      setShow(show) {
        popoverRef.value.setShow(show);
      }
    };
    return Object.assign(Object.assign({}, tooltipExposedMethod), {
      popoverRef,
      mergedTheme: themeRef,
      popoverThemeOverrides: computed(() => {
        return themeRef.value.self;
      })
    });
  },
  render() {
    const {
      mergedTheme,
      internalExtraClass
    } = this;
    return h(NPopover, Object.assign(Object.assign({}, this.$props), {
      theme: mergedTheme.peers.Popover,
      themeOverrides: mergedTheme.peerOverrides.Popover,
      builtinThemeOverrides: this.popoverThemeOverrides,
      internalExtraClass: internalExtraClass.concat('tooltip'),
      ref: 'popoverRef'
    }), this.$slots);
  }
});