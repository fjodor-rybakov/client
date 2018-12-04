import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import {ProjectStore} from "./ProjectStore";
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";
import {TasksList} from "./components/TasksList/TasksList.jsx";

@observer
@autobind
class Project extends Component {
    store = new ProjectStore();

    async componentWillMount() {
        this.store.id = window.location.pathname.split('/')[2];
        const options = {method: "POST", body: JSON.stringify({id: this.store.id})};
        await fetch(`${localStorage.getItem("serverAddress")}/api/getProject`, options)
            .then(res => res.json())
            .then(data => {
                this.store.data = data;
            });
    }

    componentDidUpdate() {
        console.log(this.store.isAddBlockShown)
    }

    handleClickOpen() {
        this.store.isAddBlockShown = true;
    }

    render() {
        return (
            <>
                <h1>{this.store.data.title}</h1>
                <button onClick={this.handleClickOpen} type="button" className="btn btn-primary">Add task</button>
                {this.store.isAddBlockShown ? <AddTaskForm project_id={this.store.data.id_project}/> : void 0}
                <TasksList idProject={this.store.id} />
            </>
        );
    }
}

export {Project};