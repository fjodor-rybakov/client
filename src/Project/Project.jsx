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
        await fetch("http://localhost:3001/api/getProject", {method: "POST", body: JSON.stringify({id: id})})
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