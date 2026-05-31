import { defineComponent, h, inject } from 'vue';
import { NBaseClose, NScrollbar } from "../../_internal/index.mjs";
import { throwError } from "../../_utils/index.mjs";
import { drawerInjectionKey } from "./interface.mjs";
export const drawerContentProps = {
  title: String,
  headerClass: String,
  headerStyle: [Object, String],
  footerClass: String,
  footerStyle: [Object, String],
  bodyClass: String,
  bodyStyle: [Object, String],
  bodyContentClass: String,
  bodyContentStyle: [Object, String],
  nativeScrollbar: {
    type: Boolean,
    default: true
  },
  scrollbarProps: Object,
  closable: Boolean
};
export default defineComponent({
  name: 'DrawerContent',
  props: drawerContentProps,
  slots: Object,
  setup() {
    const NDrawer = inject(drawerInjectionKey, null);
    if (!NDrawer) {
      throwError('drawer-content', '`n-drawer-content` must be placed inside `n-drawer`.');
    }
    const {
      doUpdateShow
    } = NDrawer;
    function handleCloseClick() {
      doUpdateShow(false);
    }
    return {
      handleCloseClick,
      mergedTheme: NDrawer.mergedThemeRef,
      mergedClsPrefix: NDrawer.mergedClsPrefixRef
    };
  },
  render() {
    const {
      title,
      mergedClsPrefix,
      nativeScrollbar,
      mergedTheme,
      bodyClass,
      bodyStyle,
      bodyContentClass,
      bodyContentStyle,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      scrollbarProps,
      closable,
      $slots
    } = this;
    return h("div", {
      role: "none",
      class: [`${mergedClsPrefix}-drawer-content`, nativeScrollbar && `${mergedClsPrefix}-drawer-content--native-scrollbar`]
    }, $slots.header || title || closable ? h("div", {
      class: [`${mergedClsPrefix}-drawer-header`, headerClass],
      style: headerStyle,
      role: "none"
    }, h("div", {
      class: `${mergedClsPrefix}-drawer-header__main`,
      role: "heading",
      "aria-level": "1"
    }, $slots.header !== undefined ? $slots.header() : title), closable && h(NBaseClose, {
      onClick: this.handleCloseClick,
      clsPrefix: mergedClsPrefix,
      class: `${mergedClsPrefix}-drawer-header__close`,
      absolute: true
    })) : null, nativeScrollbar ? h("div", {
      class: [`${mergedClsPrefix}-drawer-body`, bodyClass],
      style: bodyStyle,
      role: "none"
    }, h("div", {
      class: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
      style: bodyContentStyle,
      role: "none"
    }, $slots)) : h(NScrollbar, Object.assign({
      themeOverrides: mergedTheme.peerOverrides.Scrollbar,
      theme: mergedTheme.peers.Scrollbar
    }, scrollbarProps, {
      class: `${mergedClsPrefix}-drawer-body`,
      contentClass: [`${mergedClsPrefix}-drawer-body-content-wrapper`, bodyContentClass],
      contentStyle: bodyContentStyle
    }), $slots), $slots.footer ? h("div", {
      class: [`${mergedClsPrefix}-drawer-footer`, footerClass],
      style: footerStyle,
      role: "none"
    }, $slots.footer()) : null);
  }
});