"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mount = exports.unmount = void 0;
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
const hash_1 = require("./hash");
const utils_1 = require("./utils");
if (typeof window !== 'undefined') {
    window.__cssrContext = {};
}
function unmount(instance, node, id, parent) {
    const { els } = node;
    // If id is undefined, unmount all styles
    if (id === undefined) {
        els.forEach(utils_1.removeElement);
        node.els = [];
    }
    else {
        const target = (0, utils_1.queryElement)(id, parent);
        // eslint-disable-next-line
        if (target && els.includes(target)) {
            (0, utils_1.removeElement)(target);
            node.els = els.filter((el) => el !== target);
        }
    }
}
exports.unmount = unmount;
function addElementToList(els, target) {
    els.push(target);
}
function mount(instance, node, id, props, head, force, anchorMetaName, parent, ssrAdapter
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    let style;
    if (id === undefined) {
        style = node.render(props);
        id = (0, hash_1.default)(style);
    }
    if (ssrAdapter) {
        ssrAdapter.adapter(id, style !== null && style !== void 0 ? style : node.render(props));
        return;
    }
    if (parent === undefined) {
        parent = document.head;
    }
    const queriedTarget = (0, utils_1.queryElement)(id, parent);
    if (queriedTarget !== null && !force) {
        return queriedTarget;
    }
    const target = queriedTarget !== null && queriedTarget !== void 0 ? queriedTarget : (0, utils_1.createElement)(id);
    if (style === undefined)
        style = node.render(props);
    target.textContent = style;
    if (queriedTarget !== null)
        return queriedTarget;
    if (anchorMetaName) {
        const anchorMetaEl = parent.querySelector(`meta[name="${anchorMetaName}"]`);
        if (anchorMetaEl) {
            parent.insertBefore(target, anchorMetaEl);
            addElementToList(node.els, target);
            return target;
        }
    }
    if (head) {
        parent.insertBefore(target, parent.querySelector('style, link'));
    }
    else {
        parent.appendChild(target);
    }
    addElementToList(node.els, target);
    return target;
}
exports.mount = mount;
