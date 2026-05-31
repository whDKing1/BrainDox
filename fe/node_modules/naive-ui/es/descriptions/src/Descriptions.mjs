import { repeat } from 'seemly';
import { useCompitable } from 'vooks';
import { computed, defineComponent, h } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createKey, flatten, getSlot, getVNodeChildren, warn } from "../../_utils/index.mjs";
import { descriptionsLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
import { isDescriptionsItem } from "./utils.mjs";
export const descriptionsProps = Object.assign(Object.assign({}, useTheme.props), {
  title: String,
  column: {
    type: Number,
    default: 3
  },
  columns: Number,
  labelPlacement: {
    type: String,
    default: 'top'
  },
  labelAlign: {
    type: String,
    default: 'left'
  },
  separator: {
    type: String,
    default: ':'
  },
  size: String,
  bordered: Boolean,
  labelClass: String,
  labelStyle: [Object, String],
  contentClass: String,
  contentStyle: [Object, String]
});
export default defineComponent({
  name: 'Descriptions',
  props: descriptionsProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedComponentPropsRef
    } = useConfig(props);
    const mergedSizeRef = computed(() => {
      var _a, _b;
      return props.size || ((_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Descriptions) === null || _b === void 0 ? void 0 : _b.size) || 'medium';
    });
    const themeRef = useTheme('Descriptions', '-descriptions', style, descriptionsLight, props, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        bordered
      } = props;
      const mergedSize = mergedSizeRef.value;
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          titleTextColor,
          thColor,
          thColorModal,
          thColorPopover,
          thTextColor,
          thFontWeight,
          tdTextColor,
          tdColor,
          tdColorModal,
          tdColorPopover,
          borderColor,
          borderColorModal,
          borderColorPopover,
          borderRadius,
          lineHeight,
          [createKey('fontSize', mergedSize)]: fontSize,
          [createKey(bordered ? 'thPaddingBordered' : 'thPadding', mergedSize)]: thPadding,
          [createKey(bordered ? 'tdPaddingBordered' : 'tdPadding', mergedSize)]: tdPadding
        }
      } = themeRef.value;
      return {
        '--n-title-text-color': titleTextColor,
        '--n-th-padding': thPadding,
        '--n-td-padding': tdPadding,
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-th-font-weight': thFontWeight,
        '--n-line-height': lineHeight,
        '--n-th-text-color': thTextColor,
        '--n-td-text-color': tdTextColor,
        '--n-th-color': thColor,
        '--n-th-color-modal': thColorModal,
        '--n-th-color-popover': thColorPopover,
        '--n-td-color': tdColor,
        '--n-td-color-modal': tdColorModal,
        '--n-td-color-popover': tdColorPopover,
        '--n-border-radius': borderRadius,
        '--n-border-color': borderColor,
        '--n-border-color-modal': borderColorModal,
        '--n-border-color-popover': borderColorPopover
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('descriptions', computed(() => {
      let hash = '';
      const {
        bordered
      } = props;
      if (bordered) hash += 'a';
      hash += mergedSizeRef.value[0];
      return hash;
    }), cssVarsRef, props) : undefined;
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
      compitableColumn: useCompitable(props, ['columns', 'column']),
      inlineThemeDisabled,
      mergedSize: mergedSizeRef
    };
  },
  render() {
    const defaultSlots = this.$slots.default;
    const children = defaultSlots ? flatten(defaultSlots()) : [];
    const memorizedLength = children.length;
    const {
      contentClass,
      labelClass,
      compitableColumn,
      labelPlacement,
      labelAlign,
      mergedSize,
      bordered,
      title,
      cssVars,
      mergedClsPrefix,
      separator,
      onRender
    } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const filteredChildren = children.filter(child => isDescriptionsItem(child));
    if (process.env.NODE_ENV !== 'production' && memorizedLength !== filteredChildren.length) {
      warn('descriptions', '`n-descriptions` only takes `n-descriptions-item` as children.');
    }
    const defaultState = {
      span: 0,
      row: [],
      secondRow: [],
      rows: []
    };
    const itemState = filteredChildren.reduce((state, vNode, index) => {
      const props = vNode.props || {};
      const isLastIteration = filteredChildren.length - 1 === index;
      const itemLabel = ['label' in props ? props.label : getVNodeChildren(vNode, 'label')];
      const itemChildren = [getVNodeChildren(vNode)];
      const itemSpan = props.span || 1;
      const memorizedSpan = state.span;
      state.span += itemSpan;
      const labelStyle = props.labelStyle || props['label-style'] || this.labelStyle;
      const contentStyle = props.contentStyle || props['content-style'] || this.contentStyle;
      if (labelPlacement === 'left') {
        if (bordered) {
          state.row.push(h("th", {
            class: [`${mergedClsPrefix}-descriptions-table-header`, labelClass],
            colspan: 1,
            style: labelStyle
          }, itemLabel), h("td", {
            class: [`${mergedClsPrefix}-descriptions-table-content`, contentClass],
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 + 1 : itemSpan * 2 - 1,
            style: contentStyle
          }, itemChildren));
        } else {
          state.row.push(h("td", {
            class: `${mergedClsPrefix}-descriptions-table-content`,
            colspan: isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2
          }, h("span", {
            class: [`${mergedClsPrefix}-descriptions-table-content__label`, labelClass],
            style: labelStyle
          }, [...itemLabel, separator && h("span", {
            class: `${mergedClsPrefix}-descriptions-separator`
          }, separator)]), h("span", {
            class: [`${mergedClsPrefix}-descriptions-table-content__content`, contentClass],
            style: contentStyle
          }, itemChildren)));
        }
      } else {
        const colspan = isLastIteration ? (compitableColumn - memorizedSpan) * 2 : itemSpan * 2;
        state.row.push(h("th", {
          class: [`${mergedClsPrefix}-descriptions-table-header`, labelClass],
          colspan: colspan,
          style: labelStyle
        }, itemLabel));
        state.secondRow.push(h("td", {
          class: [`${mergedClsPrefix}-descriptions-table-content`, contentClass],
          colspan: colspan,
          style: contentStyle
        }, itemChildren));
      }
      if (state.span >= compitableColumn || isLastIteration) {
        state.span = 0;
        if (state.row.length) {
          state.rows.push(state.row);
          state.row = [];
        }
        if (labelPlacement !== 'left') {
          if (state.secondRow.length) {
            state.rows.push(state.secondRow);
            state.secondRow = [];
          }
        }
      }
      return state;
    }, defaultState);
    const rows = itemState.rows.map(row => h("tr", {
      class: `${mergedClsPrefix}-descriptions-table-row`
    }, row));
    return h("div", {
      style: cssVars,
      class: [`${mergedClsPrefix}-descriptions`, this.themeClass, `${mergedClsPrefix}-descriptions--${labelPlacement}-label-placement`, `${mergedClsPrefix}-descriptions--${labelAlign}-label-align`, `${mergedClsPrefix}-descriptions--${mergedSize}-size`, bordered && `${mergedClsPrefix}-descriptions--bordered`]
    }, title || this.$slots.header ? h("div", {
      class: `${mergedClsPrefix}-descriptions-header`
    }, title || getSlot(this, 'header')) : null, h("div", {
      class: `${mergedClsPrefix}-descriptions-table-wrapper`
    }, h("table", {
      class: `${mergedClsPrefix}-descriptions-table`
    }, h("tbody", null, labelPlacement === 'top' && h("tr", {
      class: `${mergedClsPrefix}-descriptions-table-row`,
      style: {
        visibility: 'collapse'
      }
    }, repeat(compitableColumn * 2, h("td", null))), rows))));
  }
});