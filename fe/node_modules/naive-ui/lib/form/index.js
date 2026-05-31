"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFormItemRow = exports.NFormItemGridItem = exports.NFormItemGi = exports.formItemGridItemProps = exports.formItemGiProps = exports.NFormItemCol = exports.NFormItem = exports.formItemProps = exports.NForm = exports.formProps = void 0;
var Form_1 = require("./src/Form");
Object.defineProperty(exports, "formProps", { enumerable: true, get: function () { return Form_1.formProps; } });
Object.defineProperty(exports, "NForm", { enumerable: true, get: function () { return __importDefault(Form_1).default; } });
var FormItem_1 = require("./src/FormItem");
Object.defineProperty(exports, "formItemProps", { enumerable: true, get: function () { return FormItem_1.formItemProps; } });
Object.defineProperty(exports, "NFormItem", { enumerable: true, get: function () { return __importDefault(FormItem_1).default; } });
// deprecated
var FormItemCol_1 = require("./src/FormItemCol");
Object.defineProperty(exports, "NFormItemCol", { enumerable: true, get: function () { return __importDefault(FormItemCol_1).default; } });
var FormItemGridItem_1 = require("./src/FormItemGridItem");
Object.defineProperty(exports, "formItemGiProps", { enumerable: true, get: function () { return FormItemGridItem_1.formItemGiProps; } });
Object.defineProperty(exports, "formItemGridItemProps", { enumerable: true, get: function () { return FormItemGridItem_1.formItemGiProps; } });
Object.defineProperty(exports, "NFormItemGi", { enumerable: true, get: function () { return __importDefault(FormItemGridItem_1).default; } });
Object.defineProperty(exports, "NFormItemGridItem", { enumerable: true, get: function () { return __importDefault(FormItemGridItem_1).default; } });
var FormItemRow_1 = require("./src/FormItemRow");
Object.defineProperty(exports, "NFormItemRow", { enumerable: true, get: function () { return __importDefault(FormItemRow_1).default; } });
