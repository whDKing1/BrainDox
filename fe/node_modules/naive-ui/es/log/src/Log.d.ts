import type { PropType, Ref } from 'vue';
import type { ScrollbarInst } from '../../_internal';
import type { Hljs } from '../../_mixins';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { LogSpinProps } from './public-types';
export interface LogInjection {
    trimRef: Ref<boolean>;
    languageRef: Ref<string | undefined>;
    highlightRef: Ref<boolean>;
    mergedHljsRef: Ref<Hljs | undefined>;
}
export interface LogInst {
    scrollTo: ((options: {
        silent?: boolean;
        position: 'top' | 'bottom';
    }) => void) & ((options: {
        silent?: boolean;
        top: number;
    }) => void);
}
export declare const logProps: {
    readonly loading: BooleanConstructor;
    readonly trim: BooleanConstructor;
    readonly log: StringConstructor;
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly lines: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 1.25;
    };
    readonly language: StringConstructor;
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 15;
    };
    readonly offsetTop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly offsetBottom: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hljs: ObjectConstructor;
    readonly spinProps: PropType<LogSpinProps>;
    readonly onReachTop: PropType<() => void>;
    readonly onReachBottom: PropType<() => void>;
    readonly onRequireMore: PropType<(from: "top" | "bottom") => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
};
export type LogProps = ExtractPublicPropTypes<typeof logProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly loading: BooleanConstructor;
    readonly trim: BooleanConstructor;
    readonly log: StringConstructor;
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly lines: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 1.25;
    };
    readonly language: StringConstructor;
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 15;
    };
    readonly offsetTop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly offsetBottom: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hljs: ObjectConstructor;
    readonly spinProps: PropType<LogSpinProps>;
    readonly onReachTop: PropType<() => void>;
    readonly onReachBottom: PropType<() => void>;
    readonly onRequireMore: PropType<(from: "top" | "bottom") => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
}>, {
    mergedClsPrefix: Ref<string, string>;
    scrollbarRef: Ref<{
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null, ScrollbarInst | {
        $el: HTMLElement;
        containerRef: HTMLElement | null;
        contentRef: HTMLElement | null;
        containerScrollTop: number;
        syncUnifiedContainer: () => void;
        scrollTo: import("../../_internal/scrollbar/src/Scrollbar").ScrollTo;
        scrollBy: import("../../_internal/scrollbar/src/Scrollbar").ScrollBy;
        sync: () => void;
        handleMouseEnterWrapper: () => void;
        handleMouseLeaveWrapper: () => void;
    } | null>;
    mergedTheme: import("vue").ComputedRef<{
        common: import("../..").ThemeCommonVars;
        self: {
            loaderFontSize: string;
            loaderTextColor: string;
            loaderColor: string;
            loaderBorder: string;
            loadingColor: string;
        };
        peers: {
            Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
                height: string;
                width: string;
                borderRadius: string;
                color: string;
                colorHover: string;
                railInsetHorizontalBottom: string;
                railInsetHorizontalTop: string;
                railInsetVerticalRight: string;
                railInsetVerticalLeft: string;
                railColor: string;
            }, any>;
            Code: import("../../_mixins").Theme<"Code", {
                textColor: string;
                fontSize: string;
                fontWeightStrong: string;
                'mono-3': string;
                'hue-1': string;
                'hue-2': string;
                'hue-3': string;
                'hue-4': string;
                'hue-5': string;
                'hue-5-2': string;
                'hue-6': string;
                'hue-6-2': string;
                lineNumberTextColor: string;
            }, any>;
        };
        peerOverrides: {
            Scrollbar?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
            Code?: {
                peers?: {
                    [x: string]: any;
                } | undefined;
            } | undefined;
        };
    }>;
    styleHeight: import("vue").ComputedRef<string>;
    mergedLines: import("vue").ComputedRef<string[]>;
    scrollToTop: (silent?: boolean) => void;
    scrollToBottom: (silent?: boolean) => void;
    handleWheel: (e: WheelEvent) => void;
    handleScroll: (e: Event) => void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-loader-font-size': string;
        '--n-loader-border': string;
        '--n-loader-color': string;
        '--n-loader-text-color': string;
        '--n-loading-color': string;
    }> | undefined;
    themeClass: Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
    scrollTo: ((options: {
        silent?: boolean;
        position: "top" | "bottom";
    }) => void) & ((options: {
        silent?: boolean;
        top: number;
    }) => void);
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly loading: BooleanConstructor;
    readonly trim: BooleanConstructor;
    readonly log: StringConstructor;
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly lines: {
        readonly type: PropType<string[]>;
        readonly default: () => never[];
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 1.25;
    };
    readonly language: StringConstructor;
    readonly rows: {
        readonly type: NumberConstructor;
        readonly default: 15;
    };
    readonly offsetTop: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly offsetBottom: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly hljs: ObjectConstructor;
    readonly spinProps: PropType<LogSpinProps>;
    readonly onReachTop: PropType<() => void>;
    readonly onReachBottom: PropType<() => void>;
    readonly onRequireMore: PropType<(from: "top" | "bottom") => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Log", {
        loaderFontSize: string;
        loaderTextColor: string;
        loaderColor: string;
        loaderBorder: string;
        loadingColor: string;
    }, {
        Scrollbar: import("../../_mixins").Theme<"Scrollbar", {
            height: string;
            width: string;
            borderRadius: string;
            color: string;
            colorHover: string;
            railInsetHorizontalBottom: string;
            railInsetHorizontalTop: string;
            railInsetVerticalRight: string;
            railInsetVerticalLeft: string;
            railColor: string;
        }, any>;
        Code: import("../../_mixins").Theme<"Code", {
            textColor: string;
            fontSize: string;
            fontWeightStrong: string;
            'mono-3': string;
            'hue-1': string;
            'hue-2': string;
            'hue-3': string;
            'hue-4': string;
            'hue-5': string;
            'hue-5-2': string;
            'hue-6': string;
            'hue-6-2': string;
            lineNumberTextColor: string;
        }, any>;
    }>>>;
}>> & Readonly<{}>, {
    readonly fontSize: number;
    readonly lineHeight: number;
    readonly offsetTop: number;
    readonly offsetBottom: number;
    readonly loading: boolean;
    readonly trim: boolean;
    readonly rows: number;
    readonly lines: string[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
