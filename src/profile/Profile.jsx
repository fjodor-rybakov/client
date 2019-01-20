import {Component} from "react";
import {observer} from "mobx-react";
import {Redirect} from "react-router";
import {ProfileStore} from "./ProfileStore";
import * as React from "react";
import {autobind} from "core-decorators";
import "./Profile.scss";
import * as rp from "request-promise";
import {Button} from "../button/Button";
import {Link} from "react-router-dom";

@observer
@autobind
class Profile extends Component {
    store = new ProfileStore();
    validateRef = React.createRef();

    async componentDidMount() {
        const options = {
            method: "GET",
            uri: `${localStorage.getItem("serverAddress")}/api/profile`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(res => JSON.parse(res))
            .then(this.setDefaultValue)
            .catch(this.errorGetDataProfile);

        this.store.getTracks().then(console.log);
    }

    setDefaultValue(data) {
        this.store.first_name = data.first_name;
        this.store.last_name = data.last_name;
        this.store.email = data.email;
        this.store.role = +data.role === 1 ? "user" : "admin";
        this.store.id_user = +data.id_user;
        this.store.path = data.photo;
    }

    errorGetDataProfile(err) {
        console.log(err);
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
        const image = event.target.files[0];
        this.store.typeIMG = image.type.split("/")[1];
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

    saveDataProfile() {
        const options = {
            method: "PUT",
            uri: `${localStorage.getItem("serverAddress")}/api/profile`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: {
                first_name: this.store.first_name,
                last_name: this.store.last_name,
                email: this.store.email,
                id_user: this.store.id_user,
                photo: this.store.photo,
                typeIMG: this.store.typeIMG
            },
            resolveWithFullResponse: true,
            json: true
        };
        rp(options)
            .then(this.successUpdateProfile)
            .catch(this.rejectUpdateProfile);
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
                <div className={"profile container"}>
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
                        <Button onClick={this.saveDataProfile} text={"Save"}/>
                        {
                            this.store.validateErr !== "" &&
                            <div role={"alert"} ref={this.validateRef}>{this.store.validateErr}</div>
                        }
                        <h4>My Tasks</h4>
                        <div className={"tasks"}>
                            {this.store.tracks.map((task, index) => {
                                if (task.status)
                                    return (
                                        <div key={index} className={"card card__"+task.status.split(" ")[0]}>
                                            <Link to={`project/${task.id_project}/${task.id_task}`}>
                                                <div>
                                                    <p className={"tasks-list__header"}>{task.title}</p>
                                                    <p className={"tasks-list__status"}>{task.status}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            })}
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export {Profile};