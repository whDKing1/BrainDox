"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.badgeProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { value: [String, Number], max: Number, dot: Boolean, type: {
        type: String,
        default: 'default'
    }, show: {
        type: Boolean,
        default: true
    }, showZero: Boolean, processing: Boolean, color: String, offset: Array });
exports.default = (0, vue_1.defineComponent)({
    name: 'Badge',
    props: exports.badgeProps,
    setup(props, { slots }) {
        const { mergedClsPrefixRef, inlineThemeDisabled, mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Badge', '-badge', index_cssr_1.default, styles_1.badgeLight, props, mergedClsPrefixRef);
        const appearedRef = (0, vue_1.ref)(false);
        const handleAfterEnter = () => {
            appearedRef.value = true;
        };
        const handleAfterLeave = () => {
            appearedRef.value = false;
        };
        const showBadgeRef = (0, vue_1.computed)(() => {
            return (props.show
                && (props.dot
                    || (props.value !== undefined
                        && !(!props.showZero && Number(props.value) <= 0))
                    || !(0, _utils_1.isSlotEmpty)(slots.value)));
        });
        (0, vue_1.onMounted)(() => {
            if (showBadgeRef.value)
                appearedRef.value = true;
        });
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Badge', mergedRtlRef, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { type, color: propColor } = props;
            const { common: { cubicBezierEaseInOut, cubicBezierEaseOut }, self: { [(0, _utils_1.createKey)('color', type)]: color, fontFamily, fontSize } } = themeRef.value;
            return {
                '--n-font-size': fontSize,
                '--n-font-family': fontFamily,
                '--n-color': propColor || color,
                '--n-ripple-color': propColor || color,
                '--n-bezier': cubicBezierEaseInOut,
                '--n-ripple-bezier': cubicBezierEaseOut
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('badge', (0, vue_1.computed)(() => {
                let hash = '';
                const { type, color } = props;
                if (type) {
                    hash += type[0];
                }
                if (color) {
                    hash += (0, _utils_1.color2Class)(color);
                }
                return hash;
            }), cssVarsRef, props)
            : undefined;
        const offsetStyleRef = (0, vue_1.computed)(() => {
            const { offset } = props;
            if (!offset)
                return undefined;
            const [x, y] = offset;
            const reslovedOffsetX = typeof x === 'number' ? `${x}px` : x;
            const reslovedOffsetY = typeof y === 'number' ? `${y}px` : y;
            return {
                transform: `translate(calc(${(rtlEnabledRef === null || rtlEnabledRef === void 0 ? void 0 : rtlEnabledRef.value) ? '50%' : '-50%'} + ${reslovedOffsetX}), ${reslovedOffsetY})`
            };
        });
        return {
            rtlEnabled: rtlEnabledRef,
            mergedClsPrefix: mergedClsPrefixRef,
            appeared: appearedRef,
            showBadge: showBadgeRef,
            handleAfterEnter,
            handleAfterLeave,
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender,
            offsetStyle: offsetStyleRef
        };
    },
    render() {
        var _a;
        const { mergedClsPrefix, onRender, themeClass, $slots } = this;
        onRender === null || onRender === void 0 ? void 0 : onRender();
        const children = (_a = $slots.default) === null || _a === void 0 ? void 0 : _a.call($slots);
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-badge`,
                this.rtlEnabled && `${mergedClsPrefix}-badge--rtl`,
                themeClass,
                {
                    [`${mergedClsPrefix}-badge--dot`]: this.dot,
                    [`${mergedClsPrefix}-badge--as-is`]: !children
                }
            ], style: this.cssVars },
            children,
            (0, vue_1.h)(vue_1.Transition, { name: "fade-in-scale-up-transition", onAfterEnter: this.handleAfterEnter, onAfterLeave: this.handleAfterLeave }, {
                default: () => this.showBadge ? ((0, vue_1.h)("sup", { class: `${mergedClsPrefix}-badge-sup`, title: (0, _utils_1.getTitleAttribute)(this.value), style: this.offsetStyle },
                    (0, _utils_1.resolveSlot)($slots.value, () => [
                        !this.dot ? ((0, vue_1.h)(_internal_1.NBaseSlotMachine, { clsPrefix: mergedClsPrefix, appeared: this.appeared, max: this.max, value: this.value })) : null
                    ]),
                    this.processing ? ((0, vue_1.h)(_internal_1.NBaseWave, { clsPrefix: mergedClsPrefix })) : null)) : null
            })));
    }
});
