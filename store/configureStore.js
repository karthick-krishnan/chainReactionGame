import { createStore, combineReducers, applyMiddleware } from 'redux';
import gameReducer from '../reducers/game';
import thunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers(
    { game: gameReducer }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
    ));
}
export default configureStore;