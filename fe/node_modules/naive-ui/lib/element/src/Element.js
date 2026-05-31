"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elementProps = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
exports.elementProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { tag: {
        type: String,
        default: 'div'
    } });
exports.default = (0, vue_1.defineComponent)({
    name: 'Element',
    alias: ['El'],
    props: exports.elementProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Element', '-element', undefined, styles_1.elementLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common } = themeRef.value;
            return Object.keys(common).reduce((prevValue, key) => {
                prevValue[`--${(0, lodash_1.kebabCase)(key)}`] = common[key];
                return prevValue;
            }, {});
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('element', undefined, cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        const { tag, mergedClsPrefix, cssVars, themeClass, onRender, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return (0, vue_1.h)(tag, {
            role: 'none',
            class: [`${mergedClsPrefix}-element`, themeClass],
            style: cssVars
        }, (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots));
    }
});
