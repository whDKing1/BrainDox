"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NInjectionExtractor = void 0;
const vue_1 = require("vue");
exports.NInjectionExtractor = (0, vue_1.defineComponent)({
    name: 'InjectionExtractor',
    props: {
        onSetup: Function
    },
    setup(props, { slots }) {
        var _a;
        (_a = props.onSetup) === null || _a === void 0 ? void 0 : _a.call(props);
        return () => { var _a; return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots); };
    }
});
