"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicInputRtl = void 0;
const rtl_1 = require("../../button-group/styles/rtl");
const rtl_2 = require("../../button/styles/rtl");
const rtl_3 = require("../../checkbox/styles/rtl");
const rtl_4 = require("../../input-number/styles/rtl");
const rtl_5 = require("../../input/styles/rtl");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.dynamicInputRtl = {
    name: 'DynamicInput',
    style: rtl_cssr_1.default,
    peers: [rtl_5.inputRtl, rtl_2.buttonRtl, rtl_1.buttonGroupRtl, rtl_3.checkboxRtl, rtl_4.inputNumberRtl]
};
