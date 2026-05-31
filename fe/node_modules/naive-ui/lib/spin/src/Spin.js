"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spinProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const Loading_1 = require("../../_internal/loading/src/Loading");
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
const styles_1 = require("../styles");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
const STROKE_WIDTH = {
    small: 20,
    medium: 18,
    large: 16
};
exports.spinProps = Object.assign(Object.assign(Object.assign({}, _mixins_1.useTheme.props), { contentClass: String, contentStyle: [Object, String], description: String, size: {
        type: [String, Number],
        default: 'medium'
    }, show: {
        type: Boolean,
        default: true
    }, rotate: {
        type: Boolean,
        default: true
    }, spinning: {
        type: Boolean,
        validator: () => {
            return true;
        },
        default: undefined
    }, delay: Number }), Loading_1.exposedLoadingProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'Spin',
    props: exports.spinProps,
    slots: Object,
    setup(props) {
        if (process.env.NODE_ENV !== 'production') {
            (0, vue_1.watchEffect)(() => {
                if (props.spinning !== undefined) {
                    (0, _utils_1.warnOnce)('spin', '`spinning` is deprecated, please use `show` instead.');
                }
            });
        }
        const { mergedClsPrefixRef, inlineThemeDisabled } = (0, _mixins_1.useConfig)(props);
        const themeRef = (0, _mixins_1.useTheme)('Spin', '-spin', index_cssr_1.default, styles_1.spinLight, props, mergedClsPrefixRef);
        const cssVarsRef = (0, vue_1.computed)(() => {
            const { size: spinSize } = props;
            const { common: { cubicBezierEaseInOut }, self } = themeRef.value;
            const { opacitySpinning, color, textColor } = self;
            const size = typeof spinSize === 'number'
                ? (0, seemly_1.pxfy)(spinSize)
                : self[(0, _utils_1.createKey)('size', spinSize)];
            return {
                '--n-bezier': cubicBezierEaseInOut,
                '--n-opacity-spinning': opacitySpinning,
                '--n-size': size,
                '--n-color': color,
                '--n-text-color': textColor
            };
        });
        const themeClassHandle = inlineThemeDisabled
            ? (0, _mixins_1.useThemeClass)('spin', (0, vue_1.computed)(() => {
                const { size } = props;
                return typeof size === 'number' ? String(size) : size[0];
            }), cssVarsRef, props)
            : undefined;
        const compitableShow = (0, vooks_1.useCompitable)(props, ['spinning', 'show']);
        const activeRef = (0, vue_1.ref)(false);
        (0, vue_1.watchEffect)((onCleanup) => {
            let timerId;
            if (compitableShow.value) {
                const { delay } = props;
                if (delay) {
                    timerId = window.setTimeout(() => {
                        activeRef.value = true;
                    }, delay);
                    onCleanup(() => {
                        clearTimeout(timerId);
                    });
                    return;
                }
            }
            activeRef.value = compitableShow.value;
        });
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            active: activeRef,
            mergedStrokeWidth: (0, vue_1.computed)(() => {
                const { strokeWidth } = props;
                if (strokeWidth !== undefined)
                    return strokeWidth;
                const { size } = props;
                return STROKE_WIDTH[typeof size === 'number' ? 'medium' : size];
            }),
            cssVars: inlineThemeDisabled ? undefined : cssVarsRef,
            themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
            onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
        };
    },
    render() {
        var _a, _b;
        const { $slots, mergedClsPrefix, description } = this;
        const rotate = $slots.icon && this.rotate;
        const descriptionNode = (description || $slots.description) && ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-spin-description` }, description || ((_a = $slots.description) === null || _a === void 0 ? void 0 : _a.call($slots))));
        const icon = $slots.icon ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-spin-body`, this.themeClass] },
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-spin`,
                    rotate && `${mergedClsPrefix}-spin--rotate`
                ], style: $slots.default ? '' : this.cssVars }, $slots.icon()),
            descriptionNode)) : ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-spin-body`, this.themeClass] },
            (0, vue_1.h)(_internal_1.NBaseLoading, { clsPrefix: mergedClsPrefix, style: $slots.default ? '' : this.cssVars, stroke: this.stroke, "stroke-width": this.mergedStrokeWidth, radius: this.radius, scale: this.scale, class: `${mergedClsPrefix}-spin` }),
            descriptionNode));
        (_b = this.onRender) === null || _b === void 0 ? void 0 : _b.call(this);
        return $slots.default ? ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-spin-container`, this.themeClass], style: this.cssVars },
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-spin-content`,
                    this.active && `${mergedClsPrefix}-spin-content--spinning`,
                    this.contentClass
                ], style: this.contentStyle }, $slots),
            (0, vue_1.h)(vue_1.Transition, { name: "fade-in-transition" }, {
                default: () => (this.active ? icon : null)
            }))) : (icon);
    }
});
