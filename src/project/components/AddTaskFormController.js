import autobind from "autobind-decorator";
import {Component} from "react";

@autobind
class AddTaskFormController extends Component {
    async getUserListByRole(role) {
        const options = {method: "POST", body: JSON.stringify({role: role})};
        return await fetch(`${localStorage.getItem("serverAddress")}/api/getUserListByRole`, options)
            .then(res => res.json())
    }
}

export {AddTaskFormController}