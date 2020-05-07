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
        } else if ((id == middleGridVal) || ((id > noOfColumns) && (id % noOfColumns == 0))) {
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


export const spreadGridBalls = (stateObj, item) => {
    let grid = stateObj.grid;

    const index = grid.findIndex((val) => {
        return val.id == item.id;
    });
    grid[index].belongs_to = null;
    grid[index].color = null;
    grid[index].isHidden = true;
    grid[index].times_clicked = 0;

    //initial Spreading
    let { ...corners } = _identifySpreadCells(index);
    console.log('corners--->', corners);
    stateObj.grid = _spreadCells(stateObj, corners);
    grid = stateObj.grid;

    //community Spread
    let treeEnd = false;
    let counter = 0;
    let spreadIndex = index;
    let spreadCells = [];
    let cornerObj = [];
    while (!treeEnd) {
        let { ...corners } = _identifySpreadCells(spreadIndex);
        for (var val in corners) {
            if (corners[val]) {
                let cornerVal = corners[val];
                if (grid[cornerVal].times_clicked == grid[cornerVal].corners) {
                    !(spreadCells && Array.isArray(spreadCells)) ? spreadCells = [] : null;
                    spreadCells.push(cornerVal);
                    grid[cornerVal].times_clicked = 0;
                    cornerObj.push(corners);
                }
            }
        }

        if (spreadCells && spreadCells[counter]) {
            spreadIndex = spreadCells[counter];
            treeEnd = false;
        } else {
            treeEnd = true;
        }
        counter++;
    }


    if (spreadCells.length > 0) {
        spreadCells.forEach((val) => {
            grid[val].belongs_to = null;
            grid[val].color = null;
            grid[val].isHidden = true;
            grid[val].times_clicked = 0;
            console.log('value--->', val);
            let { ...corners } = _identifySpreadCells(val);
            stateObj.grid = _spreadCells(stateObj, corners);
        })
    }


    console.log('player turn', stateObj.player_turn);

    const nextPlayerTurn = stateObj.players.filter(player => !player.includes(stateObj.player_turn));
    stateObj.player_turn = nextPlayerTurn[0];
    console.log('next player turn', nextPlayerTurn[0]);
    stateObj.grid_color = stateObj.player_details[stateObj.player_turn].color;
    return stateObj;

}

const _identifySpreadCells = (index) => {
    let upperCorner = ((index - NUM_OF_COLUMNS) > 0) ? index - NUM_OF_COLUMNS : null;
    let downerCorner = ((index + NUM_OF_COLUMNS) < GRID_ROWS_AND_COLUMNS) ? index + NUM_OF_COLUMNS : null;
    let leftCorner = (index % NUM_OF_COLUMNS) > 0 ? index - 1 : null;
    let rightCorner = (((index + 1) % (NUM_OF_COLUMNS)) > 0) ? index + 1 : null;
    console.log('index', index);
    console.log('rightCorner', rightCorner);
    return {
        upperCorner: upperCorner,
        downerCorner: downerCorner,
        leftCorner: leftCorner,
        rightCorner: rightCorner
    }

}

export const _spreadCells = (stateObj, corners) => {
    let grid = stateObj.grid;
    let { upperCorner, downerCorner, leftCorner, rightCorner } = corners;
    console.log('corners---> ', corners);

    if (upperCorner) {
        grid[upperCorner].times_clicked++;
        grid[upperCorner].color = stateObj.player_details[stateObj.player_turn].color;
        grid[upperCorner].isHidden = false;
        grid[upperCorner].belongs_to = stateObj.player_turn;
    }

    if (downerCorner) {
        grid[downerCorner].times_clicked++;
        grid[downerCorner].color = stateObj.player_details[stateObj.player_turn].color;
        grid[downerCorner].isHidden = false;
        grid[downerCorner].belongs_to = stateObj.player_turn;
    }

    if (leftCorner) {
        grid[leftCorner].times_clicked++;
        grid[leftCorner].color = stateObj.player_details[stateObj.player_turn].color;
        grid[leftCorner].isHidden = false;
        grid[leftCorner].belongs_to = stateObj.player_turn;
    }


    if (rightCorner) {
        grid[rightCorner].times_clicked++;
        grid[rightCorner].color = stateObj.player_details[stateObj.player_turn].color;
        grid[rightCorner].isHidden = false;
        grid[rightCorner].belongs_to = stateObj.player_turn;
    }

    return grid;
}


