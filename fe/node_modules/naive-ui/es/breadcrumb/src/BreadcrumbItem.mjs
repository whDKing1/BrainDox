import { computed, defineComponent, h, inject } from 'vue';
import { resolveSlot, warn } from "../../_utils/index.mjs";
import { useBrowserLocation } from "../../_utils/composable/use-browser-location.mjs";
import { breadcrumbInjectionKey } from "./Breadcrumb.mjs";
export const breadcrumbItemProps = {
  separator: String,
  href: String,
  clickable: {
    type: Boolean,
    default: true
  },
  showSeparator: {
    type: Boolean,
    default: true
  },
  onClick: Function
};
export default defineComponent({
  name: 'BreadcrumbItem',
  props: breadcrumbItemProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const NBreadcrumb = inject(breadcrumbInjectionKey, null);
    if (!NBreadcrumb) {
      if (process.env.NODE_ENV !== 'production') {
        warn('breadcrumb', '`n-breadcrumb-item` must be placed inside `n-breadcrumb`.');
      }
      return () => null;
    }
    const {
      separatorRef,
      mergedClsPrefixRef
    } = NBreadcrumb;
    const browserLocationRef = useBrowserLocation();
    const htmlTagRef = computed(() => props.href ? 'a' : 'span');
    const ariaCurrentRef = computed(() => browserLocationRef.value.href === props.href ? 'location' : null);
    return () => {
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      return h("li", {
        class: [`${mergedClsPrefix}-breadcrumb-item`, props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`]
      }, h(htmlTagRef.value, {
        class: `${mergedClsPrefix}-breadcrumb-item__link`,
        'aria-current': ariaCurrentRef.value,
        href: props.href,
        onClick: props.onClick
      }, slots), props.showSeparator && h("span", {
        class: `${mergedClsPrefix}-breadcrumb-item__separator`,
        "aria-hidden": "true"
      }, resolveSlot(slots.separator, () => {
        var _a;
        return [(_a = props.separator) !== null && _a !== void 0 ? _a : separatorRef.value];
      })));
    };
  }
});