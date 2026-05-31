"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorPickerLight = exports.colorPickerDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "colorPickerDark", { enumerable: true, get: function () { return __importDefault(dark_1).default; } });
var light_1 = require("./light");
Object.defineProperty(exports, "colorPickerLight", { enumerable: true, get: function () { return __importDefault(light_1).default; } });
