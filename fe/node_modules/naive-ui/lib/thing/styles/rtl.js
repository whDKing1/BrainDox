"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.thingRtl = void 0;
const rtl_1 = require("../../button/styles/rtl");
const rtl_2 = require("../../space/styles/rtl");
const rtl_cssr_1 = __importDefault(require("../src/styles/rtl.cssr"));
exports.thingRtl = {
    name: 'Thing',
    style: rtl_cssr_1.default,
    peers: [rtl_1.buttonRtl, rtl_2.spaceRtl]
};
