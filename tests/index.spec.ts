import { PassengersSeatsArrangementCalculator } from 'src/index';

const sut = new PassengersSeatsArrangementCalculator();

test('test-1', () => {

    const expected = {
        1: { blockIndex: 0, row: 0, column: 2 },
        2: { blockIndex: 1, row: 0, column: 0 },
        3: { blockIndex: 1, row: 0, column: 3 },
        4: { blockIndex: 2, row: 0, column: 0 },
        5: { blockIndex: 2, row: 0, column: 1 },
        6: { blockIndex: 3, row: 0, column: 0 },
        7: { blockIndex: 0, row: 1, column: 2 },
        8: { blockIndex: 1, row: 1, column: 0 },
        9: { blockIndex: 1, row: 1, column: 3 },
        10: { blockIndex: 2, row: 1, column: 0 },
        11: { blockIndex: 2, row: 1, column: 1 },
        12: { blockIndex: 3, row: 1, column: 0 },
        13: { blockIndex: 1, row: 2, column: 0 },
        14: { blockIndex: 1, row: 2, column: 3 },
        15: { blockIndex: 2, row: 2, column: 0 },
        16: { blockIndex: 2, row: 2, column: 1 },
        17: { blockIndex: 3, row: 2, column: 0 },
        18: { blockIndex: 3, row: 3, column: 0 },
        19: { blockIndex: 0, row: 0, column: 0 },
        20: { blockIndex: 3, row: 0, column: 2 },
        21: { blockIndex: 0, row: 1, column: 0 },
        22: { blockIndex: 3, row: 1, column: 2 },
        23: { blockIndex: 3, row: 2, column: 2 },
        24: { blockIndex: 3, row: 3, column: 2 },
        25: { blockIndex: 0, row: 0, column: 1 },
        26: { blockIndex: 1, row: 0, column: 1 },
        27: { blockIndex: 1, row: 0, column: 2 },
        28: { blockIndex: 3, row: 0, column: 1 },
        29: { blockIndex: 0, row: 1, column: 1 },
        30: { blockIndex: 1, row: 1, column: 1 },
    };

    const calculated = sut
    .getPassengersSeatsArrangement(30, [[3, 2], [4, 3], [2, 3], [3, 4]]);
    
    Object.entries(expected)
    .forEach(([passengerNumber, { blockIndex, row, column }]) => {
    
        expect(calculated.hasOwnProperty(passengerNumber))
        .toEqual(true);

        const calculatedSeatLocation = calculated[parseInt(passengerNumber, 10)];
    
        expect(blockIndex)
        .toEqual(calculatedSeatLocation.blockIndex);
    
        expect(row)
        .toEqual(calculatedSeatLocation.row);
    
        expect(column)
        .toEqual(calculatedSeatLocation.column);

    });
    
});

test('test-2', () => {

    const expected = {
        1: { blockIndex: 0, row: 0, column: 0 },
        2: { blockIndex: 1, row: 0, column: 0 },
        3: { blockIndex: 1, row: 0, column: 1 },
        4: { blockIndex: 2, row: 0, column: 0 },
        5: { blockIndex: 0, row: 1, column: 0 },
        6: { blockIndex: 1, row: 1, column: 0 },
        7: { blockIndex: 1, row: 1, column: 1 },
        8: { blockIndex: 2, row: 1, column: 0 },
        9: { blockIndex: 1, row: 2, column: 0 },
        10: { blockIndex: 1, row: 2, column: 1 },
    }
    
    const calculated = sut
    .getPassengersSeatsArrangement(10, [[1, 2], [2, 5], [1, 4]]);
    
    Object.entries(expected)
    .forEach(([passengerNumber, { blockIndex, row, column }]) => {
    
        expect(calculated.hasOwnProperty(passengerNumber))
        .toEqual(true);

        const calculatedSeatLocation = calculated[parseInt(passengerNumber, 10)];
    
        expect(blockIndex)
        .toEqual(calculatedSeatLocation.blockIndex);
    
        expect(row)
        .toEqual(calculatedSeatLocation.row);
    
        expect(column)
        .toEqual(calculatedSeatLocation.column);

    });
    
});

test('test-3', () => {

    const expected = {
        1: { blockIndex: 0, row: 0, column: 0 },
        2: { blockIndex: 1, row: 0, column: 0 },
        3: { blockIndex: 2, row: 0, column: 0 },
        4: { blockIndex: 1, row: 1, column: 0 },
        5: { blockIndex: 1, row: 2, column: 0 },
        6: { blockIndex: 1, row: 3, column: 0 },
        7: { blockIndex: 1, row: 4, column: 0 },
        8: { blockIndex: 2, row: 0, column: 4 },
        9: { blockIndex: 2, row: 0, column: 1 },
        10: { blockIndex: 2, row: 0, column: 2 },
    };

    const calculated = sut
    .getPassengersSeatsArrangement(10, [[1, 1], [1, 5], [5, 1]]);

    Object.entries(expected)
    .forEach(([passengerNumber, { blockIndex, row, column }]) => {
    
        expect(calculated.hasOwnProperty(passengerNumber))
        .toEqual(true);

        const calculatedSeatLocation = calculated[parseInt(passengerNumber, 10)];
    
        expect(blockIndex)
        .toEqual(calculatedSeatLocation.blockIndex);
    
        expect(row)
        .toEqual(calculatedSeatLocation.row);
    
        expect(column)
        .toEqual(calculatedSeatLocation.column);

    });

});

test('test-4', () => {
    
    expect(() => sut.getPassengersSeatsArrangement(0, [[1, 1], [1, 5], [5, 1]]))
    .toThrow(new Error('The number of passengers must be a strictly positive integer'));
    
});

test('test-5', () => {
    
    expect(() => sut.getPassengersSeatsArrangement(100, [[1, 0], [1, 5], [5, 1]]))
    .toThrow(new Error('The shape of the cabin is invalid'));
    
});

test('test-6', () => {
    
    expect(() => sut.getPassengersSeatsArrangement(100, [[1, 1], [1, 5], [5, 1]]))
    .toThrow(new Error('The capacity of the cabin is not respected'));
    
});