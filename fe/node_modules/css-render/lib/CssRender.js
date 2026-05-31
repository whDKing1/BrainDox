"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssRender = void 0;
const c_1 = require("./c");
const utils_1 = require("./utils");
function CssRender(config = {}) {
    const cssr = {
        c: ((...args) => (0, c_1.c)(cssr, ...args)),
        use: (plugin, ...args) => plugin.install(cssr, ...args),
        find: utils_1.queryElement,
        context: {},
        config
    };
    return cssr;
}
exports.CssRender = CssRender;
