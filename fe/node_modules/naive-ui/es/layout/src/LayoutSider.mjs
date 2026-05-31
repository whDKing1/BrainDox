import { useMergedState } from 'vooks';
import { computed, defineComponent, h, inject, provide, ref, toRef } from 'vue';
import { NScrollbar } from "../../_internal/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { call, formatLength, useReactivated, warn } from "../../_utils/index.mjs";
import { layoutLight } from "../styles/index.mjs";
import { layoutSiderInjectionKey, positionProp } from "./interface.mjs";
import { layoutInjectionKey } from "./Layout.mjs";
import style from "./styles/layout-sider.cssr.mjs";
import ToggleBar from "./ToggleBar.mjs";
import ToggleButton from "./ToggleButton.mjs";
export const layoutSiderProps = {
  position: positionProp,
  bordered: Boolean,
  collapsedWidth: {
    type: Number,
    default: 48
  },
  width: {
    type: [Number, String],
    default: 272
  },
  contentClass: String,
  contentStyle: {
    type: [String, Object],
    default: ''
  },
  collapseMode: {
    type: String,
    default: 'transform'
  },
  collapsed: {
    type: Boolean,
    default: undefined
  },
  defaultCollapsed: Boolean,
  showCollapsedContent: {
    type: Boolean,
    default: true
  },
  showTrigger: {
    type: [Boolean, String],
    default: false
  },
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  inverted: Boolean,
  scrollbarProps: Object,
  triggerClass: String,
  triggerStyle: [String, Object],
  collapsedTriggerClass: String,
  collapsedTriggerStyle: [String, Object],
  'onUpdate:collapsed': [Function, Array],
  onUpdateCollapsed: [Function, Array],
  onAfterEnter: Function,
  onAfterLeave: Function,
  // deprecated
  onExpand: [Function, Array],
  onCollapse: [Function, Array],
  onScroll: Function
};
export default defineComponent({
  name: 'LayoutSider',
  props: Object.assign(Object.assign({}, useTheme.props), layoutSiderProps),
  setup(props) {
    const layoutProps = inject(layoutInjectionKey);
    if (process.env.NODE_ENV !== 'production') {
      if (!layoutProps) {
        warn('layout-sider', 'Layout sider is not allowed to be put outside layout.');
      } else {
        if (!layoutProps.hasSider) {
          warn('layout-sider', 'You are putting `n-layout-sider` in a `n-layout` but haven\'t set `has-sider` on the `n-layout`.');
        }
      }
    }
    const scrollableElRef = ref(null);
    const scrollbarInstRef = ref(null);
    const uncontrolledCollapsedRef = ref(props.defaultCollapsed);
    const mergedCollapsedRef = useMergedState(toRef(props, 'collapsed'), uncontrolledCollapsedRef);
    const styleMaxWidthRef = computed(() => {
      return formatLength(mergedCollapsedRef.value ? props.collapsedWidth : props.width);
    });
    const scrollContainerStyleRef = computed(() => {
      if (props.collapseMode !== 'transform') return {};
      return {
        minWidth: formatLength(props.width)
      };
    });
    const siderPlacementRef = computed(() => {
      return layoutProps ? layoutProps.siderPlacement : 'left';
    });
    function scrollTo(options, y) {
      if (props.nativeScrollbar) {
        const {
          value: scrollableEl
        } = scrollableElRef;
        if (scrollableEl) {
          if (y === undefined) {
            scrollableEl.scrollTo(options);
          } else {
            scrollableEl.scrollTo(options, y);
          }
        }
      } else {
        const {
          value: scrollbarInst
        } = scrollbarInstRef;
        if (scrollbarInst) {
          scrollbarInst.scrollTo(options, y);
        }
      }
    }
    function handleTriggerClick() {
      const {
        'onUpdate:collapsed': _onUpdateCollapsed,
        onUpdateCollapsed,
        // deprecated
        onExpand,
        onCollapse
      } = props;
      const {
        value: collapsed
      } = mergedCollapsedRef;
      if (onUpdateCollapsed) {
        call(onUpdateCollapsed, !collapsed);
      }
      if (_onUpdateCollapsed) {
        call(_onUpdateCollapsed, !collapsed);
      }
      uncontrolledCollapsedRef.value = !collapsed;
      if (collapsed) {
        if (onExpand) call(onExpand);
      } else {
        if (onCollapse) call(onCollapse);
      }
    }
    let scrollX = 0;
    let scrollY = 0;
    const handleNativeElScroll = e => {
      var _a;
      const target = e.target;
      scrollX = target.scrollLeft;
      scrollY = target.scrollTop;
      (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
    };
    useReactivated(() => {
      if (props.nativeScrollbar) {
        const el = scrollableElRef.value;
        if (el) {
          el.scrollTop = scrollY;
          el.scrollLeft = scrollX;
        }
      }
    });
    provide(layoutSiderInjectionKey, {
      collapsedRef: mergedCollapsedRef,
      collapseModeRef: toRef(props, 'collapseMode')
    });
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Layout', '-layout-sider', style, layoutLight, props, mergedClsPrefixRef);
    function handleTransitionend(e) {
      var _a, _b;
      if (e.propertyName === 'max-width') {
        if (mergedCollapsedRef.value) {
          (_a = props.onAfterLeave) === null || _a === void 0 ? void 0 : _a.call(props);
        } else {
          (_b = props.onAfterEnter) === null || _b === void 0 ? void 0 : _b.call(props);
        }
      }
    }
    const exposedMethods = {
      scrollTo
    };
    const cssVarsRef = computed(() => {
      const {
        common: {
          cubicBezierEaseInOut
        },
        self
      } = themeRef.value;
      const {
        siderToggleButtonColor,
        siderToggleButtonBorder,
        siderToggleBarColor,
        siderToggleBarColorHover
      } = self;
      const vars = {
        '--n-bezier': cubicBezierEaseInOut,
        '--n-toggle-button-color': siderToggleButtonColor,
        '--n-toggle-button-border': siderToggleButtonBorder,
        '--n-toggle-bar-color': siderToggleBarColor,
        '--n-toggle-bar-color-hover': siderToggleBarColorHover
      };
      if (props.inverted) {
        vars['--n-color'] = self.siderColorInverted;
        vars['--n-text-color'] = self.textColorInverted;
        vars['--n-border-color'] = self.siderBorderColorInverted;
        vars['--n-toggle-button-icon-color'] = self.siderToggleButtonIconColorInverted;
        vars.__invertScrollbar = self.__invertScrollbar;
      } else {
        vars['--n-color'] = self.siderColor;
        vars['--n-text-color'] = self.textColor;
        vars['--n-border-color'] = self.siderBorderColor;
        vars['--n-toggle-button-icon-color'] = self.siderToggleButtonIconColor;
      }
      return vars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('layout-sider', computed(() => props.inverted ? 'a' : 'b'), cssVarsRef, props) : undefined;
    return Object.assign({
      scrollableElRef,
      scrollbarInstRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedTheme: themeRef,
      styleMaxWidth: styleMaxWidthRef,
      mergedCollapsed: mergedCollapsedRef,
      scrollContainerStyle: scrollContainerStyleRef,
      siderPlacement: siderPlacementRef,
      handleNativeElScroll,
      handleTransitionend,
      handleTriggerClick,
      inlineThemeDisabled,
      cssVars: cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    }, exposedMethods);
  },
  render() {
    var _a;
    const {
      mergedClsPrefix,
      mergedCollapsed,
      showTrigger
    } = this;
    (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
    return h("aside", {
      class: [`${mergedClsPrefix}-layout-sider`, this.themeClass, `${mergedClsPrefix}-layout-sider--${this.position}-positioned`, `${mergedClsPrefix}-layout-sider--${this.siderPlacement}-placement`, this.bordered && `${mergedClsPrefix}-layout-sider--bordered`, mergedCollapsed && `${mergedClsPrefix}-layout-sider--collapsed`, (!mergedCollapsed || this.showCollapsedContent) && `${mergedClsPrefix}-layout-sider--show-content`],
      onTransitionend: this.handleTransitionend,
      style: [this.inlineThemeDisabled ? undefined : this.cssVars, {
        maxWidth: this.styleMaxWidth,
        width: formatLength(this.width)
      }]
    }, !this.nativeScrollbar ? h(NScrollbar, Object.assign({}, this.scrollbarProps, {
      onScroll: this.onScroll,
      ref: "scrollbarInstRef",
      style: this.scrollContainerStyle,
      contentStyle: this.contentStyle,
      contentClass: this.contentClass,
      theme: this.mergedTheme.peers.Scrollbar,
      themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
      // here is a hack, since in light theme the scrollbar color is dark,
      // we need to invert it in light color...
      builtinThemeOverrides: this.inverted && this.cssVars.__invertScrollbar === 'true' ? {
        colorHover: 'rgba(255, 255, 255, .4)',
        color: 'rgba(255, 255, 255, .3)'
      } : undefined
    }), this.$slots) : h("div", {
      class: [`${mergedClsPrefix}-layout-sider-scroll-container`, this.contentClass],
      onScroll: this.handleNativeElScroll,
      style: [this.scrollContainerStyle, {
        overflow: 'auto'
      }, this.contentStyle],
      ref: "scrollableElRef"
    }, this.$slots), showTrigger ? showTrigger === 'bar' ? h(ToggleBar, {
      clsPrefix: mergedClsPrefix,
      class: mergedCollapsed ? this.collapsedTriggerClass : this.triggerClass,
      style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle,
      onClick: this.handleTriggerClick
    }) : h(ToggleButton, {
      clsPrefix: mergedClsPrefix,
      class: mergedCollapsed ? this.collapsedTriggerClass : this.triggerClass,
      style: mergedCollapsed ? this.collapsedTriggerStyle : this.triggerStyle,
      onClick: this.handleTriggerClick
    }) : null, this.bordered ? h("div", {
      class: `${mergedClsPrefix}-layout-sider__border`
    }) : null);
  }
});