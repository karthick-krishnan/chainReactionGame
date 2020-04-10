
export const INIT_GAME = 'INIT_GAME'
export const ON_CELL_CLICK = 'ON_CELL_CLICK'

export const initGame = () => {
    return {
        type: INIT_GAME,
    };
};


export const onCellClick = (gridItems) => {
    return {
        type: ON_CELL_CLICK,
        grid_items: gridItems

    }
}
