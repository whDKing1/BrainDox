"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineItemProps = exports.NTimelineItem = exports.timelineProps = exports.NTimeline = void 0;
var Timeline_1 = require("./src/Timeline");
Object.defineProperty(exports, "NTimeline", { enumerable: true, get: function () { return __importDefault(Timeline_1).default; } });
Object.defineProperty(exports, "timelineProps", { enumerable: true, get: function () { return Timeline_1.timelineProps; } });
var TimelineItem_1 = require("./src/TimelineItem");
Object.defineProperty(exports, "NTimelineItem", { enumerable: true, get: function () { return __importDefault(TimelineItem_1).default; } });
Object.defineProperty(exports, "timelineItemProps", { enumerable: true, get: function () { return TimelineItem_1.timelineItemProps; } });
