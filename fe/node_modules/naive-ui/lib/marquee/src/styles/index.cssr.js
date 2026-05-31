"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-play
// --n-direction
// --n-duration
// --n-delay
// --n-iteration-count
// --n-min-width
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('marquee', `
 overflow: hidden;
 display: flex;
 `, [(0, cssr_1.cE)('group', `
 flex: 0 0 auto;
 min-width: var(--n-min-width);
 z-index: 1;
 display: flex;
 flex-direction: row;
 align-items: center;
 animation: n-marquee var(--n-duration) linear var(--n-delay) var(--n-iteration-count);
 animation-play-state: var(--n-play);
 animation-delay: var(--n-delay);
 animation-direction: var(--n-direction);
 `), (0, cssr_1.cNotM)('auto-fill', [(0, cssr_1.cE)('group', `min-width: 100%;`), (0, cssr_1.cE)('item', `min-width: 100%;`)])]), (0, cssr_1.c)('@keyframes n-marquee', {
  from: {
    transform: 'translateX(0)'
  },
  to: {
    transform: 'translateX(-100%)'
  }
})]);