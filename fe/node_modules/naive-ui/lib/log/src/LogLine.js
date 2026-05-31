"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const context_1 = require("./context");
exports.default = (0, vue_1.defineComponent)({
    props: {
        line: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const { trimRef, highlightRef, languageRef, mergedHljsRef } = (0, vue_1.inject)(context_1.logInjectionKey);
        const selfRef = (0, vue_1.ref)(null);
        const maybeTrimmedLinesRef = (0, vue_1.computed)(() => {
            return trimRef.value ? props.line.trim() : props.line;
        });
        function setInnerHTML() {
            if (selfRef.value) {
                selfRef.value.innerHTML = generateCodeHTML(languageRef.value, maybeTrimmedLinesRef.value);
            }
        }
        function generateCodeHTML(language, code) {
            const { value: hljs } = mergedHljsRef;
            if (hljs) {
                if (language && hljs.getLanguage(language)) {
                    return hljs.highlight(code, { language }).value;
                }
            }
            return code;
        }
        (0, vue_1.onMounted)(() => {
            if (highlightRef.value) {
                setInnerHTML();
            }
        });
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'line'), () => {
            if (highlightRef.value) {
                setInnerHTML();
            }
        });
        return {
            highlight: highlightRef,
            selfRef,
            maybeTrimmedLines: maybeTrimmedLinesRef
        };
    },
    render() {
        const { highlight, maybeTrimmedLines } = this;
        return (0, vue_1.h)("pre", { ref: "selfRef" }, highlight ? null : maybeTrimmedLines);
    }
});
