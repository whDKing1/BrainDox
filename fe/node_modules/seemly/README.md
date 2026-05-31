# seemly
Util functions for creating user interface.

## Installation
```bash
npm install --save-dev seemly
```

## Usage
```js
import { xxx } from 'seemly'
```

## API
### Animation
#### `beforeNextFrame(callback: Function): void`
Call the callback function before next frame.

#### `beforeNextFrameOnce(callback: Function): void`
Call the callback function before next frame. Same function won't be called more than once.

### Color
In the following functions, `RGBA` is `[number, number, number, number]`, `RGB` is `[number, number, number]`.
#### `rgba (color: string): RGBA`
Get the rgba value of a string color.

Color could only be `#000`, `#0000`, `#000000`, `#00000000`, `rgb(0, 0, 0)`, `rgba(0, 0, 0, 0)` formatted.

#### `composite (background: string | RGB | RGBA, overlay: string | RGB | RGBA): string`
Get the rgba formatted string of composited color of the two color.

For example: `composite('#FFF', 'rgba(0, 0, 0, .5)') === 'rgba(127, 127, 127, 1)'`, `composite('rgba(255, 255, 255, .5)', 'rgba(0, 0, 0, .5)') === 'rgba(85, 85, 85, 0.75)'`.


### CSS
#### `depx (value: string | number): number`
Remove the `'px'` of the input value and get the number value of it.

For example: `depx('1px') === 1`, `depx('1') === 1`, `depx(1) === 1`.
#### `pxfy (value: string | number): string`
Append the `'px'` on the input value.

For example: `pxfy(1) === '1px'`, `pxfy('1') === '1px'`, `'pxfy('1px') === '1px')`.

#### `parseResponsiveProp (responsiveProp: string): Record<string, string>`
Transform a css utility class to a js object.

For example: `parseResponsiveProp('6 m:12 l:24')` is `{ '': 6, m: '12', l: '24' }`

#### `parseResponsivePropValue (responsiveProp: string, activeKey: string): string | undefined`
Get corresponding value by key.

For example: `parseResponsiveProp('6 m:12 l:24', 'l')` is `'24'`. `parseResponsiveProp('6 m:12 l:24')`, `parseResponsiveProp('6 m:12 l:24', 'x')` are `'6'`.

### DOM
#### `getScrollParent (node: Node | null): HTMLElement | Document | null`
Get the scrollable parent node of current node.

#### `unwrapElement (target: HTMLElement | string | () => HTMLElement): HTMLElement | null`
Unwrap the HTMLElement from a element getter function or a element selector.

If the `target` is already a HTMLElement, the same value will be returned.


### Misc
#### `createId (length: number = 8): string`
Get a unique random id with length of `length`.


