"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.formItemColPropKeys = exports.formItemColProps = void 0;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const Col_1 = __importStar(require("../../legacy-grid/src/Col"));
const FormItem_1 = __importStar(require("./FormItem"));
exports.formItemColProps = Object.assign(Object.assign({}, Col_1.colProps), FormItem_1.formItemProps);
exports.formItemColPropKeys = (0, _utils_1.keysOf)(exports.formItemColProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'FormItemCol',
    props: exports.formItemColProps,
    setup() {
        const formItemInstRef = (0, vue_1.ref)(null);
        const validate = ((...args) => {
            const { value } = formItemInstRef;
            if (value) {
                return value.validate(...args);
            }
        });
        const restoreValidation = () => {
            const { value } = formItemInstRef;
            if (value) {
                value.restoreValidation();
            }
        };
        return {
            formItemInstRef,
            validate,
            restoreValidation
        };
    },
    render() {
        return (0, vue_1.h)(Col_1.default, (0, _utils_1.keep)(this.$props, Col_1.colPropKeys), {
            default: () => {
                const itemProps = (0, _utils_1.keep)(this.$props, FormItem_1.formItemPropKeys);
                return (0, vue_1.h)(FormItem_1.default, Object.assign({ ref: 'formItemInstRef' }, itemProps), this.$slots);
            }
        });
    }
});
