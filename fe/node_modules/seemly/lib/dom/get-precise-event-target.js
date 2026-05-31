"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPreciseEventTarget = getPreciseEventTarget;
function getPreciseEventTarget(event) {
    return event.composedPath()[0] || null;
}
