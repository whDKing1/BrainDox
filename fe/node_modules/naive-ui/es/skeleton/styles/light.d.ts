import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
declare function self(vars: ThemeCommonVars): {
    color: string;
    colorEnd: string;
    borderRadius: string;
    heightSmall: string;
    heightMedium: string;
    heightLarge: string;
};
export type SkeletonThemeVars = ReturnType<typeof self>;
export declare const skeletonLight: Theme<'Skeleton', SkeletonThemeVars>;
export type SkeletonTheme = typeof skeletonLight;
export {};
