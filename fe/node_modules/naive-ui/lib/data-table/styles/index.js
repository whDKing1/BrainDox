"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTableRtl = exports.dataTableLight = exports.dataTableDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "dataTableDark", { enumerable: true, get: function () { return __importDefault(dark_1).default; } });
var light_1 = require("./light");
Object.defineProperty(exports, "dataTableLight", { enumerable: true, get: function () { return __importDefault(light_1).default; } });
var rtl_1 = require("./rtl");
Object.defineProperty(exports, "DataTableRtl", { enumerable: true, get: function () { return rtl_1.DataTableRtl; } });
