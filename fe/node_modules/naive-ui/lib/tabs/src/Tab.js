"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabProps = void 0;
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const _utils_1 = require("../../_utils");
const interface_1 = require("./interface");
const TabPane_1 = require("./TabPane");
exports.tabProps = Object.assign({ internalLeftPadded: Boolean, internalAddable: Boolean, internalCreatedByPane: Boolean }, (0, _utils_1.omit)(TabPane_1.tabPaneProps, ['displayDirective']));
exports.default = (0, vue_1.defineComponent)({
    __TAB__: true,
    inheritAttrs: false,
    name: 'Tab',
    props: exports.tabProps,
    setup(props) {
        const { mergedClsPrefixRef, valueRef, typeRef, closableRef, tabStyleRef, addTabStyleRef, tabClassRef, addTabClassRef, tabChangeIdRef, onBeforeLeaveRef, triggerRef, handleAdd, activateTab, handleClose } = (0, vue_1.inject)(interface_1.tabsInjectionKey);
        return {
            trigger: triggerRef,
            mergedClosable: (0, vue_1.computed)(() => {
                if (props.internalAddable)
                    return false;
                const { closable } = props;
                if (closable === undefined)
                    return closableRef.value;
                return closable;
            }),
            style: tabStyleRef,
            addStyle: addTabStyleRef,
            tabClass: tabClassRef,
            addTabClass: addTabClassRef,
            clsPrefix: mergedClsPrefixRef,
            value: valueRef,
            type: typeRef,
            handleClose(e) {
                e.stopPropagation();
                if (props.disabled)
                    return;
                handleClose(props.name);
            },
            activateTab() {
                if (props.disabled)
                    return;
                if (props.internalAddable) {
                    handleAdd();
                    return;
                }
                const { name: nameProp } = props;
                const id = ++tabChangeIdRef.id;
                if (nameProp !== valueRef.value) {
                    const { value: onBeforeLeave } = onBeforeLeaveRef;
                    if (!onBeforeLeave) {
                        activateTab(nameProp);
                    }
                    else {
                        void Promise.resolve(onBeforeLeave(props.name, valueRef.value)).then((allowLeave) => {
                            if (allowLeave && tabChangeIdRef.id === id) {
                                activateTab(nameProp);
                            }
                        });
                    }
                }
            }
        };
    },
    render() {
        const { internalAddable, clsPrefix, name, disabled, label, tab, value, mergedClosable, trigger, $slots: { default: defaultSlot } } = this;
        const mergedTab = label !== null && label !== void 0 ? label : tab;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-tabs-tab-wrapper` },
            this.internalLeftPadded ? ((0, vue_1.h)("div", { class: `${clsPrefix}-tabs-tab-pad` })) : null,
            (0, vue_1.h)("div", Object.assign({ key: name, "data-name": name, "data-disabled": disabled ? true : undefined }, (0, vue_1.mergeProps)({
                class: [
                    `${clsPrefix}-tabs-tab`,
                    value === name && `${clsPrefix}-tabs-tab--active`,
                    disabled && `${clsPrefix}-tabs-tab--disabled`,
                    mergedClosable && `${clsPrefix}-tabs-tab--closable`,
                    internalAddable && `${clsPrefix}-tabs-tab--addable`,
                    internalAddable ? this.addTabClass : this.tabClass
                ],
                onClick: trigger === 'click' ? this.activateTab : undefined,
                onMouseenter: trigger === 'hover' ? this.activateTab : undefined,
                style: internalAddable ? this.addStyle : this.style
            }, this.internalCreatedByPane
                ? (this.tabProps || {})
                : this.$attrs)),
                (0, vue_1.h)("span", { class: `${clsPrefix}-tabs-tab__label` }, internalAddable ? ((0, vue_1.h)(vue_1.Fragment, null,
                    (0, vue_1.h)("div", { class: `${clsPrefix}-tabs-tab__height-placeholder` }, "\u00A0"),
                    (0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix }, {
                        default: () => (0, vue_1.h)(icons_1.AddIcon, null)
                    }))) : defaultSlot ? (defaultSlot()) : typeof mergedTab === 'object' ? (mergedTab // VNode
                ) : ((0, _utils_1.render)(mergedTab !== null && mergedTab !== void 0 ? mergedTab : name))),
                mergedClosable && this.type === 'card' ? ((0, vue_1.h)(_internal_1.NBaseClose, { clsPrefix: clsPrefix, class: `${clsPrefix}-tabs-tab__close`, onClick: this.handleClose, disabled: disabled })) : null)));
    }
});
