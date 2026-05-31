"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_shared_1 = require("@/test-shared");
const vue_1 = require("vue");
const __1 = require("../..");
describe('resize-observer', () => {
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
        let resizeCount = 0;
        const onResize = () => {
            resizeCount++;
        };
        const wrapper = (0, test_shared_1.mount)((0, vue_1.defineComponent)({
            render() {
                return (0, vue_1.h)(__1.VResizeObserver, {
                    onResize
                }, {
                    default: () => (0, vue_1.h)('div', {
                        ref: 'cool',
                        style: {
                            width: '200px',
                            height: '200px'
                        }
                    })
                });
            }
        }), { attach: true });
        yield (0, test_shared_1.sleepFrame)();
        yield (0, test_shared_1.sleepFrame)();
        expect(resizeCount).toEqual(1);
        wrapper.instance.$refs.cool.style.width = '300px';
        yield (0, test_shared_1.sleepFrame)();
        yield (0, test_shared_1.sleepFrame)();
        expect(resizeCount).toEqual(2);
        wrapper.unmount();
    }));
});
