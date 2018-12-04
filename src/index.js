import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {HomePage} from "./home-page/HomePage";
import {SingIn} from "./sign-in/SingIn";
import {SignUp} from "./sign-up/SignUp";
import {NotFound} from "./not-found/NotFound";
import {Project} from "./project/Project";
import {Task} from "./project/components/TasksList/Task/Task";
import {ProjectList} from "./project-list/ProjectList";
import {Profile} from "./profile/Profile";

localStorage.setItem("serverAddress", "http://localhost:3001");

ReactDOM.render(
    <BrowserRouter>
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
            <Route
                exact={true}
                path={"/project/:id/:taskid"}
                component={Task}
            />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);

// client server
serviceWorker.unregister();
