"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _internal_1 = require("../../_internal");
const progress_1 = require("../../progress");
const interface_1 = require("./interface");
exports.default = (0, vue_1.defineComponent)({
    name: 'UploadProgress',
    props: {
        show: Boolean,
        percentage: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    },
    setup() {
        const NUpload = (0, vue_1.inject)(interface_1.uploadInjectionKey);
        return {
            mergedTheme: NUpload.mergedThemeRef
        };
    },
    render() {
        return ((0, vue_1.h)(_internal_1.NFadeInExpandTransition, null, {
            default: () => this.show ? ((0, vue_1.h)(progress_1.NProgress, { type: "line", showIndicator: false, percentage: this.percentage, status: this.status, height: 2, theme: this.mergedTheme.peers.Progress, themeOverrides: this.mergedTheme.peerOverrides.Progress })) : null
        }));
    }
});
