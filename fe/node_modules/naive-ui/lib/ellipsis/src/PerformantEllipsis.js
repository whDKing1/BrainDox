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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPerformantEllipsis = void 0;
const vue_1 = require("vue");
const _mixins_1 = require("../../_mixins");
const use_config_1 = require("../../_mixins/use-config");
const Ellipsis_1 = __importStar(require("./Ellipsis"));
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.NPerformantEllipsis = (0, vue_1.defineComponent)({
    name: 'PerformantEllipsis',
    props: Ellipsis_1.ellipsisProps,
    inheritAttrs: false,
    setup(props, { attrs, slots }) {
        const mouseEnteredRef = (0, vue_1.ref)(false);
        const mergedClsPrefixRef = (0, use_config_1.useMergedClsPrefix)();
        (0, _mixins_1.useStyle)('-ellipsis', index_cssr_1.default, mergedClsPrefixRef);
        // Modified from Ellipsis.tsx
        const renderTrigger = () => {
            const { lineClamp } = props;
            const mergedClsPrefix = mergedClsPrefixRef.value;
            return ((0, vue_1.h)("span", Object.assign({}, (0, vue_1.mergeProps)(attrs, {
                class: [
                    `${mergedClsPrefix}-ellipsis`,
                    lineClamp !== undefined
                        ? (0, Ellipsis_1.createLineClampClass)(mergedClsPrefix)
                        : undefined,
                    props.expandTrigger === 'click'
                        ? (0, Ellipsis_1.createCursorClass)(mergedClsPrefix, 'pointer')
                        : undefined
                ],
                style: lineClamp === undefined
                    ? {
                        textOverflow: 'ellipsis'
                    }
                    : {
                        '-webkit-line-clamp': lineClamp
                    }
            }), { onMouseenter: () => {
                    mouseEnteredRef.value = true;
                } }), lineClamp ? slots : (0, vue_1.h)("span", null, slots)));
        };
        return {
            mouseEntered: mouseEnteredRef,
            renderTrigger
        };
    },
    render() {
        if (this.mouseEntered) {
            return (0, vue_1.h)(Ellipsis_1.default, (0, vue_1.mergeProps)({}, this.$attrs, this.$props), this.$slots);
        }
        else {
            return this.renderTrigger();
        }
    }
});
