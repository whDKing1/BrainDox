"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NImagePreview = exports.imagePreviewProps = exports.NImageGroup = exports.imageGroupProps = exports.NImage = exports.imageProps = void 0;
var Image_1 = require("./src/Image");
Object.defineProperty(exports, "imageProps", { enumerable: true, get: function () { return Image_1.imageProps; } });
Object.defineProperty(exports, "NImage", { enumerable: true, get: function () { return __importDefault(Image_1).default; } });
var ImageGroup_1 = require("./src/ImageGroup");
Object.defineProperty(exports, "imageGroupProps", { enumerable: true, get: function () { return ImageGroup_1.imageGroupProps; } });
Object.defineProperty(exports, "NImageGroup", { enumerable: true, get: function () { return __importDefault(ImageGroup_1).default; } });
var ImagePreview_1 = require("./src/ImagePreview");
Object.defineProperty(exports, "imagePreviewProps", { enumerable: true, get: function () { return ImagePreview_1.imagePreviewProps; } });
Object.defineProperty(exports, "NImagePreview", { enumerable: true, get: function () { return __importDefault(ImagePreview_1).default; } });
