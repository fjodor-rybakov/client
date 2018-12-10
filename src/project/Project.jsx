import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import {ProjectStore} from "./ProjectStore";
import {AddTaskForm} from "./components/AddTaskForm/AddTaskForm";
import {TasksList} from "./components/TasksList/TasksList.jsx";
import * as rp from "request-promise";
import {Header} from "../header/Header";
import "./Project.scss";

@observer
@autobind
class Project extends Component {
    store = new ProjectStore();

    async componentWillMount() {
        this.store.id = window.location.pathname.split('/')[2];
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/project/${this.store.id}`,
            headers: {"x-guide-key": localStorage.getItem("token")},
        };
        await rp(options)
            .then(data => {
                this.store.data = JSON.parse(data)
            })
            .catch(console.log);
        console.log(this.store.data);
    }

    componentDidUpdate() {
        console.log(this.store.isAddBlockShown)
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

    render() {
        return (
            <>
                <Header title={this.store.data.title}/>
                <div className={"project"}>
                    <p>{this.store.data.description}</p>
                    <button onClick={this.handleClickOpen} type="button" className="btn btn-primary">Add task</button>
                    <AddTaskForm
                        project_id={this.store.data.id_project}
                        isVisible ={this.store.isAddBlockShown}
                        onHide={this.onHideAddBlock}/>
                    <button onClick={this.showTasksList}>View Tasks</button>
                    <TasksList
                        isVisible={this.store.isTaskListVisible}
                        idProject={this.store.id}
                        onClose={this.onHide}
                    />
                </div>
            </>
        );
    }
}

export {Project};