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
import {CreateProject} from "./components/CreateProject/CreateProject";
import {Button} from "../button/Button";

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
            url: `${localStorage.getItem("serverAddress")}/api/task/permission/${this.store.id}`,
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
        this.store.canCreate = data.value;
    }

    successGetData(data) {
        this.store.data = data.data;
        this.store.dev = data.developers;
        this.store.testers = data.testers;
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
            .then(window.location.replace("/projectList"))
            .catch(console.log);
    }

    onEditProject() {
        this.store.isFormShown = false;
        this.forceUpdate();
    }

    render() {
        return (
            <div className={this.store.isAddBlockShown ? "project__disabled" : ""}>
                <Header title={this.store.data.title}/>
                <div className={"project"}>
                    <p>{this.store.data.description}</p>
                    <button onClick={this.deleteProject} type="button" className="btn btn-danger">Delete Project</button>
                    <Button text={"Edit Project"} onClick={() => this.store.isFormShown = true}/>
                    <Button text={'View Tasks'} onClick={this.showTasksList}/>
                    {
                        this.store.canCreate
                            ? <button onClick={this.handleClickOpen} type="button" className="btn btn-primary">Add
                                task</button>
                            : void 0
                    }
                    <AddTaskForm
                        project_id={this.store.id}
                        isVisible={this.store.isAddBlockShown}
                        onHide={this.onHideAddBlock}
                    />
                    <TasksList
                        pojectId={this.store.id}
                        isVisible={this.store.isTaskListVisible}
                        idProject={this.store.id}
                        onClose={this.onHide}
                    />
                    {this.store.isFormShown
                        ? <div className={"edit-container"}>
                            <CreateProject
                                edit={true}
                                data={this.store.data}
                                testers={this.store.testers}
                                dev={this.store.dev}
                                onEdit={this.onEditProject}
                                id = {this.store.id}
                            />
                        </div>
                        : void 0
                    }
                </div>
            </div>
        );
    }
}

export {Project};