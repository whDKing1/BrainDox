"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NLog = exports.logProps = void 0;
var Log_1 = require("./src/Log");
Object.defineProperty(exports, "logProps", { enumerable: true, get: function () { return Log_1.logProps; } });
Object.defineProperty(exports, "NLog", { enumerable: true, get: function () { return __importDefault(Log_1).default; } });
