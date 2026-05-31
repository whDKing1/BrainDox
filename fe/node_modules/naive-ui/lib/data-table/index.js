"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTableProps = exports.NDataTable = void 0;
var DataTable_1 = require("./src/DataTable");
Object.defineProperty(exports, "NDataTable", { enumerable: true, get: function () { return __importDefault(DataTable_1).default; } });
var interface_1 = require("./src/interface");
Object.defineProperty(exports, "dataTableProps", { enumerable: true, get: function () { return interface_1.dataTableProps; } });
