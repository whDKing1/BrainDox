"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeGetClickTarget = exports.treeProps = exports.NTree = void 0;
var Tree_1 = require("./src/Tree");
Object.defineProperty(exports, "NTree", { enumerable: true, get: function () { return __importDefault(Tree_1).default; } });
Object.defineProperty(exports, "treeProps", { enumerable: true, get: function () { return Tree_1.treeProps; } });
var utils_1 = require("./src/utils");
Object.defineProperty(exports, "treeGetClickTarget", { enumerable: true, get: function () { return utils_1.treeGetClickTarget; } });
