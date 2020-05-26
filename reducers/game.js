export default function game(game = {}, action) {
    switch (action.type) {
        case 'INIT_GAME':
            return { value: count }
        case 'GET_PLAYER_DETAILS':
            return { playerDetails: action.payload }
        default:
            return game;
    }
}
