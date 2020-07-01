export const GRID_ROWS_AND_COLUMNS = 66;
export const NUM_OF_COLUMNS = 6;
export const GAME_OBJECT = {
    grid: [],
    grid_color: null,
    ballColors: [],
    player_turn: null,
    winner: null,
    betAmount: 0,
    players: ['player1', 'player2'],
    player_details: {
        "player1": {
            "color": null,
            "game_started": false,
            "name": ""
        },
        "player2": {
            "color": null,
            "game_started": false,
            "name": ""
        }
    }
};
export const FIREBASE_API_KEY = 'AIzaSyCjNkK6PpUfggKUm2kNicKdlJc2vWudECk';
export const FIREBASE_DB_URL = 'https://chainreaction-43289.firebaseio.com/';
export const FIREBASE_PROJECT_ID = 'chainreaction-43289';
