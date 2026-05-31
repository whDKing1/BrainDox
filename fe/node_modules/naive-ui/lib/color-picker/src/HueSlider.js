"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const vue_1 = require("vue");
const utils_1 = require("./utils");
const HANDLE_SIZE = '12px';
const HANDLE_SIZE_NUM = 12;
const RADIUS = '6px';
const RADIUS_NUM = 6;
const GRADIENT = 'linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)';
exports.default = (0, vue_1.defineComponent)({
    name: 'HueSlider',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        hue: {
            type: Number,
            required: true
        },
        onUpdateHue: {
            type: Function,
            required: true
        },
        onComplete: Function
    },
    setup(props) {
        const railRef = (0, vue_1.ref)(null);
        function handleMouseDown(e) {
            if (!railRef.value)
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
            const newHue = (0, utils_1.normalizeHue)(((e.clientX - left - RADIUS_NUM) / (width - HANDLE_SIZE_NUM)) * 360);
            props.onUpdateHue(newHue);
        }
        function handleMouseUp() {
            var _a;
            (0, evtd_1.off)('mousemove', document, handleMouseMove);
            (0, evtd_1.off)('mouseup', document, handleMouseUp);
            (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        return {
            railRef,
            handleMouseDown
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-slider`, style: {
                height: HANDLE_SIZE,
                borderRadius: RADIUS
            } },
            (0, vue_1.h)("div", { ref: "railRef", style: {
                    boxShadow: 'inset 0 0 2px 0 rgba(0, 0, 0, .24)',
                    boxSizing: 'border-box',
                    backgroundImage: GRADIENT,
                    height: HANDLE_SIZE,
                    borderRadius: RADIUS,
                    position: 'relative'
                }, onMousedown: this.handleMouseDown },
                (0, vue_1.h)("div", { style: {
                        position: 'absolute',
                        left: RADIUS,
                        right: RADIUS,
                        top: 0,
                        bottom: 0
                    } },
                    (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle`, style: {
                            left: `calc((${this.hue}%) / 359 * 100 - ${RADIUS})`,
                            borderRadius: RADIUS,
                            width: HANDLE_SIZE,
                            height: HANDLE_SIZE
                        } },
                        (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle__fill`, style: {
                                backgroundColor: `hsl(${this.hue}, 100%, 50%)`,
                                borderRadius: RADIUS,
                                width: HANDLE_SIZE,
                                height: HANDLE_SIZE
                            } }))))));
    }
});
