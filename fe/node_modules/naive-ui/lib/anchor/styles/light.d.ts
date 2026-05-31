import type { Theme } from '../../_mixins';
import type { ThemeCommonVars } from '../../_styles/common';
export declare function self(vars: ThemeCommonVars): {
    borderRadius: string;
    railColor: string;
    railColorActive: string;
    linkColor: string;
    linkTextColor: string;
    linkTextColorHover: string;
    linkTextColorPressed: string;
    linkTextColorActive: string;
    linkFontSize: string;
    linkPadding: string;
    railWidth: string;
};
export type AnchorThemeVars = ReturnType<typeof self>;
declare const anchorLight: Theme<'Anchor', AnchorThemeVars>;
export default anchorLight;
export type AnchorTheme = typeof anchorLight;
