"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = exports.notificationProviderProps = exports.NNotificationProvider = void 0;
var NotificationProvider_1 = require("./src/NotificationProvider");
Object.defineProperty(exports, "NNotificationProvider", { enumerable: true, get: function () { return __importDefault(NotificationProvider_1).default; } });
Object.defineProperty(exports, "notificationProviderProps", { enumerable: true, get: function () { return NotificationProvider_1.notificationProviderProps; } });
var use_notification_1 = require("./src/use-notification");
Object.defineProperty(exports, "useNotification", { enumerable: true, get: function () { return use_notification_1.useNotification; } });
