"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberAnimationProps = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const utils_1 = require("./utils");
exports.numberAnimationProps = {
    to: {
        type: Number,
        default: 0
    },
    precision: {
        type: Number,
        default: 0
    },
    showSeparator: Boolean,
    locale: String,
    from: { type: Number, default: 0 },
    active: {
        type: Boolean,
        default: true
    },
    duration: {
        type: Number,
        default: 2000
    },
    onFinish: Function
};
exports.default = (0, vue_1.defineComponent)({
    name: 'NumberAnimation',
    props: exports.numberAnimationProps,
    setup(props) {
        const { localeRef } = (0, _mixins_1.useLocale)('name');
        const { duration } = props;
        const displayedValueRef = (0, vue_1.ref)(props.from);
        const mergedLocaleRef = (0, vue_1.computed)(() => {
            const { locale } = props;
            if (locale !== undefined)
                return locale;
            return localeRef.value;
        });
        let animating = false;
        const onUpdate = (currentValue) => {
            displayedValueRef.value = currentValue;
        };
        const onFinish = () => {
            var _a;
            displayedValueRef.value = props.to;
            animating = false;
            (_a = props.onFinish) === null || _a === void 0 ? void 0 : _a.call(props);
        };
        const animate = (from = props.from, to = props.to) => {
            animating = true;
            displayedValueRef.value = props.from;
            if (from !== to) {
                (0, utils_1.tween)({
                    from,
                    to,
                    duration,
                    onUpdate,
                    onFinish
                });
            }
        };
        const formattedValueRef = (0, vue_1.computed)(() => {
            var _a;
            const formatted = (0, lodash_1.round)(displayedValueRef.value, props.precision).toFixed(props.precision);
            const splitValue = formatted.split('.');
            const numberFormatter = new Intl.NumberFormat(mergedLocaleRef.value);
            const decimalSeparator = (_a = numberFormatter
                .formatToParts(0.5)
                .find(part => part.type === 'decimal')) === null || _a === void 0 ? void 0 : _a.value;
            const integer = props.showSeparator
                ? numberFormatter.format(Number(splitValue[0]))
                : splitValue[0];
            const decimal = splitValue[1];
            return {
                integer,
                decimal,
                decimalSeparator
            };
        });
        function play() {
            if (animating)
                return;
            animate();
        }
        (0, vue_1.onMounted)(() => {
            (0, vue_1.watchEffect)(() => {
                if (props.active)
                    animate();
            });
        });
        const exposedMethods = { play };
        return Object.assign({ formattedValue: formattedValueRef }, exposedMethods);
    },
    render() {
        const { formattedValue: { integer, decimal, decimalSeparator } } = this;
        return [integer, decimal ? decimalSeparator : null, decimal];
    }
});
