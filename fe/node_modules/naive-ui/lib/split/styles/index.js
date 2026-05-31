"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitLight = exports.splitDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "splitDark", { enumerable: true, get: function () { return __importDefault(dark_1).default; } });
var light_1 = require("./light");
Object.defineProperty(exports, "splitLight", { enumerable: true, get: function () { return __importDefault(light_1).default; } });
