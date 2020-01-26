import React from 'react'
import { Route, Switch} from 'react-router';
import WeatherContainer from '../features/weather/WeatherContainer';

const routes = (
        <Switch>
            <Route exact path="/" component={WeatherContainer} />
            {/* <Route component={NoMatch} /> // TODO: Create NoMatch Component */}
        </Switch>
)

export default routes;