import type { CNode } from 'css-render';
import type { ComputedRef, PropType, Ref } from 'vue';
import type { ThemeCommonVars } from '../_styles/common';
import type { GlobalTheme } from '../config-provider';
export interface Theme<N, T = Record<string, unknown>, R = any> {
    name: N;
    common?: ThemeCommonVars;
    peers?: R;
    self?: (vars: ThemeCommonVars) => T;
}
export interface ThemeProps<T> {
    theme: PropType<T>;
    themeOverrides: PropType<ExtractThemeOverrides<T>>;
    builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>;
}
export interface ThemePropsReactive<T> {
    theme?: T;
    themeOverrides?: ExtractThemeOverrides<T>;
    builtinThemeOverrides?: ExtractThemeOverrides<T>;
}
export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown> ? unknown extends U ? Record<string, unknown> : U : Record<string, unknown>;
export type ExtractPeerOverrides<T> = T extends Theme<unknown, unknown, infer V> ? {
    peers?: {
        [k in keyof V]?: ExtractThemeOverrides<V[k]>;
    };
} : T;
export type ExtractMergedPeerOverrides<T> = T extends Theme<unknown, unknown, infer V> ? {
    [k in keyof V]?: ExtractPeerOverrides<V[k]>;
} : T;
export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> & ExtractPeerOverrides<T> & {
    common?: Partial<ThemeCommonVars>;
};
export declare function createTheme<N extends string, T, R>(theme: Theme<N, T, R>): Theme<N, T, R>;
type UseThemeProps<T> = Readonly<{
    theme?: T | undefined;
    themeOverrides?: ExtractThemeOverrides<T>;
    builtinThemeOverrides?: ExtractThemeOverrides<T>;
}>;
export type MergedTheme<T> = T extends Theme<unknown, infer V, infer W> ? {
    common: ThemeCommonVars;
    self: V;
    peers: W;
    peerOverrides: ExtractMergedPeerOverrides<T>;
} : T;
declare function useTheme<N, T, R>(resolveId: Exclude<keyof GlobalTheme, 'common' | 'name'>, mountId: string, style: CNode | undefined, defaultTheme: Theme<N, T, R>, props: UseThemeProps<Theme<N, T, R>>, clsPrefixRef: Ref<string | undefined> | undefined): ComputedRef<MergedTheme<Theme<N, T, R>>>;
declare namespace useTheme {
    var props: {
        readonly theme: ObjectConstructor;
        readonly themeOverrides: ObjectConstructor;
        readonly builtinThemeOverrides: ObjectConstructor;
    };
}
/**
 * props.theme (Theme):
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 * provider.theme:
 * {
 *   common: CommonThemeVars,
 *   Button: Theme
 *   ...
 * }
 * defaultTheme:
 * {
 *   common: CommonThemeVars,
 *   self(): ThemeVars,
 *   peers: { Component: Theme }
 * }
 *
 * props.themeOverrides (ThemeOverrides):
 * {
 *   common: CommonThemeVars,
 *   peers: { Component: ThemeOverrides },
 *   ...ThemeVars
 * }
 * provider.themeOverrides:
 * {
 *   common: CommonThemeVars,
 *   Component: ThemeOverrides
 *   ...
 * }
 *
 * mergedTheme:
 * {
 *   common: CommonThemeVars,
 *   self: ThemeVars,
 *   peers: { Component: Theme },
 *   overrides: { Component: ThemeOverrides }
 * }
 */
export default useTheme;
