import {Component} from "react";
import React from "react";
import "./Button.scss";

class Button extends Component {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                type="button"
                className="btn"
            >{this.props.text}
            </button>
        )
    }
}

export {Button}