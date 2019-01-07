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

    componentWillMount() {
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/tasks/${this.store.idProject}`,
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

    async deleteTask(event) {
        const taskId = event.target.getAttribute("data-id");
        const options = {
            method: "DELETE",
            url: `${localStorage.getItem("serverAddress")}/api/task/${+taskId}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(console.log)
            .catch(console.log);
    }

    updateTask(event) {
        // TODO: сделать форму для обновления таска
    }

    render() {
        return (
            <>
                {
                    this.props.isVisible
                        ? <div className={"tasks-list"}>
                            {this.store.data.map((task, index) => {
                                return (
                                    <div key={index} className={"card"}>
                                        <Link to={`${task.id_project}/${task.id_task}`}>
                                            <div>
                                                <p className={"tasks-list__header"}>{task.title}</p>
                                                <p className={"tasks-list__status"}>{task.status}</p>
                                            </div>
                                        </Link>
                                        <button
                                            type="button"
                                            id={"task-list-button__delete"}
                                            className={"btn btn-danger"}
                                            data-id={task.id_task}
                                            onClick={this.deleteTask}
                                        >
                                            Delete Task
                                        </button>
                                        <button
                                            type="button"
                                            id={"task-list-button__update"}
                                            className={"btn btn-warning"}
                                            onClick={this.updateTask}
                                        >
                                            Update Task
                                        </button>
                                    </div>
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