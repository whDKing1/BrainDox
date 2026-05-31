"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const evtd_1 = require("evtd");
const utils_1 = require("./utils");
const clickedTimeRef = (0, vue_1.ref)(undefined);
let usedCount = 0;
function handleClick() {
    clickedTimeRef.value = Date.now();
}
let managable = true;
function useClicked(timeout) {
    if (!utils_1.isBrowser)
        return (0, vue_1.readonly)((0, vue_1.ref)(false));
    const clickedRef = (0, vue_1.ref)(false);
    let timerId = null;
    function clearTimer() {
        if (timerId !== null)
            window.clearTimeout(timerId);
    }
    function clickedHandler() {
        clearTimer();
        clickedRef.value = true;
        timerId = window.setTimeout(() => {
            clickedRef.value = false;
        }, timeout);
    }
    if (usedCount === 0) {
        (0, evtd_1.on)('click', window, handleClick, true);
    }
    const setup = () => {
        usedCount += 1;
        (0, evtd_1.on)('click', window, clickedHandler, true);
    };
    if (managable && (managable = (0, utils_1.hasInstance)())) {
        (0, vue_1.onBeforeMount)(setup);
        (0, vue_1.onBeforeUnmount)(() => {
            usedCount -= 1;
            if (usedCount === 0) {
                (0, evtd_1.off)('click', window, handleClick, true);
            }
            (0, evtd_1.off)('click', window, clickedHandler, true);
            clearTimer();
        });
    }
    else {
        setup();
    }
    return (0, vue_1.readonly)(clickedRef);
}
exports.default = useClicked;
