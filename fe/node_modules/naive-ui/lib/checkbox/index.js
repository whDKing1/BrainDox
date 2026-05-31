"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NCheckboxGroup = exports.checkboxGroupProps = exports.NCheckbox = exports.checkboxProps = void 0;
var Checkbox_1 = require("./src/Checkbox");
Object.defineProperty(exports, "checkboxProps", { enumerable: true, get: function () { return Checkbox_1.checkboxProps; } });
Object.defineProperty(exports, "NCheckbox", { enumerable: true, get: function () { return __importDefault(Checkbox_1).default; } });
var CheckboxGroup_1 = require("./src/CheckboxGroup");
Object.defineProperty(exports, "checkboxGroupProps", { enumerable: true, get: function () { return CheckboxGroup_1.checkboxGroupProps; } });
Object.defineProperty(exports, "NCheckboxGroup", { enumerable: true, get: function () { return __importDefault(CheckboxGroup_1).default; } });
