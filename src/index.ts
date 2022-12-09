import { BlockRowSeats } from 'src/definitions/BlockRowSeats';
import { SeatLocation } from 'src/definitions/SeatLocation';
import { RowSeats } from 'src/definitions/RowSeats';

export class PassengersSeatsArrangementCalculator {

    private getSeatsFromEdgeBlocks(
        numberOfColums: number,
        numberOfRows: number,
        aisleSeatSelector: (rowIndex: number) => [number, number],
        windowSeatSelector: (rowIndex: number) => [number, number],
    ): [BlockRowSeats, BlockRowSeats, BlockRowSeats] {

        const aisleSeats: BlockRowSeats = { };
        const windowSeats: BlockRowSeats = { };
        const middleSeats: BlockRowSeats = { };

        for (let i = 0; i < numberOfRows; i++) {
            aisleSeats[i] = [aisleSeatSelector(i)];
        }
        
        if (numberOfColums > 1) {

            for (let i = 0; i < numberOfRows; i++) {
                windowSeats[i] = [windowSeatSelector(i)];
            }

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

    private findSeatsInLeftBlock(numberOfColums: number, numberOfRows: number): [BlockRowSeats, BlockRowSeats, BlockRowSeats] {

        return this.getSeatsFromEdgeBlocks(
            numberOfColums,
            numberOfRows,
            rowIndex => [rowIndex, numberOfColums - 1],
            rowIndex => [rowIndex, 0],
        );
        
    }

    private findSeatsInRightBlock(numberOfColums: number, numberOfRows: number): [BlockRowSeats, BlockRowSeats, BlockRowSeats] {

        return this.getSeatsFromEdgeBlocks(
            numberOfColums,
            numberOfRows,
            rowIndex => [rowIndex, 0],
            rowIndex => [rowIndex, numberOfColums - 1],
        );

    }

    private findSeatsInMiddleBlocks(blocksShapes: [number, number][]): [RowSeats, RowSeats] {

        const aisleSeats: RowSeats = { };
        const middleSeats: RowSeats = { };
        
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

    private findPassengersSeatsArrangement(cabinShape: [number, number][]): SeatLocation[] {

        const result: SeatLocation[] = [];

        const [
            leftBlockAisleSeats,
            leftBlockWindowSeats,
            leftBlockMiddleSeats,
        ] = this.findSeatsInLeftBlock(...cabinShape[0]);
        
        const [
            middleBlocksAisleSeats,
            middleBlocksMiddleSeats,
        ] = this.findSeatsInMiddleBlocks(cabinShape.slice(1, cabinShape.length - 1));

        const [
            rightBlockAisleSeats,
            rightBlockWindowSeats,
            rightBlockMiddleSeats,
        ] = this.findSeatsInRightBlock(...cabinShape[cabinShape.length - 1]);
        
        let rowIndex = 0;

        while (leftBlockAisleSeats.hasOwnProperty(rowIndex)
            || rightBlockAisleSeats.hasOwnProperty(rowIndex)
            || middleBlocksAisleSeats.hasOwnProperty(rowIndex)) {
            
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

        while (leftBlockWindowSeats.hasOwnProperty(rowIndex)
            || rightBlockWindowSeats.hasOwnProperty(rowIndex)) {
            
            if (leftBlockWindowSeats.hasOwnProperty(rowIndex)) {
                leftBlockWindowSeats[rowIndex].forEach(e => result.push([0, ...e]));
            }
            
            if (rightBlockWindowSeats.hasOwnProperty(rowIndex)) {
                rightBlockWindowSeats[rowIndex].forEach(e => result.push([cabinShape.length - 1, ...e]));
            }

            rowIndex++;
        }
        
        rowIndex = 0;

        while (leftBlockMiddleSeats.hasOwnProperty(rowIndex)
            || rightBlockMiddleSeats.hasOwnProperty(rowIndex)
            || middleBlocksMiddleSeats.hasOwnProperty(rowIndex)) {
            
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

    private isValidNumberOfPassengers(numberOfPassengers: number) {
        return numberOfPassengers > 0;
    }

    private isValidCabinShape(cabinShape: [number, number][]) {

        let numberOfBlocks = 0;
        
        for (const [numberOfColumns, numberOfRows] of cabinShape) {

            if (numberOfColumns <= 0 || numberOfRows <= 0) {
                return false;
            }
            
            numberOfBlocks++;
        }

        return numberOfBlocks >= 2;
    }

    private isCapacityRespected(numberOfPassengers: number, cabinShape: [number, number][]) {

        const capacity = cabinShape
        .reduce<number>((a, [numberOfColumns, numberOfRows]) => a + numberOfColumns * numberOfRows, 0);

        return numberOfPassengers <= capacity;
    }

    public getPassengersSeatsArrangement(numberOfPassengers: number, cabinShape: [number, number][]) {

        if (!this.isValidCabinShape(cabinShape)) {
            throw new Error('The shape of the cabin is invalid');
        }

        if (!this.isValidNumberOfPassengers(numberOfPassengers)) {
            throw new Error('The number of passengers must be a strictly positive integer');
        }

        if (!this.isCapacityRespected(numberOfPassengers, cabinShape)) {
            throw new Error('The capacity of the cabin is not respected');
        }
        
        return this.findPassengersSeatsArrangement(cabinShape)
        .slice(0, numberOfPassengers);;
    }

}