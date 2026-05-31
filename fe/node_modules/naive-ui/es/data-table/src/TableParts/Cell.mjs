import { get } from 'lodash-es';
import { defineComponent, h } from 'vue';
import NEllipsis from "../../../ellipsis/src/Ellipsis.mjs";
import { NPerformantEllipsis } from "../../../ellipsis/src/PerformantEllipsis.mjs";
export default defineComponent({
  name: 'DataTableCell',
  props: {
    clsPrefix: {
      type: String,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    isSummary: Boolean,
    mergedTheme: {
      type: Object,
      required: true
    },
    renderCell: Function
  },
  render() {
    var _a;
    const {
      isSummary,
      column,
      row,
      renderCell
    } = this;
    let cell;
    const {
      render,
      key,
      ellipsis
    } = column;
    if (render && !isSummary) {
      cell = render(row, this.index);
    } else {
      if (isSummary) {
        cell = (_a = row[key]) === null || _a === void 0 ? void 0 : _a.value;
      } else {
        cell = renderCell ? renderCell(get(row, key), row, column) : get(row, key);
      }
    }
    if (ellipsis) {
      if (typeof ellipsis === 'object') {
        const {
          mergedTheme
        } = this;
        if (column.ellipsisComponent === 'performant-ellipsis') {
          return h(NPerformantEllipsis, Object.assign({}, ellipsis, {
            theme: mergedTheme.peers.Ellipsis,
            themeOverrides: mergedTheme.peerOverrides.Ellipsis
          }), {
            default: () => cell
          });
        }
        return h(NEllipsis, Object.assign({}, ellipsis, {
          theme: mergedTheme.peers.Ellipsis,
          themeOverrides: mergedTheme.peerOverrides.Ellipsis
        }), {
          default: () => cell
        });
      } else {
        return h("span", {
          class: `${this.clsPrefix}-data-table-td__ellipsis`
        }, cell);
      }
    }
    return cell;
  }
});