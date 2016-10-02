import Score from './Score';

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

it('computes transposition gradient 3', () => {
    //        correct = [9, 1, 13, 10]
    const smallResp = [[10, 9, 1, 13]];
    //        errors = [1, 1, 1, 1]
    const expected = [[-3, 1, 1, 1]]

    const errors = new Score(smallResp).transpositionGradient();
    expect(errors).toEqual(expected);
});

it('computes transposition gradient 4 - with intrusion column', () => {
    //        correct = [6, 14, 13, 1]
    const smallResp = [[9, 10, 13, 2, 10]];
    //        errors = [1, 1, 1, 1]
    const expected = [[0, -2, 0, 0, 0 ]]

    const errors = new Score(smallResp).transpositionGradient();
    expect(errors).toEqual(expected);
});

it('computes correct responses', () => {
    const actual = [
        [ 9, 1, 13, 10],
        [ 3, 2,  7, 11],
    ];
    const resp = [
        [ 9, 3, 13, 10, 99],
        [ 3, 2, 10, 11,  5],
    ];
    const expected = [
        [ 1, 0, 1, 1],
        [ 1, 1, 0, 1],
    ];

    const correct = new Score(resp, actual).correctResponses();
    expect(correct).toEqual(expected);
});

it('counts extra responses', () => {
    const resp = [
        [ 9, 3, 13, 10, 99],
        [ 3, 2, 10, 11,  5], // extra
        [ 9, 3, 13, 10, 99],
        [ 3, 2, 10, 11, 10], // extra
    ];

    const extra = new Score(resp).extraneousCount();
    expect(extra).toEqual(2);
});

it('counts the number of expected correct answers', () => {
    const correct = [
        [ 9,   1, 13, 10],
        [ 3,   2,  7, 11],
        [ 5,  12,  4,  8],
    ];
    const count = new Score([], correct).numAnswers();
    expect(count).toEqual(12);
});

it('computes total proportions', () => {
    const correct = [
        [ 9, 3, 13, 10],
        [ 3, 2, 10, 11],
    ];
    const types = ['foo', 'bar'];
    const input = {
        foo: { sum: 1 },
        bar: { sum: 20 }
    };
    const score = new Score([], correct);
    const expected = {
        total_prop_foo: input.foo.sum / score.numAnswers(),
        total_prop_bar: input.bar.sum / score.numAnswers()
    };

    const actual = score.totalProportions(types, input);
    expect(actual).toEqual(expected);
});

it('computes serial position proportions', () => {
    const correct = [
        [ 9, 3, 13, 10],
        [ 3, 2, 10, 11],
    ];
    const types = ['foo', 'bar'];
    const input = {
        foo: { counts: [1, 2, 3, 4 ] },
        bar: { counts: [2, 4, 6, 8 ] }
    };
    const score = new Score([], correct);
    const expected = {
        sp1_prop_bar: input.bar.counts[0] / score.numAnswers(),
        sp1_prop_foo: input.foo.counts[0] / score.numAnswers(),
        sp2_prop_bar: input.bar.counts[1] / score.numAnswers(),
        sp2_prop_foo: input.foo.counts[1] / score.numAnswers(),
        sp3_prop_bar: input.bar.counts[2] / score.numAnswers(),
        sp3_prop_foo: input.foo.counts[2] / score.numAnswers(),
        sp4_prop_bar: input.bar.counts[3] / score.numAnswers(),
        sp4_prop_foo: input.foo.counts[3] / score.numAnswers(),
    };

    const actual = score.serialPositionProportions(types, input);
    expect(actual).toEqual(expected);
});
