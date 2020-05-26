import { db } from './config';


export const services = {
    getPlayerDetails: async (macId) => {
        try {
            let playerDetails = {};
            let snapshot = await db.ref(`${macId}`).once('value');
            const data = snapshot.val();
            const { winner_id, loser_id, bet_amount } = data.games.slice(-1).pop();
            const player1 = data.players.filter(val => val.id == winner_id)[0];
            const player2 = data.players.filter(val => val.id == loser_id)[0];
            playerDetails = { ...{ 'player1': player1, 'player2': player2, 'betAmount': bet_amount } }
            return playerDetails;
        } catch (ex) {
            console.log(ex);
        }

    }
}