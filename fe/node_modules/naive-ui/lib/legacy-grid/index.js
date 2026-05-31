"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowProps = exports.NRow = exports.NCol = exports.colProps = void 0;
var Col_1 = require("./src/Col");
Object.defineProperty(exports, "colProps", { enumerable: true, get: function () { return Col_1.colProps; } });
Object.defineProperty(exports, "NCol", { enumerable: true, get: function () { return __importDefault(Col_1).default; } });
var Row_1 = require("./src/Row");
Object.defineProperty(exports, "NRow", { enumerable: true, get: function () { return __importDefault(Row_1).default; } });
Object.defineProperty(exports, "rowProps", { enumerable: true, get: function () { return Row_1.rowProps; } });
