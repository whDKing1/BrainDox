"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue3_ssr_1 = require("@css-render/vue3-ssr");
const vue_1 = require("vue");
const shared_1 = require("../../shared");
const styles = (0, shared_1.c)('.v-x-scroll', {
    overflow: 'auto',
    scrollbarWidth: 'none'
}, [
    (0, shared_1.c)('&::-webkit-scrollbar', {
        width: 0,
        height: 0
    })
]);
exports.default = (0, vue_1.defineComponent)({
    name: 'XScroll',
    props: {
        disabled: Boolean,
        onScroll: Function
    },
    setup() {
        const selfRef = (0, vue_1.ref)(null);
        function handleWheel(e) {
            const preventYWheel = e.currentTarget.offsetWidth <
                e.currentTarget.scrollWidth;
            if (!preventYWheel || e.deltaY === 0)
                return;
            e.currentTarget.scrollLeft += e.deltaY + e.deltaX;
            e.preventDefault();
        }
        const ssrAdapter = (0, vue3_ssr_1.useSsrAdapter)();
        styles.mount({
            id: 'vueuc/x-scroll',
            head: true,
            anchorMetaName: shared_1.cssrAnchorMetaName,
            ssr: ssrAdapter
        });
        const exposedMethods = {
            scrollTo(...args) {
                var _a;
                (_a = selfRef.value) === null || _a === void 0 ? void 0 : _a.scrollTo(...args);
            }
        };
        return Object.assign({ selfRef,
            handleWheel }, exposedMethods);
    },
    render() {
        return (0, vue_1.h)('div', {
            ref: 'selfRef',
            onScroll: this.onScroll,
            onWheel: this.disabled ? undefined : this.handleWheel,
            class: 'v-x-scroll'
        }, this.$slots);
    }
});
