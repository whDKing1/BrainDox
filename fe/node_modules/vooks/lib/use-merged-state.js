"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function useMergedState(controlledStateRef, uncontrolledStateRef) {
    (0, vue_1.watch)(controlledStateRef, value => {
        if (value !== undefined) {
            uncontrolledStateRef.value = value;
        }
    });
    return (0, vue_1.computed)(() => {
        if (controlledStateRef.value === undefined) {
            return uncontrolledStateRef.value;
        }
        return controlledStateRef.value;
    });
}
exports.default = useMergedState;
