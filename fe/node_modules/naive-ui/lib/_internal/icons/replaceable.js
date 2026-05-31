"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceable = replaceable;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
const context_1 = require("../../config-provider/src/context");
function replaceable(name, icon) {
    const IconComponent = (0, vue_1.defineComponent)({
        render() {
            return icon();
        }
    });
    return (0, vue_1.defineComponent)({
        name: (0, lodash_1.upperFirst)(name),
        setup() {
            var _a;
            const mergedIconsRef = (_a = (0, vue_1.inject)(context_1.configProviderInjectionKey, null)) === null || _a === void 0 ? void 0 : _a.mergedIconsRef;
            return () => {
                var _a;
                const iconOverride = (_a = mergedIconsRef === null || mergedIconsRef === void 0 ? void 0 : mergedIconsRef.value) === null || _a === void 0 ? void 0 : _a[name];
                return iconOverride ? iconOverride() : (0, vue_1.h)(IconComponent, null);
            };
        }
    });
}
