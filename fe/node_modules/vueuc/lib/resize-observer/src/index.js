"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeObserverManager = exports.default = void 0;
var VResizeObserver_1 = require("./VResizeObserver");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(VResizeObserver_1).default; } });
var delegate_1 = require("./delegate");
Object.defineProperty(exports, "resizeObserverManager", { enumerable: true, get: function () { return __importDefault(delegate_1).default; } });
