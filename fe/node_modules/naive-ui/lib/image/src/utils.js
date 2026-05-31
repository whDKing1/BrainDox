"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observeIntersection = void 0;
exports.resolveOptionsAndHash = resolveOptionsAndHash;
function resolveOptionsAndHash(options = {}) {
    var _a;
    const { root = null } = options;
    return {
        hash: `${options.rootMargin || '0px 0px 0px 0px'}-${Array.isArray(options.threshold)
            ? options.threshold.join(',')
            : ((_a = options.threshold) !== null && _a !== void 0 ? _a : '0')}`,
        options: Object.assign(Object.assign({}, options), { root: (typeof root === 'string' ? document.querySelector(root) : root)
                || document.documentElement })
    };
}
// root -> options -> [observer, elements]
const observers = new WeakMap();
const unobserveHandleMap = new WeakMap();
const shouldStartLoadingRefMap = new WeakMap();
const observeIntersection = (el, options, shouldStartLoadingRef) => {
    if (!el)
        return () => { };
    const resolvedOptionsAndHash = resolveOptionsAndHash(options);
    const { root } = resolvedOptionsAndHash.options;
    let rootObservers;
    const _rootObservers = observers.get(root);
    if (_rootObservers) {
        rootObservers = _rootObservers;
    }
    else {
        rootObservers = new Map();
        observers.set(root, rootObservers);
    }
    let observer;
    let observerAndObservedElements;
    if (rootObservers.has(resolvedOptionsAndHash.hash)) {
        observerAndObservedElements = rootObservers.get(resolvedOptionsAndHash.hash);
        if (!observerAndObservedElements[1].has(el)) {
            observer = observerAndObservedElements[0];
            observerAndObservedElements[1].add(el);
            observer.observe(el);
        }
    }
    else {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const _unobserve = unobserveHandleMap.get(entry.target);
                    const _shouldStartLoadingRef = shouldStartLoadingRefMap.get(entry.target);
                    if (_unobserve)
                        _unobserve();
                    if (_shouldStartLoadingRef) {
                        _shouldStartLoadingRef.value = true;
                    }
                }
            });
        }, resolvedOptionsAndHash.options);
        observer.observe(el);
        observerAndObservedElements = [observer, new Set([el])];
        rootObservers.set(resolvedOptionsAndHash.hash, observerAndObservedElements);
    }
    let unobservered = false;
    const unobserve = () => {
        if (unobservered)
            return;
        unobserveHandleMap.delete(el);
        shouldStartLoadingRefMap.delete(el);
        unobservered = true;
        if (observerAndObservedElements[1].has(el)) {
            observerAndObservedElements[0].unobserve(el);
            observerAndObservedElements[1].delete(el);
        }
        if (observerAndObservedElements[1].size <= 0) {
            rootObservers.delete(resolvedOptionsAndHash.hash);
        }
        if (!rootObservers.size) {
            observers.delete(root);
        }
    };
    unobserveHandleMap.set(el, unobserve);
    shouldStartLoadingRefMap.set(el, shouldStartLoadingRef);
    return unobserve;
};
exports.observeIntersection = observeIntersection;
