"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeUpWidthExpandTransition = fadeUpWidthExpandTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const {
  cubicBezierEaseOut
} = _common_1.default;
function fadeUpWidthExpandTransition({
  duration = '.2s'
} = {}) {
  return [(0, cssr_1.c)('&.fade-up-width-expand-transition-leave-active', {
    transition: `
 opacity ${duration} ${cubicBezierEaseOut},
 max-width ${duration} ${cubicBezierEaseOut},
 transform ${duration} ${cubicBezierEaseOut}
 `
  }), (0, cssr_1.c)('&.fade-up-width-expand-transition-enter-active', {
    transition: `
 opacity ${duration} ${cubicBezierEaseOut},
 max-width ${duration} ${cubicBezierEaseOut},
 transform ${duration} ${cubicBezierEaseOut}
 `
  }), (0, cssr_1.c)('&.fade-up-width-expand-transition-enter-to', {
    opacity: 1,
    transform: 'translateX(0) translateY(0)'
  }), (0, cssr_1.c)('&.fade-up-width-expand-transition-enter-from', {
    maxWidth: '0 !important',
    opacity: 0,
    transform: 'translateY(60%)'
  }), (0, cssr_1.c)('&.fade-up-width-expand-transition-leave-from', {
    opacity: 1,
    transform: 'translateY(0)'
  }), (0, cssr_1.c)('&.fade-up-width-expand-transition-leave-to', {
    maxWidth: '0 !important',
    opacity: 0,
    transform: 'translateY(60%)'
  })];
}