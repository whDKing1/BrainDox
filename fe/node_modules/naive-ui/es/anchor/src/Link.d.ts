import type { Ref, SlotsType } from 'vue';
import type { ExtractPublicPropTypes } from '../../_utils';
import type { AnchorLinkSlots } from './public-types';
export interface AnchorInjection {
    activeHref: Ref<string | null>;
    mergedClsPrefix: Ref<string>;
    updateBarPosition: (el: HTMLElement) => void;
    setActiveHref: (href: string, transition?: boolean) => void;
    collectedLinkHrefs: string[];
    titleEls: HTMLElement[];
}
export declare const anchorInjectionKey: import("vue").InjectionKey<AnchorInjection>;
export declare const anchorLinkProps: {
    readonly title: StringConstructor;
    readonly href: StringConstructor;
};
export type AnchorLinkProps = ExtractPublicPropTypes<typeof anchorLinkProps>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly href: StringConstructor;
}>, () => JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    readonly title: StringConstructor;
    readonly href: StringConstructor;
}>> & Readonly<{}>, {}, SlotsType<AnchorLinkSlots>, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
