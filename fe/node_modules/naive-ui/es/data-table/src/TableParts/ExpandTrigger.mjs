import { defineComponent, h } from 'vue';
import { NBaseIcon, NBaseLoading, NIconSwitchTransition } from "../../../_internal/index.mjs";
import { ChevronRightIcon } from "../../../_internal/icons/index.mjs";
export default defineComponent({
  name: 'DataTableExpandTrigger',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    expanded: Boolean,
    loading: Boolean,
    onClick: {
      type: Function,
      required: true
    },
    renderExpandIcon: {
      type: Function
    },
    rowData: {
      type: Object,
      required: true
    }
  },
  render() {
    const {
      clsPrefix
    } = this;
    return h("div", {
      class: [`${clsPrefix}-data-table-expand-trigger`, this.expanded && `${clsPrefix}-data-table-expand-trigger--expanded`],
      onClick: this.onClick,
      onMousedown: e => {
        e.preventDefault();
      }
    }, h(NIconSwitchTransition, null, {
      default: () => {
        return this.loading ? h(NBaseLoading, {
          key: "loading",
          clsPrefix: this.clsPrefix,
          radius: 85,
          strokeWidth: 15,
          scale: 0.88
        }) : this.renderExpandIcon ? this.renderExpandIcon({
          expanded: this.expanded,
          rowData: this.rowData
        }) : h(NBaseIcon, {
          clsPrefix: clsPrefix,
          key: "base-icon"
        }, {
          default: () => h(ChevronRightIcon, null)
        });
      }
    }));
  }
});