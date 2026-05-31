"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NHighlight = exports.highlightProps = void 0;
var Highlight_1 = require("./src/Highlight");
Object.defineProperty(exports, "highlightProps", { enumerable: true, get: function () { return Highlight_1.highlightProps; } });
Object.defineProperty(exports, "NHighlight", { enumerable: true, get: function () { return __importDefault(Highlight_1).default; } });
