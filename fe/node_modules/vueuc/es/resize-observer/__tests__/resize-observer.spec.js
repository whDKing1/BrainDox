var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { mount, sleepFrame } from '@/test-shared';
import { defineComponent, h } from 'vue';
import { VResizeObserver } from '../..';
describe('resize-observer', () => {
    it('works', () => __awaiter(void 0, void 0, void 0, function* () {
        let resizeCount = 0;
        const onResize = () => {
            resizeCount++;
        };
        const wrapper = mount(defineComponent({
            render() {
                return h(VResizeObserver, {
                    onResize
                }, {
                    default: () => h('div', {
                        ref: 'cool',
                        style: {
                            width: '200px',
                            height: '200px'
                        }
                    })
                });
            }
        }), { attach: true });
        yield sleepFrame();
        yield sleepFrame();
        expect(resizeCount).toEqual(1);
        wrapper.instance.$refs.cool.style.width = '300px';
        yield sleepFrame();
        yield sleepFrame();
        expect(resizeCount).toEqual(2);
        wrapper.unmount();
    }));
});
