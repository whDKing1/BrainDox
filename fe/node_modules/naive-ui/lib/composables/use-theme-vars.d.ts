import type { ComputedRef } from 'vue';
import type { ThemeCommonVars } from '../_styles/common';
import type { CustomThemeCommonVars } from '../config-provider';
export declare function useThemeVars(): ComputedRef<ThemeCommonVars & CustomThemeCommonVars>;
