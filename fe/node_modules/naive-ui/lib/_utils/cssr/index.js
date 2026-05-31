"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = exports.namespace = exports.find = exports.cNotM = exports.cM = exports.cE = exports.cCB = exports.cB = exports.c = void 0;
exports.asModal = asModal;
exports.createKey = createKey;
exports.insideModal = insideModal;
exports.insidePopover = insidePopover;
const plugin_bem_1 = require("@css-render/plugin-bem");
const css_render_1 = require("css-render");
const namespace = 'n';
exports.namespace = namespace;
const prefix = `.${namespace}-`;
exports.prefix = prefix;
const elementPrefix = '__';
const modifierPrefix = '--';
const cssr = (0, css_render_1.CssRender)();
const plugin = (0, plugin_bem_1.plugin)({
    blockPrefix: prefix,
    elementPrefix,
    modifierPrefix
});
cssr.use(plugin);
const { c, find } = cssr;
exports.c = c;
exports.find = find;
const { cB, cE, cM, cNotM } = plugin;
exports.cB = cB;
exports.cE = cE;
exports.cM = cM;
exports.cNotM = cNotM;
function insideModal(style) {
    return c(({ props: { bPrefix } }) => `${bPrefix || prefix}modal, ${bPrefix || prefix}drawer`, [style]);
}
function insidePopover(style) {
    return c(({ props: { bPrefix } }) => `${bPrefix || prefix}popover`, [style]);
}
function asModal(style) {
    return c(({ props: { bPrefix } }) => `&${bPrefix || prefix}modal`, style);
}
// child block
const cCB = ((...args) => {
    return c('>', [cB(...args)]);
});
exports.cCB = cCB;
function createKey(prefix, suffix) {
    return (prefix
        + (suffix === 'default'
            ? ''
            : suffix.replace(/^[a-z]/, startChar => startChar.toUpperCase())));
}
