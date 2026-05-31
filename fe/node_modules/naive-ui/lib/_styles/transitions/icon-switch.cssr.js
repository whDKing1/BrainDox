"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconSwitchTransition = iconSwitchTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const {
  cubicBezierEaseInOut
} = _common_1.default;
function iconSwitchTransition({
  originalTransform = '',
  left = 0,
  top = 0,
  transition = `all .3s ${cubicBezierEaseInOut} !important`
} = {}) {
  return [(0, cssr_1.c)('&.icon-switch-transition-enter-from, &.icon-switch-transition-leave-to', {
    transform: `${originalTransform} scale(0.75)`,
    left,
    top,
    opacity: 0
  }), (0, cssr_1.c)('&.icon-switch-transition-enter-to, &.icon-switch-transition-leave-from', {
    transform: `scale(1) ${originalTransform}`,
    left,
    top,
    opacity: 1
  }), (0, cssr_1.c)('&.icon-switch-transition-enter-active, &.icon-switch-transition-leave-active', {
    transformOrigin: 'center',
    position: 'absolute',
    left,
    top,
    transition
  })];
}