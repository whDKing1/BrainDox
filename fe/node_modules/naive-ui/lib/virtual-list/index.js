"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.virtualListProps = exports.NVirtualList = void 0;
var VirtualList_1 = require("./src/VirtualList");
Object.defineProperty(exports, "NVirtualList", { enumerable: true, get: function () { return __importDefault(VirtualList_1).default; } });
Object.defineProperty(exports, "virtualListProps", { enumerable: true, get: function () { return VirtualList_1.virtualListProps; } });
