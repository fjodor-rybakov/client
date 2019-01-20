import React from "react";
import {TaskStore} from "./TaskStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react/index";
import * as rp from "request-promise";
import "./Task.scss";
import {Button} from "../../../../button/Button";
import {AddTaskForm} from "../../AddTaskForm/AddTaskForm";
import {Comments} from "./components/Comments";
import TimeInput from 'react-time-input';

@autobind
@observer
class Task extends React.Component {
    store = new TaskStore();

    componentWillMount() {
        this.store.id = window.location.pathname.split('/')[3];
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/track/${this.store.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(options)
            .then(this.setDefaultValue)
            .catch(console.log);

        const task = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/task/${this.store.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(task)
            .then(this.setTaskData)
            .catch(console.log);

        const data = {
            method: 'GET',
            uri: `${localStorage.getItem("serverAddress")}/api/project/permission`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(data)
            .then(res => JSON.parse(res))
            .then(this.onSuccessGetPermission);
    }

    onSuccessGetPermission(data) {
        this.store.canCreate = data;
    }

    async updateTrack() {
        console.log(this.store.endTime, this.store.endData);
        console.log(this.store.startTime, this.store.startData);
        const options = {
            method: "PUT",
            url: `${localStorage.getItem("serverAddress")}/api/track/${this.store.edit_data.id_track}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: {
                start_data: this.store.startData,
                end_data: this.store.endData,
                start_time: this.store.startTime,
                end_time: this.store.endTime,
                description: this.store.description
            },
            json: true
        };
        await rp(options)
            .then(this.onSuccessUpdate)
            .catch(console.log);
    }

    onSuccessUpdate() {
        this.store.edit = false;
        this.store.isFormShown = false;
        this.store.edit_data = {};
    }

    async addTrack() {
        if (this.store.edit) {
            return this.updateTrack();
        }
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/track`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: {
                id_task: this.store.id,
                id_user: this.store.id_user,
                start_data: this.store.startData,
                end_data: this.store.endData,
                start_time: this.store.startTime,
                end_time: this.store.endTime,
                description: this.store.description
            },
            json: true
        };
        await rp(options)
            .then(console.log)
            .catch(console.log);
    }


    onChangeStartData(event) {
        this.store.startData = event.target.value;
    }

    onChangeStartTime(value) {
        this.store.startTime = value;
    }

    onChangeEndData(event) {
        this.store.endData = event.target.value;
    }

    onChangeEndTime(value) {
        this.store.endTime = value;
    }

    onChangeDescription(event) {
        this.store.description = event.target.value;
    }

    showForm() {
        this.store.isFormShown = true;
    }

    setDefaultValue(data) {
        this.store.data = JSON.parse(data);
        console.log("1", this.store.data);
        this.store.id_user = +this.store.data.id_user;
    }

    setTaskData(data) {
        this.store.taskData = JSON.parse(data);
    }

    updateTask() {
        this.store.isFormVisible = true;
    }

    onHideForm() {
        this.store.isFormVisible = false;
    }

    renderForm() {
        const text = this.store.edit ? "Update" : "Add time";
        return (
            <div className={"add-form"}>
                <input type={"date"} className={"add-form-item"} value={this.store.startData} onChange={this.onChangeStartData}/>
                <TimeInput className={"add-form-item"} initTime={this.store.startTime} onTimeChange={this.onChangeStartTime}/>
                <input type={"date"} value={this.store.endData} className={"add-form-item"} onChange={this.onChangeEndData}/>
                <TimeInput initTime={this.store.endTime} className={"add-form-item"} onTimeChange={this.onChangeEndTime}/>
                <textarea className={"add-form-item"} value={this.store.description} onChange={this.onChangeDescription}/>
                <button onClick={this.addTrack}>{text}</button>
            </div>
        )
    }

    onEdit(item) {
        const start = item.start_data.split("T");
        this.store.startData = start[0];
        this.store.startTime = start[1].split(":")[0] + ":" + start[1].split(":")[1];
        const end = item.finish_data.split("T");
        this.store.endData = end[0];
        this.store.endTime = end[1].split(":")[0] + ":" + end[1].split(":")[1];
        this.store.description = item.description;
        this.store.edit_data = item;
        this.store.edit = true;
        this.store.isFormShown = true;
    }

    render() {
        return (
            <>
                <div className={"task container"}>
                    <h3>{this.store.taskData.title}</h3>
                    <h4>{this.store.taskData.status}</h4>
                    <p className={"task_description"}>{this.store.taskData.description}</p>
                    {
                        this.store.canCreate
                            ? <Button text={"Add Time"} onClick={this.showForm}/>
                            : void 0
                    }
                    {
                        this.store.isFormShown
                            ? this.renderForm()
                            : void 0
                    }
                    {
                        this.store.data.tracks.map((item, index) => {
                            return (
                                <div className={"track"} key={index}>
                                    <p>{item.description}</p>
                                    <p className={"edit"} onClick={() => this.onEdit(item)}>edit</p>
                                </div>
                            )
                        })
                    }
                    <button
                        type="button"
                        id={"task-list-button__update"}
                        className={"btn btn-warning"}
                        onClick={this.updateTask}
                    >
                        Update Task
                    </button>
                    <Comments taskId={this.store.id}/>
                </div>
                <AddTaskForm
                    onHide={this.onHideForm}
                    isVisible={this.store.isFormVisible}
                    edit={true}
                    idTask={this.store.id}
                    data={this.store.taskData}
                />
            </>
        )
    }
}

export {Task}