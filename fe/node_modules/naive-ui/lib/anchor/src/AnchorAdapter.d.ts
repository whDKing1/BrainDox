import type { ExtractPublicPropTypes } from '../../_utils';
export interface AnchorInst {
    scrollTo: (href: string) => void;
}
export declare const anchorProps: {
    readonly type: {
        readonly type: import("vue").PropType<"block" | "rail">;
        readonly default: "rail";
    };
    readonly showRail: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showBackground: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly bound: {
        readonly type: NumberConstructor;
        readonly default: 12;
    };
    readonly internalScrollable: BooleanConstructor;
    readonly ignoreGap: BooleanConstructor;
    readonly offsetTarget: import("vue").PropType<string | import("./utils").OffsetTarget | (() => HTMLElement)>;
    readonly listenTo: import("vue").PropType<string | import("../../affix/src/utils").ScrollTarget | (() => HTMLElement) | undefined>;
    readonly top: NumberConstructor;
    readonly bottom: NumberConstructor;
    readonly triggerTop: NumberConstructor;
    readonly triggerBottom: NumberConstructor;
    readonly position: {
        readonly type: import("vue").PropType<"fixed" | "absolute">;
        readonly default: "fixed";
    };
    readonly offsetTop: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly offsetBottom: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly target: {
        readonly type: import("vue").PropType<(() => HTMLElement) | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly affix: BooleanConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
};
export type AnchorProps = ExtractPublicPropTypes<typeof anchorProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly type: {
        readonly type: import("vue").PropType<"block" | "rail">;
        readonly default: "rail";
    };
    readonly showRail: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showBackground: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly bound: {
        readonly type: NumberConstructor;
        readonly default: 12;
    };
    readonly internalScrollable: BooleanConstructor;
    readonly ignoreGap: BooleanConstructor;
    readonly offsetTarget: import("vue").PropType<string | import("./utils").OffsetTarget | (() => HTMLElement)>;
    readonly listenTo: import("vue").PropType<string | import("../../affix/src/utils").ScrollTarget | (() => HTMLElement) | undefined>;
    readonly top: NumberConstructor;
    readonly bottom: NumberConstructor;
    readonly triggerTop: NumberConstructor;
    readonly triggerBottom: NumberConstructor;
    readonly position: {
        readonly type: import("vue").PropType<"fixed" | "absolute">;
        readonly default: "fixed";
    };
    readonly offsetTop: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly offsetBottom: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly target: {
        readonly type: import("vue").PropType<(() => HTMLElement) | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly affix: BooleanConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
}>, {
    scrollTo(href: string): void;
    renderAnchor: () => JSX.Element;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly type: {
        readonly type: import("vue").PropType<"block" | "rail">;
        readonly default: "rail";
    };
    readonly showRail: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly showBackground: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly bound: {
        readonly type: NumberConstructor;
        readonly default: 12;
    };
    readonly internalScrollable: BooleanConstructor;
    readonly ignoreGap: BooleanConstructor;
    readonly offsetTarget: import("vue").PropType<string | import("./utils").OffsetTarget | (() => HTMLElement)>;
    readonly listenTo: import("vue").PropType<string | import("../../affix/src/utils").ScrollTarget | (() => HTMLElement) | undefined>;
    readonly top: NumberConstructor;
    readonly bottom: NumberConstructor;
    readonly triggerTop: NumberConstructor;
    readonly triggerBottom: NumberConstructor;
    readonly position: {
        readonly type: import("vue").PropType<"fixed" | "absolute">;
        readonly default: "fixed";
    };
    readonly offsetTop: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly offsetBottom: {
        readonly type: import("vue").PropType<number | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly target: {
        readonly type: import("vue").PropType<(() => HTMLElement) | undefined>;
        readonly validator: () => boolean;
        readonly default: undefined;
    };
    readonly affix: BooleanConstructor;
    readonly theme: import("vue").PropType<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>;
    readonly themeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
    readonly builtinThemeOverrides: import("vue").PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Anchor", {
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
    }, any>>>;
}>> & Readonly<{}>, {
    readonly type: "block" | "rail";
    readonly position: "fixed" | "absolute";
    readonly offsetTop: number | undefined;
    readonly offsetBottom: number | undefined;
    readonly target: (() => HTMLElement) | undefined;
    readonly showRail: boolean;
    readonly showBackground: boolean;
    readonly bound: number;
    readonly internalScrollable: boolean;
    readonly ignoreGap: boolean;
    readonly affix: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
