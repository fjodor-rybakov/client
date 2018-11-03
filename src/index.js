import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import {HomePage} from "./home-page/HomePage";
import {SingIn} from "./SignIn/SingIn";
import {SignUp} from "./SignUp/SignUp";
import {NotFound} from "./not-found/NotFound";

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
        <Route component={NotFound}/>
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
