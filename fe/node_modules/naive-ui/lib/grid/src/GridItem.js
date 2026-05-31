"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridItemPropKeys = exports.gridItemProps = exports.defaultSpan = void 0;
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const config_1 = require("./config");
exports.defaultSpan = 1;
exports.gridItemProps = {
    span: {
        type: [Number, String],
        default: exports.defaultSpan
    },
    offset: {
        type: [Number, String],
        default: 0
    },
    suffix: Boolean,
    // private props
    privateOffset: Number,
    privateSpan: Number,
    privateColStart: Number,
    privateShow: {
        type: Boolean,
        default: true
    }
};
exports.gridItemPropKeys = (0, _utils_1.keysOf)(exports.gridItemProps);
exports.default = (0, vue_1.defineComponent)({
    __GRID_ITEM__: true,
    name: 'GridItem',
    alias: ['Gi'],
    props: exports.gridItemProps,
    setup() {
        const { isSsrRef, xGapRef, itemStyleRef, overflowRef, layoutShiftDisabledRef } = (0, vue_1.inject)(config_1.gridInjectionKey);
        const self = (0, vue_1.getCurrentInstance)();
        return {
            overflow: overflowRef,
            itemStyle: itemStyleRef,
            layoutShiftDisabled: layoutShiftDisabledRef,
            mergedXGap: (0, vue_1.computed)(() => {
                return (0, seemly_1.pxfy)(xGapRef.value || 0);
            }),
            deriveStyle: () => {
                void isSsrRef.value;
                // Here is quite a hack, I hope there is a better way to solve it
                const { privateSpan = exports.defaultSpan, privateShow = true, privateColStart = undefined, privateOffset = 0 } = self.vnode.props;
                const { value: xGap } = xGapRef;
                const mergedXGap = (0, seemly_1.pxfy)(xGap || 0);
                return {
                    display: !privateShow ? 'none' : '',
                    gridColumn: `${privateColStart !== null && privateColStart !== void 0 ? privateColStart : `span ${privateSpan}`} / span ${privateSpan}`,
                    marginLeft: privateOffset
                        ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})`
                        : ''
                };
            }
        };
    },
    render() {
        var _a, _b;
        if (this.layoutShiftDisabled) {
            const { span, offset, mergedXGap } = this;
            return ((0, vue_1.h)("div", { style: {
                    gridColumn: `span ${span} / span ${span}`,
                    marginLeft: offset
                        ? `calc((100% - (${span} - 1) * ${mergedXGap}) / ${span} * ${offset} + ${mergedXGap} * ${offset})`
                        : ''
                } }, this.$slots));
        }
        return ((0, vue_1.h)("div", { style: [this.itemStyle, this.deriveStyle()] }, (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a, { overflow: this.overflow })));
    }
});
