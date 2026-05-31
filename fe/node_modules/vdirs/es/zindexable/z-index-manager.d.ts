declare class ZIndexManager {
    elementZIndex: Map<HTMLElement, number>;
    nextZIndex: number;
    constructor();
    get elementCount(): number;
    ensureZIndex(el: HTMLElement, zIndex?: number): void;
    unregister(el: HTMLElement, zIndex?: number): void;
    squashState(): void;
    rearrange(): void;
}
declare const _default: ZIndexManager;
export default _default;
