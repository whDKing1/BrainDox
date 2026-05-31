"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.codeProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { language: String, code: {
        type: String,
        default: ''
    }, trim: {
        type: Boolean,
        default: true
    }, hljs: Object, uri: Boolean, inline: Boolean, wordWrap: Boolean, showLineNumbers: Boolean, 
    // In n-log, we only need to mount code's style for highlight
    internalFontSize: Number, internalNoHighlight: Boolean });
exports.default = (0, vue_1.defineComponent)({
    name: 'Code',
    props: exports.codeProps,
    setup(props, { slots }) {
        const { internalNoHighlight } = props;
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)();
        const codeRef = (0, vue_1.ref)(null);
        const hljsRef = internalNoHighlight ? { value: undefined } : (0, _mixins_1.useHljs)(props);
        const createCodeHtml = (language, code, trim) => {
            const { value: hljs } = hljsRef;
            if (!hljs) {
                return null;
            }
            if (!(language && hljs.getLanguage(language))) {
                return null;
            }
            return hljs.highlight(trim ? code.trim() : code, {
                language
            }).value;
        };
        const mergedShowLineNumbersRef = (0, vue_1.computed)(() => {
            if (props.inline || props.wordWrap)
                return false;
            return props.showLineNumbers;
        });
        const setCode = () => {
            if (slots.default)
                return;
            const { value: codeEl } = codeRef;
            if (!codeEl)
                return;
            const { language } = props;
            const code = props.uri
                ? window.decodeURIComponent(props.code)
                : props.code;
            if (language) {
                const html = createCodeHtml(language, code, props.trim);
                if (html !== null) {
                    if (props.inline) {
                        codeEl.innerHTML = html;
                    }
                    else {
                        const prevPreEl = codeEl.querySelector('.__code__');
                        if (prevPreEl)
                            codeEl.removeChild(prevPreEl);
                        const preEl = document.createElement('pre');
                        preEl.className = '__code__';
                        preEl.innerHTML = html;
                        codeEl.appendChild(preEl);
                    }
                    return;
                }
            }
            if (props.inline) {
                codeEl.textContent = code;
                return;
            }
            const maybePreEl = codeEl.querySelector('.__code__');
            if (maybePreEl) {
                maybePreEl.textContent = code;
            }
            else {
                const wrap = document.createElement('pre');
                wrap.className = '__code__';
                wrap.textContent = code;
                codeEl.innerHTML = '';
                codeEl.appendChild(wrap);
            }
        };
        (0, vue_1.onMounted)(setCode);
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'language'), setCode);
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'code'), setCode);
        if (!internalNoHighlight)
            (0, vue_1.watch)(hljsRef, setCode);
        const themeRef = (0, _mixins_1.useTheme)('Code', '-code', index_cssr_1.default, styles_1.codeLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut, fontFamilyMono }, self: { textColor, fontSize, fontWeightStrong, lineNumberTextColor, 
            // extracted from hljs atom-one-light.scss
            'mono-3': $1, 'hue-1': $2, 'hue-2': $3, 'hue-3': $4, 'hue-4': $5, 'hue-5': $6, 'hue-5-2': $7, 'hue-6': $8, 'hue-6-2': $9 } } = themeRef.value;
            const { internalFontSize } = props;
            return {
                '--n-font-size': internalFontSize ? `${internalFontSize}px` : fontSize,
                '--n-font-family': fontFamilyMono,
                '--n-font-weight-strong': fontWeightStrong,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-text-color': textColor,
                '--n-mono-3': $1,
                '--n-hue-1': $2,
                '--n-hue-2': $3,
                '--n-hue-3': $4,
                '--n-hue-4': $5,
                '--n-hue-5': $6,
                '--n-hue-5-2': $7,
                '--n-hue-6': $8,
                '--n-hue-6-2': $9,
                '--n-line-number-text-color': lineNumberTextColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('code', (0, vue_1.computed)(() => {
                return `${props.internalFontSize || 'a'}`;
            }), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            codeRef,
            mergedShowLineNumbers: mergedShowLineNumbersRef,
            lineNumbers: (0, vue_1.computed)(() => {
                let number = 1;
                const numbers = [];
                let lastIsLineWrap = false;
                for (const char of props.code) {
                    if (char === '\n') {
                        lastIsLineWrap = true;
                        numbers.push(number++);
                    }
                    else {
                        lastIsLineWrap = false;
                    }
                }
                if (!lastIsLineWrap) {
                    numbers.push(number++);
                }
                return numbers.join('\n');
            }),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a, _b;
        const { mergedClsPrefix, wordWrap, mergedShowLineNumbers, onRender } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("code", { class: [
                `${mergedClsPrefix}-code`,
                this.themeClass,
                wordWrap && `${mergedClsPrefix}-code--word-wrap`,
                mergedShowLineNumbers && `${mergedClsPrefix}-code--show-line-numbers`
            ], style: this.cssVars, ref: "codeRef" },
            mergedShowLineNumbers ? ((0, vue_1.h)("pre", { class: `${mergedClsPrefix}-code__line-numbers` }, this.lineNumbers)) : null, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 :
            _b.call(_a)));
    }
});
