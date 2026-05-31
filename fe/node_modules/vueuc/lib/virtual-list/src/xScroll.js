"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupXScroll = setupXScroll;
const vue_1 = require("vue");
const vooks_1 = require("vooks");
const shared_1 = require("../../shared");
const context_1 = require("./context");
function setupXScroll({ columnsRef, renderColRef, renderItemWithColsRef }) {
    const listWidthRef = (0, vue_1.ref)(0);
    const scrollLeftRef = (0, vue_1.ref)(0);
    const xFinweckTreeRef = (0, vue_1.computed)(() => {
        const columns = columnsRef.value;
        if (columns.length === 0) {
            return null;
        }
        const ft = new shared_1.FinweckTree(columns.length, 0);
        columns.forEach((column, index) => {
            ft.add(index, column.width);
        });
        return ft;
    });
    const startIndexRef = (0, vooks_1.useMemo)(() => {
        const xFinweckTree = xFinweckTreeRef.value;
        if (xFinweckTree !== null) {
            return Math.max(xFinweckTree.getBound(scrollLeftRef.value) - 1, 0);
        }
        else {
            return 0;
        }
    });
    const getLeft = (index) => {
        const xFinweckTree = xFinweckTreeRef.value;
        if (xFinweckTree !== null) {
            return xFinweckTree.sum(index);
        }
        else {
            return 0;
        }
    };
    const endIndexRef = (0, vooks_1.useMemo)(() => {
        const xFinweckTree = xFinweckTreeRef.value;
        if (xFinweckTree !== null) {
            return Math.min(xFinweckTree.getBound(scrollLeftRef.value + listWidthRef.value) + 1, columnsRef.value.length - 1);
        }
        else {
            return 0;
        }
    });
    (0, vue_1.provide)(context_1.xScrollInjextionKey, {
        startIndexRef,
        endIndexRef,
        columnsRef,
        renderColRef,
        renderItemWithColsRef,
        getLeft
    });
    return {
        listWidthRef,
        scrollLeftRef
    };
}
