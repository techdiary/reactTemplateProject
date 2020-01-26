import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { CityState } from './type';
import { CityAction } from './actions';
import { State } from '../../store/root-reducer';

const initialState: CityState = {
    "id": 0,
    "name": "",
    "country": "",
    "coord": {
      "lon": 0,
      "lat": 0
    }
}

export const useCityTypedSelector: TypedUseSelectorHook<State> = useSelector;

const cityReducer = ( state = initialState, action: CityAction): CityState =>{
    if (action.type === "SET_USER_CITY") {
        // return { ...state, ...action.data}
        if(action.data){
            return Object.assign( {}, state, { ...action.data})
        } else return initialState;
    } else {
        return state;
    }
}

export default cityReducer;