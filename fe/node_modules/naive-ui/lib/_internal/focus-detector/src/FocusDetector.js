"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    props: {
        onFocus: Function,
        onBlur: Function
    },
    setup(props) {
        return () => ((0, vue_1.h)("div", { style: "width: 0; height: 0", tabindex: 0, onFocus: props.onFocus, onBlur: props.onBlur }));
    }
});
