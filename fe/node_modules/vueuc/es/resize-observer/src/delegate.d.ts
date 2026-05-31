import { ResizeObserver as PolyfillResizeObserver } from '@juggle/resize-observer';
type ResizeHandler = (entry: ResizeObserverEntry) => void;
declare class ResizeObserverDelegate {
    elHandlersMap: Map<Element, ResizeHandler>;
    observer: PolyfillResizeObserver;
    constructor();
    handleResize(this: ResizeObserverDelegate, entries: ResizeObserverEntry[]): void;
    registerHandler(el: Element, handler: ResizeHandler): void;
    unregisterHandler(el: Element): void;
}
declare const _default: ResizeObserverDelegate;
export default _default;
