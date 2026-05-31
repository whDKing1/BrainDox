import { defineComponent, h, inject } from 'vue';
import { throwError } from "../../_utils/index.mjs";
import { listInjectionKey } from "./List.mjs";
export default defineComponent({
  name: 'ListItem',
  slots: Object,
  setup() {
    const listInjection = inject(listInjectionKey, null);
    if (!listInjection) {
      throwError('list-item', '`n-list-item` must be placed in `n-list`.');
    }
    return {
      showDivider: listInjection.showDividerRef,
      mergedClsPrefix: listInjection.mergedClsPrefixRef
    };
  },
  render() {
    const {
      $slots,
      mergedClsPrefix
    } = this;
    return h("li", {
      class: `${mergedClsPrefix}-list-item`
    }, $slots.prefix ? h("div", {
      class: `${mergedClsPrefix}-list-item__prefix`
    }, $slots.prefix()) : null, $slots.default ? h("div", {
      class: `${mergedClsPrefix}-list-item__main`
    }, $slots) : null, $slots.suffix ? h("div", {
      class: `${mergedClsPrefix}-list-item__suffix`
    }, $slots.suffix()) : null, this.showDivider && h("div", {
      class: `${mergedClsPrefix}-list-item__divider`
    }));
  }
});