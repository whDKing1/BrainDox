import type { Theme } from '../../_mixins';
export declare function self(): {
    dotSize: string;
    dotColor: string;
    dotColorActive: string;
    dotColorFocus: string;
    dotLineWidth: string;
    dotLineWidthActive: string;
    arrowColor: string;
};
export type CarouselThemeVars = ReturnType<typeof self>;
declare const carouselLight: Theme<'Carousel', CarouselThemeVars>;
export default carouselLight;
export type CarouselTheme = typeof carouselLight;
