export const GRID_ROWS_AND_COLUMNS = 66;
export const NUM_OF_COLUMNS = 6;
export const GAME_OBJECT = {
    grid: [],
    grid_color: null,
    players: ['player1', 'player2'],
    ballColors: ['green', 'red'],
    player_turn: null,
    winner: null,
    player_details: {
        "player1": {
            "color": null,
            "game_started": false
        },
        "player2": {
            "color": null,
            "game_started": false
        }
    }
};