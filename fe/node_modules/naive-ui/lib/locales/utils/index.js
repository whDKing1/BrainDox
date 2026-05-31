"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocale = createLocale;
const lodash_1 = require("lodash");
function createLocale(locale, fallbackLocale) {
    return (0, lodash_1.merge)({}, fallbackLocale, locale);
}
