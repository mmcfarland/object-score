import { betweenTrials, omission, intrusion } from './score';

const response = [
    [11,  1,  5,  2, 99],
    [3 ,  2, 15, 10, 99],
    [5 ,  1, 11, 15, 99],
    [2 ,  1,  5, 11,  1],
    [10, 11, 16,  5, 99],
    [10,  1, 12,  5, 99],
    [10,  1, 11, 16,  5],
];

it('computes between trial errors', () => {
    const expected = [
        [1, 0, 1, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 0, 1],
    ];
    const errors = betweenTrials(response);
    expect(errors).toEqual(expected);
});

it('computes intrusion errors', () => {
    const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
    ];
    const errors = intrusion(response);
    expect(errors).toEqual(expected);
});
