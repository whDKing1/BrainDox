"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawerRtl = void 0;
const rtl_1 = require("../../_internal/scrollbar/styles/rtl");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.drawerRtl = {
    name: 'Drawer',
    style: rtl_cssr_1.default,
    peers: [rtl_1.scrollbarRtl]
};
exports.default = exports.drawerRtl;
