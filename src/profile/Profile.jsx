import {Component} from "react";
import {observer} from "mobx-react";
import {Redirect} from "react-router";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";
import autobind from "autobind-decorator";
import {AppContext} from "../AppContext";
import "./Profile.css";
import {Link} from "react-router-dom";

@observer
@autobind
class Profile extends Component {
    store = new ProfileStore();
    validateRef = React.createRef();

    constructor(props) {
        super(props);
        AppContext.getToken();
    }

    async componentDidMount() {
        const data = {token: localStorage.getItem("token")};
        const options = {method: "POST", body: JSON.stringify(data)};
        await fetch(`${localStorage.getItem("serverAddress")}/api/profileData`, options)
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
        this.store.path = data.photo;
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

    async changePhoto(event) {
        console.log(event.target.files[0]);
        const image = event.target.files[0];
        await this.loadImage(image)
            .then(data => this.store.photo = data)
            .catch(console.log);
    }

    loadImage(image) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                return resolve(reader.result);
            };
            reader.onerror = (event) => {
                return reject(event);
            };
        })
    }

    async saveDataProfile() {
        const data = {
            first_name: this.store.first_name,
            last_name: this.store.last_name,
            email: this.store.email,
            id_user: this.store.id_user,
            photo: this.store.photo
        };
        const options = {method: "POST", body: JSON.stringify(data)};
        await fetch(`${localStorage.getItem("serverAddress")}/api/updateProfile`, options)
            .then(res => {
                if (res.status !== 200)
                    return Promise.reject();
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
                        <img src={this.store.path} className={"avatar-profile"} alt={"img"}/>
                        <input
                            type={"file"}
                            className={"form-control"}
                            id={"photo-upload"}
                            required={"required"}
                            onChange={this.changePhoto}
                        />
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
                        <button onClick={this.saveDataProfile} className={"btn btn-primary"} id={"save-button"}>Save</button>
                        <div>
                            <Link className={"btn btn-primary"} to={"/"} id={"back"}>Back</Link>
                        </div>
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