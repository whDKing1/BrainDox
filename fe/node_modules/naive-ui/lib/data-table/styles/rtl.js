"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableRtl = void 0;
const styles_1 = require("../../_internal/scrollbar/styles");
const styles_2 = require("../../pagination/styles");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.DataTableRtl = {
    name: 'DataTable',
    style: rtl_cssr_1.default,
    peers: [styles_1.scrollbarRtl, styles_2.paginationRtl]
};
