"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NLegacyTransfer = exports.legacyTransferProps = void 0;
var Transfer_1 = require("./src/Transfer");
Object.defineProperty(exports, "legacyTransferProps", { enumerable: true, get: function () { return Transfer_1.transferProps; } });
Object.defineProperty(exports, "NLegacyTransfer", { enumerable: true, get: function () { return __importDefault(Transfer_1).default; } });
