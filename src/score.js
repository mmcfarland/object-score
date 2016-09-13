const correct = [
    [ 9,   1, 13, 10],
    [ 3,   2,  7, 11],
    [ 5,  12,  4,  8],
    [ 6,  14, 13,  1],
    [10,  11,  9,  7],
    [ 2,   8, 12,  5],
    [ 6,   1,  4, 10],
]


const EXTRA = 4

export function betweenTrials(responseSet) {
    const errors = [99, 16]

    return responseSet.map((row, rowIdx) => {
        const acceptable = correct[rowIdx].concat(errors);
        return row.map(response =>
            acceptable.indexOf(response) > -1 ? 0 : 1
        )
    });
}

export function omission(responseSet) {
    // Drop all omissions based on "extra", which aren't included
    // in the results
    return responseSet.map((responseRow, rowIdx) =>
        responseRow
            .map(response => response === 99 ? 1 : 0)
            .slice(0, EXTRA)
    );
}

export function intrusion(responseSet) {
    return responseSet.map((responseRow, rowIdx) =>
        responseRow
            .map(response => response === 16 ? 1 : 0)
    );
}
