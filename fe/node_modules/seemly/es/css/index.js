export function depx(value) {
    if (typeof value === 'string') {
        if (value.endsWith('px')) {
            return Number(value.slice(0, value.length - 2));
        }
        return Number(value);
    }
    return value;
}
function pxfy(value) {
    if (value === undefined || value === null)
        return undefined;
    if (typeof value === 'number')
        return `${value}px`;
    if (value.endsWith('px'))
        return value;
    return `${value}px`;
}
export { pxfy };
function getMargin(value, position) {
    const parts = value.trim().split(/\s+/g);
    const margin = {
        top: parts[0]
    };
    switch (parts.length) {
        case 1:
            margin.right = parts[0];
            margin.bottom = parts[0];
            margin.left = parts[0];
            break;
        case 2:
            margin.right = parts[1];
            margin.left = parts[1];
            margin.bottom = parts[0];
            break;
        case 3:
            margin.right = parts[1];
            margin.bottom = parts[2];
            margin.left = parts[1];
            break;
        case 4:
            margin.right = parts[1];
            margin.bottom = parts[2];
            margin.left = parts[3];
            break;
        default:
            throw new Error('[seemly/getMargin]:' + value + ' is not a valid value.');
    }
    if (position === undefined)
        return margin;
    return margin[position];
}
function getGap(value, orient) {
    const [rowGap, colGap] = value.split(' ');
    if (!orient)
        return {
            row: rowGap,
            col: colGap || rowGap
        };
    return orient === 'row' ? rowGap : colGap;
}
export { getMargin, getMargin as getPadding, getGap };
export { parseResponsiveProp, parseResponsivePropValue } from './responsive';
