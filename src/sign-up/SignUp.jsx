import * as React from "react";
import {Component} from "react";
import {observer} from "mobx-react";
import {SignUpStore} from "./SignUpStore";
import {autobind} from "core-decorators";
import {Redirect} from "react-router";
import * as rp from "request-promise";
import "./SignUpStyle.scss";
import {Utils} from "../project/Utils";
import {Header} from "../header/Header";
import {SimpleSelect} from "react-selectize";

@observer
@autobind
class SignUp extends Component {
    store = new SignUpStore();
    validateRef = React.createRef();

    componentWillMount() {
        Utils.getRoles()
            .then(data => {
                this.store.rolesList = data;
            })
    }

    constructor(props) {
        super(props);
        this.store.validateErr = "";
    }

    handleChangeLogin(event) {
        this.store.login = event.target.value;
    }

    handleChangePassword(event) {
        this.store.password = event.target.value;
    }

    handleChangeRepeatPassword(event) {
        this.store.repeatPassword = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.validateForm(this.store.login, this.store.password, this.store.repeatPassword)) {
            return;
        }
        this.sendFormData(this.store.login, this.store.password, this.store.id_role);
    }

    sendFormData(email, password, role) {
        const options = {
            url: "http://localhost:3001/api/signUp",
            method: "POST",
            body: {
                email: email,
                password: password,
                role: role,
            },
            json: true
        };
        rp(options)
            .then(this.successUpdateProfile)
            .catch(this.rejectUpdateProfile);
    }

    successUpdateProfile() {
        this.store.validateErr = "Success";
        this.validateRef.current.className = "alert alert-success";
    }

    rejectUpdateProfile() {
        this.store.validateErr = "Incorrect new data user";
        this.validateRef.current.className = "alert alert-danger";
    }

    validateForm(email, password, repeatPass) {
        if (repeatPass !== password) {
            this.store.validateErr = "Пароли не совпадают";
            return false;
        }
        if (password === "" || email === "") {
            this.store.validateErr = "Все поля должны быть заполнены";
            return false;
        }
        return true;
    }

    onSelectRole(selectedOption) {
        if (!selectedOption) {
            return;
        }
        this.store.id_role = +(selectedOption.value);
    }

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to={"/"}/>
        } else {
            return (
                <>
                    <Header title={"Sign Up"}/>
                    <div className={"sign-up container"}>
                        {
                            this.store.validateErr !== "" &&
                            <div role="alert" ref={this.validateRef}>{this.store.validateErr}</div>
                        }
                        <form onSubmit={this.handleSubmit} className={"form"}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input
                                    name="email"
                                    onChange={this.handleChangeLogin}
                                    className="form-control"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={this.handleChangePassword}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Repeat Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={this.handleChangeRepeatPassword}
                                    placeholder="Repeat Password"/>
                            </div>
                            <SimpleSelect
                                placeholder="Select role"
                                onValueChange={this.onSelectRole}
                                options={this.store.getOptions()}
                            />
                            <button type="submit" className="btn">Sign Up</button>
                        </form>
                    </div>
                </>
            );
        }
    }
}

export {SignUp}