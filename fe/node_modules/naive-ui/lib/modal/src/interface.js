"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalInjectionKey = exports.modalProviderInjectionKey = exports.modalBodyInjectionKey = void 0;
const create_injection_key_1 = require("../../_utils/vue/create-injection-key");
exports.modalBodyInjectionKey = (0, create_injection_key_1.createInjectionKey)('n-modal-body');
exports.modalProviderInjectionKey = (0, create_injection_key_1.createInjectionKey)('n-modal-provider');
exports.modalInjectionKey = (0, create_injection_key_1.createInjectionKey)('n-modal');
