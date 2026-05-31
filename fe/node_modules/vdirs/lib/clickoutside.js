"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const ctxKey = '@@coContext';
const clickoutside = {
    mounted(el, { value, modifiers }) {
        el[ctxKey] = {
            handler: undefined
        };
        if (typeof value === 'function') {
            el[ctxKey].handler = value;
            (0, evtd_1.on)('clickoutside', el, value, {
                capture: modifiers.capture
            });
        }
    },
    updated(el, { value, modifiers }) {
        const ctx = el[ctxKey];
        if (typeof value === 'function') {
            if (ctx.handler) {
                if (ctx.handler !== value) {
                    (0, evtd_1.off)('clickoutside', el, ctx.handler, {
                        capture: modifiers.capture
                    });
                    ctx.handler = value;
                    (0, evtd_1.on)('clickoutside', el, value, {
                        capture: modifiers.capture
                    });
                }
            }
            else {
                el[ctxKey].handler = value;
                (0, evtd_1.on)('clickoutside', el, value, {
                    capture: modifiers.capture
                });
            }
        }
        else {
            if (ctx.handler) {
                (0, evtd_1.off)('clickoutside', el, ctx.handler, {
                    capture: modifiers.capture
                });
                ctx.handler = undefined;
            }
        }
    },
    unmounted(el, { modifiers }) {
        const { handler } = el[ctxKey];
        if (handler) {
            (0, evtd_1.off)('clickoutside', el, handler, {
                capture: modifiers.capture
            });
        }
        el[ctxKey].handler = undefined;
    }
};
exports.default = clickoutside;
