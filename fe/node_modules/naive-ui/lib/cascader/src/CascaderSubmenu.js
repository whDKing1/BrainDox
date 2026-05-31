"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
const CascaderOption_1 = __importDefault(require("./CascaderOption"));
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'CascaderSubmenu',
    props: {
        depth: {
            type: Number,
            required: true
        },
        tmNodes: {
            type: Array,
            required: true
        }
    },
    setup() {
        const { virtualScrollRef, mergedClsPrefixRef, mergedThemeRef, optionHeightRef } = (0, vue_1.inject)(interface_1.cascaderInjectionKey);
        const scrollbarInstRef = (0, vue_1.ref)(null);
        const vlInstRef = (0, vue_1.ref)(null);
        const inst = {
            scroll(index, elSize) {
                var _a, _b;
                if (virtualScrollRef.value) {
                    (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo({
                        index
                    });
                }
                else {
                    (_b = scrollbarInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo({
                        index,
                        elSize
                    });
                }
            }
        };
        return Object.assign({ mergedClsPrefix: mergedClsPrefixRef, mergedTheme: mergedThemeRef, scrollbarInstRef,
            vlInstRef, virtualScroll: virtualScrollRef, itemSize: (0, vue_1.computed)(() => (0, seemly_1.depx)(optionHeightRef.value)), handleVlScroll: () => {
                var _a;
                (_a = scrollbarInstRef.value) === null || _a === void 0 ? void 0 : _a.sync();
            }, getVlContainer: () => {
                var _a;
                return (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.listElRef;
            }, getVlContent: () => {
                var _a;
                return (_a = vlInstRef.value) === null || _a === void 0 ? void 0 : _a.itemsElRef;
            } }, inst);
    },
    render() {
        const { mergedClsPrefix, mergedTheme, virtualScroll } = this;
        return ((0, vue_1.h)("div", { class: [
                virtualScroll && `${mergedClsPrefix}-cascader-submenu--virtual`,
                `${mergedClsPrefix}-cascader-submenu`
            ] },
            (0, vue_1.h)(_internal_1.NScrollbar, { ref: "scrollbarInstRef", theme: mergedTheme.peers.Scrollbar, themeOverrides: mergedTheme.peerOverrides.Scrollbar, container: virtualScroll ? this.getVlContainer : undefined, content: virtualScroll ? this.getVlContent : undefined }, {
                default: () => virtualScroll ? ((0, vue_1.h)(vueuc_1.VirtualList, { items: this.tmNodes, itemSize: this.itemSize, onScroll: this.handleVlScroll, showScrollbar: false, ref: "vlInstRef" }, {
                    default: ({ item: tmNode }) => ((0, vue_1.h)(CascaderOption_1.default, { key: tmNode.key, tmNode: tmNode }))
                })) : (this.tmNodes.map(tmNode => ((0, vue_1.h)(CascaderOption_1.default, { key: tmNode.key, tmNode: tmNode }))))
            })));
    }
});
