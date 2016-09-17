import 'babel-polyfill';

import { matrixSum, matrixSumByCol } from './util';


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

export default class Score {
    constructor(responseSet) {
        this.responseSet = responseSet;
    }

    betweenTrial() {
        const errors = [99, 16]

        return this.responseSet.map((row, rowIdx) => {
            const acceptable = correct[rowIdx].concat(errors);
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
                .map(response => response === 99 ? 1 : 0)
                .slice(0, EXTRA)
        );
    }

    intrusion() {
        return this.responseSet.map((responseRow, rowIdx) =>
            responseRow
                .map(response => response === 16 ? 1 : 0)
        );
    }

    /* TODO: is this no longer valid?
    withinTrial_Old() {
        return responseSet.map((responseRow, rowIdx) =>
            responseRow.map((response, cellIdx) => {
                if (cellIdx === 0) {
                    return 0;
                }
                // Within the correct list, up to the point of the position
                const withinList = correct[rowIdx].slice(0, cellIdx)
                return withinList.includes(response) ? 1 : 0;
            })
        );
    }
    */

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
                const correctRow = correct[rowIdx];
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
                    const correctRespIdx = correct[rowIdx].indexOf(respValue);
                    return cellIdx - correctRespIdx;
                }
                return 0;
            })
        );
    }

    asVariables() {
        const bt = this.betweenTrial();
        const om = this.omission();
        const intr = this.intrusion();
        const within = this.withinTrial();
        const transpo = this.transposition();

        return {
            between: {
                sum: matrixSum(bt),
                counts: matrixSumByCol(bt)
            },
            omission: {
                sum: matrixSum(om),
                counts: matrixSumByCol(om)
            },
            intrusion: {
                sum: matrixSum(intr),
                counts: matrixSumByCol(intr)
            },
            within: {
                sum: matrixSum(within),
                counts: matrixSumByCol(within)
            },
            transposition: {
                sum: matrixSum(transpo),
                counts: matrixSumByCol(transpo)
            },
        };
    }
}
