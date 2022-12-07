import { PassengersSeatsArrangementCalculator } from 'src/index';

const sut = new PassengersSeatsArrangementCalculator();

test('test-1', () => {

    const expected = [
        { blockIndex: 0, row: 0, column: 2 },
        { blockIndex: 1, row: 0, column: 0 },
        { blockIndex: 1, row: 0, column: 3 },
        { blockIndex: 2, row: 0, column: 0 },
        { blockIndex: 2, row: 0, column: 1 },
        { blockIndex: 3, row: 0, column: 0 },
        { blockIndex: 0, row: 1, column: 2 },
        { blockIndex: 1, row: 1, column: 0 },
        { blockIndex: 1, row: 1, column: 3 },
        { blockIndex: 2, row: 1, column: 0 },
        { blockIndex: 2, row: 1, column: 1 },
        { blockIndex: 3, row: 1, column: 0 },
        { blockIndex: 1, row: 2, column: 0 },
        { blockIndex: 1, row: 2, column: 3 },
        { blockIndex: 2, row: 2, column: 0 },
        { blockIndex: 2, row: 2, column: 1 },
        { blockIndex: 3, row: 2, column: 0 },
        { blockIndex: 3, row: 3, column: 0 },
        { blockIndex: 0, row: 0, column: 0 },
        { blockIndex: 3, row: 0, column: 2 },
        { blockIndex: 0, row: 1, column: 0 },
        { blockIndex: 3, row: 1, column: 2 },
        { blockIndex: 3, row: 2, column: 2 },
        { blockIndex: 3, row: 3, column: 2 },
        { blockIndex: 0, row: 0, column: 1 },
        { blockIndex: 1, row: 0, column: 1 },
        { blockIndex: 1, row: 0, column: 2 },
        { blockIndex: 3, row: 0, column: 1 },
        { blockIndex: 0, row: 1, column: 1 },
        { blockIndex: 1, row: 1, column: 1 },
    ];

    const calculated = sut
    .getPassengersSeatsArrangement(30, [[3, 2], [4, 3], [2, 3], [3, 4]]);
    
    expected.forEach(({ blockIndex, row, column }, i) => {
    
        expect(calculated.hasOwnProperty(i))
        .toEqual(true);

        const [
            calcultedBlockIndex,
            calcultedRow,
            calcultedColumn,
        ] = calculated[i];
    
        expect(blockIndex)
        .toEqual(calcultedBlockIndex);
    
        expect(row)
        .toEqual(calcultedRow);
    
        expect(column)
        .toEqual(calcultedColumn);

    });
    
});

test('test-2', () => {

    const expected = [
        { blockIndex: 0, row: 0, column: 0 },
        { blockIndex: 1, row: 0, column: 0 },
        { blockIndex: 1, row: 0, column: 1 },
        { blockIndex: 2, row: 0, column: 0 },
        { blockIndex: 0, row: 1, column: 0 },
        { blockIndex: 1, row: 1, column: 0 },
        { blockIndex: 1, row: 1, column: 1 },
        { blockIndex: 2, row: 1, column: 0 },
        { blockIndex: 1, row: 2, column: 0 },
        { blockIndex: 1, row: 2, column: 1 },
    ];
    
    const calculated = sut
    .getPassengersSeatsArrangement(10, [[1, 2], [2, 5], [1, 4]]);
    
    expected.forEach(({ blockIndex, row, column }, i) => {
    
        expect(calculated.hasOwnProperty(i))
        .toEqual(true);

        const [
            calcultedBlockIndex,
            calcultedRow,
            calcultedColumn,
        ] = calculated[i];
    
        expect(blockIndex)
        .toEqual(calcultedBlockIndex);
    
        expect(row)
        .toEqual(calcultedRow);
    
        expect(column)
        .toEqual(calcultedColumn);

    });
    
});

test('test-3', () => {

    const expected = [
        { blockIndex: 0, row: 0, column: 0 },
        { blockIndex: 1, row: 0, column: 0 },
        { blockIndex: 2, row: 0, column: 0 },
        { blockIndex: 1, row: 1, column: 0 },
        { blockIndex: 1, row: 2, column: 0 },
        { blockIndex: 1, row: 3, column: 0 },
        { blockIndex: 1, row: 4, column: 0 },
        { blockIndex: 2, row: 0, column: 4 },
        { blockIndex: 2, row: 0, column: 1 },
        { blockIndex: 2, row: 0, column: 2 },
    ];

    const calculated = sut
    .getPassengersSeatsArrangement(10, [[1, 1], [1, 5], [5, 1]]);
    
    expected.forEach(({ blockIndex, row, column }, i) => {
    
        expect(calculated.hasOwnProperty(i))
        .toEqual(true);

        const [
            calcultedBlockIndex,
            calcultedRow,
            calcultedColumn,
        ] = calculated[i];
    
        expect(blockIndex)
        .toEqual(calcultedBlockIndex);
    
        expect(row)
        .toEqual(calcultedRow);
    
        expect(column)
        .toEqual(calcultedColumn);

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