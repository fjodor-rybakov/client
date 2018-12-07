import * as React from "react";
import {Component} from "react";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {SignUpStore} from "./SignUpStore";
import autobind from "autobind-decorator";
import {Redirect} from "react-router";
import * as rp from "request-promise";

@observer
@autobind
class SignUp extends Component {
    store = new SignUpStore();

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
        this.sendFormData(this.store.login, this.store.password);
    }

    sendFormData(email, password) {
        const options = {
            url: "http://localhost:3001/api/signUp",
            method: "POST",
            body: {
                email: email,
                password: password
            },
            json: true
        };
        rp(options)
            .then(data => this.store.validateErr = data)
            .catch(console.log);
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

    render() {
        if (localStorage.getItem("token")) {
            return <Redirect to={"/"}/>
        } else {
            return (
                <div className={"container"}>
                    <h1>Регистрация</h1>
                    <div className={"switch-authorization"}>
                        <Link className={"btn btn-primary"} to={"/signin"}>Sign In</Link>
                    </div>
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
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                onChange={this.handleChangeRepeatPassword}
                                placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {
                        this.store.validateErr !== "" &&
                        <div className="alert alert-danger" role="alert">{this.store.validateErr}</div>
                    }
                    <Link className={"btn btn-primary"} to={"/"}>Back to home page</Link>
                </div>
            );
        }
    }
}

export {SignUp}