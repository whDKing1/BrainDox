"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
Object.defineProperty(exports, "__esModule", { value: true });
exports.plugin = void 0;
function plugin(options) {
    let _bPrefix = '.';
    let _ePrefix = '__';
    let _mPrefix = '--';
    let c;
    if (options) {
        let t = options.blockPrefix;
        if (t) {
            _bPrefix = t;
        }
        t = options.elementPrefix;
        if (t) {
            _ePrefix = t;
        }
        t = options.modifierPrefix;
        if (t) {
            _mPrefix = t;
        }
    }
    const _plugin = {
        install(instance) {
            c = instance.c;
            const ctx = instance.context;
            ctx.bem = {};
            ctx.bem.b = null;
            ctx.bem.els = null;
        }
    };
    function b(arg) {
        let memorizedB;
        let memorizedE;
        return {
            before(ctx) {
                memorizedB = ctx.bem.b;
                memorizedE = ctx.bem.els;
                ctx.bem.els = null;
            },
            after(ctx) {
                ctx.bem.b = memorizedB;
                ctx.bem.els = memorizedE;
            },
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                context.bem.b = arg;
                return `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}`;
            }
        };
    }
    function e(arg) {
        let memorizedE;
        return {
            before(ctx) {
                memorizedE = ctx.bem.els;
            },
            after(ctx) {
                ctx.bem.els = memorizedE;
            },
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                context.bem.els = arg.split(',').map(v => v.trim());
                return context.bem.els
                    .map(el => `${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${_ePrefix}${el}`).join(', ');
            }
        };
    }
    function m(arg) {
        return {
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                const modifiers = arg.split(',').map(v => v.trim());
                function elementToSelector(el) {
                    return modifiers.map(modifier => `&${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${el !== undefined ? `${_ePrefix}${el}` : ''}${_mPrefix}${modifier}`).join(', ');
                }
                const els = context.bem.els;
                if (els !== null) {
                    if (process.env.NODE_ENV !== 'production' && els.length >= 2) {
                        throw Error(`[css-render/plugin-bem]: m(${arg}) is invalid, using modifier inside multiple elements is not allowed`);
                    }
                    return elementToSelector(els[0]);
                }
                else {
                    return elementToSelector();
                }
            }
        };
    }
    function notM(arg) {
        return {
            $({ context, props }) {
                arg = typeof arg === 'string' ? arg : arg({ context, props });
                const els = context.bem.els;
                if (process.env.NODE_ENV !== 'production' && els !== null && els.length >= 2) {
                    throw Error(`[css-render/plugin-bem]: notM(${arg}) is invalid, using modifier inside multiple elements is not allowed`);
                }
                return `&:not(${(props === null || props === void 0 ? void 0 : props.bPrefix) || _bPrefix}${context.bem.b}${(els !== null && els.length > 0) ? `${_ePrefix}${els[0]}` : ''}${_mPrefix}${arg})`;
            }
        };
    }
    const cB = ((...args) => c(b(args[0]), args[1], args[2]));
    const cE = ((...args) => c(e(args[0]), args[1], args[2]));
    const cM = ((...args) => c(m(args[0]), args[1], args[2]));
    const cNotM = ((...args) => c(notM(args[0]), args[1], args[2]));
    Object.assign(_plugin, {
        cB, cE, cM, cNotM
    });
    return _plugin;
}
exports.plugin = plugin;
exports.default = plugin;
