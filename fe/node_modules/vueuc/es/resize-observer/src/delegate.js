import { ResizeObserver as PolyfillResizeObserver } from '@juggle/resize-observer';
class ResizeObserverDelegate {
    constructor() {
        this.handleResize = this.handleResize.bind(this);
        this.observer = new ((typeof window !== 'undefined' &&
            window.ResizeObserver) ||
            PolyfillResizeObserver)(this.handleResize);
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
export default new ResizeObserverDelegate();
