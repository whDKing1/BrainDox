"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const utils_1 = require("./utils");
const HANDLE_SIZE = '12px';
const HANDLE_SIZE_NUM = 12;
const RADIUS = '6px';
exports.default = (0, vue_1.defineComponent)({
    name: 'AlphaSlider',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        rgba: {
            type: Array,
            default: null
        },
        alpha: {
            type: Number,
            default: 0
        },
        onUpdateAlpha: {
            type: Function,
            required: true
        },
        onComplete: Function
    },
    setup(props) {
        const railRef = (0, vue_1.ref)(null);
        function handleMouseDown(e) {
            if (!railRef.value || !props.rgba)
                return;
            (0, evtd_1.on)('mousemove', document, handleMouseMove);
            (0, evtd_1.on)('mouseup', document, handleMouseUp);
            handleMouseMove(e);
        }
        function handleMouseMove(e) {
            const { value: railEl } = railRef;
            if (!railEl)
                return;
            const { width, left } = railEl.getBoundingClientRect();
            const newAlpha = (e.clientX - left) / (width - HANDLE_SIZE_NUM);
            props.onUpdateAlpha((0, utils_1.normalizeAlpha)(newAlpha));
        }
        function handleMouseUp() {
            var _a;
            (0, evtd_1.off)('mousemove', document, handleMouseMove);
            (0, evtd_1.off)('mouseup', document, handleMouseUp);
            (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        return {
            railRef,
            railBackgroundImage: (0, vue_1.computed)(() => {
                const { rgba } = props;
                if (!rgba)
                    return '';
                return `linear-gradient(to right, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 0) 0%, rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, 1) 100%)`;
            }),
            handleMouseDown
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-slider`, ref: "railRef", style: {
                height: HANDLE_SIZE,
                borderRadius: RADIUS
            }, onMousedown: this.handleMouseDown },
            (0, vue_1.h)("div", { style: {
                    borderRadius: RADIUS,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    overflow: 'hidden'
                } },
                (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-checkboard` }),
                (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-slider__image`, style: {
                        backgroundImage: this.railBackgroundImage
                    } })),
            this.rgba && ((0, vue_1.h)("div", { style: {
                    position: 'absolute',
                    left: RADIUS,
                    right: RADIUS,
                    top: 0,
                    bottom: 0
                } },
                (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle`, style: {
                        left: `calc(${this.alpha * 100}% - ${RADIUS})`,
                        borderRadius: RADIUS,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE
                    } },
                    (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle__fill`, style: {
                            backgroundColor: (0, seemly_1.toRgbaString)(this.rgba),
                            borderRadius: RADIUS,
                            width: HANDLE_SIZE,
                            height: HANDLE_SIZE
                        } }))))));
    }
});
