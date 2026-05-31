"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marqueeProps = void 0;
const _mixins_1 = require("../../_mixins");
exports.marqueeProps = Object.assign(Object.assign({}, _mixins_1.useTheme.props), { autoFill: Boolean, speed: {
        type: Number,
        default: 48
    } });
