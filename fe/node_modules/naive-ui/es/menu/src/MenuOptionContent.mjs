import { computed, defineComponent, h, inject } from 'vue';
import { NBaseIcon } from "../../_internal/index.mjs";
import { ChevronDownFilledIcon } from "../../_internal/icons/index.mjs";
import { render } from "../../_utils/index.mjs";
import { menuInjectionKey } from "./context.mjs";
export default defineComponent({
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
    const {
      props: menuProps
    } = inject(menuInjectionKey);
    return {
      menuProps,
      style: computed(() => {
        const {
          paddingLeft
        } = props;
        return {
          paddingLeft: paddingLeft && `${paddingLeft}px`
        };
      }),
      iconStyle: computed(() => {
        const {
          maxIconSize,
          activeIconSize,
          iconMarginRight
        } = props;
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
    const {
      clsPrefix,
      tmNode,
      menuProps: {
        renderIcon,
        renderLabel,
        renderExtra,
        expandIcon
      }
    } = this;
    const icon = renderIcon ? renderIcon(tmNode.rawNode) : render(this.icon);
    return h("div", {
      onClick: e => {
        var _a;
        (_a = this.onClick) === null || _a === void 0 ? void 0 : _a.call(this, e);
      },
      role: "none",
      class: [`${clsPrefix}-menu-item-content`, {
        [`${clsPrefix}-menu-item-content--selected`]: this.selected,
        [`${clsPrefix}-menu-item-content--collapsed`]: this.collapsed,
        [`${clsPrefix}-menu-item-content--child-active`]: this.childActive,
        [`${clsPrefix}-menu-item-content--disabled`]: this.disabled,
        [`${clsPrefix}-menu-item-content--hover`]: this.hover
      }],
      style: this.style
    }, icon && h("div", {
      class: `${clsPrefix}-menu-item-content__icon`,
      style: this.iconStyle,
      role: "none"
    }, [icon]), h("div", {
      class: `${clsPrefix}-menu-item-content-header`,
      role: "none"
    }, this.isEllipsisPlaceholder ? this.title : renderLabel ? renderLabel(tmNode.rawNode) : render(this.title), this.extra || renderExtra ? h("span", {
      class: `${clsPrefix}-menu-item-content-header__extra`
    }, ' ', renderExtra ? renderExtra(tmNode.rawNode) : render(this.extra)) : null), this.showArrow ? h(NBaseIcon, {
      ariaHidden: true,
      class: `${clsPrefix}-menu-item-content__arrow`,
      clsPrefix: clsPrefix
    }, {
      default: () => expandIcon ? expandIcon(tmNode.rawNode) : h(ChevronDownFilledIcon, null)
    }) : null);
  }
});