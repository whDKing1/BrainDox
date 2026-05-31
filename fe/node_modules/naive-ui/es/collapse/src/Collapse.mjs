import { useMergedState } from 'vooks';
import { computed, defineComponent, h, provide, ref } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import { call, createInjectionKey, warn } from "../../_utils/index.mjs";
import { collapseLight } from "../styles/index.mjs";
import style from "./styles/index.cssr.mjs";
export const collapseProps = Object.assign(Object.assign({}, useTheme.props), {
  defaultExpandedNames: {
    type: [Array, String],
    default: null
  },
  expandedNames: [Array, String],
  arrowPlacement: {
    type: String,
    default: 'left'
  },
  accordion: {
    type: Boolean,
    default: false
  },
  displayDirective: {
    type: String,
    default: 'if'
  },
  triggerAreas: {
    type: Array,
    default: () => ['main', 'extra', 'arrow']
  },
  onItemHeaderClick: [Function, Array],
  'onUpdate:expandedNames': [Function, Array],
  onUpdateExpandedNames: [Function, Array],
  // deprecated
  onExpandedNamesChange: {
    type: [Function, Array],
    validator: () => {
      if (process.env.NODE_ENV !== 'production') {
        warn('collapse', '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.');
      }
      return true;
    },
    default: undefined
  }
});
export const collapseInjectionKey = createInjectionKey('n-collapse');
export default defineComponent({
  name: 'Collapse',
  props: collapseProps,
  slots: Object,
  setup(props, {
    slots
  }) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled,
      mergedRtlRef
    } = useConfig(props);
    const uncontrolledExpandedNamesRef = ref(props.defaultExpandedNames);
    const controlledExpandedNamesRef = computed(() => props.expandedNames);
    const mergedExpandedNamesRef = useMergedState(controlledExpandedNamesRef, uncontrolledExpandedNamesRef);
    const themeRef = useTheme('Collapse', '-collapse', style, collapseLight, props, mergedClsPrefixRef);
    function doUpdateExpandedNames(names) {
      const {
        'onUpdate:expandedNames': _onUpdateExpandedNames,
        onUpdateExpandedNames,
        onExpandedNamesChange
      } = props;
      if (onUpdateExpandedNames) {
        call(onUpdateExpandedNames, names);
      }
      if (_onUpdateExpandedNames) {
        call(_onUpdateExpandedNames, names);
      }
      if (onExpandedNamesChange) {
        call(onExpandedNamesChange, names);
      }
      uncontrolledExpandedNamesRef.value = names;
    }
    function doItemHeaderClick(info) {
      const {
        onItemHeaderClick
      } = props;
      if (onItemHeaderClick) {
        call(onItemHeaderClick, info);
      }
    }
    function toggleItem(collapse, name, event) {
      const {
        accordion
      } = props;
      const {
        value: expandedNames
      } = mergedExpandedNamesRef;
      if (accordion) {
        if (collapse) {
          doUpdateExpandedNames([name]);
          doItemHeaderClick({
            name,
            expanded: true,
            event
          });
        } else {
          doUpdateExpandedNames([]);
          doItemHeaderClick({
            name,
            expanded: false,
            event
          });
        }
      } else {
        if (!Array.isArray(expandedNames)) {
          doUpdateExpandedNames([name]);
          doItemHeaderClick({
            name,
            expanded: true,
            event
          });
        } else {
          const activeNames = expandedNames.slice();
          const index = activeNames.findIndex(activeName => name === activeName);
          if (~index) {
            activeNames.splice(index, 1);
            doUpdateExpandedNames(activeNames);
            doItemHeaderClick({
              name,
              expanded: false,
              event
            });
          } else {
            activeNames.push(name);
            doUpdateExpandedNames(activeNames);
            doItemHeaderClick({
              name,
              expanded: true,
              event
            });
          }
        }
      }
    }
    provide(collapseInjectionKey, {
      props,
      mergedClsPrefixRef,
      expandedNamesRef: mergedExpandedNamesRef,
      slots,
      toggleItem
    });
    const rtlEnabledRef = useRtl('Collapse', mergedRtlRef, mergedClsPrefixRef);
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self: {
          titleFontWeight,
          dividerColor,
          titlePadding,
          titleTextColor,
          titleTextColorDisabled,
          textColor,
          arrowColor,
          fontSize,
          titleFontSize,
          arrowColorDisabled,
          itemMargin
        }
      } = themeRef.value;
      return {
        '--n-font-size': fontSize,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-text-color': textColor,
        '--n-divider-color': dividerColor,
        '--n-title-padding': titlePadding,
        '--n-title-font-size': titleFontSize,
        '--n-title-text-color': titleTextColor,
        '--n-title-text-color-disabled': titleTextColorDisabled,
        '--n-title-font-weight': titleFontWeight,
        '--n-arrow-color': arrowColor,
        '--n-arrow-color-disabled': arrowColorDisabled,
        '--n-item-margin': itemMargin
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('collapse', undefined, cssVarsRef, props) : undefined;
    return {
      rtlEnabled: rtlEnabledRef,
      mergedTheme: themeRef,
      mergedClsPrefix: mergedClsPrefixRef,
      cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    var _a;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("div", {
      class: [`${this.mergedClsPrefix}-collapse`, this.rtlEnabled && `${this.mergedClsPrefix}-collapse--rtl`, this.themeClass],
      style: this.cssVars
    }, this.$slots);
  }
});