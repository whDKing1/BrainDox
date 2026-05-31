import { merge } from 'lodash-es';
export function createLocale(locale, fallbackLocale) {
  return merge({}, fallbackLocale, locale);
}