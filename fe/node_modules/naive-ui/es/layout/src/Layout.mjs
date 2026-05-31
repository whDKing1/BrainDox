import { computed, defineComponent, h, provide, ref } from 'vue';
import { NScrollbar } from "../../_internal/index.mjs";
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { createInjectionKey, useReactivated } from "../../_utils/index.mjs";
import { layoutLight } from "../styles/index.mjs";
import { positionProp } from "./interface.mjs";
import style from "./styles/layout.cssr.mjs";
export const layoutProps = {
  embedded: Boolean,
  position: positionProp,
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object,
  onScroll: Function,
  contentClass: String,
  contentStyle: {
    type: [String, Object],
    default: ''
  },
  hasSider: Boolean,
  siderPlacement: {
    type: String,
    default: 'left'
  }
};
export const layoutInjectionKey = createInjectionKey('n-layout');
export function createLayoutComponent(isContent) {
  return defineComponent({
    name: isContent ? 'LayoutContent' : 'Layout',
    props: Object.assign(Object.assign({}, useTheme.props), layoutProps),
    setup(props) {
      const scrollableElRef = ref(null);
      const scrollbarInstRef = ref(null);
      const {
        mergedClsPrefixRef,
        inlineThemeDisabled
      } = useConfig(props);
      const themeRef = useTheme('Layout', '-layout', style, layoutLight, props, mergedClsPrefixRef);
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
      provide(layoutInjectionKey, props);
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
      const hasSiderStyle = {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        flexDirection: 'row'
      };
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
        return {
          '--n-bezier': cubicBezierEaseInOut,
          '--n-color': props.embedded ? self.colorEmbedded : self.color,
          '--n-text-color': self.textColor
        };
      });
      const themeClassHandle = inlineThemeDisabled ? useThemeClass('layout', computed(() => {
        return props.embedded ? 'e' : '';
      }), cssVarsRef, props) : undefined;
      return Object.assign({
        mergedClsPrefix: mergedClsPrefixRef,
        scrollableElRef,
        scrollbarInstRef,
        hasSiderStyle,
        mergedTheme: themeRef,
        handleNativeElScroll,
        cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
        themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
        onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
      }, exposedMethods);
    },
    render() {
      var _a;
      const {
        mergedClsPrefix,
        hasSider
      } = this;
      (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
      const hasSiderStyle = hasSider ? this.hasSiderStyle : undefined;
      const layoutClass = [this.themeClass, isContent && `${mergedClsPrefix}-layout-content`, `${mergedClsPrefix}-layout`, `${mergedClsPrefix}-layout--${this.position}-positioned`];
      return h("div", {
        class: layoutClass,
        style: this.cssVars
      }, this.nativeScrollbar ? h("div", {
        ref: "scrollableElRef",
        class: [`${mergedClsPrefix}-layout-scroll-container`, this.contentClass],
        style: [this.contentStyle, hasSiderStyle],
        onScroll: this.handleNativeElScroll
      }, this.$slots) : h(NScrollbar, Object.assign({}, this.scrollbarProps, {
        onScroll: this.onScroll,
        ref: "scrollbarInstRef",
        theme: this.mergedTheme.peers.Scrollbar,
        themeOverrides: this.mergedTheme.peerOverrides.Scrollbar,
        contentClass: this.contentClass,
        contentStyle: [this.contentStyle, hasSiderStyle]
      }), this.$slots));
    }
  });
}
export default createLayoutComponent(false);