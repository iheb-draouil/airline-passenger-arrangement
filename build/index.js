"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengersSeatsArrangementCalculator = void 0;
class PassengersSeatsArrangementCalculator {
    getSeatsFromLeftBlock(numberOfColums, numberOfRows) {
        const aisleSeats = {};
        const windowSeats = {};
        const middleSeats = {};
        [...Array(numberOfRows).keys()].forEach(e => {
            aisleSeats[e] = [[e, numberOfColums - 1]];
        });
        if (numberOfColums > 1) {
            [...Array(numberOfRows).keys()].forEach(e => {
                windowSeats[e] = [[e, 0]];
            });
        }
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 1; j < numberOfColums - 1; j++) {
                if (middleSeats.hasOwnProperty(i)) {
                    middleSeats[i].push([i, j]);
                }
                else {
                    middleSeats[i] = [[i, j]];
                }
            }
        }
        return [aisleSeats, windowSeats, middleSeats];
    }
    getSeatsFromRightBlock(numberOfColums, numberOfRows) {
        const aisleSeats = {};
        const windowSeats = {};
        const middleSeats = {};
        [...Array(numberOfRows).keys()].forEach(e => {
            aisleSeats[e] = [[e, 0]];
        });
        if (numberOfColums > 1) {
            [...Array(numberOfRows).keys()].forEach(e => {
                windowSeats[e] = [[e, numberOfColums - 1]];
            });
        }
        for (let i = 0; i < numberOfRows; i++) {
            for (let j = 1; j < numberOfColums - 1; j++) {
                if (middleSeats.hasOwnProperty(i)) {
                    middleSeats[i].push([i, j]);
                }
                else {
                    middleSeats[i] = [[i, j]];
                }
            }
        }
        return [aisleSeats, windowSeats, middleSeats];
    }
    getSeatsFromMiddleBlocks(blocksShapes) {
        const aisleSeats = {};
        const middleSeats = {};
        for (let blockIndex = 0; blockIndex < blocksShapes.length; blockIndex++) {
            const [numberOfColumns, numberOfRows] = blocksShapes[blockIndex];
            const blockAbsoluteIndex = blockIndex + 1;
            for (let i = 0; i < numberOfRows; i++) {
                for (let j = 0; j < numberOfColumns; j++) {
                    if (j == 0 || j == (numberOfColumns - 1)) {
                        if (aisleSeats.hasOwnProperty(i)) {
                            aisleSeats[i].push([blockAbsoluteIndex, i, j]);
                        }
                        else {
                            aisleSeats[i] = [[blockAbsoluteIndex, i, j]];
                        }
                    }
                    else {
                        if (middleSeats.hasOwnProperty(i)) {
                            middleSeats[i].push([blockAbsoluteIndex, i, j]);
                        }
                        else {
                            middleSeats[i] = [[blockAbsoluteIndex, i, j]];
                        }
                    }
                }
            }
        }
        return [aisleSeats, middleSeats];
    }
    calculatePassengersSeatsArrangement(cabinShape) {
        const result = [];
        const [leftBlockAisleSeats, leftBlockWindowSeats, leftBlockMiddleSeats,] = this.getSeatsFromLeftBlock(...cabinShape[0]);
        const [middleBlocksAisleSeats, middleBlocksMiddleSeats,] = this.getSeatsFromMiddleBlocks(cabinShape.slice(1, cabinShape.length - 1));
        const [rightBlockAisleSeats, rightBlockWindowSeats, rightBlockMiddleSeats,] = this.getSeatsFromRightBlock(...cabinShape[cabinShape.length - 1]);
        let rowIndex = 0;
        while (true) {
            if (!leftBlockAisleSeats.hasOwnProperty(rowIndex)
                && !rightBlockAisleSeats.hasOwnProperty(rowIndex)
                && !middleBlocksAisleSeats.hasOwnProperty(rowIndex)) {
                break;
            }
            if (leftBlockAisleSeats.hasOwnProperty(rowIndex)) {
                leftBlockAisleSeats[rowIndex].forEach(e => result.push([0, ...e]));
            }
            if (middleBlocksAisleSeats.hasOwnProperty(rowIndex)) {
                middleBlocksAisleSeats[rowIndex].forEach(e => result.push(e));
            }
            if (rightBlockAisleSeats.hasOwnProperty(rowIndex)) {
                rightBlockAisleSeats[rowIndex].forEach(e => result.push([cabinShape.length - 1, ...e]));
            }
            rowIndex++;
        }
        rowIndex = 0;
        while (true) {
            if (!leftBlockWindowSeats.hasOwnProperty(rowIndex)
                && !rightBlockWindowSeats.hasOwnProperty(rowIndex)) {
                break;
            }
            if (leftBlockWindowSeats.hasOwnProperty(rowIndex)) {
                leftBlockWindowSeats[rowIndex].forEach(e => result.push([0, ...e]));
            }
            if (rightBlockWindowSeats.hasOwnProperty(rowIndex)) {
                rightBlockWindowSeats[rowIndex].forEach(e => result.push([cabinShape.length - 1, ...e]));
            }
            rowIndex++;
        }
        rowIndex = 0;
        while (true) {
            if (!leftBlockMiddleSeats.hasOwnProperty(rowIndex)
                && !rightBlockMiddleSeats.hasOwnProperty(rowIndex)
                && !middleBlocksMiddleSeats.hasOwnProperty(rowIndex)) {
                break;
            }
            if (leftBlockMiddleSeats.hasOwnProperty(rowIndex)) {
                leftBlockMiddleSeats[rowIndex].forEach(e => result.push([0, ...e]));
            }
            if (middleBlocksMiddleSeats.hasOwnProperty(rowIndex)) {
                middleBlocksMiddleSeats[rowIndex].forEach((e, i) => result.push(e));
            }
            if (rightBlockMiddleSeats.hasOwnProperty(rowIndex)) {
                rightBlockMiddleSeats[rowIndex].forEach(e => result.push([cabinShape.length - 1, ...e]));
            }
            rowIndex++;
        }
        return result;
    }
    isValidNumberOfPassengers(numberOfPassengers) {
        return numberOfPassengers > 0;
    }
    isValidCabinShape(cabinShape) {
        let numberOfBlocks = 0;
        for (const [numberOfColumns, numberOfRows] of cabinShape) {
            if (numberOfColumns <= 0 || numberOfRows <= 0) {
                return false;
            }
            numberOfBlocks++;
        }
        return numberOfBlocks >= 2;
    }
    isCapacityRespected(numberOfPassengers, cabinShape) {
        const capacity = cabinShape
            .reduce((a, [numberOfColumns, numberOfRows]) => a + numberOfColumns * numberOfRows, 0);
        return numberOfPassengers <= capacity;
    }
    getPassengersSeatsArrangement(numberOfPassengers, cabinShape) {
        if (!this.isValidCabinShape(cabinShape)) {
            throw new Error('The shape of the cabin is invalid');
        }
        if (!this.isValidNumberOfPassengers(numberOfPassengers)) {
            throw new Error('The number of passengers must be a strictly positive integer');
        }
        if (!this.isCapacityRespected(numberOfPassengers, cabinShape)) {
            throw new Error('The capacity of the cabin is not respected');
        }
        return this.calculatePassengersSeatsArrangement(cabinShape)
            .slice(0, numberOfPassengers)
            .reduce((a, [blockIndex, row, column], i) => (Object.assign(Object.assign({}, a), { [i + 1]: { blockIndex, row, column } })), {});
    }
}
exports.PassengersSeatsArrangementCalculator = PassengersSeatsArrangementCalculator;
