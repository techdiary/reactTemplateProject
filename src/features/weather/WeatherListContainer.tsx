import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WeatherState } from './type';
import { State } from './../../store/root-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { getDailyWeather } from './actions';
import { Action } from 'redux';


type Props = StateProps & DispatchProps & OwnProps
class WeatherList extends Component<Props, OwnState> {

    render() {
        return (
            <div>
                {/* <p>{this.props.dailyForecast}</p> */}
                <button onClick={ () => this.props.getDailyWeather(5)}>Daily Weather!</button>
            </div>
        )
    }
}

interface OwnState {
}

interface OwnProps {
}

interface DispatchProps {
    getDailyWeather: (dayValue: number) => void
}

interface StateProps {
    dailyForecast: WeatherState;
}

const mapStateToProps = (state: State) => ({
    dailyForecast: state.weather
})

type MyThunkDispatch = ThunkDispatch<{}, {}, Action>
const mapDispatchToProps = (dispatch: MyThunkDispatch) : DispatchProps => {
    return {
        getDailyWeather: async (dayValue) => { 
            await dispatch(getDailyWeather(dayValue))
        }
    }
};



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherList)
