"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
exports.default = (0, vue_1.defineComponent)({
    name: 'SlotMachineNumber',
    props: {
        clsPrefix: {
            type: String,
            required: true
        },
        value: {
            // could be '+', 1, 2, ...
            type: [Number, String],
            required: true
        },
        oldOriginalNumber: {
            type: Number,
            default: undefined
        },
        newOriginalNumber: {
            type: Number,
            default: undefined
        }
    },
    setup(props) {
        const numberRef = (0, vue_1.ref)(null);
        const oldNumberRef = (0, vue_1.ref)(props.value);
        const newNumberRef = (0, vue_1.ref)(props.value);
        const scrollAnimationDirectionRef = (0, vue_1.ref)('up');
        const activeRef = (0, vue_1.ref)(false);
        const newNumberScrollAnimationClassRef = (0, vue_1.computed)(() => {
            return activeRef.value
                ? `${props.clsPrefix}-base-slot-machine-current-number--${scrollAnimationDirectionRef.value}-scroll`
                : null;
        });
        const oldNumberScrollAnimationClassRef = (0, vue_1.computed)(() => {
            return activeRef.value
                ? `${props.clsPrefix}-base-slot-machine-old-number--${scrollAnimationDirectionRef.value}-scroll`
                : null;
        });
        // BUG: may be typescript bug
        (0, vue_1.watch)((0, vue_1.toRef)(props, 'value'), (value, oldValue) => {
            oldNumberRef.value = oldValue;
            newNumberRef.value = value;
            void (0, vue_1.nextTick)(scroll);
        });
        function scroll() {
            const newOriginalNumber = props.newOriginalNumber;
            const oldOriginalNumber = props.oldOriginalNumber;
            if (oldOriginalNumber === undefined || newOriginalNumber === undefined) {
                return;
            }
            if (newOriginalNumber > oldOriginalNumber) {
                scrollByDir('up');
            }
            else if (oldOriginalNumber > newOriginalNumber) {
                scrollByDir('down');
            }
        }
        function scrollByDir(dir) {
            scrollAnimationDirectionRef.value = dir;
            activeRef.value = false;
            void (0, vue_1.nextTick)(() => {
                var _a;
                void ((_a = numberRef.value) === null || _a === void 0 ? void 0 : _a.offsetWidth);
                activeRef.value = true;
            });
        }
        return () => {
            const { clsPrefix } = props;
            return ((0, vue_1.h)("span", { ref: numberRef, class: `${clsPrefix}-base-slot-machine-number` },
                oldNumberRef.value !== null ? ((0, vue_1.h)("span", { class: [
                        `${clsPrefix}-base-slot-machine-old-number ${clsPrefix}-base-slot-machine-old-number--top`,
                        oldNumberScrollAnimationClassRef.value
                    ] }, oldNumberRef.value)) : null,
                (0, vue_1.h)("span", { class: [
                        `${clsPrefix}-base-slot-machine-current-number`,
                        newNumberScrollAnimationClassRef.value
                    ] },
                    (0, vue_1.h)("span", { ref: "numberWrapper", class: [
                            `${clsPrefix}-base-slot-machine-current-number__inner`,
                            typeof props.value !== 'number'
                                && `${clsPrefix}-base-slot-machine-current-number__inner--not-number`
                        ] }, newNumberRef.value)),
                oldNumberRef.value !== null ? ((0, vue_1.h)("span", { class: [
                        `${clsPrefix}-base-slot-machine-old-number ${clsPrefix}-base-slot-machine-old-number--bottom`,
                        oldNumberScrollAnimationClassRef.value
                    ] }, oldNumberRef.value)) : null));
        };
    }
});
