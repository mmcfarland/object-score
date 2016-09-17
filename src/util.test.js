import { matrixSum, matrixColumnSum, matrixSumByCol,
         frequencyCount } from './util';

const matrix = [
      [1, 2, 3],  //  6
      [4, 5, 6],  // 15
      [7, 8, 9]   // 24
]; // 12,15,18

it('sums a matrix', () => {
    expect(matrixSum(matrix)).toEqual(45);
});

it('sums a matrix column', () => {
    expect(matrixColumnSum(matrix, 0)).toEqual(12);
    expect(matrixColumnSum(matrix, 1)).toEqual(15);
    expect(matrixColumnSum(matrix, 2)).toEqual(18);
});

it('sums all columns of a matrix', () => {
    expect(matrixSumByCol(matrix)).toEqual([12, 15, 18]);
});

it('counts the number of occurances within a matrix', () => {
    const freqMatrix = [
        [1, 0, 1],
        [2, -1, 3],
        [-3, -1, 0]
    ];
    expect(frequencyCount(freqMatrix)).toEqual({
        '-3': 1,
        '-2': 0,
        '-1': 2,
        '0': 2,
        '1': 2,
        '2': 1,
        '3': 1
    });
});
