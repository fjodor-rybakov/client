import autobind from "autobind-decorator";
import {Component} from "react";
import {observable} from "mobx";

@autobind
class AddTaskFormController extends Component {
    @observable list = [];

    async getUserListByRole(role) {
        const options = {method: "POST", body: JSON.stringify({role: role})};
        await fetch(`${localStorage.getItem("serverAddress")}/api/getUserListByRole`, options)
            .then(res => res.json())
            .then(data => {
                this.list = data;
            });
        return this.list;
    }
}

export {AddTaskFormController}