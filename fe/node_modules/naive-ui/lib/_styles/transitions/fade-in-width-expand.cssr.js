"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeInWidthExpandTransition = fadeInWidthExpandTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const {
  cubicBezierEaseInOut
} = _common_1.default;
function fadeInWidthExpandTransition({
  duration = '.2s',
  delay = '.1s'
} = {}) {
  return [(0, cssr_1.c)('&.fade-in-width-expand-transition-leave-from, &.fade-in-width-expand-transition-enter-to', {
    opacity: 1
  }), (0, cssr_1.c)('&.fade-in-width-expand-transition-leave-to, &.fade-in-width-expand-transition-enter-from', `
 opacity: 0!important;
 margin-left: 0!important;
 margin-right: 0!important;
 `), (0, cssr_1.c)('&.fade-in-width-expand-transition-leave-active', `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut},
 max-width ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-left ${duration} ${cubicBezierEaseInOut} ${delay},
 margin-right ${duration} ${cubicBezierEaseInOut} ${delay};
 `), (0, cssr_1.c)('&.fade-in-width-expand-transition-enter-active', `
 overflow: hidden;
 transition:
 opacity ${duration} ${cubicBezierEaseInOut} ${delay},
 max-width ${duration} ${cubicBezierEaseInOut},
 margin-left ${duration} ${cubicBezierEaseInOut},
 margin-right ${duration} ${cubicBezierEaseInOut};
 `)];
}