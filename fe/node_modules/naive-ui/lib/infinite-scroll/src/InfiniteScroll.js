"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infiniteScrollProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
exports.infiniteScrollProps = {
    distance: {
        type: Number,
        default: 0
    },
    onLoad: Function,
    scrollbarProps: Object
};
exports.default = (0, vue_1.defineComponent)({
    name: 'InfiniteScroll',
    props: exports.infiniteScrollProps,
    setup(props) {
        const scrollbarInstRef = (0, vue_1.ref)(null);
        let loading = false;
        const handleCheckBottom = () => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { value: scrollbarInst } = scrollbarInstRef;
            if (scrollbarInst) {
                const { containerRef } = scrollbarInst;
                const scrollHeight = containerRef === null || containerRef === void 0 ? void 0 : containerRef.scrollHeight;
                const clientHeight = containerRef === null || containerRef === void 0 ? void 0 : containerRef.clientHeight;
                const scrollTop = containerRef === null || containerRef === void 0 ? void 0 : containerRef.scrollTop;
                if (containerRef
                    && scrollHeight !== undefined
                    && clientHeight !== undefined
                    && scrollTop !== undefined) {
                    if (scrollTop + clientHeight >= scrollHeight - props.distance) {
                        loading = true;
                        try {
                            yield ((_a = props.onLoad) === null || _a === void 0 ? void 0 : _a.call(props));
                        }
                        catch (_b) { }
                        loading = false;
                    }
                }
            }
        });
        const handleScroll = () => {
            if (loading)
                return;
            void handleCheckBottom();
        };
        const handleWheel = (e) => {
            if (e.deltaY <= 0)
                return;
            if (loading)
                return;
            void handleCheckBottom();
        };
        return {
            scrollbarInstRef,
            handleScroll,
            handleWheel
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NxScrollbar, Object.assign({}, this.scrollbarProps, { ref: "scrollbarInstRef", onWheel: this.handleWheel, onScroll: this.handleScroll }), {
            default: () => {
                return (0, _utils_1.resolveSlot)(this.$slots.default, () => []);
            }
        }));
    }
});
