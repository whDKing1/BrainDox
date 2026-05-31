import type { Theme } from '../../_mixins/use-theme';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    titleFontSize: string;
    titleFontWeight: string;
    dividerColor: string;
    titleTextColor: string;
    titleTextColorDisabled: string;
    fontSize: string;
    textColor: string;
    arrowColor: string;
    arrowColorDisabled: string;
    itemMargin: string;
    titlePadding: string;
};
export type CollapseThemeVars = ReturnType<typeof self>;
declare const collapseLight: Theme<'Collapse', CollapseThemeVars>;
export default collapseLight;
export type CollapseTheme = typeof collapseLight;
