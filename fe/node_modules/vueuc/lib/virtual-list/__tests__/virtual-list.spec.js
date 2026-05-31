"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("@/index");
const index_2 = require("@/test-shared/index");
describe('virtual-list', () => {
    it('needs tests', () => {
        (0, index_2.mount)(index_1.VirtualList, {
            props: {
                items: [],
                itemSize: 34
            }
        });
        expect('').toEqual('');
    });
});
