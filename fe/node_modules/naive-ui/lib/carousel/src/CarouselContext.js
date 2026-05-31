"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideCarouselContext = provideCarouselContext;
exports.useCarouselContext = useCarouselContext;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const carouselMethodsInjectionKey = (0, _utils_1.createInjectionKey)('n-carousel-methods');
function provideCarouselContext(contextValue) {
    (0, vue_1.provide)(carouselMethodsInjectionKey, contextValue);
}
function useCarouselContext(location = 'unknown', component = 'component') {
    const CarouselContext = (0, vue_1.inject)(carouselMethodsInjectionKey);
    if (!CarouselContext) {
        (0, _utils_1.throwError)(location, `\`${component}\` must be placed inside \`n-carousel\`.`);
    }
    return CarouselContext;
}
