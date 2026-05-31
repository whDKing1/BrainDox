import type { PropType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
export declare const watermarkProps: {
    readonly debug: BooleanConstructor;
    readonly cross: BooleanConstructor;
    readonly fullscreen: BooleanConstructor;
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly xGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly textAlign: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly image: StringConstructor;
    readonly imageOpacity: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly imageHeight: NumberConstructor;
    readonly imageWidth: NumberConstructor;
    readonly content: StringConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly fontFamily: StringConstructor;
    readonly fontStyle: {
        readonly type: PropType<"normal" | "italic" | "oblique" | `oblique ${number}deg`>;
        readonly default: "normal";
    };
    readonly fontVariant: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fontWeight: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly fontColor: {
        readonly type: StringConstructor;
        readonly default: "rgba(128, 128, 128, .3)";
    };
    readonly fontStretch: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
};
export type WatermarkProps = ExtractPublicPropTypes<typeof watermarkProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly debug: BooleanConstructor;
    readonly cross: BooleanConstructor;
    readonly fullscreen: BooleanConstructor;
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly xGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly textAlign: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly image: StringConstructor;
    readonly imageOpacity: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly imageHeight: NumberConstructor;
    readonly imageWidth: NumberConstructor;
    readonly content: StringConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly fontFamily: StringConstructor;
    readonly fontStyle: {
        readonly type: PropType<"normal" | "italic" | "oblique" | `oblique ${number}deg`>;
        readonly default: "normal";
    };
    readonly fontVariant: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fontWeight: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly fontColor: {
        readonly type: StringConstructor;
        readonly default: "rgba(128, 128, 128, .3)";
    };
    readonly fontStretch: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly debug: BooleanConstructor;
    readonly cross: BooleanConstructor;
    readonly fullscreen: BooleanConstructor;
    readonly width: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly height: {
        readonly type: NumberConstructor;
        readonly default: 32;
    };
    readonly zIndex: {
        readonly type: NumberConstructor;
        readonly default: 10;
    };
    readonly xGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yGap: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly yOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly xOffset: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly rotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly textAlign: {
        readonly type: PropType<"left" | "center" | "right">;
        readonly default: "left";
    };
    readonly image: StringConstructor;
    readonly imageOpacity: {
        readonly type: NumberConstructor;
        readonly default: 1;
    };
    readonly imageHeight: NumberConstructor;
    readonly imageWidth: NumberConstructor;
    readonly content: StringConstructor;
    readonly selectable: {
        readonly type: BooleanConstructor;
        readonly default: true;
    };
    readonly fontSize: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly fontFamily: StringConstructor;
    readonly fontStyle: {
        readonly type: PropType<"normal" | "italic" | "oblique" | `oblique ${number}deg`>;
        readonly default: "normal";
    };
    readonly fontVariant: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly fontWeight: {
        readonly type: NumberConstructor;
        readonly default: 400;
    };
    readonly fontColor: {
        readonly type: StringConstructor;
        readonly default: "rgba(128, 128, 128, .3)";
    };
    readonly fontStretch: {
        readonly type: StringConstructor;
        readonly default: "";
    };
    readonly lineHeight: {
        readonly type: NumberConstructor;
        readonly default: 14;
    };
    readonly globalRotate: {
        readonly type: NumberConstructor;
        readonly default: 0;
    };
    readonly theme: PropType<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>;
    readonly themeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
    readonly builtinThemeOverrides: PropType<import("../../_mixins/use-theme").ExtractThemeOverrides<import("../../_mixins").Theme<"Watermark", {
        fontFamily: string;
    }, unknown>>>;
}>> & Readonly<{}>, {
    readonly fontSize: number;
    readonly fontWeight: number;
    readonly lineHeight: number;
    readonly height: number;
    readonly width: number;
    readonly zIndex: number;
    readonly fontStyle: "normal" | "italic" | "oblique" | `oblique ${number}deg`;
    readonly fontVariant: string;
    readonly textAlign: "left" | "right" | "center";
    readonly rotate: number;
    readonly fontStretch: string;
    readonly xGap: number;
    readonly yGap: number;
    readonly selectable: boolean;
    readonly debug: boolean;
    readonly cross: boolean;
    readonly fullscreen: boolean;
    readonly yOffset: number;
    readonly xOffset: number;
    readonly imageOpacity: number;
    readonly fontColor: string;
    readonly globalRotate: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
