"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const icons_1 = require("../../_internal/icons");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'NTreeSwitcher',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        indent: { type: Number, required: true },
        expanded: Boolean,
        selected: Boolean,
        hide: Boolean,
        loading: Boolean,
        onClick: Function,
        tmNode: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const { renderSwitcherIconRef, spinPropsRef } = (0, vue_1.inject)(interface_1.treeInjectionKey, null);
        return () => {
            const { clsPrefix, expanded, hide, indent, onClick } = props;
            return ((0, vue_1.h)("span", { "data-switcher": true, class: [
                    `${clsPrefix}-tree-node-switcher`,
                    expanded && `${clsPrefix}-tree-node-switcher--expanded`,
                    hide && `${clsPrefix}-tree-node-switcher--hide`
                ], style: { width: `${indent}px` }, onClick: onClick },
                (0, vue_1.h)("div", { class: `${clsPrefix}-tree-node-switcher__icon` },
                    (0, vue_1.h)(_internal_1.NIconSwitchTransition, null, {
                        default: () => {
                            if (props.loading) {
                                return ((0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ clsPrefix: clsPrefix, key: "loading", radius: 85, strokeWidth: 20 }, spinPropsRef === null || spinPropsRef === void 0 ? void 0 : spinPropsRef.value)));
                            }
                            const { value: renderSwitcherIcon } = renderSwitcherIconRef;
                            return renderSwitcherIcon ? (renderSwitcherIcon({
                                expanded: props.expanded,
                                selected: props.selected,
                                option: props.tmNode.rawNode
                            })) : ((0, vue_1.h)(_internal_1.NBaseIcon, { clsPrefix: clsPrefix, key: "switcher" }, { default: () => (0, vue_1.h)(icons_1.SwitcherIcon, null) }));
                        }
                    }))));
        };
    }
});
