import { inject } from 'vue';
const ssrContextKey = '@css-render/vue3-ssr';
function createStyleString(id, style) {
    return `<style cssr-id="${id}">\n${style}\n</style>`;
}
function ssrAdapter(id, style, ssrContext) {
    const { styles, ids } = ssrContext;
    // we need to impl other options to make it behaves the same as the client side
    if (ids.has(id))
        return;
    if (styles !== null) {
        ids.add(id);
        styles.push(createStyleString(id, style));
    }
}
const isBrowser = typeof document !== 'undefined';
export function useSsrAdapter() {
    if (isBrowser)
        return undefined;
    const context = inject(ssrContextKey, null);
    if (context === null)
        return undefined;
    return {
        adapter: (id, style) => ssrAdapter(id, style, context),
        context
    };
}
export function setup(app) {
    const styles = [];
    const ssrContext = {
        styles,
        ids: new Set()
    };
    app.provide(ssrContextKey, ssrContext);
    return {
        collect() {
            const res = styles.join('\n');
            styles.length = 0;
            return res;
        }
    };
}
