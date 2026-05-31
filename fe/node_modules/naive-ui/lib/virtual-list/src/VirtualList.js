"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.virtualListProps = void 0;
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _internal_1 = require("../../_internal");
exports.virtualListProps = {
    scrollbarProps: Object,
    items: {
        type: Array,
        default: () => []
    },
    itemSize: {
        type: Number,
        required: true
    },
    itemResizable: Boolean,
    itemsStyle: [String, Object],
    visibleItemsTag: {
        type: [String, Object],
        default: 'div'
    },
    visibleItemsProps: Object,
    ignoreItemResize: Boolean,
    onScroll: Function,
    onWheel: Function,
    onResize: Function,
    defaultScrollKey: [Number, String],
    defaultScrollIndex: Number,
    keyField: {
        type: String,
        default: 'key'
    },
    paddingTop: {
        type: [Number, String],
        default: 0
    },
    paddingBottom: {
        type: [Number, String],
        default: 0
    }
};
exports.default = (0, vue_1.defineComponent)({
    name: 'VirtualList',
    props: exports.virtualListProps,
    setup(props) {
        const scrollbarInstRef = (0, vue_1.ref)(null);
        const virtualListInstRef = (0, vue_1.ref)(null);
        function syncScrollbar() {
            const { value: scrollbarInst } = scrollbarInstRef;
            if (scrollbarInst)
                scrollbarInst.sync();
        }
        function handleScroll(e) {
            var _a;
            syncScrollbar();
            (_a = props.onScroll) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function handleResize(e) {
            var _a;
            syncScrollbar();
            (_a = props.onResize) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function handleWheel(e) {
            var _a;
            (_a = props.onWheel) === null || _a === void 0 ? void 0 : _a.call(props, e);
        }
        function scrollTo(options, y) {
            var _a, _b;
            if (typeof options === 'number') {
                (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(options, y !== null && y !== void 0 ? y : 0);
            }
            else {
                (_b = virtualListInstRef.value) === null || _b === void 0 ? void 0 : _b.scrollTo(options);
            }
        }
        function getScrollContainer() {
            var _a;
            return (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.listElRef;
        }
        function getScrollContent() {
            var _a;
            return (_a = virtualListInstRef.value) === null || _a === void 0 ? void 0 : _a.itemsElRef;
        }
        return {
            scrollTo,
            scrollbarInstRef,
            virtualListInstRef,
            getScrollContainer,
            getScrollContent,
            handleScroll,
            handleResize,
            handleWheel
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NxScrollbar, Object.assign({}, this.scrollbarProps, { ref: "scrollbarInstRef", container: this.getScrollContainer, content: this.getScrollContent }), {
            default: () => {
                return ((0, vue_1.h)(vueuc_1.VVirtualList, { ref: "virtualListInstRef", showScrollbar: false, items: this.items, itemSize: this.itemSize, itemResizable: this.itemResizable, itemsStyle: this.itemsStyle, visibleItemsTag: this.visibleItemsTag, visibleItemsProps: this.visibleItemsProps, ignoreItemResize: this.ignoreItemResize, keyField: this.keyField, defaultScrollKey: this.defaultScrollKey, defaultScrollIndex: this.defaultScrollIndex, paddingTop: this.paddingTop, paddingBottom: this.paddingBottom, onScroll: this.handleScroll, onResize: this.handleResize, onWheel: this.handleWheel }, {
                    default: ({ item, index }) => { var _a, _b; return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, { item, index }); }
                }));
            }
        }));
    }
});
