import * as React from 'react';
import {Component} from "react";
import {Link} from 'react-router-dom';
import "./HomePageStyle.scss";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {Header} from "../header/Header";
import * as rp from "request-promise";
import {HomePageStore} from "./HomePageStore";

@observer
@autobind
class HomePage extends Component {
    store = new HomePageStore();

    componentWillMount() {
        const req = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/project/getMostPopular`,
            headers: {
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(req)
            .then(JSON.parse)
            .then(this.onSuccess)
            .catch(console.log);
    }

    onSuccess(data) {
        console.log(data);
        this.store.data = data;
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
                <div className={"popular"}>
                    <h4 className={"popular__header"}>The most popular projects</h4>
                    {this.store.data.map((project, index) =>
                        <Link to={`/project/${project.id_project}`} key={index} className={"popular__item"}>{project.title}</Link>
                    )}
                </div>
            </div>
        );
    }
}

export {HomePage};