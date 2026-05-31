export declare class FinweckTree {
    l: number;
    min: number;
    ft: number[];
    /**
     * @param l length of the array
     * @param min min value of the array
     */
    constructor(l: number, min: number);
    /**
     * Add arr[i] by n, start from 0
     * @param i the index of the element to be added
     * @param n the value to be added
     */
    add(i: number, n: number): void;
    /**
     * Get the value of index i
     * @param i index
     * @returns value of the index
     */
    get(i: number): number;
    /**
     * Get the sum of first i elements
     * @param i count of head elements to be added
     * @returns the sum of first i elements
     */
    sum(i?: number): number;
    /**
     * Get the largest count of head elements whose sum are <= threshold
     * @param threshold
     * @returns the largest count of head elements whose sum are <= threshold
     */
    getBound(threshold: number): number;
}
