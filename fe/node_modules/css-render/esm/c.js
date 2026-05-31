import { render } from './render';
import { mount, unmount } from './mount';
function wrappedRender(props) {
    return render(this, this.instance, props);
}
// do not guard node calling, it should throw an error.
function wrappedMount(options = {}
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) {
    const { id, ssr, props, head = false, force = false, anchorMetaName, parent } = options;
    const targetElement = mount(this.instance, this, id, props, head, force, anchorMetaName, parent, ssr);
    return targetElement;
}
function wrappedUnmount(options = {}) {
    /* istanbul ignore next */
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    const { id, parent } = options;
    unmount(this.instance, this, id, parent);
}
const createCNode = function (instance, $, props, children) {
    return {
        instance,
        $,
        props,
        children,
        els: [],
        render: wrappedRender,
        mount: wrappedMount,
        unmount: wrappedUnmount
    };
};
export const c = function (instance, $, props, children) {
    if (Array.isArray($)) {
        return createCNode(instance, { $: null }, null, $);
    }
    else if (Array.isArray(props)) {
        return createCNode(instance, $, null, props);
    }
    else if (Array.isArray(children)) {
        return createCNode(instance, $, props, children);
    }
    else {
        return createCNode(instance, $, props, null);
    }
};
