"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const vue_1 = require("vue");
const HANDLE_SIZE = '12px';
const RADIUS = '6px';
exports.default = (0, vue_1.defineComponent)({
    name: 'Pallete',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        rgba: {
            type: Array,
            default: null
        },
        // 0 - 360
        displayedHue: {
            type: Number,
            required: true
        },
        displayedSv: {
            type: Array,
            required: true
        },
        onUpdateSV: {
            type: Function,
            required: true
        },
        onComplete: Function
    },
    setup(props) {
        const palleteRef = (0, vue_1.ref)(null);
        function handleMouseDown(e) {
            if (!palleteRef.value)
                return;
            (0, evtd_1.on)('mousemove', document, handleMouseMove);
            (0, evtd_1.on)('mouseup', document, handleMouseUp);
            handleMouseMove(e);
        }
        function handleMouseMove(e) {
            const { value: palleteEl } = palleteRef;
            if (!palleteEl)
                return;
            const { width, height, left, bottom } = palleteEl.getBoundingClientRect();
            const newV = (bottom - e.clientY) / height;
            const newS = (e.clientX - left) / width;
            const normalizedNewS = 100 * (newS > 1 ? 1 : newS < 0 ? 0 : newS);
            const normalizedNewV = 100 * (newV > 1 ? 1 : newV < 0 ? 0 : newV);
            props.onUpdateSV(normalizedNewS, normalizedNewV);
        }
        function handleMouseUp() {
            var _a;
            (0, evtd_1.off)('mousemove', document, handleMouseMove);
            (0, evtd_1.off)('mouseup', document, handleMouseUp);
            (_a = props.onComplete) === null || _a === void 0 ? void 0 : _a.call(props);
        }
        return {
            palleteRef,
            handleColor: (0, vue_1.computed)(() => {
                const { rgba } = props;
                if (!rgba)
                    return '';
                return `rgb(${rgba[0]}, ${rgba[1]}, ${rgba[2]})`;
            }),
            handleMouseDown
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-pallete`, onMousedown: this.handleMouseDown, ref: "palleteRef" },
            (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-pallete__layer`, style: {
                    backgroundImage: `linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`
                } }),
            (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-pallete__layer ${clsPrefix}-color-picker-pallete__layer--shadowed`, style: {
                    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))'
                } }),
            this.rgba && ((0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle`, style: {
                    width: HANDLE_SIZE,
                    height: HANDLE_SIZE,
                    borderRadius: RADIUS,
                    left: `calc(${this.displayedSv[0]}% - ${RADIUS})`,
                    bottom: `calc(${this.displayedSv[1]}% - ${RADIUS})`
                } },
                (0, vue_1.h)("div", { class: `${clsPrefix}-color-picker-handle__fill`, style: {
                        backgroundColor: this.handleColor,
                        borderRadius: RADIUS,
                        width: HANDLE_SIZE,
                        height: HANDLE_SIZE
                    } })))));
    }
});
