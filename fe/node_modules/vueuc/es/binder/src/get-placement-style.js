const oppositionPositions = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};
const oppositeAligns = {
    start: 'end',
    center: 'center',
    end: 'start'
};
const propToCompare = {
    top: 'height',
    bottom: 'height',
    left: 'width',
    right: 'width'
};
const transformOrigins = {
    'bottom-start': 'top left',
    bottom: 'top center',
    'bottom-end': 'top right',
    'top-start': 'bottom left',
    top: 'bottom center',
    'top-end': 'bottom right',
    'right-start': 'top left',
    right: 'center left',
    'right-end': 'bottom left',
    'left-start': 'top right',
    left: 'center right',
    'left-end': 'bottom right'
};
const overlapTransformOrigin = {
    'bottom-start': 'bottom left',
    bottom: 'bottom center',
    'bottom-end': 'bottom right',
    'top-start': 'top left',
    top: 'top center',
    'top-end': 'top right',
    'right-start': 'top right',
    right: 'center right',
    'right-end': 'bottom right',
    'left-start': 'top left',
    left: 'center left',
    'left-end': 'bottom left'
};
const oppositeAlignCssPositionProps = {
    'bottom-start': 'right',
    'bottom-end': 'left',
    'top-start': 'right',
    'top-end': 'left',
    'right-start': 'bottom',
    'right-end': 'top',
    'left-start': 'bottom',
    'left-end': 'top'
};
const keepOffsetDirection = {
    top: true, // top++
    bottom: false, // top--
    left: true, // left++
    right: false // left--
};
const cssPositionToOppositeAlign = {
    top: 'end',
    bottom: 'start',
    left: 'end',
    right: 'start'
};
export function getPlacementAndOffsetOfFollower(placement, targetRect, followerRect, shift, flip, overlap) {
    if (!flip || overlap) {
        return { placement: placement, top: 0, left: 0 };
    }
    const [position, align] = placement.split('-');
    let properAlign = align !== null && align !== void 0 ? align : 'center';
    let properOffset = {
        top: 0,
        left: 0
    };
    const deriveOffset = (oppositeAlignCssSizeProp, alignCssPositionProp, offsetVertically) => {
        let left = 0;
        let top = 0;
        const diff = followerRect[oppositeAlignCssSizeProp] -
            targetRect[alignCssPositionProp] -
            targetRect[oppositeAlignCssSizeProp];
        if (diff > 0 && shift) {
            if (offsetVertically) {
                //       screen border
                // |-----------------------------------------|
                // |                    | f  |               |
                // |                    | o  |               |
                // |                    | l  |               |
                // |                    | l  |----           |
                // |                    | o  |tar |          |
                // |                    | w  |get |          |
                // |                    | e  |    |          |
                // |                    | r  |----           |
                // |                     ----                |
                // |-----------------------------------------|
                top = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            }
            else {
                //       screen border
                // |----------------------------------------|
                // |                                        |
                // |          ----------                    |
                // |          | target |                    |
                // |       ----------------------------------
                // |       |       follower                 |
                // |       ----------------------------------
                // |                                        |
                // |----------------------------------------|
                left = keepOffsetDirection[alignCssPositionProp] ? diff : -diff;
            }
        }
        return {
            left,
            top
        };
    };
    const offsetVertically = position === 'left' || position === 'right';
    // choose proper placement for non-center align
    if (properAlign !== 'center') {
        const oppositeAlignCssPositionProp = oppositeAlignCssPositionProps[placement];
        const currentAlignCssPositionProp = oppositionPositions[oppositeAlignCssPositionProp];
        const oppositeAlignCssSizeProp = propToCompare[oppositeAlignCssPositionProp];
        // if follower rect is larger than target rect in align direction
        // ----------[ target ]---------|
        // ----------[     follower     ]
        if (followerRect[oppositeAlignCssSizeProp] >
            targetRect[oppositeAlignCssSizeProp]) {
            if (
            // current space is not enough
            // ----------[ target ]---------|
            // -------[     follower        ]
            targetRect[oppositeAlignCssPositionProp] +
                targetRect[oppositeAlignCssSizeProp] <
                followerRect[oppositeAlignCssSizeProp]) {
                const followerOverTargetSize = (followerRect[oppositeAlignCssSizeProp] -
                    targetRect[oppositeAlignCssSizeProp]) /
                    2;
                if (targetRect[oppositeAlignCssPositionProp] < followerOverTargetSize ||
                    targetRect[currentAlignCssPositionProp] < followerOverTargetSize) {
                    // opposite align has larger space
                    // -------[ target ]-----------|
                    // -------[     follower     ]-|
                    if (targetRect[oppositeAlignCssPositionProp] <
                        targetRect[currentAlignCssPositionProp]) {
                        properAlign = oppositeAligns[align];
                        properOffset = deriveOffset(oppositeAlignCssSizeProp, currentAlignCssPositionProp, offsetVertically);
                    }
                    else {
                        // ----------------[ target ]----|
                        // --------[   follower     ]----|
                        properOffset = deriveOffset(oppositeAlignCssSizeProp, oppositeAlignCssPositionProp, offsetVertically);
                    }
                }
                else {
                    // 'center' align is better
                    // ------------[ target ]--------|
                    // -------[       follower    ]--|
                    properAlign = 'center';
                }
            }
        }
        else if (followerRect[oppositeAlignCssSizeProp] <
            targetRect[oppositeAlignCssSizeProp]) {
            // TODO: maybe center is better
            if (targetRect[currentAlignCssPositionProp] < 0 &&
                // opposite align has larger space
                // ------------[   target   ]
                // ----------------[follower]
                targetRect[oppositeAlignCssPositionProp] >
                    targetRect[currentAlignCssPositionProp]) {
                properAlign = oppositeAligns[align];
            }
        }
    }
    else {
        const possibleAlternativeAlignCssPositionProp1 = position === 'bottom' || position === 'top' ? 'left' : 'top';
        const possibleAlternativeAlignCssPositionProp2 = oppositionPositions[possibleAlternativeAlignCssPositionProp1];
        const alternativeAlignCssSizeProp = propToCompare[possibleAlternativeAlignCssPositionProp1];
        const followerOverTargetSize = (followerRect[alternativeAlignCssSizeProp] -
            targetRect[alternativeAlignCssSizeProp]) /
            2;
        if (
        // center is not enough
        // ----------- [ target ]--|
        // -------[     follower     ]
        targetRect[possibleAlternativeAlignCssPositionProp1] <
            followerOverTargetSize ||
            targetRect[possibleAlternativeAlignCssPositionProp2] <
                followerOverTargetSize) {
            // alternative 2 position's space is larger
            if (targetRect[possibleAlternativeAlignCssPositionProp1] >
                targetRect[possibleAlternativeAlignCssPositionProp2]) {
                properAlign =
                    cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp1];
                properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp1, offsetVertically);
            }
            else {
                // alternative 1 position's space is larger
                properAlign =
                    cssPositionToOppositeAlign[possibleAlternativeAlignCssPositionProp2];
                properOffset = deriveOffset(alternativeAlignCssSizeProp, possibleAlternativeAlignCssPositionProp2, offsetVertically);
            }
        }
    }
    let properPosition = position;
    if (
    // space is not enough
    targetRect[position] < followerRect[propToCompare[position]] &&
        // opposite position's space is larger
        targetRect[position] < targetRect[oppositionPositions[position]]) {
        properPosition = oppositionPositions[position];
    }
    return {
        placement: properAlign !== 'center'
            ? `${properPosition}-${properAlign}`
            : properPosition,
        left: properOffset.left,
        top: properOffset.top
    };
}
export function getProperTransformOrigin(placement, overlap) {
    if (overlap)
        return overlapTransformOrigin[placement];
    return transformOrigins[placement];
}
// ------------
// |  offset  |
// |          |
// | [target] |
// |          |
// ------------
// TODO: refactor it to remove dup logic
export function getOffset(placement, offsetRect, targetRect, offsetTopToStandardPlacement, offsetLeftToStandardPlacement, overlap) {
    if (overlap) {
        switch (placement) {
            case 'bottom-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-100%)'
                };
            case 'bottom-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-100%)'
                };
            case 'top-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: ''
                };
            case 'top-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%)'
                };
            case 'right-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%)'
                };
            case 'right-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-100%)'
                };
            case 'left-start':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: ''
                };
            case 'left-end':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-100%)'
                };
            case 'top':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                    transform: 'translateX(-50%)'
                };
            case 'right':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width)}px`,
                    transform: 'translateX(-100%) translateY(-50%)'
                };
            case 'left':
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height / 2)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left)}px`,
                    transform: 'translateY(-50%)'
                };
            case 'bottom':
            default:
                return {
                    top: `${Math.round(targetRect.top - offsetRect.top + targetRect.height)}px`,
                    left: `${Math.round(targetRect.left - offsetRect.left + targetRect.width / 2)}px`,
                    transform: 'translateX(-50%) translateY(-100%)'
                };
        }
    }
    switch (placement) {
        case 'bottom-start':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: ''
            };
        case 'bottom-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%)'
            };
        case 'top-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%)'
            };
        case 'top-end':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'right-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: ''
            };
        case 'right-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%)'
            };
        case 'left-start':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%)'
            };
        case 'left-end':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-100%) translateY(-100%)'
            };
        case 'top':
            return {
                top: `${Math.round(targetRect.top - offsetRect.top + offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width / 2 +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-100%) translateX(-50%)'
            };
        case 'right':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height / 2 +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-50%)'
            };
        case 'left':
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height / 2 +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left - offsetRect.left + offsetLeftToStandardPlacement)}px`,
                transform: 'translateY(-50%) translateX(-100%)'
            };
        case 'bottom':
        default:
            return {
                top: `${Math.round(targetRect.top -
                    offsetRect.top +
                    targetRect.height +
                    offsetTopToStandardPlacement)}px`,
                left: `${Math.round(targetRect.left -
                    offsetRect.left +
                    targetRect.width / 2 +
                    offsetLeftToStandardPlacement)}px`,
                transform: 'translateX(-50%)'
            };
    }
}
