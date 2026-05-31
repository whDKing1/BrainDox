"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NxButton = exports.NButton = exports.buttonProps = void 0;
var Button_1 = require("./src/Button");
Object.defineProperty(exports, "buttonProps", { enumerable: true, get: function () { return Button_1.buttonProps; } });
Object.defineProperty(exports, "NButton", { enumerable: true, get: function () { return __importDefault(Button_1).default; } });
Object.defineProperty(exports, "NxButton", { enumerable: true, get: function () { return Button_1.XButton; } });
