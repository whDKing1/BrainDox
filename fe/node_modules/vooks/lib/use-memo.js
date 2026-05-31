"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
function useMemo(getterOrOptions) {
    const computedValueRef = (0, vue_1.computed)(getterOrOptions);
    // Maybe it's not possible to lazy evaluate the value, since we can't make
    // render phase capture the deps behind useMemo
    const valueRef = (0, vue_1.ref)(computedValueRef.value);
    (0, vue_1.watch)(computedValueRef, (value) => {
        valueRef.value = value;
    });
    if (typeof getterOrOptions === 'function') {
        return valueRef;
    }
    else {
        return {
            __v_isRef: true,
            get value() {
                return valueRef.value;
            },
            set value(v) {
                getterOrOptions.set(v);
            }
        };
    }
}
exports.default = useMemo;
