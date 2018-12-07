import * as React from "react";
import {TasksListStore} from "./TasksListStore";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import Link from "react-router-dom/es/Link";

@autobind
@observer
class TasksList extends React.Component {
    store = new TasksListStore();

    constructor(props) {
        super(props);
        this.store.idProject = props.idProject;
    }

    async componentWillMount() {
        const options = {method: "POST", body: JSON.stringify({id: this.store.idProject})};
        await fetch(`${localStorage.getItem("serverAddress")}/api/getTasksList`, options)
            .then(res => res.json())
            .then(data => {
                this.store.data = data;
                console.log(data);
            });

    }

    render() {
        return (
            this.store.data.map((task, index) => {
                return (
                    <div key={index} className={"card"}>
                        <Link to={`${task.id_project}/${task.id_task}`}>{task.title}</Link>
                    </div>
                )
            })
        )
    }
}

export {TasksList};