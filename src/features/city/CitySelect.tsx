import React from 'react';
import { useDispatch } from 'react-redux';
import { useCityTypedSelector } from './reducers'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import indiaCityList from '../../util/city.list.json'
import { CityState } from './type.js';
import { setUserCityData } from './actions';

type Prop = {}

export const CitySelect : React.FC<Prop> = props => {
    const dispatch = useDispatch();
    const defaultProps = {
        options: indiaCityList,
        getOptionLabel: (option: CityState) => option.name,
    }

    const currentCity =  useCityTypedSelector(state  => state.userCity);

    return (
        <div>
            <Autocomplete
            { ...defaultProps}
                id="combo-box-city"
                style={{ width: 300 }}
                value={currentCity}
                onChange={(e: any, newValue: CityState | null) => dispatch(setUserCityData(newValue))}
                renderInput={(params) => <TextField {...params} label="Select City" variant="outlined" fullWidth />}
            />
            <h3>User City: {currentCity.name}</h3>
        </div>
	);
}

