import {autobind} from "core-decorators";
import {Component} from "react";
import * as rp from "request-promise";

@autobind
class AddTaskFormController extends Component {
    async addTask(data) {
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/task`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: data,
            json: true
        };
        return rp(options);
    }

    async updateTask(data, idTask) {
        const options = {
            method: "PUT",
            url: `${localStorage.getItem("serverAddress")}/api/task/${idTask}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: data,
            json: true
        };
        return rp(options);
    }

}

export {AddTaskFormController}