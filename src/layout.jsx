import * as React from "react";
import autobind from "autobind-decorator";
import {Link} from 'react-router-dom';
import "./layout.scss";

@autobind
class layout extends React.Component {
    children;

    constructor(component) {
        super();
        this.children = component;
    }

    handleLogOut() {
        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <div className={"header"}>
                    <Link className={"header-link home"} to={"/"}>Home Page</Link>
                    {!localStorage.getItem("token") ?
                        <>
                            <Link className={"header-link"} id={"signin"} to={"/signin"}>Sign In</Link>
                            <Link className={"header-link"} id={"signup"} to={"/signup"}>Sign Up</Link>
                        </>
                        :
                        <>
                            <Link className={"header-link"} to={"profile"}>Profile</Link>
                            <span className={"logout"} onClick={this.handleLogOut}>Log Out</span>
                        </>
                    }
                </div>
                {this.children}
            </div>
        )
    }
}

export {layout};
