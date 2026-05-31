"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualListRow = void 0;
const vue_1 = require("vue");
const context_1 = require("./context");
exports.VirtualListRow = (0, vue_1.defineComponent)({
    name: 'VirtualListRow',
    props: {
        index: { type: Number, required: true },
        item: {
            type: Object,
            required: true
        }
    },
    setup() {
        const { startIndexRef, endIndexRef, columnsRef, getLeft, renderColRef, renderItemWithColsRef } = 
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (0, vue_1.inject)(context_1.xScrollInjextionKey);
        return {
            startIndex: startIndexRef,
            endIndex: endIndexRef,
            columns: columnsRef,
            renderCol: renderColRef,
            renderItemWithCols: renderItemWithColsRef,
            getLeft
        };
    },
    render() {
        const { startIndex, endIndex, columns, renderCol, renderItemWithCols, getLeft, item } = this;
        if (renderItemWithCols != null) {
            return renderItemWithCols({
                itemIndex: this.index,
                startColIndex: startIndex,
                endColIndex: endIndex,
                allColumns: columns,
                item,
                getLeft
            });
        }
        if (renderCol != null) {
            const items = [];
            for (let i = startIndex; i <= endIndex; ++i) {
                const column = columns[i];
                items.push(renderCol({ column, left: getLeft(i), item }));
            }
            return items;
        }
        return null;
    }
});
