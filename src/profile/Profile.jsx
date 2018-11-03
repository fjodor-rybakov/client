import {Component} from "react";
import {observer} from "mobx-react";
import {Redirect} from "react-router";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";
import autobind from "autobind-decorator";
import "./Profile.css";

@observer
@autobind
class Profile extends Component {
    store = new ProfileStore();
    validateRef = React.createRef();

    async componentDidMount() {
        const data = {id: 1};
        const options = {method: "POST", body: JSON.stringify(data)};
        await fetch(`${localStorage.getItem("serverAddress")}/api/profile`, options)
            .then(res => res.json())
            .then(this.setDefaultValue)
            .catch(this.errorGetDataProfile);
    }

    setDefaultValue(data) {
        this.store.first_name = data.first_name;
        this.store.last_name = data.last_name;
        this.store.email = data.email;
        this.store.role = +data.role === 1 ? "user" : "admin";
        this.store.id_user = +data.id_user;
    }

    errorGetDataProfile() {
        throw new Error("Data not received");
    }

    changeFirstName(event) {
        this.store.first_name = event.target.value;
    }

    changeLastName(event) {
        this.store.last_name = event.target.value;
    }

    changeEmail(event) {
        this.store.email = event.target.value;
    }

    async saveDataProfile() {
        const data = {
            first_name: this.store.first_name,
            last_name: this.store.last_name,
            email: this.store.email,
            id_user: this.store.id_user,
        };
        const options = {method: "POST", body: JSON.stringify(data)};
        await fetch(`${localStorage.getItem("serverAddress")}/api/updateProfile`, options)
            .then(res => {
                if (res.status !== 200) {
                    return Promise.reject();
                }
                return res.json();
            })
            .then(this.successUpdateProfile)
            .catch(this.rejectUpdateProfile)
    }

    successUpdateProfile() {
        this.store.validateErr = "Success update data profile";
        this.validateRef.current.className = "alert alert-success";
    }

    rejectUpdateProfile() {
        this.store.validateErr = "Incorrect new data user";
        this.validateRef.current.className = "alert alert-danger";
    }

    render() {
        if (!localStorage.getItem("token")) {
            return <Redirect to={"/signin"}/>
        } else {
            return (
                <div className={"container"}>
                    <div className={"form-group"}>
                        <div className={"avatar-profile"}/>
                        <input type={"file"} className={"form-control"} id={"photo-upload"}/>
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"user-name"}
                            onChange={this.changeFirstName}
                            value={this.store.first_name}
                        />
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"user-last_name"}
                            onChange={this.changeLastName}
                            value={this.store.last_name}
                        />
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"user-email"}
                            onChange={this.changeEmail}
                            value={this.store.email}
                        />
                        <input
                            className={"form-control"}
                            type={"text"}
                            id={"user-role"}
                            defaultValue={this.store.role}
                        />
                        <button onClick={this.saveDataProfile} className={"btn btn-primary"}>Save</button>
                        {
                            this.store.validateErr !== "" &&
                            <div role={"alert"} ref={this.validateRef}>{this.store.validateErr}</div>
                        }
                    </div>
                </div>
            );
        }
    }
}

export {Profile};