"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressProps = exports.NProgress = void 0;
var Progress_1 = require("./src/Progress");
Object.defineProperty(exports, "NProgress", { enumerable: true, get: function () { return __importDefault(Progress_1).default; } });
Object.defineProperty(exports, "progressProps", { enumerable: true, get: function () { return Progress_1.progressProps; } });
