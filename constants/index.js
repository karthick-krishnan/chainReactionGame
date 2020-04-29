export const GRID_ROWS_AND_COLUMNS = 66;
export const NUM_OF_COLUMNS = 6;
export const GAME_OBJECT = {
    grid: [],
    players: ['player1', 'player2'],
    ballColors: ['green', 'red'],
    player_turn: null,
    game_started: false,
    player_details: {
        "player1": {
            "color": null,
            "moves": []
        },
        "player2": {
            "color": null,
            "moves": []
        }
    }
};