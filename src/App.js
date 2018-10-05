import React, { Component, Fragment } from 'react';
import './App.css';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { routes } from './routes/routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store/store';
const store = configureStore();

const Loading = () => <div>Loading ...</div>;

const DashboardLoader = Loadable({
  loader: () => import('./containers/dashboard'),
  loading: Loading
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Router>
            <Switch>
              <Route exact path={routes.index} component={DashboardLoader} />
            </Switch>
          </Router>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
