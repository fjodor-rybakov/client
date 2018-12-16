import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import {SignInStore} from "./SignInStore";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import { Redirect } from "react-router";
import * as rp from "request-promise";

@autobind
@observer
class SingIn extends Component {
    store = new SignInStore();

    async handleSubmit(event) {
        await event.preventDefault();
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/signIn`,
            body: {
                email: this.store.login,
                password: this.store.password
            },
            json: true
        };
        rp(options)
            .then(this.handleAcceptUser)
            .catch(this.handleRejectUser);
    }

    handleAcceptUser(data) {
        localStorage.setItem("token", data.token);
        console.log("token", data);
        window.location.reload();
    }

    handleRejectUser() {
        this.store.validateErr = "Такого пользователя не существует"
    }

    handleChangeLogin(event) {
        this.store.login = event.target.value;
    }

    handleChangePassword(event) {
        this.store.password = event.target.value;
    }

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to={"/"} />
        } else  {
            return (
                <div className={"container"}>
                    <h1>Вход</h1>
                    <div>
                        <Link className={"btn btn-primary"} to={"/signup"}>Sign Up</Link>
                    </div>
                    <form className={"form"}>
                        <div className={"form-group"}>
                            <label htmlFor={"login"}>Login</label>
                            <input
                                className={"form-control"}
                                id={"login"}
                                type={"text"}
                                name={"login"}
                                required={"required"}
                                placeholder={"Enter email"}
                                onChange={this.handleChangeLogin}
                            />
                        </div>
                        <div className={"form-group"}>
                            <label htmlFor={"password"}>Password</label>
                            <input
                                className={"form-control"}
                                id={"password"}
                                type={"password"}
                                name={"password"}
                                required={"required"}
                                placeholder={"Enter password"}
                                onChange={this.handleChangePassword}
                            />
                        </div>
                        <button onClick={this.handleSubmit} className={"btn btn-primary"}>Sign In</button>
                    </form>
                    {
                        this.store.validateErr !== "" &&
                        <div className={"alert alert-danger"} role={"alert"}>{this.store.validateErr}</div>
                    }
                    <Link className={"btn btn-primary"} to={"/"}>Back to home page</Link>
                </div>
            );
        }
    }
}

export {SingIn}