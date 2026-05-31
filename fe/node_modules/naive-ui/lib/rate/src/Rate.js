"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateProps = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const StarIcon_1 = __importDefault(require("./StarIcon"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.rateProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { allowHalf: Boolean, count: {
        type: Number,
        default: 5
    }, value: Number, defaultValue: {
        type: Number,
        default: null
    }, readonly: Boolean, size: [String, Number], clearable: Boolean, color: String, onClear: Function, 'onUpdate:value': [Function, Array], onUpdateValue: [Function, Array] });
exports.default = (0, vue_1.defineComponent)({
    name: 'Rate',
    props: exports.rateProps,
    setup(props) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedComponentPropsRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Rate', '-rate', index_cssr_1.default, styles_1.rateLight, props, mergedClsPrefixRef);
        const controlledValueRef = (0, vue_1.toRef)(props, 'value');
        const uncontrolledValueRef = (0, vue_1.ref)(props.defaultValue);
        const hoverIndexRef = (0, vue_1.ref)(null);
        const formItem = (0, _mixins_1.useFormItem)(props, {
            mergedSize(NFormItem) {
                var _a, _b;
                if (props.size !== undefined)
                    return props.size;
                if (NFormItem) {
                    return NFormItem.mergedSize.value;
                }
                const configSize = (_b = (_a = mergedComponentPropsRef === null || mergedComponentPropsRef === void 0 ? void 0 : mergedComponentPropsRef.value) === null || _a === void 0 ? void 0 : _a.Rate) === null || _b === void 0 ? void 0 : _b.size;
                if (configSize !== undefined)
                    return configSize;
                return 'medium';
            }
        });
        const mergedValue = (0, vooks_1.useMergedState)(controlledValueRef, uncontrolledValueRef);
        function doUpdateValue(value) {
            const { 'onUpdate:value': _onUpdateValue, onUpdateValue } = props;
            const { nTriggerFormChange, nTriggerFormInput } = formItem;
            if (_onUpdateValue) {
                (0, _utils_1.call)(_onUpdateValue, value);
            }
            if (onUpdateValue) {
                (0, _utils_1.call)(onUpdateValue, value);
            }
            uncontrolledValueRef.value = value;
            nTriggerFormChange();
            nTriggerFormInput();
        }
        function getDerivedValue(index, e) {
            if (props.allowHalf) {
                if (e.offsetX
                    >= Math.floor(e.currentTarget.offsetWidth / 2)) {
                    return index + 1;
                }
                else {
                    return index + 0.5;
                }
            }
            else {
                return index + 1;
            }
        }
        let cleared = false;
        function handleMouseMove(index, e) {
            if (cleared)
                return;
            hoverIndexRef.value = getDerivedValue(index, e);
        }
        function handleMouseLeave() {
            hoverIndexRef.value = null;
        }
        function handleClick(index, e) {
            var _a;
            const { clearable } = props;
            const derivedValue = getDerivedValue(index, e);
            if (clearable && derivedValue === mergedValue.value) {
                cleared = true;
                (_a = props.onClear) === null || _a === void 0 ? void 0 : _a.call(props);
                hoverIndexRef.value = null;
                doUpdateValue(null);
            }
            else {
                doUpdateValue(derivedValue);
            }
        }
        function handleMouseEnterSomeStar() {
            cleared = false;
        }
        const { mergedSizeRef: _mergedSizeRef } = formItem;
        const mergedSizeRef = (0, vue_1.computed)(() => {
            const size = _mergedSizeRef.value;
            const { self } = themeRef.value;
            if (typeof size === 'number') {
                return `${size}px`;
            }
            else {
                return self[(0, _utils_1.createKey)('size', size)];
            }
        });
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { itemColor, itemColorActive } = self;
            const { color } = props;
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-item-color': itemColor,
                '--n-item-color-active': color || itemColorActive,
                '--n-item-size': mergedSizeRef.value
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('rate', (0, vue_1.computed)(() => {
                const size = mergedSizeRef.value;
                const { color } = props;
                let hash = '';
                if (size) {
                    hash += size[0];
                }
                if (color) {
                    hash += (0, _utils_1.color2Class)(color);
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            mergedValue,
            hoverIndex: hoverIndexRef,
            handleMouseMove,
            handleClick,
            handleMouseLeave,
            handleMouseEnterSomeStar,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        const { readonly, hoverIndex, mergedValue, mergedClsPrefix, onRender, $slots: { default: defaultSlot } } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-rate`,
                {
                    [`${mergedClsPrefix}-rate--readonly`]: readonly
                },
                this.themeClass
            ], style: this.cssVars, onMouseleave: this.handleMouseLeave }, (0, vue_1.renderList)(this.count, (_, index) => {
            const icon = defaultSlot ? (defaultSlot({ index })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, { default: StarIcon_1.default }));
            const entireStarActive = hoverIndex !== null
                ? index + 1 <= hoverIndex
                : index + 1 <= (mergedValue || 0);
            return ((0, vue_1.h)("div", { key: index, class: [
                    `${mergedClsPrefix}-rate__item`,
                    entireStarActive && `${mergedClsPrefix}-rate__item--active`
                ], onClick: readonly
                    ? undefined
                    : (e) => {
                        this.handleClick(index, e);
                    }, onMouseenter: this.handleMouseEnterSomeStar, onMousemove: readonly
                    ? undefined
                    : (e) => {
                        this.handleMouseMove(index, e);
                    } },
                icon,
                this.allowHalf ? ((0, vue_1.h)("div", { class: [
                        `${mergedClsPrefix}-rate__half`,
                        {
                            [`${mergedClsPrefix}-rate__half--active`]: !entireStarActive && hoverIndex !== null
                                ? index + 0.5 <= hoverIndex
                                : index + 0.5 <= (mergedValue || 0)
                        }
                    ] }, icon)) : null));
        })));
    }
});
