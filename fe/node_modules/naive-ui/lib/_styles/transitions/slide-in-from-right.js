"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideInFromRightTransition = slideInFromRightTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const { cubicBezierEaseIn, cubicBezierEaseOut } = _common_1.default;
function slideInFromRightTransition({ duration = '0.3s', leaveDuration = '0.2s', name = 'slide-in-from-right' } = {}) {
    return [
        (0, cssr_1.c)(`&.${name}-transition-leave-active`, {
            transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-active`, {
            transition: `transform ${duration} ${cubicBezierEaseOut}`
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-to`, {
            transform: 'translateX(0)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-from`, {
            transform: 'translateX(100%)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-leave-from`, {
            transform: 'translateX(0)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-leave-to`, {
            transform: 'translateX(100%)'
        })
    ];
}
