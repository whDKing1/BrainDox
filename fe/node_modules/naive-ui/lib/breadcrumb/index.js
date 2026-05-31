"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NBreadcrumbItem = exports.breadcrumbItemProps = exports.NBreadcrumb = exports.breadcrumbProps = void 0;
var Breadcrumb_1 = require("./src/Breadcrumb");
Object.defineProperty(exports, "breadcrumbProps", { enumerable: true, get: function () { return Breadcrumb_1.breadcrumbProps; } });
Object.defineProperty(exports, "NBreadcrumb", { enumerable: true, get: function () { return __importDefault(Breadcrumb_1).default; } });
var BreadcrumbItem_1 = require("./src/BreadcrumbItem");
Object.defineProperty(exports, "breadcrumbItemProps", { enumerable: true, get: function () { return BreadcrumbItem_1.breadcrumbItemProps; } });
Object.defineProperty(exports, "NBreadcrumbItem", { enumerable: true, get: function () { return __importDefault(BreadcrumbItem_1).default; } });
