import React from "react";
import {TaskStore} from "./TaskStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react/index";
import * as rp from "request-promise";
import "./Task.scss";
import {Button} from "../../../../button/Button";

@autobind
@observer
class Task extends React.Component {
    store = new TaskStore();

    componentWillMount() {
        this.store.id = window.location.pathname.split('/')[3];
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/tracks/${this.store.id}`,
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
            uri: `${localStorage.getItem("serverAddress")}/api/createProject/getPermission`,
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

    async addTrack() {
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

    onChangeStartTime(event) {
        this.store.startTime = event.target.value;
    }

    onChangeEndData(event) {
        this.store.endData = event.target.value;
    }

    onChangeEndTime(event) {
        this.store.endTime = event.target.value;
    }

    onChangeDescription(event) {
        this.store.description = event.target.value;
    }

    showForm() {
        this.store.isFormShown = true;
    }

    setDefaultValue(data) {
        this.store.data = JSON.parse(data);
        this.store.id_user = +this.store.data.id_user;
    }

    setTaskData(data) {
        this.store.taskData = JSON.parse(data);
        console.log(this.store.taskData);
    }

    renderForm() {
        return (
            <>
                <div>Add</div>
                <input type={"date"} className={"add-form-item"} required={true} onChange={this.onChangeStartData}/>
                <input type={"time"} className={"add-form-item"} required={true} onChange={this.onChangeStartTime}/>
                <input type={"date"} required={true} className={"add-form-item"} onChange={this.onChangeEndData}/>
                <input type={"time"} required={true} className={"add-form-item"} onChange={this.onChangeEndTime}/>
                <textarea className={"add-form-item"} onChange={this.onChangeDescription}/>
                <button onClick={this.addTrack}>Add</button>
            </>
        )

    }

    render() {
        console.log(this.store.data);
        return (
            <div className={"task container"}>
                <h4>{this.store.taskData.title}</h4>
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
                            <p key={index}>{item.description}</p>
                        )
                    })
                }
            </div>
        )
    }
}

export {Task}