import { Placement, Rect, TransformOrigin } from './interface';
interface PlacementAndOffset {
    top: number;
    left: number;
    placement: Placement;
}
export declare function getPlacementAndOffsetOfFollower(placement: Placement, targetRect: Rect, followerRect: Rect, shift: boolean, flip: boolean, overlap: boolean): PlacementAndOffset;
export declare function getProperTransformOrigin(placement: Placement, overlap: boolean): TransformOrigin;
interface PlacementOffset {
    top: string;
    left: string;
    transform: string;
}
export declare function getOffset(placement: Placement, offsetRect: Rect, targetRect: Rect, offsetTopToStandardPlacement: number, offsetLeftToStandardPlacement: number, overlap: boolean): PlacementOffset;
export {};
