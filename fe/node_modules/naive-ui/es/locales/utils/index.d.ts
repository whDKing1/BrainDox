import type { NLocale } from '../common/enUS';
export type NPartialLocale = {
    [key in keyof NLocale]+?: {
        [childKey in keyof NLocale[key]]+?: NLocale[key][childKey];
    };
};
export declare function createLocale(locale: NLocale): NLocale;
export declare function createLocale(locale: NPartialLocale, fallbackLocale: NLocale): NLocale;
