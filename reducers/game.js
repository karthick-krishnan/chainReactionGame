let count = 0;
export default function game(game = {}, action) {
    switch (action.type) {
        case 'INIT_GAME':
            return { value: count }
        case 'ON_CELL_CLICK':
            return { grid: action.grid_items }
        default:
            return game;
    }
}
