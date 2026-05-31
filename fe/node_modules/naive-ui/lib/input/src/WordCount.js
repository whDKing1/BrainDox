"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
const utils_1 = require("./utils");
exports.default = (0, vue_1.defineComponent)({
    name: 'InputWordCount',
    setup(_, { slots }) {
        const { mergedValueRef, maxlengthRef, mergedClsPrefixRef, countGraphemesRef } = (0, vue_1.inject)(interface_1.inputInjectionKey);
        const wordCountRef = (0, vue_1.computed)(() => {
            const { value: mergedValue } = mergedValueRef;
            if (mergedValue === null || Array.isArray(mergedValue))
                return 0;
            return (countGraphemesRef.value || utils_1.len)(mergedValue);
        });
        return () => {
            const { value: maxlength } = maxlengthRef;
            const { value: mergedValue } = mergedValueRef;
            return ((0, vue_1.h)("span", { class: `${mergedClsPrefixRef.value}-input-word-count` }, (0, _utils_1.resolveSlotWithTypedProps)(slots.default, {
                value: mergedValue === null || Array.isArray(mergedValue)
                    ? ''
                    : mergedValue
            }, () => [
                maxlength === undefined
                    ? wordCountRef.value
                    : `${wordCountRef.value} / ${maxlength}`
            ])));
        };
    }
});
