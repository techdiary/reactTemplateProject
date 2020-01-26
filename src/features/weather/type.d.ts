
export type Weather = {
    id: number,
    main: string,
    description: string,
    icon: string
}

export type CurrentWeather = {
    isFetching: boolean,
    coord: any,
    weather: [Weather],
    base: string,
    main: {
        temp: string,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: any,
    id: number,
    name: string,
    cod: number
}

export type dailyWeather = {
    isFetching: boolean,
    cod: number,
    message: any,
    city: {
        geoname_id: number,
        name: string,
        lat: number,
        lon: number,
        country: string,
        iso2: string,
        type: string,
        population: number
    },
    cnt: number,
    list: Array<weatherListObj>
}

type weatherListObj = {
    dt: number,
    temp: {
        day: number,
        min: number,
        max: number,
        night: number,
        eve: number,
        morn: number
    },
    pressure: number,
    humidity: number,
    weather: [Weather],
    speed: number,
    deg: number,
    clouds: number,
    snow: number
}

export type WeatherState = Readonly<{
    dailyWeather: dailyWeather,
    currentWeather: CurrentWeather
}>
// export type WeatherState = dailyWeather | currentWeather | {}
