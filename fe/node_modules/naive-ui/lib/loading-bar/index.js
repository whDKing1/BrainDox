"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadingBar = exports.NLoadingBarProvider = exports.loadingBarProviderProps = void 0;
var LoadingBarProvider_1 = require("./src/LoadingBarProvider");
Object.defineProperty(exports, "loadingBarProviderProps", { enumerable: true, get: function () { return LoadingBarProvider_1.loadingBarProviderProps; } });
Object.defineProperty(exports, "NLoadingBarProvider", { enumerable: true, get: function () { return __importDefault(LoadingBarProvider_1).default; } });
var use_loading_bar_1 = require("./src/use-loading-bar");
Object.defineProperty(exports, "useLoadingBar", { enumerable: true, get: function () { return use_loading_bar_1.useLoadingBar; } });
