"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckDeprecated = useCheckDeprecated;
const vue_1 = require("vue");
const _utils_1 = require("../../_utils");
function useCheckDeprecated(props) {
    (0, vue_1.watchEffect)(() => {
        if (props.items) {
            (0, _utils_1.warnOnce)('menu', '`items` is deprecated, please use `options` instead.');
        }
        if (props.onOpenNamesChange) {
            (0, _utils_1.warnOnce)('menu', '`on-open-names-change` is deprecated, please use `on-update:expanded-keys` instead.');
        }
        if (props.onSelect) {
            (0, _utils_1.warnOnce)('menu', '`on-select` is deprecated, please use `on-update:value` instead.');
        }
        if (props.onExpandedNamesChange) {
            (0, _utils_1.warnOnce)('menu', '`on-expanded-names-change` is deprecated, please use `on-update:expanded-keys` instead.');
        }
        if (props.expandedNames) {
            (0, _utils_1.warnOnce)('menu', '`expanded-names` is deprecated, please use `expanded-keys` instead.');
        }
        if (props.defaultExpandedNames) {
            (0, _utils_1.warnOnce)('menu', '`default-expanded-names` is deprecated, please use `default-expanded-keys` instead.');
        }
    });
}
