import {Component} from "react";
import * as React from "react";
import autobind from "autobind-decorator";
import {observer} from "mobx-react/index";
import {AddTaskFormStore} from "./AddTaskFormStore";
import {AppContext} from "../../AppContext";
import {AddTaskFormController} from "./AddTaskFormController";
import {Redirect} from "react-router";

@observer
@autobind
class AddTaskForm extends Component {
    store = new AddTaskFormStore();
    controller = new AddTaskFormController();
    dataUserList;

    constructor(props) {
        super(props);
        this.store.project_id = this.props.project_id;
    }

    componentWillMount() {
        this.controller.getUserListByRole("developer")
            .then((data) => {
                this.dataUserList = data;
            });
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
        console.log(this.dataUserList);
        if (!localStorage.getItem("token")) {
            return <Redirect to={"/signin"}/>
        } else {
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
                                this.dataUserList && this.dataUserList.map((item, index) => {
                                    return <option key={index}>{item.first_name} {item.last_name}</option>
                                })
                            }
                        </select>
                        <p>Tester:</p><select/>
                    </div>
                </>
            );
        }
    }
}

export {AddTaskForm};