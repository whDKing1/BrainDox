export type AvatarGroupThemeVars = Record<string, unknown>;
export declare function self(): {
    gap: string;
};
declare const avatarGroupLight: import("../../_mixins").Theme<"AvatarGroup", {
    gap: string;
}, {
    Avatar: import("../../_mixins").Theme<"Avatar", {
        borderRadius: string;
        fontSize: string;
        border: string;
        heightTiny: string;
        heightSmall: string;
        heightMedium: string;
        heightLarge: string;
        heightHuge: string;
        color: string;
        colorModal: string;
        colorPopover: string;
    }, any>;
}>;
export default avatarGroupLight;
export type AvatarGroupTheme = typeof avatarGroupLight;
