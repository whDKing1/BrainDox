"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageHeaderRtl = exports.pageHeaderLight = exports.pageHeaderDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "pageHeaderDark", { enumerable: true, get: function () { return dark_1.pageHeaderDark; } });
var light_1 = require("./light");
Object.defineProperty(exports, "pageHeaderLight", { enumerable: true, get: function () { return light_1.pageHeaderLight; } });
var rtl_1 = require("./rtl");
Object.defineProperty(exports, "pageHeaderRtl", { enumerable: true, get: function () { return __importDefault(rtl_1).default; } });
