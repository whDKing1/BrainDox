import { h } from 'vue';
import { keep } from "../../_utils/index.mjs";
import NMenuDivider from "./MenuDivider.mjs";
import { menuItemPropKeys, NMenuOption } from "./MenuOption.mjs";
import { menuItemGroupPropKeys, NMenuOptionGroup } from "./MenuOptionGroup.mjs";
import { NSubmenu, submenuPropKeys } from "./Submenu.mjs";
export function isIgnoredNode(rawNode) {
  return rawNode.type === 'divider' || rawNode.type === 'render';
}
export function isDividerNode(rawNode) {
  return rawNode.type === 'divider';
}
export function itemRenderer(tmNode, menuProps) {
  const {
    rawNode
  } = tmNode;
  const {
    show
  } = rawNode;
  if (show === false) {
    return null;
  }
  if (isIgnoredNode(rawNode)) {
    if (isDividerNode(rawNode)) {
      return h(NMenuDivider, Object.assign({
        key: tmNode.key
      }, rawNode.props));
    }
    return null;
  }
  const {
    labelField
  } = menuProps;
  const {
    key,
    level,
    isGroup
  } = tmNode;
  const props = Object.assign(Object.assign({}, rawNode), {
    title: rawNode.title || rawNode[labelField],
    extra: rawNode.titleExtra || rawNode.extra,
    key,
    internalKey: key,
    // since key can't be used as a prop
    level,
    root: level === 0,
    isGroup
  });
  if (tmNode.children) {
    if (tmNode.isGroup) {
      return h(NMenuOptionGroup, keep(props, menuItemGroupPropKeys, {
        tmNode,
        tmNodes: tmNode.children,
        key
      }));
    }
    return h(NSubmenu, keep(props, submenuPropKeys, {
      key,
      rawNodes: rawNode[menuProps.childrenField],
      tmNodes: tmNode.children,
      tmNode
    }));
  } else {
    return h(NMenuOption, keep(props, menuItemPropKeys, {
      key,
      tmNode
    }));
  }
}