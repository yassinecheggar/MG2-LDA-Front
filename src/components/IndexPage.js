import React from 'react'
import { BrowserRouter, Route, Switch, useRouteMatch,useParams } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard'


export default function IndexPage() {

    let match = useRouteMatch();

    return (
       
        <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Dashboard />
        </Route>
        </Switch>
     
    )
}
