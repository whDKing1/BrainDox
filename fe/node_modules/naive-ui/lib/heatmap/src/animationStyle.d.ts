import type { ComputedRef, Ref } from 'vue';
import type { MergedTheme, Theme } from '../../_mixins';
import type { HeatmapThemeVars } from '../styles';
export declare function useLoadingStyleClass(props: {
    loading?: boolean;
}, themeRef: ComputedRef<MergedTheme<Theme<'Heatmap', HeatmapThemeVars, any>>>): Ref<string>;
