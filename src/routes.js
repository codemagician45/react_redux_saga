import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import Loadable from 'react-loadable';
const Loading = () => <div>Loading...</div>;

const Home = Loadable({
    loader: () => import('./containers/home'),
    loading: Loading,
});

const routes = (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={Home} />
        </Switch>
    </ConnectedRouter>
)

export default routes;