"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightProps = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const utils_1 = require("./utils");
exports.highlightProps = {
    highlightTag: {
        type: String,
        default: 'mark'
    },
    caseSensitive: Boolean,
    autoEscape: {
        type: Boolean,
        default: true
    },
    text: String,
    patterns: {
        type: Array,
        default: () => []
    },
    highlightClass: String,
    highlightStyle: [Object, String]
};
exports.default = (0, vue_1.defineComponent)({
    name: 'Highlight',
    props: exports.highlightProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)();
        const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const highlightedNodeRef = (0, vue_1.computed)(() => {
            const mergedClsPrefix = mergedClsPrefixRef.value;
            let children = [];
            const { patterns, text } = props;
            if (patterns.length === 0 || !text) {
                children = [text];
            }
            else {
                const { highlightTag, caseSensitive, autoEscape, highlightClass, highlightStyle } = props;
                const pattern = patterns
                    .map(word => (autoEscape ? escapeRegExp(word) : word))
                    .join('|');
                const regex = new RegExp(`(${pattern})`, caseSensitive ? 'g' : 'gi');
                const splitItems = (0, utils_1.splitAndMarkByRegex)(text, regex);
                children = splitItems.map(({ text, isMatch }) => {
                    if (isMatch) {
                        return (0, vue_1.h)(highlightTag, {
                            class: [`${mergedClsPrefix}-highlight__mark`, highlightClass],
                            style: highlightStyle
                        }, text);
                    }
                    return text;
                });
            }
            return (0, vue_1.h)('span', {
                class: `${mergedClsPrefix}-highlight`
            }, children);
        });
        return {
            highlightedNode: highlightedNodeRef,
            mergedClsPrefix: mergedClsPrefixRef
        };
    },
    render() {
        return this.highlightedNode;
    }
});
