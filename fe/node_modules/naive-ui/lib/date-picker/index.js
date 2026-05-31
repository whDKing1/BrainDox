"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.datePickerProps = exports.NDatePicker = void 0;
var DatePicker_1 = require("./src/DatePicker");
Object.defineProperty(exports, "NDatePicker", { enumerable: true, get: function () { return __importDefault(DatePicker_1).default; } });
var props_1 = require("./src/props");
Object.defineProperty(exports, "datePickerProps", { enumerable: true, get: function () { return props_1.datePickerProps; } });
