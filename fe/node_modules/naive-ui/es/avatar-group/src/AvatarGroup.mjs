import { computed, defineComponent, h, provide } from 'vue';
import { useConfig, useTheme } from "../../_mixins/index.mjs";
import { useRtl } from "../../_mixins/use-rtl.mjs";
import NAvatar from "../../avatar/src/Avatar.mjs";
import { avatarGroupInjectionKey } from "../../avatar/src/context.mjs";
import { avatarGroupLight } from "../styles/index.mjs";
import style from "./styles/avatar-group.cssr.mjs";
export const avatarGroupProps = Object.assign(Object.assign({}, useTheme.props), {
  max: Number,
  maxStyle: [Object, String],
  options: {
    type: Array,
    default: () => []
  },
  vertical: Boolean,
  expandOnHover: Boolean,
  size: [String, Number]
});
export default defineComponent({
  name: 'AvatarGroup',
  props: avatarGroupProps,
  slots: Object,
  setup(props) {
    const {
      mergedClsPrefixRef,
      mergedRtlRef
    } = useConfig(props);
    const mergedThemeRef = useTheme('AvatarGroup', '-avatar-group', style, avatarGroupLight, props, mergedClsPrefixRef);
    provide(avatarGroupInjectionKey, props);
    const rtlEnabledRef = useRtl('AvatarGroup', mergedRtlRef, mergedClsPrefixRef);
    const restOptionsRef = computed(() => {
      const {
        max
      } = props;
      if (max === undefined) return undefined;
      const {
        options
      } = props;
      if (options.length > max) return options.slice(max - 1, options.length);
      return [];
    });
    const displayedOptionsRef = computed(() => {
      const {
        options,
        max
      } = props;
      if (max === undefined) return options;
      if (options.length > max) return options.slice(0, max - 1);
      if (options.length === max) return options.slice(0, max);
      return options;
    });
    return {
      mergedTheme: mergedThemeRef,
      rtlEnabled: rtlEnabledRef,
      mergedClsPrefix: mergedClsPrefixRef,
      restOptions: restOptionsRef,
      displayedOptions: displayedOptionsRef,
      cssVars: computed(() => {
        return {
          '--n-gap': mergedThemeRef.value.self.gap
        };
      })
    };
  },
  render() {
    const {
      mergedClsPrefix,
      displayedOptions,
      restOptions,
      mergedTheme,
      $slots
    } = this;
    return h("div", {
      class: [`${mergedClsPrefix}-avatar-group`, this.rtlEnabled && `${mergedClsPrefix}-avatar-group--rtl`, this.vertical && `${mergedClsPrefix}-avatar-group--vertical`, this.expandOnHover && `${mergedClsPrefix}-avatar-group--expand-on-hover`],
      style: this.cssVars,
      role: "group"
    }, displayedOptions.map(option => {
      return $slots.avatar ? $slots.avatar({
        option
      }) : h(NAvatar, {
        src: option.src,
        theme: mergedTheme.peers.Avatar,
        themeOverrides: mergedTheme.peerOverrides.Avatar
      });
    }), restOptions !== undefined && restOptions.length > 0 && ($slots.rest ? $slots.rest({
      options: restOptions,
      rest: restOptions.length
    }) : h(NAvatar, {
      style: this.maxStyle,
      theme: mergedTheme.peers.Avatar,
      themeOverrides: mergedTheme.peerOverrides.Avatar
    }, {
      default: () => `+${restOptions.length}`
    })));
  }
});