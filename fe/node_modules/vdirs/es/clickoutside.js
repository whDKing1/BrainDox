import { on, off } from 'evtd';
const ctxKey = '@@coContext';
const clickoutside = {
    mounted(el, { value, modifiers }) {
        el[ctxKey] = {
            handler: undefined
        };
        if (typeof value === 'function') {
            el[ctxKey].handler = value;
            on('clickoutside', el, value, {
                capture: modifiers.capture
            });
        }
    },
    updated(el, { value, modifiers }) {
        const ctx = el[ctxKey];
        if (typeof value === 'function') {
            if (ctx.handler) {
                if (ctx.handler !== value) {
                    off('clickoutside', el, ctx.handler, {
                        capture: modifiers.capture
                    });
                    ctx.handler = value;
                    on('clickoutside', el, value, {
                        capture: modifiers.capture
                    });
                }
            }
            else {
                el[ctxKey].handler = value;
                on('clickoutside', el, value, {
                    capture: modifiers.capture
                });
            }
        }
        else {
            if (ctx.handler) {
                off('clickoutside', el, ctx.handler, {
                    capture: modifiers.capture
                });
                ctx.handler = undefined;
            }
        }
    },
    unmounted(el, { modifiers }) {
        const { handler } = el[ctxKey];
        if (handler) {
            off('clickoutside', el, handler, {
                capture: modifiers.capture
            });
        }
        el[ctxKey].handler = undefined;
    }
};
export default clickoutside;
