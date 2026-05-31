"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const _mixins_1 = require("../../../_mixins");
const _utils_1 = require("../../../_utils");
const icon_1 = require("../../icon");
const icon_switch_transition_1 = __importDefault(require("../../icon-switch-transition"));
const icons_1 = require("../../icons");
const index_cssr_1 = __importDefault(require("./styles/index.cssr"));
exports.default = (0, vue_1.defineComponent)({
    name: 'BaseClear',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        show: Boolean,
        onClear: Function
    },
    setup(props) {
        (0, _mixins_1.useStyle)('-base-clear', index_cssr_1.default, (0, vue_1.toRef)(props, 'clsPrefix'));
        return {
            handleMouseDown(e) {
                e.preventDefault();
            }
        };
    },
    render() {
        const { clsPrefix } = this;
        return ((0, vue_1.h)("div", { class: `${clsPrefix}-base-clear` },
            (0, vue_1.h)(icon_switch_transition_1.default, null, {
                default: () => {
                    var _a, _b;
                    return this.show ? ((0, vue_1.h)("div", { key: "dismiss", class: `${clsPrefix}-base-clear__clear`, onClick: this.onClear, onMousedown: this.handleMouseDown, "data-clear": true }, (0, _utils_1.resolveSlot)(this.$slots.icon, () => [
                        (0, vue_1.h)(icon_1.NBaseIcon, { clsPrefix: clsPrefix }, {
                            default: () => (0, vue_1.h)(icons_1.ClearIcon, null)
                        })
                    ]))) : ((0, vue_1.h)("div", { key: "icon", class: `${clsPrefix}-base-clear__placeholder` }, (_b = (_a = this.$slots).placeholder) === null || _b === void 0 ? void 0 : _b.call(_a)));
                }
            })));
    }
});
