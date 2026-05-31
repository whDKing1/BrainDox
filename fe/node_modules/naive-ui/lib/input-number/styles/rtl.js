"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputNumberRtl = void 0;
const rtl_1 = require("../../button/styles/rtl");
const rtl_2 = require("../../input/styles/rtl");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.inputNumberRtl = {
    name: 'InputNumber',
    style: rtl_cssr_1.default,
    peers: [rtl_2.inputRtl, rtl_1.buttonRtl]
};
