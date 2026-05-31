"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NCarouselItem = exports.NCarousel = exports.carouselProps = void 0;
var Carousel_1 = require("./src/Carousel");
Object.defineProperty(exports, "carouselProps", { enumerable: true, get: function () { return Carousel_1.carouselProps; } });
Object.defineProperty(exports, "NCarousel", { enumerable: true, get: function () { return __importDefault(Carousel_1).default; } });
var CarouselItem_1 = require("./src/CarouselItem");
Object.defineProperty(exports, "NCarouselItem", { enumerable: true, get: function () { return __importDefault(CarouselItem_1).default; } });
