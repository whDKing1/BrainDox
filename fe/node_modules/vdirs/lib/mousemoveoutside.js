"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evtd_1 = require("evtd");
const ctxKey = '@@mmoContext';
const mousemoveoutside = {
    mounted(el, { value }) {
        el[ctxKey] = {
            handler: undefined
        };
        if (typeof value === 'function') {
            el[ctxKey].handler = value;
            (0, evtd_1.on)('mousemoveoutside', el, value);
        }
    },
    updated(el, { value }) {
        const ctx = el[ctxKey];
        if (typeof value === 'function') {
            if (ctx.handler) {
                if (ctx.handler !== value) {
                    (0, evtd_1.off)('mousemoveoutside', el, ctx.handler);
                    ctx.handler = value;
                    (0, evtd_1.on)('mousemoveoutside', el, value);
                }
            }
            else {
                el[ctxKey].handler = value;
                (0, evtd_1.on)('mousemoveoutside', el, value);
            }
        }
        else {
            if (ctx.handler) {
                (0, evtd_1.off)('mousemoveoutside', el, ctx.handler);
                ctx.handler = undefined;
            }
        }
    },
    unmounted(el) {
        const { handler } = el[ctxKey];
        if (handler) {
            (0, evtd_1.off)('mousemoveoutside', el, handler);
        }
        el[ctxKey].handler = undefined;
    }
};
exports.default = mousemoveoutside;
