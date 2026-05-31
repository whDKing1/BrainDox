"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slideInFromTopTransition = slideInFromTopTransition;
const cssr_1 = require("../../_utils/cssr");
const _common_1 = __importDefault(require("../common/_common"));
const { cubicBezierEaseIn, cubicBezierEaseOut } = _common_1.default;
function slideInFromTopTransition({ duration = '0.3s', leaveDuration = '0.2s', name = 'slide-in-from-top' } = {}) {
    return [
        (0, cssr_1.c)(`&.${name}-transition-leave-active`, {
            transition: `transform ${leaveDuration} ${cubicBezierEaseIn}`
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-active`, {
            transition: `transform ${duration} ${cubicBezierEaseOut}`
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-to`, {
            transform: 'translateY(0)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-enter-from`, {
            transform: 'translateY(-100%)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-leave-from`, {
            transform: 'translateY(0)'
        }),
        (0, cssr_1.c)(`&.${name}-transition-leave-to`, {
            transform: 'translateY(-100%)'
        })
    ];
}
