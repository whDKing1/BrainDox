"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NCountdown = exports.countdownProps = void 0;
var Countdown_1 = require("./src/Countdown");
Object.defineProperty(exports, "countdownProps", { enumerable: true, get: function () { return Countdown_1.countdownProps; } });
Object.defineProperty(exports, "NCountdown", { enumerable: true, get: function () { return __importDefault(Countdown_1).default; } });
