import React, { Component } from 'react'
import { WeatherState } from '../type'
import { State } from '../../../store/root-reducer'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { getCurrentForecast } from '../actions'
import { connect } from 'react-redux'
import { CityState } from '../../city/type'


class WeatherCard extends Component<Props, OwnState> {

    constructor( props : Props) { 
        super(props);
        this.state = {
            cityId: 0
        }
    }
    
    componentDidUpdate(prevProps: StateProps) {
        this.props.userCityId && prevProps.userCityId !== this.props.userCityId &&
        this.setState( (prevState, props) => {
                return {cityId: props.userCityId}
        }, () => this.props.getCurrentForecast(this.state.cityId));
    }

    render() {
        return (
            <div>
                <article>
                    <section>
                        <p> { !!this.props.userCityId &&
                            <code>
                                {JSON.stringify(this.props.currentForecast.currentWeather)}
                            </code>}
                        </p>
                    </section>
                </article>
            </div>
        )
    }
}

type Props = StateProps & DispatchProps & OwnProps

interface OwnState {
    cityId: number
}

interface OwnProps {}

interface StateProps {
    currentForecast: WeatherState,
    userCityId: CityState["id"]
}

interface DispatchProps {
    getCurrentForecast: (cityId: number) => void;
}

const mapStateToProps = ( state: State, ownProps: OwnProps) => ({
    currentForecast: state.weather,
    userCityId: state.userCity.id
});

type MyThunkDispatch = ThunkDispatch<{}, {}, Action>
const mapDispatchToProps = (dispatch: MyThunkDispatch) => {
    return {
        getCurrentForecast: async (cityId: number) => {
            await dispatch(getCurrentForecast(cityId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherCard);