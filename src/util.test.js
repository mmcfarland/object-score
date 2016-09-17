import { matrixSum, matrixColumnSum, matrixSumByCol } from './util';

it('sums a matrix', () => {
    const matrix = [
        [1,2,3],  // 6
        [4,5,6],  // 15
        [7,8,9]   // 24
    ];
    expect(matrixSum(matrix)).toEqual(45);
});

it('sums a matrix column', () => {
    const matrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];
    //  12, 15, 18
    expect(matrixColumnSum(matrix, 0)).toEqual(12);
    expect(matrixColumnSum(matrix, 1)).toEqual(15);
    expect(matrixColumnSum(matrix, 2)).toEqual(18);
});

it('sums all columns of a matrix', () => {
    const matrix = [
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ];
    //  12, 15, 18
    expect(matrixSumByCol(matrix)).toEqual([12, 15, 18]);
});
