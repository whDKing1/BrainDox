"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.qrCodeProps = exports.NQrCode = void 0;
var QrCode_1 = require("./src/QrCode");
Object.defineProperty(exports, "NQrCode", { enumerable: true, get: function () { return __importDefault(QrCode_1).default; } });
Object.defineProperty(exports, "qrCodeProps", { enumerable: true, get: function () { return QrCode_1.qrCodeProps; } });
