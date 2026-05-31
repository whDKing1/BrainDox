import { queryElement } from './utils';
export function exists(id, ssr) {
    if (id === undefined)
        return false;
    if (ssr) {
        const { context: { ids } } = ssr;
        return ids.has(id);
    }
    return queryElement(id) !== null;
}
