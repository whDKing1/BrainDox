"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.radioGroupProps = exports.NRadioGroup = exports.radioButtonProps = exports.NRadioButton = exports.radioProps = exports.NRadio = void 0;
var Radio_1 = require("./src/Radio");
Object.defineProperty(exports, "NRadio", { enumerable: true, get: function () { return __importDefault(Radio_1).default; } });
Object.defineProperty(exports, "radioProps", { enumerable: true, get: function () { return Radio_1.radioProps; } });
var RadioButton_1 = require("./src/RadioButton");
Object.defineProperty(exports, "NRadioButton", { enumerable: true, get: function () { return __importDefault(RadioButton_1).default; } });
Object.defineProperty(exports, "radioButtonProps", { enumerable: true, get: function () { return RadioButton_1.radioButtonProps; } });
var RadioGroup_1 = require("./src/RadioGroup");
Object.defineProperty(exports, "NRadioGroup", { enumerable: true, get: function () { return __importDefault(RadioGroup_1).default; } });
Object.defineProperty(exports, "radioGroupProps", { enumerable: true, get: function () { return RadioGroup_1.radioGroupProps; } });
