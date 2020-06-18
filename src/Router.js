import React from 'react';
import Homepage from './HomePage';

import { Switch, Route } from 'react-router-dom';

const Router = () => (
    <Switch>
        <Route exact path='/' component={Homepage} />
        {/* <Route exact path='/admin' component={admin} /> */}
    </Switch>
)

export default Router;