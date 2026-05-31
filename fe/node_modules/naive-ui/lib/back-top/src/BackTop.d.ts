import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const backTopProps: {
    readonly show: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly right: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly bottom: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly to: {
        readonly type: PropType<HTMLElement | string>;
        readonly default: "body";
    };
    readonly visibilityHeight: {
        readonly type: NumberConstructor;
        readonly default: 180;
    };
    readonly listenTo: PropType<string | HTMLElement | Document | (() => HTMLElement | Document)>;
    readonly 'onUpdate:show': {
        readonly type: FunctionConstructor;
        readonly default: () => void;
    };
    readonly target: PropType<() => HTMLElement>;
    readonly onShow: PropType<() => void>;
    readonly onHide: PropType<() => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
};
export type BackTopProps = ExtractPublicPropTypes<typeof backTopProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly show: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly right: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly bottom: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly to: {
        readonly type: PropType<HTMLElement | string>;
        readonly default: "body";
    };
    readonly visibilityHeight: {
        readonly type: NumberConstructor;
        readonly default: 180;
    };
    readonly listenTo: PropType<string | HTMLElement | Document | (() => HTMLElement | Document)>;
    readonly 'onUpdate:show': {
        readonly type: FunctionConstructor;
        readonly default: () => void;
    };
    readonly target: PropType<() => HTMLElement>;
    readonly onShow: PropType<() => void>;
    readonly onHide: PropType<() => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
}>, {
    placeholderRef: import("vue").Ref<HTMLElement | null, HTMLElement | null>;
    style: import("vue").ComputedRef<{
        right: string;
        bottom: string;
    }>;
    mergedShow: import("vue").ComputedRef<boolean>;
    isMounted: Readonly<import("vue").Ref<boolean, boolean>>;
    scrollElement: import("vue").Ref<null, null>;
    scrollTop: import("vue").Ref<number | null, number | null>;
    DomInfoReady: import("vue").Ref<boolean, boolean>;
    transitionDisabled: import("vue").Ref<boolean, boolean>;
    mergedClsPrefix: import("vue").Ref<string, string>;
    handleAfterEnter: () => void;
    handleScroll: () => void;
    handleClick: () => void;
    cssVars: import("vue").ComputedRef<{
        '--n-bezier': string;
        '--n-border-radius': string;
        '--n-height': string;
        '--n-width': string;
        '--n-box-shadow': string;
        '--n-box-shadow-hover': string;
        '--n-box-shadow-pressed': string;
        '--n-color': string;
        '--n-icon-size': string;
        '--n-icon-color': string;
        '--n-icon-color-hover': string;
        '--n-icon-color-pressed': string;
        '--n-text-color': string;
    }> | undefined;
    themeClass: import("vue").Ref<string, string> | undefined;
    onRender: (() => void) | undefined;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly show: {
        readonly type: PropType<boolean | undefined>;
        readonly default: undefined;
    };
    readonly right: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly bottom: {
        readonly type: PropType<string | number>;
        readonly default: 40;
    };
    readonly to: {
        readonly type: PropType<HTMLElement | string>;
        readonly default: "body";
    };
    readonly visibilityHeight: {
        readonly type: NumberConstructor;
        readonly default: 180;
    };
    readonly listenTo: PropType<string | HTMLElement | Document | (() => HTMLElement | Document)>;
    readonly 'onUpdate:show': {
        readonly type: FunctionConstructor;
        readonly default: () => void;
    };
    readonly target: PropType<() => HTMLElement>;
    readonly onShow: PropType<() => void>;
    readonly onHide: PropType<() => void>;
    readonly theme: PropType<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"BackTop", {
        color: string;
        textColor: string;
        iconColor: string;
        iconColorHover: string;
        iconColorPressed: string;
        boxShadow: string;
        boxShadowHover: string;
        boxShadowPressed: string;
        width: string;
        height: string;
        borderRadius: string;
        iconSize: string;
    }, any>>>;
}>> & Readonly<{}>, {
    readonly bottom: string | number;
    readonly right: string | number;
    readonly to: string | HTMLElement;
    readonly show: boolean | undefined;
    readonly visibilityHeight: number;
    readonly 'onUpdate:show': Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
