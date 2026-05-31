import { inject } from 'vue';
import { throwError } from "../../_utils/index.mjs";
import { notificationApiInjectionKey } from "./NotificationProvider.mjs";
export function useNotification() {
  const api = inject(notificationApiInjectionKey, null);
  if (api === null) {
    throwError('use-notification', 'No outer `n-notification-provider` found.');
  }
  return api;
}