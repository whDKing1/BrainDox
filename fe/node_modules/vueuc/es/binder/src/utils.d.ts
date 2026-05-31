import { Rect } from './interface';
export declare function ensureViewBoundingRect(): DOMRect;
export declare function getPointRect(x: number, y: number): Rect;
export declare function getRect(el: HTMLElement): Rect;
export declare function getParentNode(node: Node): Node | null;
export declare function getScrollParent(node: Node | null): HTMLElement | Document | null;
