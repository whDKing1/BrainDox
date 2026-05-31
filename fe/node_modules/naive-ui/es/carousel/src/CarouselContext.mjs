import { inject, provide } from 'vue';
import { createInjectionKey, throwError } from "../../_utils/index.mjs";
const carouselMethodsInjectionKey = createInjectionKey('n-carousel-methods');
export function provideCarouselContext(contextValue) {
  provide(carouselMethodsInjectionKey, contextValue);
}
export function useCarouselContext(location = 'unknown', component = 'component') {
  const CarouselContext = inject(carouselMethodsInjectionKey);
  if (!CarouselContext) {
    throwError(location, `\`${component}\` must be placed inside \`n-carousel\`.`);
  }
  return CarouselContext;
}