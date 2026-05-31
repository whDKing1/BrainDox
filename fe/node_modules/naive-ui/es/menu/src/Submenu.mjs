import { useMemo } from 'vooks';
import { computed, defineComponent, h, provide, ref } from 'vue';
import { NFadeInExpandTransition } from "../../_internal/index.mjs";
import { keysOf } from "../../_utils/index.mjs";
import { NDropdown } from "../../dropdown/index.mjs";
import { menuItemGroupInjectionKey, submenuInjectionKey } from "./context.mjs";
import NMenuOptionContent from "./MenuOptionContent.mjs";
import { useMenuChild } from "./use-menu-child.mjs";
import { useMenuChildProps } from "./use-menu-child-props.mjs";
import { itemRenderer } from "./utils.mjs";
export const submenuProps = Object.assign(Object.assign({}, useMenuChildProps), {
  rawNodes: {
    type: Array,
    default: () => []
  },
  tmNodes: {
    type: Array,
    default: () => []
  },
  tmNode: {
    type: Object,
    required: true
  },
  disabled: Boolean,
  icon: Function,
  onClick: Function,
  domId: String,
  virtualChildActive: {
    type: Boolean,
    default: undefined
  },
  isEllipsisPlaceholder: Boolean
});
export const submenuPropKeys = keysOf(submenuProps);
export const NSubmenu = defineComponent({
  name: 'Submenu',
  props: submenuProps,
  setup(props) {
    const MenuChild = useMenuChild(props);
    const {
      NMenu,
      NSubmenu
    } = MenuChild;
    const {
      props: menuProps,
      mergedCollapsedRef,
      mergedThemeRef
    } = NMenu;
    const mergedDisabledRef = computed(() => {
      const {
        disabled
      } = props;
      if (NSubmenu === null || NSubmenu === void 0 ? void 0 : NSubmenu.mergedDisabledRef.value) return true;
      if (menuProps.disabled) return true;
      return disabled;
    });
    const dropdownShowRef = ref(false);
    provide(submenuInjectionKey, {
      paddingLeftRef: MenuChild.paddingLeft,
      mergedDisabledRef
    });
    provide(menuItemGroupInjectionKey, null);
    function doClick() {
      const {
        onClick
      } = props;
      if (onClick) onClick();
    }
    function handleClick() {
      if (!mergedDisabledRef.value) {
        if (!mergedCollapsedRef.value) {
          NMenu.toggleExpand(props.internalKey);
        }
        doClick();
      }
    }
    function handlePopoverShowChange(value) {
      dropdownShowRef.value = value;
    }
    return {
      menuProps,
      mergedTheme: mergedThemeRef,
      doSelect: NMenu.doSelect,
      inverted: NMenu.invertedRef,
      isHorizontal: NMenu.isHorizontalRef,
      mergedClsPrefix: NMenu.mergedClsPrefixRef,
      maxIconSize: MenuChild.maxIconSize,
      activeIconSize: MenuChild.activeIconSize,
      iconMarginRight: MenuChild.iconMarginRight,
      dropdownPlacement: MenuChild.dropdownPlacement,
      dropdownShow: dropdownShowRef,
      paddingLeft: MenuChild.paddingLeft,
      mergedDisabled: mergedDisabledRef,
      mergedValue: NMenu.mergedValueRef,
      childActive: useMemo(() => {
        var _a;
        return (_a = props.virtualChildActive) !== null && _a !== void 0 ? _a : NMenu.activePathRef.value.includes(props.internalKey);
      }),
      collapsed: computed(() => {
        if (menuProps.mode === 'horizontal') return false;
        if (mergedCollapsedRef.value) {
          return true;
        }
        return !NMenu.mergedExpandedKeysRef.value.includes(props.internalKey);
      }),
      dropdownEnabled: computed(() => {
        return !mergedDisabledRef.value && (menuProps.mode === 'horizontal' || mergedCollapsedRef.value);
      }),
      handlePopoverShowChange,
      handleClick
    };
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      menuProps: {
        renderIcon,
        renderLabel
      }
    } = this;
    const createSubmenuItem = () => {
      const {
        isHorizontal,
        paddingLeft,
        collapsed,
        mergedDisabled,
        maxIconSize,
        activeIconSize,
        title,
        childActive,
        icon,
        handleClick,
        menuProps: {
          nodeProps
        },
        dropdownShow,
        iconMarginRight,
        tmNode,
        mergedClsPrefix,
        isEllipsisPlaceholder,
        extra
      } = this;
      const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(tmNode.rawNode);
      return h("div", Object.assign({}, attrs, {
        class: [`${mergedClsPrefix}-menu-item`, attrs === null || attrs === void 0 ? void 0 : attrs.class],
        role: "menuitem"
      }), h(NMenuOptionContent, {
        tmNode: tmNode,
        paddingLeft: paddingLeft,
        collapsed: collapsed,
        disabled: mergedDisabled,
        iconMarginRight: iconMarginRight,
        maxIconSize: maxIconSize,
        activeIconSize: activeIconSize,
        title: title,
        extra: extra,
        showArrow: !isHorizontal,
        childActive: childActive,
        clsPrefix: mergedClsPrefix,
        icon: icon,
        hover: dropdownShow,
        onClick: handleClick,
        isEllipsisPlaceholder: isEllipsisPlaceholder
      }));
    };
    const createSubmenuChildren = () => {
      return h(NFadeInExpandTransition, null, {
        default: () => {
          const {
            tmNodes,
            collapsed
          } = this;
          return !collapsed ? h("div", {
            class: `${mergedClsPrefix}-submenu-children`,
            role: "menu"
          }, tmNodes.map(item => itemRenderer(item, this.menuProps))) : null;
        }
      });
    };
    return this.root ? h(NDropdown, Object.assign({
      size: "large",
      trigger: "hover"
    }, (_a = this.menuProps) === null || _a === void 0 ? void 0 : _a.dropdownProps, {
      themeOverrides: this.mergedTheme.peerOverrides.Dropdown,
      theme: this.mergedTheme.peers.Dropdown,
      builtinThemeOverrides: {
        fontSizeLarge: '14px',
        optionIconSizeLarge: '18px'
      },
      value: this.mergedValue,
      disabled: !this.dropdownEnabled,
      placement: this.dropdownPlacement,
      keyField: this.menuProps.keyField,
      labelField: this.menuProps.labelField,
      childrenField: this.menuProps.childrenField,
      onUpdateShow: this.handlePopoverShowChange,
      options: this.rawNodes,
      onSelect: this.doSelect,
      inverted: this.inverted,
      renderIcon: renderIcon,
      renderLabel: renderLabel
    }), {
      default: () => h("div", {
        class: `${mergedClsPrefix}-submenu`,
        role: "menu",
        "aria-expanded": !this.collapsed,
        id: this.domId
      }, createSubmenuItem(), this.isHorizontal ? null : createSubmenuChildren())
    }) : h("div", {
      class: `${mergedClsPrefix}-submenu`,
      role: "menu",
      "aria-expanded": !this.collapsed,
      id: this.domId
    }, createSubmenuItem(), createSubmenuChildren());
  }
});