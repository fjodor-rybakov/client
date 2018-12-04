import React from "react";
import {TaskStore} from "./TaskStore";
import autobind from "autobind-decorator";
import {observer} from "mobx-react/index";
import {AppContext} from "../../../../AppContext";

@autobind
@observer
class Task extends React.Component {
    store = new TaskStore();

    async componentWillMount() {
        this.store.id = window.location.pathname.split('/')[3];
        const options = {method: "POST", body: JSON.stringify({id_task: this.store.id})};
        await fetch(`${localStorage.getItem("serverAddress")}/api/getTracks`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.store.data = data;
            });
    }

    async addTrack() {
        console.log(this.store.endData, this.store.endTime);
        await AppContext.getToken()
            .then(this.setDefaultValue)
            .catch(console.log);
        const options = {
            method: "POST",
            body: JSON.stringify({
                id_task: this.store.id,
                id_user: this.store.id_user,
                start_data: this.store.startData,
                end_data: this.store.endData,
                start_time: this.store.startTime,
                end_time: this.store.endTime,
                description: this.store.description
            })
        };
        await fetch(`${localStorage.getItem("serverAddress")}/api/addTrack`, options)
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
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