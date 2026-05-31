"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const _mixins_1 = require("../../_mixins");
exports.default = (0, vue_1.defineComponent)({
    name: 'LogLoader',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        spinProps: Object
    },
    setup() {
        return {
            locale: (0, _mixins_1.useLocale)('Log').localeRef
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-log-loader` },
            (0, vue_1.h)(_internal_1.NBaseLoading, Object.assign({ clsPrefix: clsPrefix, strokeWidth: 24, scale: 0.85 }, this.spinProps)),
            (0, vue_1.h)("span", { class: `${clsPrefix}-log-loader__content` }, this.locale.loading)));
    }
});
