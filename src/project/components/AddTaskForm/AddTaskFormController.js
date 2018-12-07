import autobind from "autobind-decorator";
import {Component} from "react";
import * as rp from "request-promise";

@autobind
class AddTaskFormController extends Component {
    async getUserListByRole(role) {
        const options = {method: "POST", body: JSON.stringify({role: role})};
        return await fetch(`${localStorage.getItem("serverAddress")}/api/getUserListByRole`, options)
            .then(res => res.json())
    }

    async addTask(data) {
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/createTask`,
            headers: {"x-guide-key": localStorage.getItem("token")},
            body: {data: data},
            json: true
        };
        return rp(options);
    }

}

export {AddTaskFormController}