import { GRID_ROWS_AND_COLUMNS, NUM_OF_COLUMNS } from '../constants/index'

export const createGrid = () => {

    const noOfColumns = NUM_OF_COLUMNS;
    const initialStart = 1;
    const initialEnd = NUM_OF_COLUMNS;
    const lastCellStart = (NUM_OF_COLUMNS * 10) + 1;
    const lastCellEnd = GRID_ROWS_AND_COLUMNS;

    let middleGridVal = noOfColumns + 1;

    let grid = Array.apply(null, Array(GRID_ROWS_AND_COLUMNS)).map((v, i) => {
        let id = i + 1;
        let corners;

        if (id == initialStart || id == initialEnd || id == lastCellStart || id == lastCellEnd) {
            corners = 2;
        } else if ((id > initialStart) && (id < initialEnd) || (id > lastCellStart) && (id < lastCellEnd)) {
            corners = 3;
        } else if (id == middleGridVal) {
            corners = 3;
            middleGridVal = middleGridVal + 6;
        } else {
            corners = 4;
        }

        return {
            'id': id,
            'isHidden': true,
            'belongs_to': null,
            'corners': corners,
            'times_clicked': 0
        }

    });
    return grid;
}

