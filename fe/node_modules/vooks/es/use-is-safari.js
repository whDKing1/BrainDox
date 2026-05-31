import { isIos } from './use-is-ios';
const isSafari = typeof window === 'undefined'
    ? false
    : isIos || window.safari !== undefined;
export default function useIsSafari() {
    return isSafari;
}
