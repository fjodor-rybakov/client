import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react/index";
import {AddTaskFormStore} from "./AddTaskFormStore";
import {AppContext} from "../../AppContext";
import {AddTaskFormController} from "./AddTaskFormController";

@observer
@autobind
class AddTaskForm extends Component {
    store = new AddTaskFormStore();
    controller = new AddTaskFormController();

    constructor(props) {
        super(props);
        this.store.project_id = this.props.project_id;
    }

    async componentDidMount() {
        await AppContext.getToken()
            .then(this.setDefaultValue)
            .catch(console.log);
    }

    setDefaultValue(data) {
        this.store.first_name = data.name;
        this.store.last_name = data.last_name;
        this.store.email = data.email;
        this.store.role = +data.role;
        this.store.id_user = +data.id_user;
    }

    render() {
        return (
            <>
                <div>Project id: {this.store.project_id}</div>
                <div>Project Manager: {`${this.store.first_name} ${this.store.last_name}`}</div>
                <input
                    className={"form-control"}
                    type={"text"}
                    placeholder={"Task Title"}
                />
                <textarea
                    className={"form-control"}
                    placeholder={"Description"}
                />
                <input
                    className={"form-control"}
                    type={"text"}
                    placeholder={"Time"}
                />
                <div>Team:
                    <p>Developer:</p>
                    <select>
                        {
                            this.controller.getUserListByRole("developer").then(data => {
                                data.map(item => {
                                    return (item.name);
                                }).then(data => {
                                    return <option>{data}</option>
                                })
                        })}
                    </select>
                    <p>Tester:</p><select/>
                </div>
            </>
        );
    }
}

export {AddTaskForm};