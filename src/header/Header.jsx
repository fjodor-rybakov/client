import * as React from "react";
import "./Header.scss";

class Header extends React.Component {
    render() {
        return (
            <div className={"header-title"}>{this.props.title}</div>
        )
    }
}

export {Header}