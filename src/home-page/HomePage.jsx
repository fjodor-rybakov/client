import * as React from 'react';
import {Component} from "react";
import {Link} from 'react-router-dom';
import "./HomePageStyle.scss";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {Header} from "../header/Header";
import * as rp from "request-promise";

@observer
@autobind
class HomePage extends Component {
    componentDidMount() {
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/project/getMostPopular`,
            headers: {
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(options)
            .then(JSON.parse)
            .then(console.log)
            .catch(console.log);
    }

    render() {
        return (
            <div className={"home-page"}>
                <Header title={"Order Task"}/>
                <div className={"about-us"}>
                    <p>Some info...</p>
                </div>
                <p className={"button-order"}>
                    <Link className={"btn"} id={"create-project"} to={"/projectList"}>View Projects</Link>
                </p>
            </div>
        );
    }
}

export {HomePage};