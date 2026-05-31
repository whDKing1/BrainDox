"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const icons_1 = require("../../_internal/icons");
const _utils_1 = require("../../_utils");
const icon_1 = require("../../icon");
const interface_1 = require("../../popover/src/interface");
const context_1 = require("./context");
const DropdownMenu_1 = __importDefault(require("./DropdownMenu"));
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'DropdownOption',
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
        },
        placement: {
            type: String,
            default: 'right-start'
        },
        props: Object,
        scrollable: Boolean
    },
    setup(props) {
        const NDropdown = (0, vue_1.inject)(context_1.dropdownInjectionKey);
        const { hoverKeyRef, keyboardKeyRef, lastToggledSubmenuKeyRef, pendingKeyPathRef, activeKeyPathRef, animatedRef, mergedShowRef, renderLabelRef, renderIconRef, labelFieldRef, childrenFieldRef, renderOptionRef, nodePropsRef, menuPropsRef } = NDropdown;
        const NDropdownOption = (0, vue_1.inject)(context_1.dropdownOptionInjectionKey, null);
        const NDropdownMenu = (0, vue_1.inject)(context_1.dropdownMenuInjectionKey);
        const NPopoverBody = (0, vue_1.inject)(interface_1.popoverBodyInjectionKey);
        const rawNodeRef = (0, vue_1.computed)(() => props.tmNode.rawNode);
        const hasSubmenuRef = (0, vue_1.computed)(() => {
            const { value: childrenField } = childrenFieldRef;
            return (0, utils_1.isSubmenuNode)(props.tmNode.rawNode, childrenField);
        });
        const mergedDisabledRef = (0, vue_1.computed)(() => {
            const { disabled } = props.tmNode;
            return disabled;
        });
        const showSubmenuRef = (0, vue_1.computed)(() => {
            if (!hasSubmenuRef.value)
                return false;
            const { key, disabled } = props.tmNode;
            if (disabled)
                return false;
            const { value: hoverKey } = hoverKeyRef;
            const { value: keyboardKey } = keyboardKeyRef;
            const { value: lastToggledSubmenuKey } = lastToggledSubmenuKeyRef;
            const { value: pendingKeyPath } = pendingKeyPathRef;
            if (hoverKey !== null)
                return pendingKeyPath.includes(key);
            if (keyboardKey !== null) {
                return (pendingKeyPath.includes(key)
                    && pendingKeyPath[pendingKeyPath.length - 1] !== key);
            }
            if (lastToggledSubmenuKey !== null)
                return pendingKeyPath.includes(key);
            return false;
        });
        const shouldDelayRef = (0, vue_1.computed)(() => {
            return keyboardKeyRef.value === null && !animatedRef.value;
        });
        const deferredShowSubmenuRef = (0, _utils_1.useDeferredTrue)(showSubmenuRef, 300, shouldDelayRef);
        const parentEnteringSubmenuRef = (0, vue_1.computed)(() => {
            return !!(NDropdownOption === null || NDropdownOption === void 0 ? void 0 : NDropdownOption.enteringSubmenuRef.value);
        });
        const enteringSubmenuRef = (0, vue_1.ref)(false);
        (0, vue_1.provide)(context_1.dropdownOptionInjectionKey, {
            enteringSubmenuRef
        });
        // methods
        function handleSubmenuBeforeEnter() {
            enteringSubmenuRef.value = true;
        }
        function handleSubmenuAfterEnter() {
            enteringSubmenuRef.value = false;
        }
        function handleMouseEnter() {
            const { parentKey, tmNode } = props;
            if (tmNode.disabled)
                return;
            if (!mergedShowRef.value)
                return;
            lastToggledSubmenuKeyRef.value = parentKey;
            keyboardKeyRef.value = null;
            hoverKeyRef.value = tmNode.key;
        }
        function handleMouseMove() {
            const { tmNode } = props;
            if (tmNode.disabled)
                return;
            if (!mergedShowRef.value)
                return;
            if (hoverKeyRef.value === tmNode.key)
                return;
            handleMouseEnter();
        }
        function handleMouseLeave(e) {
            if (props.tmNode.disabled)
                return;
            if (!mergedShowRef.value)
                return;
            const { relatedTarget } = e;
            if (relatedTarget
                && !(0, seemly_1.happensIn)({ target: relatedTarget }, 'dropdownOption')
                && !(0, seemly_1.happensIn)({ target: relatedTarget }, 'scrollbarRail')) {
                hoverKeyRef.value = null;
            }
        }
        function handleClick() {
            const { value: hasSubmenu } = hasSubmenuRef;
            const { tmNode } = props;
            if (!mergedShowRef.value)
                return;
            if (!hasSubmenu && !tmNode.disabled) {
                NDropdown.doSelect(tmNode.key, tmNode.rawNode);
                NDropdown.doUpdateShow(false);
            }
        }
        return {
            labelField: labelFieldRef,
            renderLabel: renderLabelRef,
            renderIcon: renderIconRef,
            siblingHasIcon: NDropdownMenu.showIconRef,
            siblingHasSubmenu: NDropdownMenu.hasSubmenuRef,
            menuProps: menuPropsRef,
            popoverBody: NPopoverBody,
            animated: animatedRef,
            mergedShowSubmenu: (0, vue_1.computed)(() => {
                return deferredShowSubmenuRef.value && !parentEnteringSubmenuRef.value;
            }),
            rawNode: rawNodeRef,
            hasSubmenu: hasSubmenuRef,
            pending: (0, vooks_1.useMemo)(() => {
                const { value: pendingKeyPath } = pendingKeyPathRef;
                const { key } = props.tmNode;
                return pendingKeyPath.includes(key);
            }),
            childActive: (0, vooks_1.useMemo)(() => {
                const { value: activeKeyPath } = activeKeyPathRef;
                const { key } = props.tmNode;
                const index = activeKeyPath.findIndex(k => key === k);
                if (index === -1)
                    return false;
                return index < activeKeyPath.length - 1;
            }),
            active: (0, vooks_1.useMemo)(() => {
                const { value: activeKeyPath } = activeKeyPathRef;
                const { key } = props.tmNode;
                const index = activeKeyPath.findIndex(k => key === k);
                if (index === -1)
                    return false;
                return index === activeKeyPath.length - 1;
            }),
            mergedDisabled: mergedDisabledRef,
            renderOption: renderOptionRef,
            nodeProps: nodePropsRef,
            handleClick,
            handleMouseMove,
            handleMouseEnter,
            handleMouseLeave,
            handleSubmenuBeforeEnter,
            handleSubmenuAfterEnter
        };
    },
    render() {
        var _a, _b;
        const { animated, rawNode, mergedShowSubmenu, clsPrefix, siblingHasIcon, siblingHasSubmenu, renderLabel, renderIcon, renderOption, nodeProps, props, scrollable } = this;
        let submenuVNode = null;
        if (mergedShowSubmenu) {
            const submenuNodeProps = (_a = this.menuProps) === null || _a === void 0 ? void 0 : _a.call(this, rawNode, rawNode.children);
            submenuVNode = ((0, vue_1.h)(DropdownMenu_1.default, Object.assign({}, submenuNodeProps, { clsPrefix: clsPrefix, scrollable: this.scrollable, tmNodes: this.tmNode.children, parentKey: this.tmNode.key })));
        }
        const builtinProps = {
            class: [
                `${clsPrefix}-dropdown-option-body`,
                this.pending && `${clsPrefix}-dropdown-option-body--pending`,
                this.active && `${clsPrefix}-dropdown-option-body--active`,
                this.childActive && `${clsPrefix}-dropdown-option-body--child-active`,
                this.mergedDisabled && `${clsPrefix}-dropdown-option-body--disabled`
            ],
            onMousemove: this.handleMouseMove,
            onMouseenter: this.handleMouseEnter,
            onMouseleave: this.handleMouseLeave,
            onClick: this.handleClick
        };
        const optionNodeProps = nodeProps === null || nodeProps === void 0 ? void 0 : nodeProps(rawNode);
        const node = ((0, vue_1.h)("div", Object.assign({ class: [`${clsPrefix}-dropdown-option`, optionNodeProps === null || optionNodeProps === void 0 ? void 0 : optionNodeProps.class], "data-dropdown-option": true }, optionNodeProps),
            (0, vue_1.h)('div', (0, vue_1.mergeProps)(builtinProps, props), [
                (0, vue_1.h)("div", { class: [
                        `${clsPrefix}-dropdown-option-body__prefix`,
                        siblingHasIcon
                            && `${clsPrefix}-dropdown-option-body__prefix--show-icon`
                    ] }, [renderIcon ? renderIcon(rawNode) : (0, _utils_1.render)(rawNode.icon)]),
                (0, vue_1.h)("div", { "data-dropdown-option": true, class: `${clsPrefix}-dropdown-option-body__label` }, renderLabel
                    ? renderLabel(rawNode)
                    : (0, _utils_1.render)((_b = rawNode[this.labelField]) !== null && _b !== void 0 ? _b : rawNode.title)),
                (0, vue_1.h)("div", { "data-dropdown-option": true, class: [
                        `${clsPrefix}-dropdown-option-body__suffix`,
                        siblingHasSubmenu
                            && `${clsPrefix}-dropdown-option-body__suffix--has-submenu`
                    ] }, this.hasSubmenu ? ((0, vue_1.h)(icon_1.NIcon, null, {
                    default: () => (0, vue_1.h)(icons_1.ChevronRightIcon, null)
                })) : null)
            ]),
            this.hasSubmenu ? ((0, vue_1.h)(vueuc_1.VBinder, null, {
                default: () => [
                    (0, vue_1.h)(vueuc_1.VTarget, null, {
                        default: () => ((0, vue_1.h)("div", { class: `${clsPrefix}-dropdown-offset-container` },
                            (0, vue_1.h)(vueuc_1.VFollower, { show: this.mergedShowSubmenu, placement: this.placement, to: scrollable
                                    ? this.popoverBody || undefined
                                    : undefined, teleportDisabled: !scrollable }, {
                                default: () => {
                                    return ((0, vue_1.h)("div", { class: `${clsPrefix}-dropdown-menu-wrapper` }, animated ? ((0, vue_1.h)(vue_1.Transition, { onBeforeEnter: this.handleSubmenuBeforeEnter, onAfterEnter: this.handleSubmenuAfterEnter, name: "fade-in-scale-up-transition", appear: true }, {
                                        default: () => submenuVNode
                                    })) : (submenuVNode)));
                                }
                            })))
                    })
                ]
            })) : null));
        if (renderOption) {
            return renderOption({ node, option: rawNode });
        }
        return node;
    }
});
