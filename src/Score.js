import 'babel-polyfill';

import { matrixSum, matrixSumByCol, frequencyCount } from './util';


const correct = [
    [ 9,   1, 13, 10],
    [ 3,   2,  7, 11],
    [ 5,  12,  4,  8],
    [ 6,  14, 13,  1],
    [10,  11,  9,  7],
    [ 2,   8, 12,  5],
    [ 6,   1,  4, 10],
]

const SERIAL_POSITIONS = 4;
const BLANK = 99;
const INTRUDE = 16;

export default class Score {
    constructor(responseSet, expected = correct) {
        this.responseSet = responseSet;
        this.expectedSet = expected;
    }

    // Get the total number of positions in `correct`
    numAnswers() {
        return this.expectedSet.reduce((cnt, row) => row.length + cnt, 0);
    }

    correctResponses() {
        // Produce a matrix of correct values, marked by 1. Extra values at the end
        // of a response sequence are discarded
        return this.expectedSet.map((row, rowIdx) => {
            return row.map((answer, cellIdx) => {
                return answer === this.responseSet[rowIdx][cellIdx] ? 1 : 0;
            });
        });
    }

    extraneousCount() {
        // Return the number of responses given, in total, which exceed the
        // count for a response row.  ie, is the last row BLANK or not?
        return this.responseSet.reduce((cnt, row) => {
            const extra = row[row.length - 1] === BLANK ? 0 : 1;
            return cnt + extra;
        }, 0);
    }

    betweenTrial() {
        const extras = [BLANK, INTRUDE]

        return this.responseSet.map((row, rowIdx) => {
            const acceptable = this.expectedSet[rowIdx].concat(extras);
            return row.map(response =>
                acceptable.includes(response) ? 0 : 1
            )
        });
    }

    omission() {
        // Drop all omissions based on "extra", which aren't included
        // in the results
        return this.responseSet.map((responseRow, rowIdx) =>
            responseRow
                .map(response => response === BLANK ? 1 : 0)
                .slice(0, SERIAL_POSITIONS)
        );
    }

    intrusion() {
        return this.responseSet.map((responseRow, rowIdx) =>
            responseRow
                .map(response => response === INTRUDE ? 1 : 0)
        );
    }

    withinTrial() {
        // Response was incorrect, it does appear in the correct series
        // but and there is a response prior to this position.
        return this.positionalSwap('withinTrial');
    }

    transposition() {
        // Response was incorrect, it does appear in the correct series
        // but not as a response prior to this position.
        return this.positionalSwap('transposition');
    }

    positionalSwap(mode) {
        return this.responseSet.map((responseRow, rowIdx) =>
            responseRow.map((response, cellIdx) => {
                const correctRow = this.expectedSet[rowIdx];
                if (response !== correctRow[cellIdx]) {
                    const included = correctRow.includes(response);
                    const prior = responseRow.slice(0, cellIdx).includes(response);

                    if (included && (
                            (mode === 'transposition' && !prior) ||
                            (mode === 'withinTrial' && prior))) {
                        return 1;
                    }

                }
                return 0;
            })
        );

    }

    transpositionGradient() {
        const transpo = this.transposition();
        return transpo.map((errorRow, rowIdx) =>
            errorRow.map((error, cellIdx) => {
                if (error) {
                    const respValue = this.responseSet[rowIdx][cellIdx];
                    const correctRespIdx = this.expectedSet[rowIdx].indexOf(respValue);
                    return cellIdx - correctRespIdx;
                }
                return 0;
            })
        );
    }

    totalProportions(types, results) {
        const tp = {};
        const total = this.numAnswers();
        const totalPlus = this.numAnswers() + this.extraneousCount();

        types.forEach(type => {
            const totalDenom = type === 'correct' ? totalPlus : total;
            tp[`total_prop_${type}`] = results[type].sum / totalDenom;
        });
        return tp;
    }

    serialPositionProportions(types, results) {
        const spp = {};
        const total = this.numAnswers();

        types.forEach(type => {
            let pos = 0;
            while (pos < SERIAL_POSITIONS) {
                const prop = results[type].counts[pos] / total;
                spp[`sp${pos+1}_prop_${type}`] = prop;
                pos++;
            }
        });
        return spp;
    }

    gradientProportions(transpoCount, gradients) {
        // The proportion of each gradient position over all transposition errors
        const keys = Object.keys(gradients)
        const gp = {};

        keys.forEach(key => {
            const prefix = key[0] === '-' ? 'neg' : '';
            // Prevent divide by zero
            const value = transpoCount === 0 ? 0 : gradients[key] / transpoCount;
            gp[`prop_trans_${prefix + Math.abs(key)}`] = value;
        });

        return gp;
    }

    asVariables() {
        const right = this.correctResponses();
        const bt = this.betweenTrial();
        const om = this.omission();
        const intr = this.intrusion();
        const within = this.withinTrial();
        const transpo = this.transposition();
        const transpoGradient = this.transpositionGradient();

        const results = {
            correct: {
                sum: matrixSum(right),
                counts: matrixSumByCol(right)
            },
            btr: {
                sum: matrixSum(bt),
                counts: matrixSumByCol(bt)
            },
            om: {
                sum: matrixSum(om),
                counts: matrixSumByCol(om)
            },
            int: {
                sum: matrixSum(intr),
                counts: matrixSumByCol(intr)
            },
            wtr: {
                sum: matrixSum(within),
                counts: matrixSumByCol(within)
            },
            trans: {
                sum: matrixSum(transpo),
                counts: matrixSumByCol(transpo)
            },
            transpositionGradients: frequencyCount(transpoGradient)
        };

        const measures = ['correct', 'om', 'int', 'btr', 'wtr', 'trans'];
        return Object.assign({},
            this.totalProportions(measures, results),
            this.serialPositionProportions(measures, results),
            this.gradientProportions(results.trans.sum, results.transpositionGradients),
        );
    }
}
