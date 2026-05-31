import { useSsrAdapter } from '@css-render/vue3-ssr';
import { defineComponent, h, ref } from 'vue';
import { c, cssrAnchorMetaName } from '../../shared';
const styles = c('.v-x-scroll', {
    overflow: 'auto',
    scrollbarWidth: 'none'
}, [
    c('&::-webkit-scrollbar', {
        width: 0,
        height: 0
    })
]);
export default defineComponent({
    name: 'XScroll',
    props: {
        disabled: Boolean,
        onScroll: Function
    },
    setup() {
        const selfRef = ref(null);
        function handleWheel(e) {
            const preventYWheel = e.currentTarget.offsetWidth <
                e.currentTarget.scrollWidth;
            if (!preventYWheel || e.deltaY === 0)
                return;
            e.currentTarget.scrollLeft += e.deltaY + e.deltaX;
            e.preventDefault();
        }
        const ssrAdapter = useSsrAdapter();
        styles.mount({
            id: 'vueuc/x-scroll',
            head: true,
            anchorMetaName: cssrAnchorMetaName,
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
        return h('div', {
            ref: 'selfRef',
            onScroll: this.onScroll,
            onWheel: this.disabled ? undefined : this.handleWheel,
            class: 'v-x-scroll'
        }, this.$slots);
    }
});
