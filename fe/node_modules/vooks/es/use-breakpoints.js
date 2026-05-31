/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { ref, computed, onBeforeUnmount } from 'vue';
import { isBrowser } from './utils';
export const defaultBreakpointOptions = {
    // mobile
    // 0 ~ 640 doesn't mean it should display well in all the range,
    // but means you should treat it like a mobile phone.)
    xs: 0,
    s: 640,
    m: 1024,
    l: 1280,
    xl: 1536,
    '2xl': 1920 // normal desktop display
};
function createMediaQuery(screenWidth) {
    return `(min-width: ${screenWidth}px)`;
}
const mqlMap = {};
function useBreakpoints(screens = defaultBreakpointOptions) {
    if (!isBrowser)
        return computed(() => []);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (typeof window.matchMedia !== 'function')
        return computed(() => []);
    const breakpointStatusRef = ref({});
    const breakpoints = Object.keys(screens);
    const updateBreakpoints = (e, breakpointName) => {
        if (e.matches)
            breakpointStatusRef.value[breakpointName] = true;
        else
            breakpointStatusRef.value[breakpointName] = false;
    };
    breakpoints.forEach((key) => {
        const breakpointValue = screens[key];
        let mql;
        let cbs;
        if (mqlMap[breakpointValue] === undefined) {
            mql = window.matchMedia(createMediaQuery(breakpointValue));
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (mql.addEventListener) {
                mql.addEventListener('change', (e) => {
                    cbs.forEach((cb) => {
                        cb(e, key);
                    });
                });
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            }
            else if (mql.addListener) {
                mql.addListener((e) => {
                    cbs.forEach((cb) => {
                        cb(e, key);
                    });
                });
            }
            cbs = new Set();
            mqlMap[breakpointValue] = {
                mql,
                cbs
            };
        }
        else {
            mql = mqlMap[breakpointValue].mql;
            cbs = mqlMap[breakpointValue].cbs;
        }
        cbs.add(updateBreakpoints);
        if (mql.matches) {
            cbs.forEach((cb) => {
                cb(mql, key);
            });
        }
    });
    onBeforeUnmount(() => {
        breakpoints.forEach((breakpoint) => {
            const { cbs } = mqlMap[screens[breakpoint]];
            if (cbs.has(updateBreakpoints)) {
                cbs.delete(updateBreakpoints);
            }
        });
    });
    return computed(() => {
        const { value } = breakpointStatusRef;
        return breakpoints.filter((key) => value[key]);
    });
}
export default useBreakpoints;
