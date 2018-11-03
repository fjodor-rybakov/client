import * as React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import "./HomePageStyle.css";
import {observer} from "mobx-react";
import autobind from "autobind-decorator";

@observer
@autobind
class HomePage extends Component {
    handleLogOut() {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return(
            <div>
                <div className={"authorization"}>
                    {!localStorage.getItem("token") ?
                        <>
                            <Link className={"btn btn-primary"} id={"signin"} to={"/signin"}>Sign In</Link>
                            <Link className={"btn btn-primary"} id={"signup"} to={"/signup"}>Sign Up</Link>
                        </>
                    :
                        <>
                            <Link className={"btn btn-primary"} id={"profile-button"} to={"profile"}>Profile</Link>
                            <button className={"btn btn-primary"} id={"logout"} onClick={this.handleLogOut}>Log Out</button>
                        </>
                        }
                </div>
                <h1 className={"site-name"}>Order task</h1>
                <div className={"about-us"}>
                    <p>Some info...</p>
                </div>
                <p className={"button-order"}>
                    <Link className={"btn btn-primary"} id={"create-project"} to={"/signup"}>Create order</Link>
                </p>
            </div>
        );
    }
}

export { HomePage };