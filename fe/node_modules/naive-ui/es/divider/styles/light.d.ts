import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    textColor: string;
    color: string;
    fontWeight: string;
};
export type DividerThemeVars = ReturnType<typeof self>;
declare const dividerLight: Theme<'Divider', DividerThemeVars>;
export default dividerLight;
export type DividerTheme = typeof dividerLight;
