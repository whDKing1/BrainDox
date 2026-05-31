import { upperFirst } from 'lodash-es';
import { defineComponent, h, inject } from 'vue';
import { configProviderInjectionKey } from "../../config-provider/src/context.mjs";
export function replaceable(name, icon) {
  const IconComponent = defineComponent({
    render() {
      return icon();
    }
  });
  return defineComponent({
    name: upperFirst(name),
    setup() {
      var _a;
      const mergedIconsRef = (_a = inject(configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
      return () => {
        var _a;
        const iconOverride = (_a = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a === void 0 ? void 0 : _a[name];
        return iconOverride ? iconOverride() : h(IconComponent, null);
      };
    }
  });
}