import { defineComponent, Fragment, h } from 'vue';
import { warn } from "../../_utils/index.mjs";
import NDropdownDivider from "./DropdownDivider.mjs";
import NDropdownGroupHeader from "./DropdownGroupHeader.mjs";
import NDropdownOption from "./DropdownOption.mjs";
import { isDividerNode } from "./utils.mjs";
export default defineComponent({
  name: 'NDropdownGroup',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    tmNode: {
      type: Object,
      required: true
    },
    parentKey: {
      type: [String, Number],
      default: null
    }
  },
  render() {
    const {
      tmNode,
      parentKey,
      clsPrefix
    } = this;
    const {
      children
    } = tmNode;
    return h(Fragment, null, h(NDropdownGroupHeader, {
      clsPrefix: clsPrefix,
      tmNode: tmNode,
      key: tmNode.key
    }), children === null || children === void 0 ? void 0 : children.map(child => {
      const {
        rawNode
      } = child;
      if (rawNode.show === false) return null;
      if (isDividerNode(rawNode)) {
        return h(NDropdownDivider, {
          clsPrefix,
          key: child.key
        });
      }
      if (child.isGroup) {
        warn('dropdown', '`group` node is not allowed to be put in `group` node.');
        return null;
      }
      return h(NDropdownOption, {
        clsPrefix: clsPrefix,
        tmNode: child,
        parentKey: parentKey,
        key: child.key
      });
    }));
  }
});