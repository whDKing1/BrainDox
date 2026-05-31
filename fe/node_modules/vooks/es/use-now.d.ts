import { Ref } from 'vue';
declare function useNow(interval: boolean | number, options: {
    type: 'number';
}): Ref<number>;
declare function useNow(interval: boolean | number, options: {
    type: 'date';
}): Ref<Date>;
export default useNow;
