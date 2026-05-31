"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = void 0;
const utils_1 = require("./utils");
function exists(id, ssr) {
    if (id === undefined)
        return false;
    if (ssr) {
        const { context: { ids } } = ssr;
        return ids.has(id);
    }
    return (0, utils_1.queryElement)(id) !== null;
}
exports.exists = exists;
