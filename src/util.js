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
    // Errors should never be summed out of more than 4 cols
    const cols = Math.min(matrix[0].length);
    const empty = Array.from(new Array(cols));

    return empty.map((_, index) => matrixColumnSum(matrix, index));
}
