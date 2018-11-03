import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react";
import {observable} from "mobx";

@observer
@autobind
class Project extends Component {
    @observable data = {};

    async componentDidMount() {
        let id = window.location.hash.split('/')[2];
        const options = {method: "POST", body: JSON.stringify({id: id})};
        await fetch(`${localStorage.getItem("serverAddress")}/api/getProject`, options)
            .then(res => res.json())
            .then(data => {
                this.data = data;
            });
    }

    render() {
        return (
            <>
                <h1>{this.data.title}</h1>
                <button>add task</button>
            </>
        );
    }
}

export {Project};