"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateProps = exports.NRate = void 0;
var Rate_1 = require("./src/Rate");
Object.defineProperty(exports, "NRate", { enumerable: true, get: function () { return __importDefault(Rate_1).default; } });
Object.defineProperty(exports, "rateProps", { enumerable: true, get: function () { return Rate_1.rateProps; } });
