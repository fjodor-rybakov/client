import * as React from "react";
import {Component} from "react";
import "./NotFoundStyle.css";

class NotFound extends Component {
    render() {
        return (
            <div>
                <h1 className={"not-found"}>NOT FOUND</h1>
            </div>
        );
    }
}

export {NotFound}