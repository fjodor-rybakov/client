import {Component} from "react";
import {ProjectListStore} from "./ProjectListStore";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";
import * as rp from "request-promise";
import "./ProjectList.scss";

@observer
@autobind
class ProjectList extends Component {
    store = new ProjectListStore();

    async componentDidMount() {
        const options = {
            method: 'GET',
            uri: `${localStorage.getItem("serverAddress")}/api/projectList`,
            headers: {
                "x-guide-key": localStorage.getItem("token")
            },
        };
        rp(options)
            .then(res => JSON.parse(res))
            .then(data => this.store.data = data)
            .catch(console.log);
    }

    render() {
        return (
            <>
                <div className={"projects__header"}>PROJECTS</div>
                <div className={"projects"}>
                    {this.store.data.map((project, index) => {
                        return (
                            <Link to={`/project/${project.id_project}`} className={"projects__card"} key={index}>
                                <div className={"projects__card-container"}>
                                    <p className={"title"}>{project.title}</p>
                                    <p className={"description"}>{project.description}</p>
                                </div>
                            </Link>
                        )}
                    )}
                </div>
            </>
        );
    }
}

export {ProjectList};