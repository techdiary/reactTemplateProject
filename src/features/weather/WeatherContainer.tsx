import React, { Component } from 'react'
import WeatherListContainer from './WeatherListContainer'
import WeatherCard from './components/WeatherCard'
import { CitySelect } from '../city/CitySelect'


export default class WeatherContainer extends Component {
    render() {
        return (
            <>
                <CitySelect />
                <WeatherListContainer />
                <div>
                    <WeatherCard />
                </div>
            </>
        )
    }
}
