"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NTr = exports.NThead = exports.NTh = exports.NTd = exports.NTbody = exports.tableProps = exports.NTable = void 0;
var Table_1 = require("./src/Table");
Object.defineProperty(exports, "NTable", { enumerable: true, get: function () { return __importDefault(Table_1).default; } });
Object.defineProperty(exports, "tableProps", { enumerable: true, get: function () { return Table_1.tableProps; } });
var Tbody_1 = require("./src/Tbody");
Object.defineProperty(exports, "NTbody", { enumerable: true, get: function () { return __importDefault(Tbody_1).default; } });
var Td_1 = require("./src/Td");
Object.defineProperty(exports, "NTd", { enumerable: true, get: function () { return __importDefault(Td_1).default; } });
var Th_1 = require("./src/Th");
Object.defineProperty(exports, "NTh", { enumerable: true, get: function () { return __importDefault(Th_1).default; } });
var Thead_1 = require("./src/Thead");
Object.defineProperty(exports, "NThead", { enumerable: true, get: function () { return __importDefault(Thead_1).default; } });
var Tr_1 = require("./src/Tr");
Object.defineProperty(exports, "NTr", { enumerable: true, get: function () { return __importDefault(Tr_1).default; } });
