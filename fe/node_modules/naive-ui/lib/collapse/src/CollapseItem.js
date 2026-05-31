"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collapseItemProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _mixins_1 = require("../../_mixins");
const use_rtl_1 = require("../../_mixins/use-rtl");
const _utils_1 = require("../../_utils");
const Collapse_1 = require("./Collapse");
const CollapseItemContent_1 = __importDefault(require("./CollapseItemContent"));
exports.collapseItemProps = {
    title: String,
    name: [String, Number],
    disabled: Boolean,
    displayDirective: String
};
exports.default = (0, vue_1.defineComponent)({
    name: 'CollapseItem',
    props: exports.collapseItemProps,
    setup(props) {
        const { mergedRtlRef } = (0, _mixins_1.useConfig)(props);
        const randomName = (0, seemly_1.createId)();
        const mergedNameRef = (0, vooks_1.useMemo)(() => {
            var _a;
            return (_a = props.name) !== null && _a !== void 0 ? _a : randomName;
        });
        const NCollapse = (0, vue_1.inject)(Collapse_1.collapseInjectionKey);
        if (!NCollapse) {
            (0, _utils_1.throwError)('collapse-item', '`n-collapse-item` must be placed inside `n-collapse`.');
        }
        const { expandedNamesRef, props: collapseProps, mergedClsPrefixRef, slots: collapseSlots } = NCollapse;
        const collapsedRef = (0, vue_1.computed)(() => {
            const { value: expandedNames } = expandedNamesRef;
            if (Array.isArray(expandedNames)) {
                const { value: name } = mergedNameRef;
                return !~expandedNames.findIndex(expandedName => expandedName === name);
            }
            else if (expandedNames) {
                const { value: name } = mergedNameRef;
                return name !== expandedNames;
            }
            return true;
        });
        const rtlEnabledRef = (0, use_rtl_1.useRtl)('Collapse', mergedRtlRef, mergedClsPrefixRef);
        return {
            rtlEnabled: rtlEnabledRef,
            collapseSlots,
            randomName,
            mergedClsPrefix: mergedClsPrefixRef,
            collapsed: collapsedRef,
            triggerAreas: (0, vue_1.toRef)(collapseProps, 'triggerAreas'),
            mergedDisplayDirective: (0, vue_1.computed)(() => {
                const { displayDirective } = props;
                if (displayDirective) {
                    return displayDirective;
                }
                else {
                    return collapseProps.displayDirective;
                }
            }),
            arrowPlacement: (0, vue_1.computed)(() => {
                return collapseProps.arrowPlacement;
            }),
            handleClick(e) {
                let happensInArea = 'main';
                if ((0, seemly_1.happensIn)(e, 'arrow'))
                    happensInArea = 'arrow';
                if ((0, seemly_1.happensIn)(e, 'extra'))
                    happensInArea = 'extra';
                if (!collapseProps.triggerAreas.includes(happensInArea)) {
                    return;
                }
                if (NCollapse && !props.disabled) {
                    NCollapse.toggleItem(collapsedRef.value, mergedNameRef.value, e);
                }
            }
        };
    },
    render() {
        const { collapseSlots, $slots, arrowPlacement, collapsed, mergedDisplayDirective, mergedClsPrefix, disabled, triggerAreas } = this;
        const headerNode = (0, _utils_1.resolveSlotWithTypedProps)($slots.header, { collapsed }, () => [this.title]);
        const headerExtraSlot = $slots['header-extra'] || collapseSlots['header-extra'];
        const arrowSlot = $slots.arrow || collapseSlots.arrow;
        return ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-collapse-item`,
                `${mergedClsPrefix}-collapse-item--${arrowPlacement}-arrow-placement`,
                disabled && `${mergedClsPrefix}-collapse-item--disabled`,
                !collapsed && `${mergedClsPrefix}-collapse-item--active`,
                triggerAreas.map((area) => {
                    return `${mergedClsPrefix}-collapse-item--trigger-area-${area}`;
                })
            ] },
            (0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-collapse-item__header`,
                    !collapsed && `${mergedClsPrefix}-collapse-item__header--active`
                ] },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-collapse-item__header-main`, onClick: this.handleClick },
                    arrowPlacement === 'right' && headerNode,
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-collapse-item-arrow`, key: this.rtlEnabled ? 0 : 1, "data-arrow": true }, (0, _utils_1.resolveSlotWithTypedProps)(arrowSlot, { collapsed }, () => [
                        (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: mergedClsPrefix }, {
                            default: () => this.rtlEnabled ? (0, vue_1.h)(icons_1.ChevronLeftIcon, null) : (0, vue_1.h)(icons_1.ChevronRightIcon, null)
                        })
                    ])),
                    arrowPlacement === 'left' && headerNode),
                (0, _utils_1.resolveWrappedSlotWithProps)(headerExtraSlot, { collapsed }, children => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-collapse-item__header-extra`, onClick: this.handleClick, "data-extra": true }, children)))),
            (0, vue_1.h)(CollapseItemContent_1.default, { clsPrefix: mergedClsPrefix, displayDirective: mergedDisplayDirective, show: !collapsed }, $slots)));
    }
});
