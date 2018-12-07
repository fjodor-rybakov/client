import {Component} from "react";
import {ProjectListStore} from "./ProjectListStore";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";
import "./ProjectList.scss";

@observer
@autobind
class ProjectList extends Component {
    store = new ProjectListStore();

    async componentDidMount() {
        const options = {method: "GET"};
        await fetch(`${localStorage.getItem("serverAddress")}/api/projectList`, options)
            .then(res => res.json())
            .then(data => {
                this.store.data = data;
            });
        console.log(this.store.data);
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
                            )
                        }
                    )}
                </div>
            </>
        );
    }
}

export {ProjectList};