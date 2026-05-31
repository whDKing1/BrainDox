import { useIsMounted } from 'vooks';
import { defineComponent, Fragment, h, nextTick, provide, ref, Teleport } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { loadingBarApiInjectionKey, loadingBarProviderInjectionKey } from "./context.mjs";
import NLoadingBar from "./LoadingBar.mjs";
export const loadingBarProviderProps = Object.assign(Object.assign({}, useTheme.props), {
  to: {
    type: [String, Object, Boolean],
    default: undefined
  },
  containerClass: String,
  containerStyle: [String, Object],
  loadingBarStyle: {
    type: Object
  }
});
export default defineComponent({
  name: 'LoadingBarProvider',
  props: loadingBarProviderProps,
  setup(props) {
    const isMountedRef = useIsMounted();
    const loadingBarRef = ref(null);
    const methods = {
      start() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.start();
        } else {
          void nextTick(() => {
            var _a;
            (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.start();
          });
        }
      },
      error() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.error();
        } else {
          void nextTick(() => {
            var _a;
            (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.error();
          });
        }
      },
      finish() {
        var _a;
        if (isMountedRef.value) {
          (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.finish();
        } else {
          void nextTick(() => {
            var _a;
            (_a = loadingBarRef.value) === null || _a === void 0 ? void 0 : _a.finish();
          });
        }
      }
    };
    const {
      mergedClsPrefixRef
    } = useConfig(props);
    provide(loadingBarApiInjectionKey, methods);
    provide(loadingBarProviderInjectionKey, {
      props,
      mergedClsPrefixRef
    });
    return Object.assign(methods, {
      loadingBarRef
    });
  },
  render() {
    var _a, _b;
    return h(Fragment, null, h(Teleport, {
      disabled: this.to === false,
      to: this.to || 'body'
    }, h(NLoadingBar, {
      ref: "loadingBarRef",
      containerStyle: this.containerStyle,
      containerClass: this.containerClass
    })), (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a));
  }
});