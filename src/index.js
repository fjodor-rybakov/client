import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {HomePage} from "./home-page/HomePage";
import {SingIn} from "./SignIn/SingIn";
import {SignUp} from "./SignUp/SignUp";
import {NotFound} from "./not-found/NotFound";
import {Project} from "./Project/Project";
import {ProjectList} from "./ProjectList/ProjectList";
import {Profile} from "./Profile/Profile";

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route
            exact={true}
            path={"/"}
            component={HomePage}
        />
        <Route
            exact={true}
            path={"/signin"}
            component={SingIn}
        />
        <Route
            exact={true}
            path={"/signup"}
            component={SignUp}
        />
        <Route
            exact={true}
            path={"/profile"}
            component={Profile}
        />
        <Route
            exact={true}
            path={"/projectList"}
            component={ProjectList}
        />
        <Route
            exact={true}
            path={"/project/:id"}
            component={Project}
        />
        <Route component={NotFound}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
