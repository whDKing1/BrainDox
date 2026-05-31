"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const evtd_1 = require("evtd");
const utils_1 = require("./utils");
function useKeyboard(options = {}, enabledRef) {
    const state = (0, vue_1.reactive)({
        ctrl: false,
        command: false,
        win: false,
        shift: false,
        tab: false
    });
    const { keydown, keyup } = options;
    const keydownHandler = (e) => {
        switch (e.key) {
            case 'Control':
                state.ctrl = true;
                break;
            case 'Meta':
                state.command = true;
                state.win = true;
                break;
            case 'Shift':
                state.shift = true;
                break;
            case 'Tab':
                state.tab = true;
                break;
        }
        if (keydown !== undefined) {
            Object.keys(keydown).forEach(key => {
                if (key !== e.key)
                    return;
                const handler = keydown[key];
                if (typeof handler === 'function') {
                    handler(e);
                }
                else {
                    const { stop = false, prevent = false } = handler;
                    if (stop)
                        e.stopPropagation();
                    if (prevent)
                        e.preventDefault();
                    handler.handler(e);
                }
            });
        }
    };
    const keyupHandler = (e) => {
        switch (e.key) {
            case 'Control':
                state.ctrl = false;
                break;
            case 'Meta':
                state.command = false;
                state.win = false;
                break;
            case 'Shift':
                state.shift = false;
                break;
            case 'Tab':
                state.tab = false;
                break;
        }
        if (keyup !== undefined) {
            Object.keys(keyup).forEach(key => {
                if (key !== e.key)
                    return;
                const handler = keyup[key];
                if (typeof handler === 'function') {
                    handler(e);
                }
                else {
                    const { stop = false, prevent = false } = handler;
                    if (stop)
                        e.stopPropagation();
                    if (prevent)
                        e.preventDefault();
                    handler.handler(e);
                }
            });
        }
    };
    const setup = () => {
        if (enabledRef === undefined || enabledRef.value) {
            (0, evtd_1.on)('keydown', document, keydownHandler);
            (0, evtd_1.on)('keyup', document, keyupHandler);
        }
        if (enabledRef !== undefined) {
            (0, vue_1.watch)(enabledRef, value => {
                if (value) {
                    (0, evtd_1.on)('keydown', document, keydownHandler);
                    (0, evtd_1.on)('keyup', document, keyupHandler);
                }
                else {
                    (0, evtd_1.off)('keydown', document, keydownHandler);
                    (0, evtd_1.off)('keyup', document, keyupHandler);
                }
            });
        }
    };
    if ((0, utils_1.hasInstance)()) {
        (0, vue_1.onBeforeMount)(setup);
        (0, vue_1.onBeforeUnmount)(() => {
            if (enabledRef === undefined || enabledRef.value) {
                (0, evtd_1.off)('keydown', document, keydownHandler);
                (0, evtd_1.off)('keyup', document, keyupHandler);
            }
        });
    }
    else {
        setup();
    }
    return (0, vue_1.readonly)(state);
}
exports.default = useKeyboard;
