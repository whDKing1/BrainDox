"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDocument = isDocument;
function isDocument(node) {
    return node.nodeName === '#document';
}
