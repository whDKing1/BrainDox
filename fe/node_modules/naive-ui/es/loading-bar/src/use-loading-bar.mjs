import { inject } from 'vue';
import { throwError } from "../../_utils/index.mjs";
import { loadingBarApiInjectionKey } from "./context.mjs";
export function useLoadingBar() {
  const loadingBar = inject(loadingBarApiInjectionKey, null);
  if (loadingBar === null) {
    throwError('use-loading-bar', 'No outer <n-loading-bar-provider /> founded.');
  }
  return loadingBar;
}