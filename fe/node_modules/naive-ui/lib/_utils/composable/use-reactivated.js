"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReactivated = useReactivated;
const vue_1 = require("vue");
function useReactivated(callback) {
    const isDeactivatedRef = { isDeactivated: false };
    let activateStateInitialized = false;
    (0, vue_1.onActivated)(() => {
        isDeactivatedRef.isDeactivated = false;
        if (!activateStateInitialized) {
            activateStateInitialized = true;
            return;
        }
        callback();
    });
    (0, vue_1.onDeactivated)(() => {
        isDeactivatedRef.isDeactivated = true;
        if (!activateStateInitialized) {
            activateStateInitialized = true;
        }
    });
    return isDeactivatedRef;
}
