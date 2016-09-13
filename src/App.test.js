import Score from './score';

const score = new Score();

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
    const errors = score.betweenTrial(response);
    expect(errors).toEqual(expected);
});

it('computes omission errors', () => {
    const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    const errors = score.omission(response);
    expect(errors).toEqual(expected);
});

it('computes intrusion errors', () => {
    const expected = [
        [0, 0, 0, 0, 0], [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
    ];
    const errors = score.intrusion(response);
    expect(errors).toEqual(expected);
});

it('computes within trial errors', () => {
    const expected = [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
    ];
    const errors = score.withinTrial(response);
    expect(errors).toEqual(expected);
});
