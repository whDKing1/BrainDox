"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NModalProvider = exports.modalProviderProps = exports.NModal = exports.modalProps = exports.useModalReactiveList = exports.useModal = void 0;
var composables_1 = require("./src/composables");
Object.defineProperty(exports, "useModal", { enumerable: true, get: function () { return composables_1.useModal; } });
Object.defineProperty(exports, "useModalReactiveList", { enumerable: true, get: function () { return composables_1.useModalReactiveList; } });
var Modal_1 = require("./src/Modal");
Object.defineProperty(exports, "modalProps", { enumerable: true, get: function () { return Modal_1.modalProps; } });
Object.defineProperty(exports, "NModal", { enumerable: true, get: function () { return __importDefault(Modal_1).default; } });
var ModalProvider_1 = require("./src/ModalProvider");
Object.defineProperty(exports, "modalProviderProps", { enumerable: true, get: function () { return ModalProvider_1.modalProviderProps; } });
Object.defineProperty(exports, "NModalProvider", { enumerable: true, get: function () { return ModalProvider_1.NModalProvider; } });
