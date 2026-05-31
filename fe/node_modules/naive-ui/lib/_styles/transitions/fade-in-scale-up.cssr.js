"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeInScaleUpTransition = fadeInScaleUpTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const {
  cubicBezierEaseIn,
  cubicBezierEaseOut
} = _common_1.default;
function fadeInScaleUpTransition({
  transformOrigin = 'inherit',
  duration = '.2s',
  enterScale = '.9',
  originalTransform = '',
  originalTransition = ''
} = {}) {
  return [(0, cssr_1.c)('&.fade-in-scale-up-transition-leave-active', {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseIn}, transform ${duration} ${cubicBezierEaseIn} ${originalTransition && `,${originalTransition}`}`
  }), (0, cssr_1.c)('&.fade-in-scale-up-transition-enter-active', {
    transformOrigin,
    transition: `opacity ${duration} ${cubicBezierEaseOut}, transform ${duration} ${cubicBezierEaseOut} ${originalTransition && `,${originalTransition}`}`
  }), (0, cssr_1.c)('&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to', {
    opacity: 0,
    transform: `${originalTransform} scale(${enterScale})`
  }), (0, cssr_1.c)('&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to', {
    opacity: 1,
    transform: `${originalTransform} scale(1)`
  })];
}