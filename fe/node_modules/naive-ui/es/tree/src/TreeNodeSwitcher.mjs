import { defineComponent, h, inject } from 'vue';
import { NBaseIcon, NBaseLoading, NIconSwitchTransition } from "../../_internal/index.mjs";
import { SwitcherIcon } from "../../_internal/icons/index.mjs";
import { treeInjectionKey } from "./interface.mjs";
export default defineComponent({
  name: 'NTreeSwitcher',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    indent: {
      type: Number,
      required: true
    },
    expanded: Boolean,
    selected: Boolean,
    hide: Boolean,
    loading: Boolean,
    onClick: Function,
    tmNode: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const {
      renderSwitcherIconRef,
      spinPropsRef
    } = inject(treeInjectionKey, null);
    return () => {
      const {
        clsPrefix,
        expanded,
        hide,
        indent,
        onClick
      } = props;
      return h("span", {
        "data-switcher": true,
        class: [`${clsPrefix}-tree-node-switcher`, expanded && `${clsPrefix}-tree-node-switcher--expanded`, hide && `${clsPrefix}-tree-node-switcher--hide`],
        style: {
          width: `${indent}px`
        },
        onClick: onClick
      }, h("div", {
        class: `${clsPrefix}-tree-node-switcher__icon`
      }, h(NIconSwitchTransition, null, {
        default: () => {
          if (props.loading) {
            return h(NBaseLoading, Object.assign({
              clsPrefix: clsPrefix,
              key: "loading",
              radius: 85,
              strokeWidth: 20
            }, spinPropsRef === null || spinPropsRef === void 0 ? void 0 : spinPropsRef.value));
          }
          const {
            value: renderSwitcherIcon
          } = renderSwitcherIconRef;
          return renderSwitcherIcon ? renderSwitcherIcon({
            expanded: props.expanded,
            selected: props.selected,
            option: props.tmNode.rawNode
          }) : h(NBaseIcon, {
            clsPrefix: clsPrefix,
            key: "switcher"
          }, {
            default: () => h(SwitcherIcon, null)
          });
        }
      })));
    };
  }
});