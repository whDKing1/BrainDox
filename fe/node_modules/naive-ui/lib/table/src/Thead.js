"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'Thead',
    render() {
        return (0, vue_1.h)("thead", null, this.$slots);
    }
});
