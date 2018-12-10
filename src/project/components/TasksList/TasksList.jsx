import * as React from "react";
import {TasksListStore} from "./TasksListStore";
import autobind from "autobind-decorator";
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
            headers: {"x-guide-key": localStorage.getItem("token")},
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
                                    <div key={index} className={"card"}>
                                        <Link to={`${task.id_project}/${task.id_task}`}>{task.title}</Link>
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