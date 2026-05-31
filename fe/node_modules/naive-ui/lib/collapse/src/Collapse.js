"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collapseInjectionKey = exports.collapseProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.collapseProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { defaultExpandedNames: {
        type: [Array, String],
        default: null
    }, expandedNames: [Array, String], arrowPlacement: {
        type: String,
        default: 'left'
    }, accordion: {
        type: Boolean,
        default: false
    }, displayDirective: {
        type: String,
        default: 'if'
    }, triggerAreas: {
        type: Array,
        default: () => ['main', 'extra', 'arrow']
    }, onItemHeaderClick: [Function, Array], 'onUpdate:expandedNames': [Function, Array], onUpdateExpandedNames: [Function, Array], 
    // deprecated
    onExpandedNamesChange: {
        type: [Function, Array],
        validator: () => {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('collapse', '`on-expanded-names-change` is deprecated, please use `on-update:expanded-names` instead.');
            }
            return true;
        },
        default: undefined
    } });
exports.collapseInjectionKey = (0, _utils_1.createInjectionKey)('n-collapse');
exports.default = (0, vue_1.defineComponent)({
    name: 'Collapse',
    props: exports.collapseProps,
    slots: Object,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const uncontrolledExpandedNamesRef = (0, vue_1.ref)(props.defaultExpandedNames);
        const controlledExpandedNamesRef = (0, vue_1.computed)(() => props.expandedNames);
        const mergedExpandedNamesRef = (0, vooks_1.useMergedState)(controlledExpandedNamesRef, uncontrolledExpandedNamesRef);
        const themeRef = (0, _mixins_1.useTheme)('Collapse', '-collapse', index_cssr_1.default, styles_1.collapseLight, props, mergedClsPrefixRef);
        function doUpdateExpandedNames(names) {
            const { 'onUpdate:expandedNames': _onUpdateExpandedNames, onUpdateExpandedNames, onExpandedNamesChange } = props;
            if (onUpdateExpandedNames) {
                (0, _utils_1.call)(onUpdateExpandedNames, names);
            }
            if (_onUpdateExpandedNames) {
                (0, _utils_1.call)(_onUpdateExpandedNames, names);
            }
            if (onExpandedNamesChange) {
                (0, _utils_1.call)(onExpandedNamesChange, names);
            }
            uncontrolledExpandedNamesRef.value = names;
        }
        function doItemHeaderClick(info) {
            const { onItemHeaderClick } = props;
            if (onItemHeaderClick) {
                (0, _utils_1.call)(onItemHeaderClick, info);
            }
        }
        function toggleItem(collapse, name, event) {
            const { accordion } = props;
            const { value: expandedNames } = mergedExpandedNamesRef;
            if (accordion) {
                if (collapse) {
                    doUpdateExpandedNames([name]);
                    doItemHeaderClick({ name, expanded: true, event });
                }
                else {
                    doUpdateExpandedNames([]);
                    doItemHeaderClick({ name, expanded: false, event });
                }
            }
            else {
                if (!Array.isArray(expandedNames)) {
                    doUpdateExpandedNames([name]);
                    doItemHeaderClick({ name, expanded: true, event });
                }
                else {
                    const activeNames = expandedNames.slice();
                    const index = activeNames.findIndex(activeName => name === activeName);
                    if (~index) {
                        activeNames.splice(index, 1);
                        doUpdateExpandedNames(activeNames);
                        doItemHeaderClick({ name, expanded: false, event });
                    }
                    else {
                        activeNames.push(name);
                        doUpdateExpandedNames(activeNames);
                        doItemHeaderClick({ name, expanded: true, event });
                    }
                }
            }
        }
        (0, vue_1.provide)(exports.collapseInjectionKey, {
            props,
            mergedClsPrefixRef,
            expandedNamesRef: mergedExpandedNamesRef,
            slots,
            toggleItem
        });
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Collapse', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self: { titleFontWeight, dividerColor, titlePadding, titleTextColor, titleTextColorDisabled, textColor, arrowColor, fontSize, titleFontSize, arrowColorDisabled, itemMargin } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-text-color': textColor,
                '--n-divider-color': dividerColor,
                '--n-title-padding': titlePadding,
                '--n-title-font-size': titleFontSize,
                '--n-title-text-color': titleTextColor,
                '--n-title-text-color-disabled': titleTextColorDisabled,
                '--n-title-font-weight': titleFontWeight,
                '--n-arrow-color': arrowColor,
                '--n-arrow-color-disabled': arrowColorDisabled,
                '--n-item-margin': itemMargin
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('collapse', undefined, cssVarsRef, props)
            : undefined;
        return {
            rtlEnabled: rtlEnabledRef,
            mergedTheme: themeRef,
            mergedClsPrefix: mergedClsPrefixRef,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a;
        (_a = this.onRender) === null || _a === void 0 ? void 0 : _a.call(this);
        return ((0, vue_1.h)("div", { class: [
                `${this.mergedClsPrefix}-collapse`,
                this.rtlEnabled && `${this.mergedClsPrefix}-collapse--rtl`,
                this.themeClass
            ], style: this.cssVars }, this.$slots));
    }
});
