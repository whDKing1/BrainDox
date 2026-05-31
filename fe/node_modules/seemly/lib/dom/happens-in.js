"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.happensIn = happensIn;
function happensIn(e, dataSetPropName) {
    let { target } = e;
    while (target) {
        if (target.dataset) {
            if (target.dataset[dataSetPropName] !== undefined)
                return true;
        }
        target = target.parentElement;
    }
    return false;
}
