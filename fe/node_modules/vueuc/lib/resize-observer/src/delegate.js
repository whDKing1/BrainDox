"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resize_observer_1 = require("@juggle/resize-observer");
class ResizeObserverDelegate {
    constructor() {
        this.handleResize = this.handleResize.bind(this);
        this.observer = new ((typeof window !== 'undefined' &&
            window.ResizeObserver) ||
            resize_observer_1.ResizeObserver)(this.handleResize);
        this.elHandlersMap = new Map();
    }
    handleResize(entries) {
        for (const entry of entries) {
            const handler = this.elHandlersMap.get(entry.target);
            if (handler !== undefined) {
                handler(entry);
            }
        }
    }
    registerHandler(el, handler) {
        this.elHandlersMap.set(el, handler);
        this.observer.observe(el);
    }
    unregisterHandler(el) {
        if (!this.elHandlersMap.has(el)) {
            return;
        }
        this.elHandlersMap.delete(el);
        this.observer.unobserve(el);
    }
}
exports.default = new ResizeObserverDelegate();
