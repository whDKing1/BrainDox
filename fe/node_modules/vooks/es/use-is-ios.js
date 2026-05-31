export const isIos = (typeof window === 'undefined'
    ? false
    : /iPad|iPhone|iPod/.test(navigator.platform) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    !window.MSStream;
export default function useIsIos() {
    return isIos;
}
