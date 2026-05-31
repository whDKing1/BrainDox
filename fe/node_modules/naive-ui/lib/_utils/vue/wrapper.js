"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wrapper = void 0;
const vue_1 = require("vue");
exports.Wrapper = (0, vue_1.defineComponent)({
    render() {
        var _a, _b;
        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
});
