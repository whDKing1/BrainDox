"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMenuChildProps = void 0;
exports.useMenuChildProps = {
    internalKey: {
        type: [String, Number],
        required: true
    },
    root: Boolean,
    isGroup: Boolean,
    level: {
        type: Number,
        required: true
    },
    title: [String, Function],
    extra: [String, Function]
};
