"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenuChild = useMenuChild;
const vue_1 = require("vue");
const context_1 = require("./context");
const ICON_MARGIN_RIGHT = 8;
function useMenuChild(props) {
    const NMenu = (0, vue_1.inject)(context_1.menuInjectionKey);
    const { props: menuProps, mergedCollapsedRef } = NMenu;
    const NSubmenu = (0, vue_1.inject)(context_1.submenuInjectionKey, null);
    const NMenuOptionGroup = (0, vue_1.inject)(context_1.menuItemGroupInjectionKey, null);
    const horizontalRef = (0, vue_1.computed)(() => {
        return menuProps.mode === 'horizontal';
    });
    const dropdownPlacementRef = (0, vue_1.computed)(() => {
        if (horizontalRef.value) {
            return menuProps.dropdownPlacement;
        }
        if ('tmNodes' in props)
            return 'right-start';
        return 'right';
    });
    const maxIconSizeRef = (0, vue_1.computed)(() => {
        var _a;
        return Math.max((_a = menuProps.collapsedIconSize) !== null && _a !== void 0 ? _a : menuProps.iconSize, menuProps.iconSize);
    });
    const activeIconSizeRef = (0, vue_1.computed)(() => {
        var _a;
        if (!horizontalRef.value && props.root && mergedCollapsedRef.value) {
            return (_a = menuProps.collapsedIconSize) !== null && _a !== void 0 ? _a : menuProps.iconSize;
        }
        else {
            return menuProps.iconSize;
        }
    });
    const paddingLeftRef = (0, vue_1.computed)(() => {
        if (horizontalRef.value)
            return undefined;
        const { collapsedWidth, indent, rootIndent } = menuProps;
        const { root, isGroup } = props;
        const mergedRootIndent = rootIndent === undefined ? indent : rootIndent;
        if (root) {
            if (mergedCollapsedRef.value) {
                return collapsedWidth / 2 - maxIconSizeRef.value / 2;
            }
            return mergedRootIndent;
        }
        if (NMenuOptionGroup
            && typeof NMenuOptionGroup.paddingLeftRef.value === 'number') {
            return indent / 2 + NMenuOptionGroup.paddingLeftRef.value;
        }
        if (NSubmenu && typeof NSubmenu.paddingLeftRef.value === 'number') {
            return (isGroup ? indent / 2 : indent) + NSubmenu.paddingLeftRef.value;
        }
        // Shouldn't reach here
        return 0;
    });
    const iconMarginRightRef = (0, vue_1.computed)(() => {
        const { collapsedWidth, indent, rootIndent } = menuProps;
        const { value: maxIconSize } = maxIconSizeRef;
        const { root } = props;
        if (horizontalRef.value)
            return ICON_MARGIN_RIGHT;
        if (!root)
            return ICON_MARGIN_RIGHT;
        if (!mergedCollapsedRef.value)
            return ICON_MARGIN_RIGHT;
        const mergedRootIndent = rootIndent === undefined ? indent : rootIndent;
        return (mergedRootIndent
            + maxIconSize
            + ICON_MARGIN_RIGHT
            - (collapsedWidth + maxIconSize) / 2);
    });
    return {
        dropdownPlacement: dropdownPlacementRef,
        activeIconSize: activeIconSizeRef,
        maxIconSize: maxIconSizeRef,
        paddingLeft: paddingLeftRef,
        iconMarginRight: iconMarginRightRef,
        NMenu,
        NSubmenu,
        NMenuOptionGroup
    };
}
