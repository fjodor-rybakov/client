import {Component} from "react";
import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {ProjectStore} from "./ProjectStore";
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";
import {TasksList} from "./components/TasksList/TasksList.jsx";
import * as rp from "request-promise";
import {Header} from "../header/Header";
import "./Project.scss";

@autobind
@observer
class Project extends Component {
    store = new ProjectStore();
    title = "";

    async componentWillMount() {
        this.store.id = window.location.pathname.split('/')[2];
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/project/${this.store.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(this.successGetData)
            .catch(console.log);

        const req = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/createTask/getPermission/${this.store.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(req)
            .then(JSON.parse)
            .then(this.onSuccessGetPermission)
            .catch(console.log);
    }

    onSuccessGetPermission(data) {
        console.log(data);
        this.store.canCreate = data.value;
    }

    successGetData(data) {
        this.store.data = data;
    }

    handleClickOpen() {
        this.store.isAddBlockShown = true;
    }

    onHide() {
        this.store.isTaskListVisible = false;
    }

    showTasksList() {
        this.store.isTaskListVisible = true;
    }

    onHideAddBlock() {
        this.store.isAddBlockShown = false;
    }

    async deleteProject() {
        this.store.id = window.location.pathname.split('/')[2];
        const options = {
            method: "DELETE",
            url: `${localStorage.getItem("serverAddress")}/api/project/${this.store.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(window.location.replace("/projectList"))
            .catch(console.log);
    }

    render() {
        return (
            <>
                <Header title={this.store.data.title}/>
                <div className={"project"}>
                    <p>{this.store.data.description}</p>
                    {
                        this.store.canCreate
                            ? <button onClick={this.handleClickOpen} type="button" className="btn btn-primary">Add task</button>
                            : void 0
                    }
                    <AddTaskForm
                        project_id={this.store.id}
                        isVisible ={this.store.isAddBlockShown}
                        onHide={this.onHideAddBlock}
                    />
                    <button onClick={this.showTasksList}>View Tasks</button>
                    <TasksList
                        isVisible={this.store.isTaskListVisible}
                        idProject={this.store.id}
                        onClose={this.onHide}
                    />
                    <button onClick={this.deleteProject} type="button" className="btn btn-danger">Delete Project</button>
                </div>
            </>
        );
    }
}

export {Project};