import type { CSSProperties, PropType, Ref, SlotsType, TransitionProps, VNode } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { ArrowScopedSlotProps, CarouselArrowSlotProps, CarouselDotSlotProps, DotScopedSlotProps, Size } from './interface';
declare const transitionProperties: readonly ["transitionDuration", "transitionTimingFunction"];
type TransitionStyle = Partial<Pick<CSSProperties, (typeof transitionProperties)[number]>>;
export declare const carouselProps: {
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: NumberConstructor;
    showArrow: BooleanConstructor;
    dotType: {
        type: PropType<"dot" | "line">;
        default: string;
    };
    dotPlacement: {
        type: PropType<"top" | "bottom" | "left" | "right">;
        default: string;
    };
    slidesPerView: {
        type: PropType<number | "auto">;
        default: number;
    };
    spaceBetween: {
        type: NumberConstructor;
        default: number;
    };
    centeredSlides: BooleanConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
    };
    autoplay: BooleanConstructor;
    interval: {
        type: NumberConstructor;
        default: number;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: PropType<"slide" | "fade" | "card" | "custom">;
        default: string;
    };
    showDots: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    transitionStyle: {
        type: PropType<TransitionStyle>;
        default: () => TransitionStyle;
    };
    transitionProps: PropType<TransitionProps>;
    draggable: BooleanConstructor;
    prevSlideStyle: PropType<CSSProperties | string>;
    nextSlideStyle: PropType<CSSProperties | string>;
    touchable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mousewheel: BooleanConstructor;
    keyboard: BooleanConstructor;
    'onUpdate:currentIndex': PropType<(currentIndex: number, lastIndex: number) => void>;
    onUpdateCurrentIndex: PropType<(currentIndex: number, lastIndex: number) => void>;
    theme: PropType<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
};
export type CarouselProps = ExtractPublicPropTypes<typeof carouselProps>;
export interface CarouselSlots {
    default?: () => VNode[];
    arrow?: (props: CarouselArrowSlotProps) => VNode[];
    dots?: (props: CarouselDotSlotProps) => VNode[];
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: NumberConstructor;
    showArrow: BooleanConstructor;
    dotType: {
        type: PropType<"dot" | "line">;
        default: string;
    };
    dotPlacement: {
        type: PropType<"top" | "bottom" | "left" | "right">;
        default: string;
    };
    slidesPerView: {
        type: PropType<number | "auto">;
        default: number;
    };
    spaceBetween: {
        type: NumberConstructor;
        default: number;
    };
    centeredSlides: BooleanConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
    };
    autoplay: BooleanConstructor;
    interval: {
        type: NumberConstructor;
        default: number;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: PropType<"slide" | "fade" | "card" | "custom">;
        default: string;
    };
    showDots: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    transitionStyle: {
        type: PropType<TransitionStyle>;
        default: () => TransitionStyle;
    };
    transitionProps: PropType<TransitionProps>;
    draggable: BooleanConstructor;
    prevSlideStyle: PropType<CSSProperties | string>;
    nextSlideStyle: PropType<CSSProperties | string>;
    touchable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mousewheel: BooleanConstructor;
    keyboard: BooleanConstructor;
    'onUpdate:currentIndex': PropType<(currentIndex: number, lastIndex: number) => void>;
    onUpdateCurrentIndex: PropType<(currentIndex: number, lastIndex: number) => void>;
    theme: PropType<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
}>, {
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-dot-color': string;
        '--n-dot-color-focus': string;
        '--n-dot-color-active': string;
        '--n-dot-size': string;
        '--n-dot-line-width': string;
        '--n-dot-line-width-active': string;
        '--n-arrow-color': string;
    }> | undefined;
    themeClass: Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    getCurrentIndex: () => number;
    to: (index: number) => void;
    prev: () => void;
    next: () => void;
    mergedClsPrefix: Ref<string, string>;
    selfElRef: Ref<HTMLDivElement | null, HTMLDivElement | null>;
    slidesElRef: Ref<HTMLDivElement | null, HTMLDivElement | null>;
    slideVNodes: {
        value: VNode[];
    };
    duplicatedable: import("vue").ComputedRef<boolean>;
    userWantsControl: import("vue").ComputedRef<boolean>;
    autoSlideSize: import("vue").ComputedRef<boolean>;
    realIndex: import("vue").ComputedRef<number>;
    slideStyles: import("vue").ComputedRef<(Partial<Size> | undefined)[] | CSSProperties[]>;
    translateStyle: Ref<CSSProperties, CSSProperties>;
    slidesControlListeners: import("vue").ComputedRef<{
        onTouchstartPassive: ((event: MouseEvent | TouchEvent) => void) | undefined;
        onMousedown: ((event: MouseEvent | TouchEvent) => void) | undefined;
        onWheel: ((event: WheelEvent) => void) | undefined;
    }>;
    handleTransitionEnd: () => void;
    handleResize: () => void;
    handleSlideResize: () => void;
    handleMouseenter: () => void;
    handleMouseleave: () => void;
    isActive: (index: number) => boolean;
    arrowSlotProps: import("vue").ComputedRef<ArrowScopedSlotProps>;
    dotSlotProps: import("vue").ComputedRef<DotScopedSlotProps>;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    currentIndex: NumberConstructor;
    showArrow: BooleanConstructor;
    dotType: {
        type: PropType<"dot" | "line">;
        default: string;
    };
    dotPlacement: {
        type: PropType<"top" | "bottom" | "left" | "right">;
        default: string;
    };
    slidesPerView: {
        type: PropType<number | "auto">;
        default: number;
    };
    spaceBetween: {
        type: NumberConstructor;
        default: number;
    };
    centeredSlides: BooleanConstructor;
    direction: {
        type: PropType<"horizontal" | "vertical">;
        default: string;
    };
    autoplay: BooleanConstructor;
    interval: {
        type: NumberConstructor;
        default: number;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        type: PropType<"slide" | "fade" | "card" | "custom">;
        default: string;
    };
    showDots: {
        type: BooleanConstructor;
        default: boolean;
    };
    trigger: {
        type: PropType<"click" | "hover">;
        default: string;
    };
    transitionStyle: {
        type: PropType<TransitionStyle>;
        default: () => TransitionStyle;
    };
    transitionProps: PropType<TransitionProps>;
    draggable: BooleanConstructor;
    prevSlideStyle: PropType<CSSProperties | string>;
    nextSlideStyle: PropType<CSSProperties | string>;
    touchable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mousewheel: BooleanConstructor;
    keyboard: BooleanConstructor;
    'onUpdate:currentIndex': PropType<(currentIndex: number, lastIndex: number) => void>;
    onUpdateCurrentIndex: PropType<(currentIndex: number, lastIndex: number) => void>;
    theme: PropType<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Carousel", {
        dotSize: string;
        dotColor: string;
        dotColorActive: string;
        dotColorFocus: string;
        dotLineWidth: string;
        dotLineWidthActive: string;
        arrowColor: string;
    }, any>>>;
}>> & Readonly<{}>, {
    trigger: "hover" | "click";
    keyboard: boolean;
    defaultIndex: number;
    showArrow: boolean;
    dotType: "dot" | "line";
    dotPlacement: "top" | "bottom" | "left" | "right";
    slidesPerView: number | "auto";
    spaceBetween: number;
    centeredSlides: boolean;
    direction: "horizontal" | "vertical";
    autoplay: boolean;
    interval: number;
    loop: boolean;
    effect: "card" | "slide" | "fade" | "custom";
    showDots: boolean;
    transitionStyle: Partial<Pick<CSSProperties, "transitionDuration" | "transitionTimingFunction">>;
    draggable: boolean;
    touchable: boolean;
    mousewheel: boolean;
}, SlotsType<CarouselSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
