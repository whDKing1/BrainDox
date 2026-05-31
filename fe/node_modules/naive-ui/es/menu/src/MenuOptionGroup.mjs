import { computed, defineComponent, Fragment, h, inject, provide } from 'vue';
import { keysOf, render } from "../../_utils/index.mjs";
import { menuInjectionKey, menuItemGroupInjectionKey } from "./context.mjs";
import { useMenuChild } from "./use-menu-child.mjs";
import { useMenuChildProps } from "./use-menu-child-props.mjs";
import { itemRenderer } from "./utils.mjs";
export const menuItemGroupProps = Object.assign(Object.assign({}, useMenuChildProps), {
  tmNode: {
    type: Object,
    required: true
  },
  tmNodes: {
    type: Array,
    required: true
  }
});
export const menuItemGroupPropKeys = keysOf(menuItemGroupProps);
export const NMenuOptionGroup = defineComponent({
  name: 'MenuOptionGroup',
  props: menuItemGroupProps,
  setup(props) {
    const MenuChild = useMenuChild(props);
    const {
      NSubmenu
    } = MenuChild;
    const mergedDisabledRef = computed(() => {
      if (NSubmenu === null || NSubmenu === void 0 ? void 0 : NSubmenu.mergedDisabledRef.value) return true;
      return props.tmNode.disabled;
    });
    provide(menuItemGroupInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
    });
    const {
      mergedClsPrefixRef,
      props: menuProps
    } = inject(menuInjectionKey);
    return function () {
      const {
        value: mergedClsPrefix
      } = mergedClsPrefixRef;
      const paddingLeft = MenuChild.paddingLeft.value;
      const {
        nodeProps
      } = menuProps;
      const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(props.tmNode.rawNode);
      return h("div", {
        class: `${mergedClsPrefix}-menu-item-group`,
        role: "group"
      }, h("div", Object.assign({}, attrs, {
        class: [`${mergedClsPrefix}-menu-item-group-title`, attrs === null || attrs === void 0 ? void 0 : attrs.class],
        style: [(attrs === null || attrs === void 0 ? void 0 : attrs.style) || '', paddingLeft !== undefined ? `padding-left: ${paddingLeft}px;` : '']
      }), render(props.title), props.extra ? h(Fragment, null, ' ', render(props.extra)) : null), h("div", null, props.tmNodes.map(tmNode => itemRenderer(tmNode, menuProps))));
    };
  }
});