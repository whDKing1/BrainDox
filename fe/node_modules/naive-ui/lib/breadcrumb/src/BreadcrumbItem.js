"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumbItemProps = void 0;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const use_browser_location_1 = require("../../_utils/composable/use-browser-location");
const Breadcrumb_1 = require("./Breadcrumb");
exports.breadcrumbItemProps = {
    separator: String,
    href: String,
    clickable: {
        type: Boolean,
        default: true
    },
    showSeparator: {
        type: Boolean,
        default: true
    },
    onClick: Function
};
exports.default = (0, vue_1.defineComponent)({
    name: 'BreadcrumbItem',
    props: exports.breadcrumbItemProps,
    slots: Object,
    setup(props, { slots }) {
        const NBreadcrumb = (0, vue_1.inject)(Breadcrumb_1.breadcrumbInjectionKey, null);
        if (!NBreadcrumb) {
            if (process.env.NODE_ENV !== 'production') {
                (0, _utils_1.warn)('breadcrumb', '`n-breadcrumb-item` must be placed inside `n-breadcrumb`.');
            }
            return () => null;
        }
        const { separatorRef, mergedClsPrefixRef } = NBreadcrumb;
        const browserLocationRef = (0, use_browser_location_1.useBrowserLocation)();
        const htmlTagRef = (0, vue_1.computed)(() => (props.href ? 'a' : 'span'));
        const ariaCurrentRef = (0, vue_1.computed)(() => browserLocationRef.value.href === props.href ? 'location' : null);
        return () => {
            const { value: mergedClsPrefix } = mergedClsPrefixRef;
            return ((0, vue_1.h)("li", { class: [
                    `${mergedClsPrefix}-breadcrumb-item`,
                    props.clickable && `${mergedClsPrefix}-breadcrumb-item--clickable`
                ] },
                (0, vue_1.h)(htmlTagRef.value, {
                    class: `${mergedClsPrefix}-breadcrumb-item__link`,
                    'aria-current': ariaCurrentRef.value,
                    href: props.href,
                    onClick: props.onClick
                }, slots),
                props.showSeparator && ((0, vue_1.h)("span", { class: `${mergedClsPrefix}-breadcrumb-item__separator`, "aria-hidden": "true" }, (0, _utils_1.resolveSlot)(slots.separator, () => {
                    var _a;
                    return [
                        (_a = props.separator) !== null && _a !== void 0 ? _a : separatorRef.value
                    ];
                })))));
        };
    }
});
