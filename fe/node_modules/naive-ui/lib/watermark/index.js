"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watermarkProps = exports.NWatermark = void 0;
var Watermark_1 = require("./src/Watermark");
Object.defineProperty(exports, "NWatermark", { enumerable: true, get: function () { return __importDefault(Watermark_1).default; } });
Object.defineProperty(exports, "watermarkProps", { enumerable: true, get: function () { return Watermark_1.watermarkProps; } });
