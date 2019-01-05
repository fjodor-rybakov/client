import * as React from "react";
import {TasksListStore} from "./TasksListStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";
import * as rp from "request-promise";
import "./TasksList.scss";

@autobind
@observer
class TasksList extends React.Component {
    store = new TasksListStore();

    constructor(props) {
        super(props);
        this.store.idProject = props.idProject;
    }

    async componentWillMount() {
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/tasksList/${this.store.idProject}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
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
                {
                    this.props.isVisible
                        ? <div className={"tasks-list"}>
                            {this.store.data.map((task, index) => {
                                return (
                                    <Link to={`${task.id_project}/${task.id_task}`} key={index}>
                                        <div className={"card"}>
                                            <p className={"tasks-list__header"}>{task.title}</p>
                                            <p className={"tasks-list__status"}>{task.status}</p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                        : void 0
                }
            </>
        )
    }
}

export {TasksList};