import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import store, { history} from './store';
import routes from './routes';

const App: React.FC = () => {
  return (
      <Provider store={store}>
          <ConnectedRouter history={history}>
          <CssBaseline />
            { routes }
          </ConnectedRouter>
      </Provider>
    // <div className="App">
    //     {/* Ask users days selection, than WeatherList attribute days can be dynamic */}
    //   <WeatherList days={5}/>
    // </div>
  );
}

export default App;
