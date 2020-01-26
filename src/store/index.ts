import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import rootReducer from "./root-reducer";
import thunk from "redux-thunk";

export const history = createBrowserHistory(); // TODO: learn

const initialState = { };

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
 )

 export default store;