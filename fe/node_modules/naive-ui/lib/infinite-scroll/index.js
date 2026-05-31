"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NInfiniteScroll = exports.infiniteScrollProps = void 0;
var InfiniteScroll_1 = require("./src/InfiniteScroll");
Object.defineProperty(exports, "infiniteScrollProps", { enumerable: true, get: function () { return InfiniteScroll_1.infiniteScrollProps; } });
Object.defineProperty(exports, "NInfiniteScroll", { enumerable: true, get: function () { return __importDefault(InfiniteScroll_1).default; } });
