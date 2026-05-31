"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
const Body_1 = __importDefault(require("./TableParts/Body"));
const Header_1 = __importDefault(require("./TableParts/Header"));
exports.default = (0, vue_1.defineComponent)({
    name: 'MainTable',
    setup() {
        const { mergedClsPrefixRef, rightFixedColumnsRef, leftFixedColumnsRef, bodyWidthRef, maxHeightRef, minHeightRef, flexHeightRef, virtualScrollHeaderRef, syncScrollState, scrollXRef } = (0, vue_1.inject)(interface_1.dataTableInjectionKey);
        const headerInstRef = (0, vue_1.ref)(null);
        const bodyInstRef = (0, vue_1.ref)(null);
        const selfElRef = (0, vue_1.ref)(null);
        const fixedStateInitializedRef = (0, vue_1.ref)(!(leftFixedColumnsRef.value.length || rightFixedColumnsRef.value.length));
        const bodyStyleRef = (0, vue_1.computed)(() => {
            return {
                maxHeight: (0, _utils_1.formatLength)(maxHeightRef.value),
                minHeight: (0, _utils_1.formatLength)(minHeightRef.value)
            };
        });
        function handleBodyResize(entry) {
            bodyWidthRef.value = entry.contentRect.width;
            syncScrollState();
            if (!fixedStateInitializedRef.value) {
                fixedStateInitializedRef.value = true;
            }
        }
        function getHeaderElement() {
            var _a;
            const { value } = headerInstRef;
            if (value) {
                if (virtualScrollHeaderRef.value) {
                    return ((_a = value.virtualListRef) === null || _a === void 0 ? void 0 : _a.listElRef) || null;
                }
                else {
                    return value.$el;
                }
            }
            return null;
        }
        function getBodyElement() {
            const { value } = bodyInstRef;
            if (value) {
                return value.getScrollContainer();
            }
            return null;
        }
        const exposedMethods = {
            getBodyElement,
            getHeaderElement,
            scrollTo(arg0, arg1) {
                var _a;
                (_a = bodyInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(arg0, arg1);
            }
        };
        (0, vue_1.watchEffect)(() => {
            const { value: selfEl } = selfElRef;
            if (!selfEl)
                return;
            const transitionDisabledClass = `${mergedClsPrefixRef.value}-data-table-base-table--transition-disabled`;
            if (fixedStateInitializedRef.value) {
                setTimeout(() => {
                    selfEl.classList.remove(transitionDisabledClass);
                }, 0);
            }
            else {
                selfEl.classList.add(transitionDisabledClass);
            }
        });
        return Object.assign({ maxHeight: maxHeightRef, mergedClsPrefix: mergedClsPrefixRef, selfElRef,
            headerInstRef,
            bodyInstRef, bodyStyle: bodyStyleRef, flexHeight: flexHeightRef, handleBodyResize, scrollX: scrollXRef }, exposedMethods);
    },
    render() {
        const { mergedClsPrefix, maxHeight, flexHeight } = this;
        const headerInBody = maxHeight === undefined && !flexHeight;
        return ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-data-table-base-table`, ref: "selfElRef" },
            headerInBody ? null : (0, vue_1.h)(Header_1.default, { ref: "headerInstRef" }),
            (0, vue_1.h)(Body_1.default, { ref: "bodyInstRef", bodyStyle: this.bodyStyle, showHeader: headerInBody, flexHeight: flexHeight, onResize: this.handleBodyResize })));
    }
});
