"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seemly_1 = require("seemly");
const vue_1 = require("vue");
const vueuc_1 = require("vueuc");
const _mixins_1 = require("../../_mixins");
const styles_1 = require("../styles");
const props_1 = require("./props");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'Marquee',
    props: props_1.marqueeProps,
    setup(props) {
        const { mergedClsPrefixRef } = (0, _mixins_1.useConfig)(props);
        (0, _mixins_1.useTheme)('Marquee', '-marquee', index_cssr_1.default, styles_1.marqueeLight, props, mergedClsPrefixRef);
        const containerElRef = (0, vue_1.ref)(null);
        const contentWidthRef = (0, vue_1.ref)(-1);
        const containerWidthRef = (0, vue_1.ref)(-1);
        const playStateRef = (0, vue_1.ref)('running');
        const repeatCountInOneGroupRef = (0, vue_1.computed)(() => {
            if (!props.autoFill)
                return 1;
            const { value: contentWidth } = contentWidthRef;
            const { value: containerWidth } = containerWidthRef;
            if (contentWidth === -1 || containerWidth === -1)
                return 1;
            return Math.ceil(containerWidthRef.value / contentWidth);
        });
        const durationRef = (0, vue_1.computed)(() => {
            const { value: contentWidth } = contentWidthRef;
            if (contentWidth === -1)
                return 0;
            return (contentWidth * repeatCountInOneGroupRef.value) / props.speed;
        });
        const animationCssVarsRef = (0, vue_1.computed)(() => {
            return {
                '--n-play': playStateRef.value,
                '--n-direction': 'normal',
                '--n-duration': `${durationRef.value}s`,
                '--n-delay': '0s',
                '--n-iteration-count': 'infinite',
                '--n-min-width': 'auto'
            };
        });
        function resetScrollState() {
            playStateRef.value = 'paused';
            (0, vue_1.nextTick)().then(() => {
                var _a;
                void ((_a = containerElRef.value) === null || _a === void 0 ? void 0 : _a.offsetTop);
                playStateRef.value = 'running';
            });
        }
        function handleContainerResize(entry) {
            containerWidthRef.value = entry.contentRect.width;
        }
        function handleContentResize(entry) {
            contentWidthRef.value = entry.contentRect.width;
        }
        function handleAnimationIteration() {
            resetScrollState();
        }
        return {
            mergedClsPrefix: mergedClsPrefixRef,
            animationCssVars: animationCssVarsRef,
            containerElRef,
            repeatCountInOneGroup: repeatCountInOneGroupRef,
            handleContainerResize,
            handleContentResize,
            handleAnimationIteration
        };
    },
    render() {
        const { $slots, mergedClsPrefix, animationCssVars, repeatCountInOneGroup, handleAnimationIteration } = this;
        const originalNode = ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleContentResize }, {
            default: () => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__item ${mergedClsPrefix}-marquee__original-item` }, $slots))
        }));
        const mirrorNode = ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__item` }, $slots));
        if (this.autoFill) {
            return ((0, vue_1.h)(vueuc_1.VResizeObserver, { onResize: this.handleContainerResize }, {
                default: () => ((0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee ${mergedClsPrefix}-marquee--auto-fill`, ref: "containerElRef", style: animationCssVars },
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__group`, onAnimationiteration: handleAnimationIteration },
                        originalNode,
                        (0, seemly_1.repeat)(repeatCountInOneGroup - 1, mirrorNode)),
                    (0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__group` }, (0, seemly_1.repeat)(repeatCountInOneGroup, mirrorNode))))
            }));
        }
        else {
            return ((0, vue_1.h)("div", { class: [`${mergedClsPrefix}-marquee`], ref: "containerElRef", style: animationCssVars },
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__group`, onAnimationiteration: handleAnimationIteration }, originalNode),
                (0, vue_1.h)("div", { class: `${mergedClsPrefix}-marquee__group` }, mirrorNode)));
        }
    }
});
