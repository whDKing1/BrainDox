"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NGi = exports.giProps = exports.NGridItem = exports.gridItemProps = exports.NGrid = exports.gridProps = void 0;
var Grid_1 = require("./src/Grid");
Object.defineProperty(exports, "gridProps", { enumerable: true, get: function () { return Grid_1.gridProps; } });
Object.defineProperty(exports, "NGrid", { enumerable: true, get: function () { return __importDefault(Grid_1).default; } });
var GridItem_1 = require("./src/GridItem");
Object.defineProperty(exports, "gridItemProps", { enumerable: true, get: function () { return GridItem_1.gridItemProps; } });
Object.defineProperty(exports, "NGridItem", { enumerable: true, get: function () { return __importDefault(GridItem_1).default; } });
var GridItem_2 = require("./src/GridItem");
Object.defineProperty(exports, "giProps", { enumerable: true, get: function () { return GridItem_2.gridItemProps; } });
Object.defineProperty(exports, "NGi", { enumerable: true, get: function () { return __importDefault(GridItem_2).default; } });
