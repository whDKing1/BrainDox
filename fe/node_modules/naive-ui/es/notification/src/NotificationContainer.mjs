import { defineComponent, h, inject, ref, watchEffect } from 'vue';
import { NScrollbar } from "../../_internal/index.mjs";
import { notificationProviderInjectionKey } from "./context.mjs";
export const NotificationContainer = defineComponent({
  name: 'NotificationContainer',
  props: {
    scrollable: {
      type: Boolean,
      required: true
    },
    placement: {
      type: String,
      required: true
    }
  },
  setup() {
    const {
      mergedThemeRef,
      mergedClsPrefixRef,
      wipTransitionCountRef
    } = inject(notificationProviderInjectionKey);
    const selfRef = ref(null);
    watchEffect(() => {
      var _a, _b;
      if (wipTransitionCountRef.value > 0) {
        (_a = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _a === void 0 ? void 0 : _a.classList.add('transitioning');
      } else {
        (_b = selfRef === null || selfRef === void 0 ? void 0 : selfRef.value) === null || _b === void 0 ? void 0 : _b.classList.remove('transitioning');
      }
    });
    return {
      selfRef,
      mergedTheme: mergedThemeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      transitioning: wipTransitionCountRef
    };
  },
  render() {
    const {
      $slots,
      scrollable,
      mergedClsPrefix,
      mergedTheme,
      placement
    } = this;
    return h("div", {
      ref: "selfRef",
      class: [`${mergedClsPrefix}-notification-container`, scrollable && `${mergedClsPrefix}-notification-container--scrollable`, `${mergedClsPrefix}-notification-container--${placement}`]
    }, scrollable ? h(NScrollbar, {
      theme: mergedTheme.peers.Scrollbar,
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      contentStyle: {
        overflow: 'hidden'
      }
    }, $slots) : $slots);
  }
});