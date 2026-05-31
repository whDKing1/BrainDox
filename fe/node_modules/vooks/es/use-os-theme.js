/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ref, readonly, onBeforeMount, onBeforeUnmount } from 'vue';
import { hasInstance } from './utils';
let usedCount = 0;
// Mql means media query list
const supportMatchMedia = typeof window !== 'undefined' && window.matchMedia !== undefined;
const osTheme = ref(null);
let darkMql;
let lightMql;
function handleDarkMqlChange(e) {
    if (e.matches) {
        osTheme.value = 'dark';
    }
}
function handleLightMqlChange(e) {
    if (e.matches) {
        osTheme.value = 'light';
    }
}
function init() {
    darkMql = window.matchMedia('(prefers-color-scheme: dark)');
    lightMql = window.matchMedia('(prefers-color-scheme: light)');
    if (darkMql.matches) {
        osTheme.value = 'dark';
    }
    else if (lightMql.matches) {
        osTheme.value = 'light';
    }
    else {
        osTheme.value = null;
    }
    if (darkMql.addEventListener) {
        darkMql.addEventListener('change', handleDarkMqlChange);
        lightMql.addEventListener('change', handleLightMqlChange);
    }
    else if (darkMql.addListener) {
        darkMql.addListener(handleDarkMqlChange);
        lightMql.addListener(handleLightMqlChange);
    }
}
function clean() {
    if ('removeEventListener' in darkMql) {
        darkMql.removeEventListener('change', handleDarkMqlChange);
        lightMql.removeEventListener('change', handleLightMqlChange);
    }
    else if ('removeListener' in darkMql) {
        darkMql.removeListener(handleDarkMqlChange);
        lightMql.removeListener(handleLightMqlChange);
    }
    darkMql = undefined;
    lightMql = undefined;
}
let managable = true;
export default function useOsTheme() {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test' && !supportMatchMedia) {
        return readonly(osTheme);
    }
    if (process.env.NODE_ENV === 'test' && window.matchMedia === undefined) {
        return readonly(osTheme);
    }
    if (usedCount === 0)
        init();
    if (managable && (managable = hasInstance())) {
        onBeforeMount(() => {
            usedCount += 1;
        });
        onBeforeUnmount(() => {
            usedCount -= 1;
            if (usedCount === 0)
                clean();
        });
    }
    return readonly(osTheme);
}
