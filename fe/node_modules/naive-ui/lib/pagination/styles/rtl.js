"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationRtl = void 0;
const rtl_1 = require("../../input/styles/rtl");
const styles_1 = require("../../select/styles");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.paginationRtl = {
    name: 'Pagination',
    style: rtl_cssr_1.default,
    peers: [rtl_1.inputRtl, styles_1.selectRtl]
};
