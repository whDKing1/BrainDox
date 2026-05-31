"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const evtd_1 = require("evtd");
const utils_1 = require("./utils");
const mousePositionRef = (0, vue_1.ref)(null);
function clickHandler(e) {
    if (e.clientX > 0 || e.clientY > 0) {
        mousePositionRef.value = {
            x: e.clientX,
            y: e.clientY
        };
    }
    else {
        // x = 0 & y = 0
        const { target } = e;
        if (target instanceof Element) {
            const { left, top, width, height } = target.getBoundingClientRect();
            if (left > 0 || top > 0) {
                // impossible to be triggered by real click
                mousePositionRef.value = {
                    x: left + width / 2,
                    y: top + height / 2
                };
            }
            else {
                mousePositionRef.value = { x: 0, y: 0 };
            }
        }
        else {
            mousePositionRef.value = null;
        }
    }
}
let usedCount = 0;
let managable = true;
function useClickPosition() {
    if (!utils_1.isBrowser)
        return (0, vue_1.readonly)((0, vue_1.ref)(null));
    if (usedCount === 0)
        (0, evtd_1.on)('click', document, clickHandler, true);
    const setup = () => {
        usedCount += 1;
    };
    if (managable && (managable = (0, utils_1.hasInstance)())) {
        (0, vue_1.onBeforeMount)(setup);
        (0, vue_1.onBeforeUnmount)(() => {
            usedCount -= 1;
            if (usedCount === 0)
                (0, evtd_1.off)('click', document, clickHandler, true);
        });
    }
    else {
        setup();
    }
    return (0, vue_1.readonly)(mousePositionRef);
}
exports.default = useClickPosition;
