import {autobind} from "core-decorators";
import {Component} from "react";
import * as rp from "request-promise";

@autobind
class AddTaskFormController extends Component {

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