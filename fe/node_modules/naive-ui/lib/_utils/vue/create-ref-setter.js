"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefSetter = createRefSetter;
function createRefSetter(ref) {
    return (inst) => {
        if (inst) {
            ref.value = inst.$el;
        }
        else {
            ref.value = null;
        }
    };
}
