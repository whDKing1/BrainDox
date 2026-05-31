"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warn = warn;
function warn(location, message) {
    console.error(`[vueuc/${location}]: ${message}`);
}
