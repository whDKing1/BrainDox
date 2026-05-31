import type { PropType, Ref } from 'vue';
import type { ExtractPublicPropTypes, MaybeArray } from '../../_utils';
import type { ImagePreviewInst, ImageRenderToolbar } from './public-types';
export declare const imageGroupInjectionKey: import("vue").InjectionKey<ImagePreviewInst & {
    groupId: string;
    mergedClsPrefixRef: Ref<string>;
    renderToolbarRef: Ref<ImageRenderToolbar | undefined>;
    registerImageUrl: (id: number, url: string) => () => void;
    toggleShow: (imageId: string) => void;
}>;
export declare const imageGroupProps: {
    srcList: PropType<string[]>;
    current: NumberConstructor;
    defaultCurrent: {
        type: NumberConstructor;
        default: number;
    };
    show: {
        type: BooleanConstructor;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    onUpdateShow: PropType<MaybeArray<(show: boolean) => void>>;
    'onUpdate:show': PropType<MaybeArray<(show: boolean) => void>>;
    onUpdateCurrent: PropType<MaybeArray<(current: number) => void>>;
    'onUpdate:current': PropType<MaybeArray<(current: number) => void>>;
    onPreviewPrev: PropType<() => void>;
    onPreviewNext: PropType<() => void>;
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    showToolbarTooltip: BooleanConstructor;
    renderToolbar: PropType<ImageRenderToolbar>;
    theme: PropType<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
};
export type ImageGroupProps = ExtractPublicPropTypes<typeof imageGroupProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    srcList: PropType<string[]>;
    current: NumberConstructor;
    defaultCurrent: {
        type: NumberConstructor;
        default: number;
    };
    show: {
        type: BooleanConstructor;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    onUpdateShow: PropType<MaybeArray<(show: boolean) => void>>;
    'onUpdate:show': PropType<MaybeArray<(show: boolean) => void>>;
    onUpdateCurrent: PropType<MaybeArray<(current: number) => void>>;
    'onUpdate:current': PropType<MaybeArray<(current: number) => void>>;
    onPreviewPrev: PropType<() => void>;
    onPreviewNext: PropType<() => void>;
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    showToolbarTooltip: BooleanConstructor;
    renderToolbar: PropType<ImageRenderToolbar>;
    theme: PropType<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
}>, {
    mergedClsPrefix: Ref<string, string>;
    previewInstRef: Ref<{
        setThumbnailEl: (e: HTMLImageElement | null) => void;
    } | null, ImagePreviewInst | {
        setThumbnailEl: (e: HTMLImageElement | null) => void;
    } | null>;
    mergedShow: import("vue").ComputedRef<boolean>;
    src: import("vue").ComputedRef<string | undefined>;
    onClose: () => void;
    next: () => void;
    prev: () => void;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    srcList: PropType<string[]>;
    current: NumberConstructor;
    defaultCurrent: {
        type: NumberConstructor;
        default: number;
    };
    show: {
        type: BooleanConstructor;
        default: undefined;
    };
    defaultShow: BooleanConstructor;
    onUpdateShow: PropType<MaybeArray<(show: boolean) => void>>;
    'onUpdate:show': PropType<MaybeArray<(show: boolean) => void>>;
    onUpdateCurrent: PropType<MaybeArray<(current: number) => void>>;
    'onUpdate:current': PropType<MaybeArray<(current: number) => void>>;
    onPreviewPrev: PropType<() => void>;
    onPreviewNext: PropType<() => void>;
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    showToolbarTooltip: BooleanConstructor;
    renderToolbar: PropType<ImageRenderToolbar>;
    theme: PropType<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>;
    themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
    builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Image", {
        toolbarIconColor: string;
        toolbarColor: string;
        toolbarBoxShadow: string;
        toolbarBorderRadius: string;
    }, {
        Tooltip: import("../../_mixins").Theme<"Tooltip", {
            borderRadius: string;
            boxShadow: string;
            color: string;
            textColor: string;
            padding: string;
        }, {
            Popover: import("../../_mixins").Theme<"Popover", {
                fontSize: string;
                borderRadius: string;
                color: string;
                dividerColor: string;
                textColor: string;
                boxShadow: string;
                space: string;
                spaceArrow: string;
                arrowOffset: string;
                arrowOffsetVertical: string;
                arrowHeight: string;
                padding: string;
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
            }>;
        }>;
    }>>>;
}>> & Readonly<{}>, {
    show: boolean;
    defaultShow: boolean;
    showToolbar: boolean;
    showToolbarTooltip: boolean;
    defaultCurrent: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
