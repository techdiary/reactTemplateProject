import { RouterState } from 'connected-react-router';
import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { History } from 'history'

import weatherReducer from '../features/weather/reducers';
import cityReducer from '../features/city/reducers';
import { WeatherState } from '../features/weather/type';
import { CityState } from '../features/city/type';
import { SetFetching, SET_FETCHING } from './root-action';

const isFetching = ( state = false, action: SetFetching) => {
    switch (action.type) {
        case SET_FETCHING:
            return Object.assign( {}, state, { isFetching: action.data} )
        default:
            return state;
    }
}

const rootReducer = (history: History<any>) => combineReducers({
    isFetching: isFetching,
    weather: weatherReducer,
    userCity: cityReducer,
    router: connectRouter(history)
});

export interface State {
    readonly isFetching: boolean,
    readonly weather:  WeatherState,
    readonly userCity: CityState
    router: RouterState
}

export default rootReducer;
