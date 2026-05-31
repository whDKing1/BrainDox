"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heatmapMockData = exports.heatmapProps = exports.NHeatmap = void 0;
var Heatmap_1 = require("./src/Heatmap");
Object.defineProperty(exports, "NHeatmap", { enumerable: true, get: function () { return __importDefault(Heatmap_1).default; } });
var Heatmap_2 = require("./src/Heatmap");
Object.defineProperty(exports, "heatmapProps", { enumerable: true, get: function () { return Heatmap_2.heatmapProps; } });
var utils_1 = require("./src/utils");
Object.defineProperty(exports, "heatmapMockData", { enumerable: true, get: function () { return utils_1.heatmapMockData; } });
__exportStar(require("./styles"), exports);
