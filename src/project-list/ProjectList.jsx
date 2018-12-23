import {Component} from "react";
import {ProjectListStore} from "./ProjectListStore";
import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";
import * as rp from "request-promise";
import "./ProjectList.scss";
import {Header} from "../header/Header";
import {Redirect} from "react-router";

@observer
@autobind
class ProjectList extends Component {
    store = new ProjectListStore();

    async componentDidMount() {
        const options = {
            method: 'GET',
            uri: `${localStorage.getItem("serverAddress")}/api/projectList`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(options)
            .then(res => JSON.parse(res))
            .then(this.successGetDataProjects)
            .catch(this.rejectGetDataProjects);
    }

    successGetDataProjects(data) {
        this.store.data = data;
    }

    rejectGetDataProjects(error) {
        console.log(error);
        this.store.isRedirect = true;
    }

    render() {
        if (!localStorage.getItem("token") || this.store.isRedirect) {
            return <Redirect to={"/signin"}/>
        } else {
            return (
                <>
                    <Header title={"PROJECTS"}/>
                    <div className={"projects"}>
                        {this.store.data.map((project, index) => {
                                return (
                                    <Link to={`/project/${project.id_project}`} className={"projects__card"} key={index}>
                                        <div className={"projects__card-container"}>
                                            <p className={"title"}>{project.title}</p>
                                            <p className={"description"}>{project.description}</p>
                                            <span className={`status status-${project.status}`}>{project.status}</span>
                                        </div>
                                    </Link>
                                )
                            }
                        )}
                        <Link to={"createProject"} className="btn">CREATE PROJECT</Link>
                    </div>
                </>
            );
        }
    }
}

export {ProjectList};