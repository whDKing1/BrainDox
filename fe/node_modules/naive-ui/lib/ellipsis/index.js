"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPerformantEllipsis = exports.NEllipsis = exports.ellipsisProps = void 0;
var Ellipsis_1 = require("./src/Ellipsis");
Object.defineProperty(exports, "ellipsisProps", { enumerable: true, get: function () { return Ellipsis_1.ellipsisProps; } });
Object.defineProperty(exports, "NEllipsis", { enumerable: true, get: function () { return __importDefault(Ellipsis_1).default; } });
var PerformantEllipsis_1 = require("./src/PerformantEllipsis");
Object.defineProperty(exports, "NPerformantEllipsis", { enumerable: true, get: function () { return PerformantEllipsis_1.NPerformantEllipsis; } });
