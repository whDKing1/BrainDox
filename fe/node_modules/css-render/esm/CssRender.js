import { c } from './c';
import { queryElement } from './utils';
export function CssRender(config = {}) {
    const cssr = {
        c: ((...args) => c(cssr, ...args)),
        use: (plugin, ...args) => plugin.install(cssr, ...args),
        find: queryElement,
        context: {},
        config
    };
    return cssr;
}
