"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NMenuOption = exports.menuItemPropKeys = exports.menuItemProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const tooltip_1 = require("../../tooltip");
const MenuOptionContent_1 = __importDefault(require("./MenuOptionContent"));
const use_menu_child_1 = require("./use-menu-child");
const use_menu_child_props_1 = require("./use-menu-child-props");
exports.menuItemProps = Object.assign(Object.assign({}, use_menu_child_props_1.useMenuChildProps), { tmNode: {
        type: Object,
        required: true
    }, disabled: Boolean, icon: Function, onClick: Function });
exports.menuItemPropKeys = (0, _utils_1.keysOf)(exports.menuItemProps);
exports.NMenuOption = (0, vue_1.defineComponent)({
    name: 'MenuOption',
    props: exports.menuItemProps,
    setup(props) {
        const MenuChild = (0, use_menu_child_1.useMenuChild)(props);
        const { NSubmenu, NMenu, NMenuOptionGroup } = MenuChild;
        const { props: menuProps, mergedClsPrefixRef, mergedCollapsedRef } = NMenu;
        const parentDisabledRef = NSubmenu
            ? NSubmenu.mergedDisabledRef
            : NMenuOptionGroup
                ? NMenuOptionGroup.mergedDisabledRef
                : { value: false };
        const mergedDisabledRef = (0, vue_1.computed)(() => {
            return parentDisabledRef.value || props.disabled;
        });
        function doClick(e) {
            const { onClick } = props;
            if (onClick)
                onClick(e);
        }
        function handleClick(e) {
            if (!mergedDisabledRef.value) {
                NMenu.doSelect(props.internalKey, props.tmNode.rawNode);
                doClick(e);
            }
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            dropdownPlacement: MenuChild.dropdownPlacement,
            paddingLeft: MenuChild.paddingLeft,
            iconMarginRight: MenuChild.iconMarginRight,
            maxIconSize: MenuChild.maxIconSize,
            activeIconSize: MenuChild.activeIconSize,
            mergedTheme: NMenu.mergedThemeRef,
            menuProps,
            dropdownEnabled: (0, vooks_1.useMemo)(() => {
                return (props.root
                    && mergedCollapsedRef.value
                    && menuProps.mode !== 'horizontal'
                    && !mergedDisabledRef.value);
            }),
            selected: (0, vooks_1.useMemo)(() => {
                if (NMenu.mergedValueRef.value === props.internalKey)
                    return true;
                return false;
            }),
            mergedDisabled: mergedDisabledRef,
            handleClick
        };
    },
    render() {
        const { mergedClsPrefix, mergedTheme, tmNode, menuProps: { renderLabel, nodeProps } } = this;
        const attrs = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(tmNode.rawNode);
        return ((0, vue_1.h)("div", Object.assign({}, attrs, { role: "menuitem", class: [`${mergedClsPrefix}-menu-item`, attrs === null || attrs === void 0 ? void 0 : attrs.class] }),
            (0, vue_1.h)(tooltip_1.NTooltip, { theme: mergedTheme.peers.Tooltip, themeOverrides: mergedTheme.peerOverrides.Tooltip, trigger: "hover", placement: this.dropdownPlacement, disabled: !this.dropdownEnabled || this.title === undefined, internalExtraClass: ['menu-tooltip'] }, {
                default: () => renderLabel ? renderLabel(tmNode.rawNode) : (0, _utils_1.render)(this.title),
                trigger: () => ((0, vue_1.h)(MenuOptionContent_1.default, { tmNode: tmNode, clsPrefix: mergedClsPrefix, paddingLeft: this.paddingLeft, iconMarginRight: this.iconMarginRight, maxIconSize: this.maxIconSize, activeIconSize: this.activeIconSize, selected: this.selected, title: this.title, extra: this.extra, disabled: this.mergedDisabled, icon: this.icon, onClick: this.handleClick }))
            })));
    }
});
