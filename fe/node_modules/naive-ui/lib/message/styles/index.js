"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRtl = exports.messageLight = exports.messageDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "messageDark", { enumerable: true, get: function () { return __importDefault(dark_1).default; } });
var light_1 = require("./light");
Object.defineProperty(exports, "messageLight", { enumerable: true, get: function () { return __importDefault(light_1).default; } });
var rtl_1 = require("./rtl");
Object.defineProperty(exports, "messageRtl", { enumerable: true, get: function () { return rtl_1.messageRtl; } });
