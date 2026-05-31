"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageContextKey = exports.imagePreviewSharedProps = void 0;
const _mixins_1 = require("../../_mixins");
const _utils_1 = require("../../_utils");
exports.imagePreviewSharedProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { onPreviewPrev: Function, onPreviewNext: Function, showToolbar: { type: Boolean, default: true }, showToolbarTooltip: Boolean, renderToolbar: Function });
exports.imageContextKey = (0, _utils_1.createInjectionKey)('n-image');
