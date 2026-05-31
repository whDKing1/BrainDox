"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalLight = exports.modalDark = void 0;
var dark_1 = require("./dark");
Object.defineProperty(exports, "modalDark", { enumerable: true, get: function () { return __importDefault(dark_1).default; } });
var light_1 = require("./light");
Object.defineProperty(exports, "modalLight", { enumerable: true, get: function () { return __importDefault(light_1).default; } });
