import { computed, defineComponent, h, ref } from 'vue';
import { useConfig, useTheme, useThemeClass } from "../../_mixins/index.mjs";
import { keep } from "../../_utils/index.mjs";
import { NAffix } from "../../affix/index.mjs";
import { affixPropKeys, affixProps } from "../../affix/src/Affix.mjs";
import { anchorLight } from "../styles/index.mjs";
import NBaseAnchor, { baseAnchorPropKeys, baseAnchorProps } from "./BaseAnchor.mjs";
import style from "./styles/index.cssr.mjs";
export const anchorProps = Object.assign(Object.assign(Object.assign(Object.assign({}, useTheme.props), {
  affix: Boolean
}), affixProps), baseAnchorProps);
export default defineComponent({
  name: 'Anchor',
  props: anchorProps,
  setup(props, {
    slots
  }) {
    const {
      mergedClsPrefixRef,
      inlineThemeDisabled
    } = useConfig(props);
    const themeRef = useTheme('Anchor', '-anchor', style, anchorLight, props, mergedClsPrefixRef);
    const anchorRef = ref(null);
    const cssVarsRef = computed(() => {
      const {
        self: {
          railColor,
          linkColor,
          railColorActive,
          linkTextColor,
          linkTextColorHover,
          linkTextColorPressed,
          linkTextColorActive,
          linkFontSize,
          railWidth,
          linkPadding,
          borderRadius
        },
        common: {
          cubicBezierEaseInOut
        }
      } = themeRef.value;
      return {
        '--n-link-border-radius': borderRadius,
        '--n-link-color': linkColor,
        '--n-link-font-size': linkFontSize,
        '--n-link-text-color': linkTextColor,
        '--n-link-text-color-hover': linkTextColorHover,
        '--n-link-text-color-active': linkTextColorActive,
        '--n-link-text-color-pressed': linkTextColorPressed,
        '--n-link-padding': linkPadding,
        '--n-bezier': cubicBezierEaseInOut,
        '--n-rail-color': railColor,
        '--n-rail-color-active': railColorActive,
        '--n-rail-width': railWidth
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass('anchor', undefined, cssVarsRef, props) : undefined;
    return {
      scrollTo(href) {
        var _a;
        (_a = anchorRef.value) === null || _a === void 0 ? void 0 : _a.setActiveHref(href);
      },
      renderAnchor: () => {
        themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender();
        return h(NBaseAnchor, Object.assign({
          ref: anchorRef,
          style: inlineThemeDisabled ? undefined : cssVarsRef.value,
          class: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass.value
        }, keep(props, baseAnchorPropKeys), {
          mergedClsPrefix: mergedClsPrefixRef.value
        }), slots);
      }
    };
  },
  render() {
    return !this.affix ? this.renderAnchor() : h(NAffix, Object.assign({}, keep(this, affixPropKeys)), {
      default: this.renderAnchor
    });
  }
});