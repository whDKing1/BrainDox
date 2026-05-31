/**
 * The original package is https://www.npmjs.com/package/textarea-caret-ts
 * The original file is https://github.com/TheRealSyler/textarea-caret-position/blob/master/index.ts
 *
 * Here I modified it to make it works when input is scrolled.
 */
export interface Position {
    /**
     * position in pixel.
     */
    top: number;
    /**
     * position in pixel.
     */
    left: number;
    /**
     * if true the position is relative to the inner window size, if false the position is relative to itself.
     */
    absolute: boolean;
    /**
     * height in pixel.
     */
    height: number;
}
export interface Point {
    /**
     * left position.
     */
    left: number;
    /**
     * top position.
     */
    top: number;
}
export interface Options {
    /**
     * Enables debug Mode.
     */
    debug?: boolean;
    /**
     * usesSelection End Instead of selection Start.
     */
    useSelectionEnd?: boolean;
    /**
     * if true the left position gets caped if left >= element Width.
     */
    checkWidthOverflow?: boolean;
}
/**
 * Returns the Absolute (relative to the inner window size) position of the caret in the given element.
 * @param element Input (has to be type='text') or Text Area.
 */
export declare function getAbsolutePosition(element: HTMLInputElement | HTMLTextAreaElement): Position;
/**
 * Returns the relative position of the caret in the given element.
 * @param element Input (has to be type='text') or Text Area.
 */
export declare function getRelativePosition(element: HTMLInputElement | HTMLTextAreaElement, options?: Options): Position;
/**
 * sets the top and left css style of the element based on the absolute position of the caretElements caret,
 * @param offset offsets the position.
 * @param detectBoundary offsets the position if the position would be outside the window.
 * @param returnOnly if true the element position wont be set.
 */
export declare function setElementPositionBasedOnCaret(element: HTMLElement, caretElement: HTMLInputElement | HTMLTextAreaElement, offset?: Point, margin?: number, detectBoundary?: boolean, returnOnly?: boolean): Point;
