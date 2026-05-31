"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const scrollbar_1 = require("../../_internal/scrollbar");
const interface_1 = require("../../drawer/src/interface");
const interface_2 = require("../../modal/src/interface");
const interface_3 = require("../../popover/src/interface");
const PopoverBody_1 = require("../../popover/src/PopoverBody");
const context_1 = require("./context");
const DropdownDivider_1 = __importDefault(require("./DropdownDivider"));
const DropdownGroup_1 = __importDefault(require("./DropdownGroup"));
const DropdownOption_1 = __importDefault(require("./DropdownOption"));
const DropdownRenderOption_1 = __importDefault(require("./DropdownRenderOption"));
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
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
        const { renderIconRef, childrenFieldRef } = (0, vue_1.inject)(context_1.dropdownInjectionKey);
        (0, vue_1.provide)(context_1.dropdownMenuInjectionKey, {
            showIconRef: (0, vue_1.computed)(() => {
                const renderIcon = renderIconRef.value;
                return props.tmNodes.some((tmNode) => {
                    var _a;
                    if (tmNode.isGroup) {
                        return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({ rawNode: rawChild }) => renderIcon ? renderIcon(rawChild) : rawChild.icon);
                    }
                    const { rawNode } = tmNode;
                    return renderIcon ? renderIcon(rawNode) : rawNode.icon;
                });
            }),
            hasSubmenuRef: (0, vue_1.computed)(() => {
                const { value: childrenField } = childrenFieldRef;
                return props.tmNodes.some((tmNode) => {
                    var _a;
                    if (tmNode.isGroup) {
                        return (_a = tmNode.children) === null || _a === void 0 ? void 0 : _a.some(({ rawNode: rawChild }) => (0, utils_1.isSubmenuNode)(rawChild, childrenField));
                    }
                    const { rawNode } = tmNode;
                    return (0, utils_1.isSubmenuNode)(rawNode, childrenField);
                });
            })
        });
        const bodyRef = (0, vue_1.ref)(null);
        (0, vue_1.provide)(interface_2.modalBodyInjectionKey, null);
        (0, vue_1.provide)(interface_1.drawerBodyInjectionKey, null);
        (0, vue_1.provide)(interface_3.popoverBodyInjectionKey, bodyRef);
        return {
            bodyRef
        };
    },
    render() {
        const { parentKey, clsPrefix, scrollable } = this;
        const menuOptionsNode = this.tmNodes.map((tmNode) => {
            const { rawNode } = tmNode;
            if (rawNode.show === false)
                return null;
            if ((0, utils_1.isRenderNode)(rawNode)) {
                return ((0, vue_1.h)(DropdownRenderOption_1.default, { tmNode: tmNode, key: tmNode.key }));
            }
            if ((0, utils_1.isDividerNode)(rawNode)) {
                return (0, vue_1.h)(DropdownDivider_1.default, { clsPrefix: clsPrefix, key: tmNode.key });
            }
            if ((0, utils_1.isGroupNode)(rawNode)) {
                return ((0, vue_1.h)(DropdownGroup_1.default, { clsPrefix: clsPrefix, tmNode: tmNode, parentKey: parentKey, key: tmNode.key }));
            }
            return ((0, vue_1.h)(DropdownOption_1.default, { clsPrefix: clsPrefix, tmNode: tmNode, parentKey: parentKey, key: tmNode.key, props: rawNode.props, scrollable: scrollable }));
        });
        return ((0, vue_1.h)("div", { class: [
                `${clsPrefix}-dropdown-menu`,
                scrollable && `${clsPrefix}-dropdown-menu--scrollable`
            ], ref: "bodyRef" },
            scrollable ? ((0, vue_1.h)(scrollbar_1.NxScrollbar, { contentClass: `${clsPrefix}-dropdown-menu__content` }, {
                default: () => menuOptionsNode
            })) : (menuOptionsNode),
            this.showArrow
                ? (0, PopoverBody_1.renderArrow)({
                    clsPrefix,
                    arrowStyle: this.arrowStyle,
                    arrowClass: undefined,
                    arrowWrapperClass: undefined,
                    arrowWrapperStyle: undefined
                })
                : null));
    }
});
