"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const fade_in_scale_up_cssr_1 = require("../../../_styles/transitions/fade-in-scale-up.cssr");
const cssr_1 = require("../../../_utils/cssr");
// vars:
// --n-bezier
// --n-icon-color-override
// --n-icon-color-disabled-override
// --n-panel-border-radius
// --n-panel-color
// --n-panel-box-shadow
// --n-panel-text-color
// panel header
// --n-panel-header-padding
// --n-panel-header-divider-color
// panel calendar
// --n-calendar-left-padding
// --n-calendar-right-padding
// --n-calendar-title-color-hover
// --n-calendar-title-height
// --n-calendar-title-padding
// --n-calendar-title-font-size
// --n-calendar-title-text-color
// --n-calendar-title-font-weight
// --n-calendar-title-grid-template-columns
// --n-calendar-days-height
// --n-calendar-days-divider-color
// --n-calendar-days-font-size
// --n-calendar-days-text-color
// --n-calendar-divider-color
// panel action
// --n-panel-action-padding
// --n-panel-action-divider-color
// panel item
// --n-item-border-radius
// --n-item-size
// --n-item-cell-width
// --n-item-cell-height
// --n-item-text-color
// --n-item-color-included
// --n-item-color-disabled
// --n-item-color-hover
// --n-item-color-active
// --n-item-font-size
// --n-item-text-color-disabled
// --n-item-text-color-active
// scroll item
// --n-scroll-item-width
// --n-scroll-item-height
// --n-scroll-item-border-radius
// panel arrow
// --n-arrow-size
// --n-arrow-color
exports.default = (0, cssr_1.c)([(0, cssr_1.cB)('date-picker', `
 position: relative;
 z-index: auto;
 `, [(0, cssr_1.cB)('date-picker-icon', `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.cB)('icon', `
 color: var(--n-icon-color-override);
 transition: color .3s var(--n-bezier);
 `), (0, cssr_1.cM)('disabled', [(0, cssr_1.cB)('date-picker-icon', `
 color: var(--n-icon-color-disabled-override);
 `), (0, cssr_1.cB)('icon', `
 color: var(--n-icon-color-disabled-override);
 `)])]), (0, cssr_1.cB)('date-panel', `
 width: fit-content;
 outline: none;
 margin: 4px 0;
 display: grid;
 grid-template-columns: 0fr;
 border-radius: var(--n-panel-border-radius);
 background-color: var(--n-panel-color);
 color: var(--n-panel-text-color);
 user-select: none;
 `, [(0, fade_in_scale_up_cssr_1.fadeInScaleUpTransition)(), (0, cssr_1.cM)('shadow', `
 box-shadow: var(--n-panel-box-shadow);
 `), (0, cssr_1.cB)('date-panel-calendar', {
  padding: 'var(--n-calendar-left-padding)',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridArea: 'left-calendar'
}, [(0, cssr_1.cM)('end', {
  padding: 'var(--n-calendar-right-padding)',
  gridArea: 'right-calendar'
})]), (0, cssr_1.cB)('date-panel-month-calendar', {
  display: 'flex',
  gridArea: 'left-calendar'
}, [(0, cssr_1.cE)('picker-col', `
 min-width: var(--n-scroll-item-width);
 height: calc(var(--n-scroll-item-height) * 6);
 user-select: none;
 -webkit-user-select: none;
 `, [(0, cssr_1.c)('&:first-child', `
 min-width: calc(var(--n-scroll-item-width) + 4px);
 `, [(0, cssr_1.cE)('picker-col-item', [(0, cssr_1.c)('&::before', 'left: 4px;')])]), (0, cssr_1.cE)('padding', `
 height: calc(var(--n-scroll-item-height) * 5)
 `)]), (0, cssr_1.cE)('picker-col-item', `
 z-index: 0;
 cursor: pointer;
 height: var(--n-scroll-item-height);
 box-sizing: border-box;
 padding-top: 4px;
 display: flex;
 align-items: center;
 justify-content: center;
 position: relative;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background: #0000;
 color: var(--n-item-text-color);
 `, [(0, cssr_1.c)('&::before', `
 z-index: -1;
 content: "";
 position: absolute;
 left: 0;
 right: 4px;
 top: 4px;
 bottom: 0;
 border-radius: var(--n-scroll-item-border-radius);
 transition: 
 background-color .3s var(--n-bezier);
 `), (0, cssr_1.cNotM)('disabled', [(0, cssr_1.c)('&:hover::before', `
 background-color: var(--n-item-color-hover);
 `), (0, cssr_1.cM)('selected', `
 color: var(--n-item-color-active);
 `, [(0, cssr_1.c)('&::before', 'background-color: var(--n-item-color-hover);')])]), (0, cssr_1.cM)('disabled', `
 color: var(--n-item-text-color-disabled);
 cursor: not-allowed;
 `, [(0, cssr_1.cM)('selected', [(0, cssr_1.c)('&::before', `
 background-color: var(--n-item-color-disabled);
 `)])])])]), (0, cssr_1.cM)('date', {
  gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
}), (0, cssr_1.cM)('week', {
  gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
}), (0, cssr_1.cM)('daterange', {
  gridTemplateAreas: `
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 `
}), (0, cssr_1.cM)('datetime', {
  gridTemplateAreas: `
 "header"
 "left-calendar"
 "footer"
 "action"
 `
}), (0, cssr_1.cM)('datetimerange', {
  gridTemplateAreas: `
 "header header header"
 "left-calendar divider right-calendar"
 "footer footer footer"
 "action action action"
 `
}), (0, cssr_1.cM)('month', {
  gridTemplateAreas: `
 "left-calendar"
 "footer"
 "action"
 `
}), (0, cssr_1.cB)('date-panel-footer', {
  gridArea: 'footer'
}), (0, cssr_1.cB)('date-panel-actions', {
  gridArea: 'action'
}), (0, cssr_1.cB)('date-panel-header', {
  gridArea: 'header'
}), (0, cssr_1.cB)('date-panel-header', `
 box-sizing: border-box;
 width: 100%;
 align-items: center;
 padding: var(--n-panel-header-padding);
 display: flex;
 justify-content: space-between;
 border-bottom: 1px solid var(--n-panel-header-divider-color);
 `, [(0, cssr_1.c)('>', [(0, cssr_1.c)('*:not(:last-child)', {
  marginRight: '10px'
}), (0, cssr_1.c)('*', {
  flex: 1,
  width: 0
}), (0, cssr_1.cB)('time-picker', {
  zIndex: 1
})])]), (0, cssr_1.cB)('date-panel-month', `
 box-sizing: border-box;
 display: grid;
 grid-template-columns: var(--n-calendar-title-grid-template-columns);
 align-items: center;
 justify-items: center;
 padding: var(--n-calendar-title-padding);
 height: var(--n-calendar-title-height);
 `, [(0, cssr_1.cE)('prev, next, fast-prev, fast-next', `
 line-height: 0;
 cursor: pointer;
 width: var(--n-arrow-size);
 height: var(--n-arrow-size);
 color: var(--n-arrow-color);
 `), (0, cssr_1.cE)('month-year', `
 user-select: none;
 -webkit-user-select: none;
 flex-grow: 1;
 position: relative;
 `, [(0, cssr_1.cE)('text', `
 font-size: var(--n-calendar-title-font-size);
 line-height: var(--n-calendar-title-font-size);
 font-weight: var(--n-calendar-title-font-weight);
 padding: 6px 8px;
 text-align: center;
 color: var(--n-calendar-title-text-color);
 cursor: pointer;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-panel-border-radius);
 `, [(0, cssr_1.cM)('active', `
 background-color: var(--n-calendar-title-color-hover);
 `), (0, cssr_1.c)('&:hover', `
 background-color: var(--n-calendar-title-color-hover);
 `)])])]), (0, cssr_1.cB)('date-panel-weekdays', `
 display: grid;
 margin: auto;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(1, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 margin-bottom: 4px;
 border-bottom: 1px solid var(--n-calendar-days-divider-color);
 `, [(0, cssr_1.cE)('day', `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 line-height: 15px;
 width: var(--n-item-size);
 text-align: center;
 font-size: var(--n-calendar-days-font-size);
 color: var(--n-item-text-color);
 display: flex;
 align-items: center;
 justify-content: center;
 `)]), (0, cssr_1.cB)('date-panel-dates', `
 margin: auto;
 display: grid;
 grid-template-columns: repeat(7, var(--n-item-cell-width));
 grid-template-rows: repeat(6, var(--n-item-cell-height));
 align-items: center;
 justify-items: center;
 flex-wrap: wrap;
 `, [(0, cssr_1.cB)('date-panel-date', `
 user-select: none;
 -webkit-user-select: none;
 position: relative;
 width: var(--n-item-size);
 height: var(--n-item-size);
 line-height: var(--n-item-size);
 text-align: center;
 font-size: var(--n-item-font-size);
 border-radius: var(--n-item-border-radius);
 z-index: 0;
 cursor: pointer;
 transition:
 background-color .2s var(--n-bezier),
 color .2s var(--n-bezier);
 `, [(0, cssr_1.cE)('trigger', `
 position: absolute;
 left: calc(var(--n-item-size) / 2 - var(--n-item-cell-width) / 2);
 top: calc(var(--n-item-size) / 2 - var(--n-item-cell-height) / 2);
 width: var(--n-item-cell-width);
 height: var(--n-item-cell-height);
 `), (0, cssr_1.cM)('current', [(0, cssr_1.cE)('sup', `
 position: absolute;
 top: 2px;
 right: 2px;
 content: "";
 height: 4px;
 width: 4px;
 border-radius: 2px;
 background-color: var(--n-item-color-active);
 transition:
 background-color .2s var(--n-bezier);
 `)]), (0, cssr_1.c)('&::after', `
 content: "";
 z-index: -1;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 transition: background-color .3s var(--n-bezier);
 `), (0, cssr_1.cM)('covered, start, end', [(0, cssr_1.cNotM)('excluded', [(0, cssr_1.c)('&::before', `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 background-color: var(--n-item-color-included);
 `), (0, cssr_1.c)('&:nth-child(7n + 1)::before', {
  borderTopLeftRadius: 'var(--n-item-border-radius)',
  borderBottomLeftRadius: 'var(--n-item-border-radius)'
}), (0, cssr_1.c)('&:nth-child(7n + 7)::before', {
  borderTopRightRadius: 'var(--n-item-border-radius)',
  borderBottomRightRadius: 'var(--n-item-border-radius)'
})])]), (0, cssr_1.cM)('selected', {
  color: 'var(--n-item-text-color-active)'
}, [(0, cssr_1.c)('&::after', {
  backgroundColor: 'var(--n-item-color-active)'
}), (0, cssr_1.cM)('start', [(0, cssr_1.c)('&::before', {
  left: '50%'
})]), (0, cssr_1.cM)('end', [(0, cssr_1.c)('&::before', {
  right: '50%'
})]), (0, cssr_1.cE)('sup', {
  backgroundColor: 'var(--n-panel-color)'
})]), (0, cssr_1.cM)('excluded', {
  color: 'var(--n-item-text-color-disabled)'
}, [(0, cssr_1.cM)('selected', [(0, cssr_1.c)('&::after', {
  backgroundColor: 'var(--n-item-color-disabled)'
})])]), (0, cssr_1.cM)('disabled', {
  cursor: 'not-allowed',
  color: 'var(--n-item-text-color-disabled)'
}, [(0, cssr_1.cM)('covered', [(0, cssr_1.c)('&::before', {
  backgroundColor: 'var(--n-item-color-disabled)'
})]), (0, cssr_1.cM)('selected', [(0, cssr_1.c)('&::before', {
  backgroundColor: 'var(--n-item-color-disabled)'
}), (0, cssr_1.c)('&::after', {
  backgroundColor: 'var(--n-item-color-disabled)'
})])]), (0, cssr_1.cM)('week-hovered', [(0, cssr_1.c)('&::before', `
 background-color: var(--n-item-color-included);
 `), (0, cssr_1.c)('&:nth-child(7n + 1)::before', `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), (0, cssr_1.c)('&:nth-child(7n + 7)::before', `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)]), (0, cssr_1.cM)('week-selected', `
 color: var(--n-item-text-color-active)
 `, [(0, cssr_1.c)('&::before', `
 background-color: var(--n-item-color-active);
 `), (0, cssr_1.c)('&:nth-child(7n + 1)::before', `
 border-top-left-radius: var(--n-item-border-radius);
 border-bottom-left-radius: var(--n-item-border-radius);
 `), (0, cssr_1.c)('&:nth-child(7n + 7)::before', `
 border-top-right-radius: var(--n-item-border-radius);
 border-bottom-right-radius: var(--n-item-border-radius);
 `)])])]), (0, cssr_1.cNotM)('week', [(0, cssr_1.cB)('date-panel-dates', [(0, cssr_1.cB)('date-panel-date', [(0, cssr_1.cNotM)('disabled', [(0, cssr_1.cNotM)('selected', [(0, cssr_1.c)('&:hover', `
 background-color: var(--n-item-color-hover);
 `)])])])])]), (0, cssr_1.cM)('week', [(0, cssr_1.cB)('date-panel-dates', [(0, cssr_1.cB)('date-panel-date', [(0, cssr_1.c)('&::before', `
 content: "";
 z-index: -2;
 position: absolute;
 left: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 right: calc((var(--n-item-size) - var(--n-item-cell-width)) / 2);
 top: 0;
 bottom: 0;
 transition: background-color .3s var(--n-bezier);
 `)])])]), (0, cssr_1.cE)('vertical-divider', `
 grid-area: divider;
 height: 100%;
 width: 1px;
 background-color: var(--n-calendar-divider-color);
 `), (0, cssr_1.cB)('date-panel-footer', `
 border-top: 1px solid var(--n-panel-action-divider-color);
 padding: var(--n-panel-extra-footer-padding);
 `), (0, cssr_1.cB)('date-panel-actions', `
 flex: 1;
 padding: var(--n-panel-action-padding);
 display: flex;
 align-items: center;
 justify-content: space-between;
 border-top: 1px solid var(--n-panel-action-divider-color);
 `, [(0, cssr_1.cE)('prefix, suffix', `
 display: flex;
 margin-bottom: -8px;
 `), (0, cssr_1.cE)('suffix', `
 align-self: flex-end;
 `), (0, cssr_1.cE)('prefix', `
 flex-wrap: wrap;
 `), (0, cssr_1.cB)('button', `
 margin-bottom: 8px;
 `, [(0, cssr_1.c)('&:not(:last-child)', `
 margin-right: 8px;
 `)])])]), (0, cssr_1.c)('[data-n-date].transition-disabled', {
  transition: 'none !important'
}, [(0, cssr_1.c)('&::before, &::after', {
  transition: 'none !important'
})])]);