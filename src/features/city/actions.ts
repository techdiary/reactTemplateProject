import { CityState } from "./type";

export interface setUserCity {
    type: "SET_USER_CITY";
    data: CityState | null;
}

export type CityAction = setUserCity;

export const setUserCityData = (cityData: CityState | null): setUserCity => ({
    type: "SET_USER_CITY",
    data: cityData
})