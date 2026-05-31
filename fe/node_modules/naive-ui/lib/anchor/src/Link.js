"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anchorLinkProps = exports.anchorInjectionKey = void 0;
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
const composable_1 = require("../../_utils/composable");
exports.anchorInjectionKey = (0, _utils_1.createInjectionKey)('n-anchor');
exports.anchorLinkProps = {
    title: String,
    href: String
};
exports.default = (0, vue_1.defineComponent)({
    name: 'AnchorLink',
    props: exports.anchorLinkProps,
    slots: Object,
    setup(props, { slots }) {
        const titleRef = (0, vue_1.ref)(null);
        const NAnchor = (0, vue_1.inject)(exports.anchorInjectionKey);
        const hrefRef = (0, vue_1.toRef)(props, 'href');
        const activeRef = (0, vooks_1.useMemo)(() => {
            return hrefRef.value && hrefRef.value === NAnchor.activeHref.value;
        });
        (0, composable_1.useInjectionCollection)(exports.anchorInjectionKey, 'collectedLinkHrefs', hrefRef);
        (0, composable_1.useInjectionElementCollection)(exports.anchorInjectionKey, 'titleEls', () => titleRef.value);
        (0, vue_1.watch)(activeRef, (value) => {
            if (value && titleRef.value) {
                NAnchor.updateBarPosition(titleRef.value);
            }
        });
        function handleClick() {
            if (props.href !== undefined) {
                NAnchor.setActiveHref(props.href);
            }
        }
        return () => {
            var _a;
            const { value: mergedClsPrefix } = NAnchor.mergedClsPrefix;
            return ((0, vue_1.h)("div", { class: [
                    `${mergedClsPrefix}-anchor-link`,
                    activeRef.value && `${mergedClsPrefix}-anchor-link--active`
                ] },
                (0, vue_1.h)("a", { ref: titleRef, class: [`${mergedClsPrefix}-anchor-link__title`], href: props.href, title: (0, _utils_1.getTitleAttribute)(props.title), onClick: handleClick }, {
                    default: () => (0, _utils_1.resolveSlot)(slots.title, () => [props.title])
                }), (_a = slots.default) === null || _a === void 0 ? void 0 :
                _a.call(slots)));
        };
    }
});
