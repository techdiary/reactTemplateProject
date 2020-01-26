import axios from "axios";
import API from "../../util/API";
import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import * as actionType from "./actionTypes";
// import indiaCityList from "../../util/city.list.json";
import { CurrentWeather } from "./type";
import { isFetching } from "../../store/root-action";


export interface SetDailyWeather {
	type: "SET_DAILY_WEATHER_DATA";
	data: {};
}
export interface SetCurrentWeather {
	type: "SET_CURRENT_WEATHER_DATA";
	data: CurrentWeather;
}


// Union Action Types
export type WeatherAction =  SetDailyWeather | SetCurrentWeather;


/* #region  Daily Weather ACTIONS */

export const setDailyWeatherData = (): SetDailyWeather => ({ type: actionType.SET_DAILY_WEATHER_DATA, data: {} });

export const getDailyWeather = (dayNumber: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		try {
			dispatch(isFetching(true));
			await fetchDailyWeather(dayNumber);
			dispatch(isFetching(false));
			dispatch(setDailyWeatherData());
		} catch (e) {
			console.log("Got error: " + e);
		}
	};
};

async function fetchDailyWeather(noOfDays: number) {
	let response = "Empty";
	try {
		response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
	} catch (e) {
		console.log(e);
	}
	console.log(response);
	return response;
}
/* #endregion */

/* #region  Current Weather ACTIONS */
export const setCurrentWeatherData = (data: any): SetCurrentWeather => ({
	type: actionType.SET_CURRENT_WEATHER_DATA,
	data: data
});

export const getCurrentForecast = (cityId: number): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
		try {
			dispatch(isFetching(true));
			const currentWeatherData: any = await fetchCurrentWeather(cityId);
			console.log("Got Weather data from action");
			dispatch(setCurrentWeatherData(currentWeatherData.data));
		} catch (e) {
			console.log("Got error: " + e);
		} finally {
			dispatch(isFetching(false));
		}
	};
};

async function fetchCurrentWeather(cityId: number) {
	try {
		// const cityID = indiaCityList.filter((obj) => obj.name === cityId)[0].id;
		console.log(cityId);
		const currentWeather = API.get("/weather", {
			params: {
				id: cityId,
				units: "metric",
				APPID: ""
			}
		});
		return currentWeather;
	} catch (e) {
		console.log(e);
	}
}
/* #endregion */

