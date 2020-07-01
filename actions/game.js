import { services } from '../services';
import { getItem } from '../utils/local-storage';
import { createGrid } from '../utils/grid';
export const INIT_GAME = 'INIT_GAME'
export const GET_PLAYER_DETAILS = 'GET_PLAYER_DETAILS'

export const getPlayerDetails = (macId) => async (dispatch) => {
    try {
        let data = await services.getPlayerDetails(macId);
        dispatch({
            type: GET_PLAYER_DETAILS,
            payload: data
        })
    } catch (ex) {
        console.log(ex);
    }
}


export const savePlayerDetails = (macId) => async (dispatch) => {
    try {
        let data = await services.savePlayerDetails(macId);
        dispatch({
            type: GET_PLAYER_DETAILS,
            payload: data
        })
    } catch (ex) {
        console.log(ex);
    }
}

