import { WeatherAction } from './actions';
import { WeatherState, CurrentWeather, dailyWeather } from './type'
import * as actionTypes from './actionTypes'

const initialState: WeatherState = {
    dailyWeather: {} as dailyWeather, // to initialize empty object of type T
    currentWeather: {} as CurrentWeather,
};

const weatherReducer = (state = initialState, action: WeatherAction) : WeatherState => {
  switch (action.type) {
    case actionTypes.SET_DAILY_WEATHER_DATA:
        console.log("set daily weather reducer");
        return Object.assign( {}, state)
    case actionTypes.SET_CURRENT_WEATHER_DATA:
        console.log("set current weather reducer");
        return Object.assign( {}, state, { currentWeather: { ...action.data}})
    default:
      return state;
  }
}

export default weatherReducer;