import { on, off } from 'evtd';
const ctxKey = '@@mmoContext';
const mousemoveoutside = {
    mounted(el, { value }) {
        el[ctxKey] = {
            handler: undefined
        };
        if (typeof value === 'function') {
            el[ctxKey].handler = value;
            on('mousemoveoutside', el, value);
        }
    },
    updated(el, { value }) {
        const ctx = el[ctxKey];
        if (typeof value === 'function') {
            if (ctx.handler) {
                if (ctx.handler !== value) {
                    off('mousemoveoutside', el, ctx.handler);
                    ctx.handler = value;
                    on('mousemoveoutside', el, value);
                }
            }
            else {
                el[ctxKey].handler = value;
                on('mousemoveoutside', el, value);
            }
        }
        else {
            if (ctx.handler) {
                off('mousemoveoutside', el, ctx.handler);
                ctx.handler = undefined;
            }
        }
    },
    unmounted(el) {
        const { handler } = el[ctxKey];
        if (handler) {
            off('mousemoveoutside', el, handler);
        }
        el[ctxKey].handler = undefined;
    }
};
export default mousemoveoutside;
