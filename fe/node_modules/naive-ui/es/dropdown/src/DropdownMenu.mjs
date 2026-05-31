import { computed, defineComponent, h, inject, provide, ref } from 'vue';
import { NxScrollbar } from "../../_internal/scrollbar/index.mjs";
import { drawerBodyInjectionKey } from "../../drawer/src/interface.mjs";
import { modalBodyInjectionKey } from "../../modal/src/interface.mjs";
import { popoverBodyInjectionKey } from "../../popover/src/interface.mjs";
import { renderArrow } from "../../popover/src/PopoverBody.mjs";
import { dropdownInjectionKey, dropdownMenuInjectionKey } from "./context.mjs";
import NDropdownDivider from "./DropdownDivider.mjs";
import NDropdownGroup from "./DropdownGroup.mjs";
import NDropdownOption from "./DropdownOption.mjs";
import NDropdownRenderOption from "./DropdownRenderOption.mjs";
import { isDividerNode, isGroupNode, isRenderNode, isSubmenuNode } from "./utils.mjs";
export default defineComponent({
  name: 'DropdownMenu',
  props: {
    scrollable: Boolean,
    showArrow: Boolean,
    arrowStyle: [String, Object],
    clsPrefix: {
      type: String,
      required: true
    },
    tmNodes: {
      type: Array,
      default: () => []
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  setup(props) {
    const {
      renderIconRef,
      childrenFieldRef
    } = inject(dropdownInjectionKey);
    provide(dropdownMenuInjectionKey, {
      showIconRef: computed(() => {
        const renderIcon = renderIconRef.value;
        return props.tmNodes.some(tmNode => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => renderIcon ? renderIcon(rawChild) : rawChild.icon);
          }
          const {
            rawNode
          } = tmNode;
          return renderIcon ? renderIcon(rawNode) : rawNode.icon;
        });
      }),
      hasSubmenuRef: computed(() => {
        const {
          value: childrenField
        } = childrenFieldRef;
        return props.tmNodes.some(tmNode => {
          var _a;
          if (tmNode.isGroup) {
            return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({
              rawNode: rawChild
            }) => isSubmenuNode(rawChild, childrenField));
          }
          const {
            rawNode
          } = tmNode;
          return isSubmenuNode(rawNode, childrenField);
        });
      })
    });
    const bodyRef = ref(null);
    provide(modalBodyInjectionKey, null);
    provide(drawerBodyInjectionKey, null);
    provide(popoverBodyInjectionKey, bodyRef);
    return {
      bodyRef
    };
  },
  render() {
    const {
      parentKey,
      clsPrefix,
      scrollable
    } = this;
    const menuOptionsNode = this.tmNodes.map(tmNode => {
      const {
        rawNode
      } = tmNode;
      if (rawNode.show === false) return null;
      if (isRenderNode(rawNode)) {
        return h(NDropdownRenderOption, {
          tmNode: tmNode,
          key: tmNode.key
        });
      }
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix: clsPrefix,
          key: tmNode.key
        });
      }
      if (isGroupNode(rawNode)) {
        return h(NDropdownGroup, {
          clsPrefix: clsPrefix,
          tmNode: tmNode,
          parentKey: parentKey,
          key: tmNode.key
        });
      }
      return h(NDropdownOption, {
        clsPrefix: clsPrefix,
        tmNode: tmNode,
        parentKey: parentKey,
        key: tmNode.key,
        props: rawNode.props,
        scrollable: scrollable
      });
    });
    return h("div", {
      class: [`${clsPrefix}-dropdown-menu`, scrollable && `${clsPrefix}-dropdown-menu--scrollable`],
      ref: "bodyRef"
    }, scrollable ? h(NxScrollbar, {
      contentClass: `${clsPrefix}-dropdown-menu__content`
    }, {
      default: () => menuOptionsNode
    }) : menuOptionsNode, this.showArrow ? renderArrow({
      clsPrefix,
      arrowStyle: this.arrowStyle,
      arrowClass: undefined,
      arrowWrapperClass: undefined,
      arrowWrapperStyle: undefined
    }) : null);
  }
});