import zipObject from 'lodash.zipobject';

const sum = (x, y) => x + y;

// Reduce a matrix to a single sum of all values
export function matrixSum(matrix) {
    return matrix.reduce((total, row) =>
        sum(row.reduce(sum, 0), total), 0);
}

// Sum the y axis of a matrix at a given index
export function matrixColumnSum(matrix, index) {
    return matrix.reduce((total, row) =>
        sum(row[index], total), 0);
}

// Return an array of sums for each column in a matrix
export function matrixSumByCol(matrix) {
    // Errors should never be summed out for more than 4 cols
    const cols = Math.min(matrix[0].length, 4);
    const empty = Array.from(new Array(cols));

    return empty.map((_, index) => matrixColumnSum(matrix, index));
}

// Count the number of occurences of a particular range of values
export function frequencyCount(matrix) {
    const indexPosition = [-3, -2, -1, 0, 1, 2, 3];
    const counts = indexPosition.map(pos =>
        matrix.reduce((count, row) =>
            count + row.filter(item => item === pos).length, 0)
    );

    return zipObject(indexPosition, counts);
}
