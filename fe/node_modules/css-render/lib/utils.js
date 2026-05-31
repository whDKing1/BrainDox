"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMediaOrSupports = exports.createElement = exports.queryElement = exports.removeElement = void 0;
function removeElement(el) {
    /* istanbul ignore if */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!el)
        return;
    const parentElement = el.parentElement;
    /* istanbul ignore else */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (parentElement)
        parentElement.removeChild(el);
}
exports.removeElement = removeElement;
function queryElement(id, parent) {
    return (parent !== null && parent !== void 0 ? parent : document.head).querySelector(`style[cssr-id="${id}"]`);
}
exports.queryElement = queryElement;
function createElement(id) {
    const el = document.createElement('style');
    el.setAttribute('cssr-id', id);
    return el;
}
exports.createElement = createElement;
function isMediaOrSupports(selector) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!selector)
        return false;
    return /^\s*@(s|m)/.test(selector);
}
exports.isMediaOrSupports = isMediaOrSupports;
