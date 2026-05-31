import { c } from "../../_utils/cssr/index.mjs";
import commonVariables from "../common/_common.mjs";
const {
  cubicBezierEaseIn,
  cubicBezierEaseOut
} = commonVariables;
export function fadeInScaleUpTransition({
  transformOrigin = 'inherit',
  duration = '.2s',
  enterScale = '.9',
  originalTransform = '',
  originalTransition = ''
} = {}) {
  return [c('&.fade-in-scale-up-transition-leave-active', {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseIn}, transform ${duration} ${cubicBezierEaseIn} ${originalTransition && `,${originalTransition}`}`
  }), c('&.fade-in-scale-up-transition-enter-active', {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseOut}, transform ${duration} ${cubicBezierEaseOut} ${originalTransition && `,${originalTransition}`}`
  }), c('&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to', {
    opacity: 0,
    transform: `${originalTransform} scale(${enterScale})`
  }), c('&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to', {
    opacity: 1,
    transform: `${originalTransform} scale(1)`
  })];
}