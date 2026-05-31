"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarGroupProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const Avatar_1 = __importDefault(require("../../avatar/src/Avatar"));
const context_1 = require("../../avatar/src/context");
const styles_1 = require("../styles");
const avatar_group_cssr_1 = __importDefault(require("./styles/avatar-group.cssr"));
exports.avatarGroupProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { max: Number, maxStyle: [Object, String], options: {
        type: Array,
        default: () => []
    }, vertical: Boolean, expandOnHover: Boolean, size: [String, Number] });
exports.default = (0, vue_1.defineComponent)({
    name: 'AvatarGroup',
    props: exports.avatarGroupProps,
    slots: Object,
    setup(props) {
        const { mergedClsPrefixRef, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const mergedThemeRef = (0, _mixins_1.useTheme)('AvatarGroup', '-avatar-group', avatar_group_cssr_1.default, styles_1.avatarGroupLight, props, mergedClsPrefixRef);
        (0, vue_1.provide)(context_1.avatarGroupInjectionKey, props);
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('AvatarGroup', mergedRtlRef, mergedClsPrefixRef);
        const restOptionsRef = (0, vue_1.computed)(() => {
            const { max } = props;
            if (max === undefined)
                return undefined;
            const { options } = props;
            if (options.length > max)
                return options.slice(max - 1, options.length);
            return [];
        });
        const displayedOptionsRef = (0, vue_1.computed)(() => {
            const { options, max } = props;
            if (max === undefined)
                return options;
            if (options.length > max)
                return options.slice(0, max - 1);
            if (options.length === max)
                return options.slice(0, max);
            return options;
        });
        return {
            mergedTheme: mergedThemeRef,
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            restOptions: restOptionsRef,
            displayedOptions: displayedOptionsRef,
            cssVars: (0, vue_1.computed)(() => {
                return {
                    '--n-gap': mergedThemeRef.value.self.gap
                };
            })
        };
    },
    render() {
        const { mergedClsPrefix, displayedOptions, restOptions, mergedTheme, $slots } = this;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-avatar-group`,
                this.rtlEnabled && `${mergedClsPrefix}-avatar-group--rtl`,
                this.vertical && `${mergedClsPrefix}-avatar-group--vertical`,
                this.expandOnHover
                    && `${mergedClsPrefix}-avatar-group--expand-on-hover`
            ], style: this.cssVars, role: "group" },
            displayedOptions.map((option) => {
                return $slots.avatar ? ($slots.avatar({ option })) : ((0, vue_1.h)(Avatar_1.default, { src: option.src, theme: mergedTheme.peers.Avatar, themeOverrides: mergedTheme.peerOverrides.Avatar }));
            }),
            restOptions !== undefined
                && restOptions.length > 0
                && ($slots.rest ? ($slots.rest({ options: restOptions, rest: restOptions.length })) : ((0, vue_1.h)(Avatar_1.default, { style: this.maxStyle, theme: mergedTheme.peers.Avatar, themeOverrides: mergedTheme.peerOverrides.Avatar }, {
                    default: () => `+${restOptions.length}`
                })))));
    }
});
