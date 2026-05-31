"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _utils_1 = require("../../_utils");
const context_1 = require("./context");
exports.default = (0, vue_1.defineComponent)({
    name: 'MenuOptionContent',
    props: {
        collapsed: Boolean,
        disabled: Boolean,
        title: [String, Function],
        icon: Function,
        extra: [String, Function],
        showArrow: Boolean,
        childActive: Boolean,
        hover: Boolean,
        paddingLeft: Number,
        selected: Boolean,
        maxIconSize: {
            type: Number,
            required: true
        },
        activeIconSize: {
            type: Number,
            required: true
        },
        iconMarginRight: {
            type: Number,
            required: true
        },
        clsPrefix: {
            type: String,
            required: true
        },
        onClick: Function,
        tmNode: {
            type: Object,
            required: true
        },
        isEllipsisPlaceholder: Boolean
    },
    setup(props) {
        const { props: menuProps } = (0, vue_1.inject)(context_1.menuInjectionKey);
        return {
            menuProps,
            style: (0, vue_1.computed)(() => {
                const { paddingLeft } = props;
                return { paddingLeft: paddingLeft && `${paddingLeft}px` };
            }),
            iconStyle: (0, vue_1.computed)(() => {
                const { maxIconSize, activeIconSize, iconMarginRight } = props;
                return {
                    width: `${maxIconSize}px`,
                    height: `${maxIconSize}px`,
                    fontSize: `${activeIconSize}px`,
                    marginRight: `${iconMarginRight}px`
                };
            })
        };
    },
    render() {
        const { clsPrefix, tmNode, menuProps: { renderIcon, renderLabel, renderExtra, expandIcon } } = this;
        const icon = renderIcon ? renderIcon(tmNode.rawNode) : (0, _utils_1.render)(this.icon);
        return ((0, vue_1.h)("div", { onClick: (e) => {
                var _a;
                (_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this, e);
            }, role: "none", class: [
                `${clsPrefix}-menu-item-content`,
                {
                    [`${clsPrefix}-menu-item-content--selected`]: this.selected,
                    [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
                    [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
                    [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
                    [`${clsPrefix}-menu-item-content--hover`]: this.hover
                }
            ], style: this.style },
            icon && ((0, vue_1.h)("div", { class: `${clsPrefix}-menu-item-content__icon`, style: this.iconStyle, role: "none" }, [icon])),
            (0, vue_1.h)("div", { class: `${clsPrefix}-menu-item-content-header`, role: "none" },
                this.isEllipsisPlaceholder
                    ? this.title
                    : renderLabel
                        ? renderLabel(tmNode.rawNode)
                        : (0, _utils_1.render)(this.title),
                this.extra || renderExtra ? ((0, vue_1.h)("span", { class: `${clsPrefix}-menu-item-content-header__extra` },
                    ' ',
                    renderExtra ? renderExtra(tmNode.rawNode) : (0, _utils_1.render)(this.extra))) : null),
            this.showArrow ? ((0, vue_1.h)(_internal_1.NBaseIcon, { ariaHidden: true, class: `${clsPrefix}-menu-item-content__arrow`, clsPrefix: clsPrefix }, {
                default: () => expandIcon ? (expandIcon(tmNode.rawNode)) : ((0, vue_1.h)(icons_1.ChevronDownFilledIcon, null))
            })) : null));
    }
});
