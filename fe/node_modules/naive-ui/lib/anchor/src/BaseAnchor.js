"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseAnchorPropKeys = exports.baseAnchorProps = void 0;
const seemly_1 = require("seemly");
const vooks_1 = require("vooks");
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _utils_1 = require("../../_utils");
const Link_1 = require("./Link");
const utils_1 = require("./utils");
exports.baseAnchorProps = {
    type: {
        type: String,
        default: 'rail'
    },
    showRail: {
        type: Boolean,
        default: true
    },
    showBackground: {
        type: Boolean,
        default: true
    },
    bound: {
        type: Number,
        default: 12
    },
    internalScrollable: Boolean,
    ignoreGap: Boolean,
    offsetTarget: [String, Object, Function]
};
exports.baseAnchorPropKeys = (0, _utils_1.keysOf)(exports.baseAnchorProps);
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseAnchor',
    props: Object.assign(Object.assign({}, exports.baseAnchorProps), { mergedClsPrefix: {
            type: String,
            required: true
        } }),
    setup(props) {
        const collectedLinkHrefs = [];
        const titleEls = [];
        const activeHrefRef = (0, vue_1.ref)(null);
        const slotRef = (0, vue_1.ref)(null);
        const barRef = (0, vue_1.ref)(null);
        const selfRef = (0, vue_1.ref)(null);
        let skipScrollHandling = false;
        const isBlockTypeRef = (0, vue_1.computed)(() => {
            return props.type === 'block';
        });
        const mergedShowRailRef = (0, vue_1.computed)(() => {
            return !isBlockTypeRef.value && props.showRail;
        });
        function disableTransitionOneTick() {
            const { value: barEl } = barRef;
            const { value: slotEl } = slotRef;
            if (barEl) {
                barEl.style.transition = 'none';
            }
            if (slotEl) {
                slotEl.style.transition = 'none';
            }
            if (titleEls) {
                titleEls.forEach((titleEl) => {
                    titleEl.style.transition = 'none';
                });
            }
            void (0, vue_1.nextTick)(() => {
                const { value: nextBarEl } = barRef;
                const { value: nextSlotEl } = slotRef;
                if (nextBarEl) {
                    void nextBarEl.offsetWidth;
                    nextBarEl.style.transition = '';
                }
                if (nextSlotEl) {
                    void nextSlotEl.offsetWidth;
                    nextSlotEl.style.transition = '';
                }
                if (titleEls) {
                    titleEls.forEach((titleEl) => {
                        void titleEl.offsetWidth;
                        titleEl.style.transition = '';
                    });
                }
            });
        }
        function updateBarPosition(linkTitleEl, transition = true) {
            const { value: barEl } = barRef;
            const { value: slotEl } = slotRef;
            const { value: selfEl } = selfRef;
            if (!selfEl || !barEl)
                return;
            if (!transition) {
                barEl.style.transition = 'none';
                if (slotEl)
                    slotEl.style.transition = 'none';
            }
            const { offsetHeight, offsetWidth } = linkTitleEl;
            const { top: linkTitleClientTop, left: linkTitleClientLeft } = linkTitleEl.getBoundingClientRect();
            const { top: anchorClientTop, left: anchorClientLeft } = selfEl.getBoundingClientRect();
            const offsetTop = linkTitleClientTop - anchorClientTop;
            const offsetLeft = linkTitleClientLeft - anchorClientLeft;
            barEl.style.top = `${offsetTop}px`;
            barEl.style.height = `${offsetHeight}px`;
            if (slotEl) {
                slotEl.style.top = `${offsetTop}px`;
                slotEl.style.height = `${offsetHeight}px`;
                slotEl.style.maxWidth = `${offsetWidth + offsetLeft}px`;
            }
            void barEl.offsetHeight;
            if (slotEl)
                void slotEl.offsetHeight;
            if (!transition) {
                barEl.style.transition = '';
                if (slotEl)
                    slotEl.style.transition = '';
            }
        }
        let currentThrottleTimerId;
        let hasTrailingThrottledTask = false;
        let isInThrottledPeriod = false;
        const handleScroll = () => {
            if (isInThrottledPeriod) {
                hasTrailingThrottledTask = true;
            }
            else {
                if (skipScrollHandling) {
                    return;
                }
                _handleScroll(true);
                isInThrottledPeriod = true;
                clearTimeout(currentThrottleTimerId);
                currentThrottleTimerId = setTimeout(() => {
                    isInThrottledPeriod = false;
                    if (hasTrailingThrottledTask) {
                        hasTrailingThrottledTask = false;
                        handleScroll();
                    }
                }, 128);
            }
        };
        function setActiveHref(href, transition = true) {
            const idMatchResult = /^#([^#]+)$/.exec(href);
            if (!idMatchResult)
                return;
            const linkEl = document.getElementById(idMatchResult[1]);
            if (!linkEl)
                return;
            skipScrollHandling = true;
            activeHrefRef.value = href;
            linkEl.scrollIntoView();
            if (!transition) {
                disableTransitionOneTick();
            }
            hasTrailingThrottledTask = false;
            setTimeout(() => {
                skipScrollHandling = false;
            }, 0);
        }
        function _handleScroll(transition = true) {
            var _a;
            const links = [];
            const offsetTarget = (0, seemly_1.unwrapElement)((_a = props.offsetTarget) !== null && _a !== void 0 ? _a : document);
            collectedLinkHrefs.forEach((href) => {
                const idMatchResult = /#([^#]+)$/.exec(href);
                if (!idMatchResult)
                    return;
                const linkEl = document.getElementById(idMatchResult[1]);
                if (linkEl && offsetTarget) {
                    const { top, height } = (0, utils_1.getOffset)(linkEl, offsetTarget);
                    links.push({
                        top,
                        height,
                        href
                    });
                }
            });
            links.sort((a, b) => {
                // ascend top
                if (a.top > b.top) {
                    return 1;
                    // descend height
                }
                else if (a.top === b.top && a.height < b.height) {
                    return -1;
                }
                return -1;
            });
            const currentActiveHref = activeHrefRef.value;
            const { bound, ignoreGap } = props;
            const activeLink = links.reduce((prevLink, link) => {
                if (link.top + link.height < 0) {
                    if (ignoreGap) {
                        return link;
                    }
                    else {
                        return prevLink;
                    }
                }
                if (link.top <= bound) {
                    if (prevLink === null) {
                        return link;
                    }
                    else if (link.top === prevLink.top) {
                        if (link.href === currentActiveHref) {
                            return link;
                        }
                        else {
                            return prevLink;
                        }
                    }
                    else if (link.top > prevLink.top) {
                        return link;
                    }
                    else {
                        return prevLink;
                    }
                }
                return prevLink;
            }, null);
            if (!transition)
                disableTransitionOneTick();
            if (activeLink) {
                activeHrefRef.value = activeLink.href;
            }
            else {
                activeHrefRef.value = null;
            }
        }
        (0, vue_1.provide)(Link_1.anchorInjectionKey, {
            activeHref: activeHrefRef,
            mergedClsPrefix: (0, vue_1.toRef)(props, 'mergedClsPrefix'),
            updateBarPosition,
            setActiveHref,
            collectedLinkHrefs,
            titleEls
        });
        (0, vue_1.onMounted)(() => {
            document.addEventListener('scroll', handleScroll, true);
            setActiveHref(window.location.hash);
            _handleScroll(false);
        });
        (0, vooks_1.onFontsReady)(() => {
            setActiveHref(window.location.hash);
            _handleScroll(false);
        });
        (0, vue_1.onBeforeUnmount)(() => {
            clearTimeout(currentThrottleTimerId);
            document.removeEventListener('scroll', handleScroll, true);
        });
        (0, vue_1.watch)(activeHrefRef, (value) => {
            if (value === null) {
                const { value: slotEl } = slotRef;
                if (slotEl && !isBlockTypeRef.value) {
                    slotEl.style.maxWidth = '0';
                }
            }
        });
        return {
            selfRef,
            barRef,
            slotRef,
            setActiveHref,
            activeHref: activeHrefRef,
            isBlockType: isBlockTypeRef,
            mergedShowRail: mergedShowRailRef
        };
    },
    render() {
        var _a;
        const { mergedClsPrefix, mergedShowRail, isBlockType, $slots } = this;
        const Anchor = ((0, vue_1.h)("div", { class: [
                `${mergedClsPrefix}-anchor`,
                isBlockType && `${mergedClsPrefix}-anchor--block`,
                mergedShowRail && `${mergedClsPrefix}-anchor--show-rail`
            ], ref: "selfRef" },
            mergedShowRail && this.showBackground ? ((0, vue_1.h)("div", { ref: "slotRef", class: `${mergedClsPrefix}-anchor-link-background` })) : null,
            mergedShowRail ? ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-anchor-rail` },
                (0, vue_1.h)("div", { ref: "barRef", class: [
                        `${mergedClsPrefix}-anchor-rail__bar`,
                        this.activeHref !== null
                            && `${mergedClsPrefix}-anchor-rail__bar--active`
                    ] }))) : null, (_a = $slots.default) === null || _a === void 0 ? void 0 :
            _a.call($slots)));
        return this.internalScrollable ? ((0, vue_1.h)(_internal_1.NScrollbar, null, {
            default: () => Anchor
        })) : (Anchor);
    }
});
