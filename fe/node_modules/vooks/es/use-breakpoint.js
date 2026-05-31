import { computed } from 'vue';
import useBreakpoints from './use-breakpoints';
import { isBrowser } from './utils';
function useBreakpoint(screens) {
    if (!isBrowser)
        return computed(() => undefined);
    // pass ts check
    const breakpointsRef = screens !== undefined ? useBreakpoints(screens) : useBreakpoints();
    return computed(() => {
        const { value } = breakpointsRef;
        if (value.length === 0)
            return undefined;
        return value[value.length - 1];
    });
}
export default useBreakpoint;
