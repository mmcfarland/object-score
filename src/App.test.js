import Score from './score';

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
    const errors = new Score(response).betweenTrial();
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
    const errors = new Score(response).omission();
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
    const errors = new Score(response).intrusion();
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
    const errors = new Score(response).withinTrial();
    expect(errors).toEqual(expected);
});

it('computes within trial but not transposition errors', () => {
    //      correct = [ 9,  1, 13, 10],
    const smallResp = [[13, 1, 9, 9]];
    const expected = [[0, 0, 0, 1]];

    const errors = new Score(smallResp).withinTrial();
    expect(errors).toEqual(expected);
});

it('computes within trial but not transposition errors 2', () => {
    //      correct = [ 9,  1, 13, 10],
    const smallResp = [[13, 13, 9, 10]];
    const expected = [[0, 1, 0, 0]];

    const errors = new Score(smallResp).withinTrial();
    expect(errors).toEqual(expected);
});

it('computes transposition errors', () => {
    //       correct =  [9, 1, 13, 10],
    const smallResp = [[13, 1, 9, 10]];
    const expected = [[1, 0, 1, 0]];

    const errors = new Score(smallResp).transposition();
    expect(errors).toEqual(expected);
});

it('computes transposition and not within trial errors', () => {
    // correct =  [9, 1, 13, 10],
    const smallResp = [[13, 1, 9, 13]];
    const expected = [[1, 0, 1, 0]];

    const errors = new Score(smallResp).transposition();
    expect(errors).toEqual(expected);
});

it('computes transposition and not within trial errors 2', () => {
    //       correct =  [9, 1, 13, 10],
    const smallResp = [[13, 13, 9, 10]];
    const expected = [[1, 0, 1, 0]];

    const errors = new Score(smallResp).transposition();
    expect(errors).toEqual(expected);
});

it('computes transposition gradient', () => {
    //       correct =  [9, 1, 13, 10],
    const smallResp = [[13, 13, 9, 10]];
    //       errors  = [[1, 0, 1, 0]];
    const expected = [[-2, 0, 2, 0]];

    const errors = new Score(smallResp).transpositionGradient();
    expect(errors).toEqual(expected);
});

it('computes transposition gradient 2', () => {
    //       correct =  [9, 1, 13, 10],
    const smallResp = [[10, 9, 1, 10]];
    //       errors  = [[1, 1, 1, 0]];
    const expected = [[-3, 1, 1, 0]];

    const errors = new Score(smallResp).transpositionGradient();
    expect(errors).toEqual(expected);
});

it('produces variable mappings', () => {
    const vars = new Score(response).asVariables();
    console.log(vars);
});
