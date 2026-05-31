"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markEventEffectPerformed = markEventEffectPerformed;
exports.eventEffectNotPerformed = eventEffectNotPerformed;
const eventSet = new WeakSet();
function markEventEffectPerformed(event) {
    eventSet.add(event);
}
function eventEffectNotPerformed(event) {
    return !eventSet.has(event);
}
