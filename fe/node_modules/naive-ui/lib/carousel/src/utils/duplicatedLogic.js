"use strict";
// Because of the nature of the loop slide work,
// we need to add duplicates to the left and right of the carousel
// slot    [ 0 1 2 ]
// display 2 0 1 2 0
// real    0 1 2 3 4
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDuplicateSlides = addDuplicateSlides;
exports.getDisplayIndex = getDisplayIndex;
exports.getRealIndex = getRealIndex;
exports.getPrevIndex = getPrevIndex;
exports.getNextIndex = getNextIndex;
exports.getDisplayTotalView = getDisplayTotalView;
const vue_1 = require("vue");
function addDuplicateSlides(slides) {
    const { length } = slides;
    if (length > 1) {
        slides.push(duplicateSlide(slides[0], 0, 'append'));
        slides.unshift(duplicateSlide(slides[length - 1], length - 1, 'prepend'));
        return slides;
    }
    return slides;
}
function duplicateSlide(child, index, position) {
    return (0, vue_1.cloneVNode)(child, {
        // for patch
        key: `carousel-item-duplicate-${index}-${position}`
    });
}
function getDisplayIndex(current, length, duplicatedable) {
    if (length === 1)
        return 0;
    return !duplicatedable
        ? current
        : current === 0
            ? length - 3
            : current === length - 1
                ? 0
                : current - 1;
}
function getRealIndex(current, duplicatedable) {
    return !duplicatedable ? current : current + 1;
}
function getPrevIndex(current, length, duplicatedable) {
    if (current < 0)
        return null;
    return current === 0 ? (duplicatedable ? length - 1 : null) : current - 1;
}
function getNextIndex(current, length, duplicatedable) {
    if (current > length - 1)
        return null;
    return current === length - 1 ? (duplicatedable ? 0 : null) : current + 1;
}
function getDisplayTotalView(total, duplicatedable) {
    return duplicatedable && total > 3 ? total - 2 : total;
}
