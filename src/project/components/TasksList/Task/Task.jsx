import React from "react";
import {TaskStore} from "./TaskStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react/index";
import * as rp from "request-promise";

@autobind
@observer
class Task extends React.Component {
    store = new TaskStore();

    async componentWillMount() {
        this.store.id = window.location.pathname.split('/')[3];
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/tracks/${this.store.id}`,
            headers: {"x-guide-key": localStorage.getItem("token")},
        };
        rp(options)
            .then(this.setDefaultValue)
            .catch(console.log);
    }

    async addTrack() {
        console.log(this.store.endData, this.store.endTime);
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/track`,
            headers: {"x-guide-key": localStorage.getItem("token")},
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
        rp(options)
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
        this.store.data = data;
        this.store.id_user = +data.id_user;
    }

    renderForm() {
        return (
            <>
                <div>Add</div>
                <input type={"date"} required={true} onChange={this.onChangeStartData}/>
                <input type={"time"} required={true} onChange={this.onChangeStartTime}/>
                <input type={"date"} required={true} onChange={this.onChangeEndData}/>
                <input type={"time"} required={true} onChange={this.onChangeEndTime}/>
                <textarea onChange={this.onChangeDescription}/>
                <button onClick={this.addTrack}>Add</button>
            </>
        )

    }

    render() {
        return (
            <>
                <div>id = {this.store.id}</div>
                <div onClick={this.showForm}>Add track</div>
                {
                    this.store.isFormShown
                        ? this.renderForm()
                        : void 0
                }
            </>
        )
    }
}

export {Task}