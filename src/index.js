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
import {layout} from "./layout";

localStorage.setItem("serverAddress", "http://localhost:3001");

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route
                exact={true}
                path={"/"}
                component={renderPage.bind(this, <HomePage/>)}
            />
            <Route
                exact={true}
                path={"/signin"}
                component={renderPage.bind(this, <SingIn/>)}
            />
            <Route
                exact={true}
                path={"/signup"}
                component={renderPage.bind(this, <SignUp/>)}
            />
            <Route
                exact={true}
                path={"/profile"}
                component={renderPage.bind(this, <Profile/>)}
            />
            <Route
                exact={true}
                path={"/projectList"}
                component={renderPage.bind(this, <ProjectList/>)}
            />
            <Route
                exact={true}
                path={"/project/:id"}
                component={renderPage.bind(this, <Project/>)}
            />
            <Route
                exact={true}
                path={"/project/:id/:taskid"}
                component={renderPage.bind(this, <Task/>)}
            />
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);

// client server
serviceWorker.unregister();

function renderPage(component) {
    return new layout(component);
}
