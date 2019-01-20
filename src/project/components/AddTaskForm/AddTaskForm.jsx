import {Component} from "react";
import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react/index";
import {AddTaskFormStore} from "./AddTaskFormStore";
import {AddTaskFormController} from "./AddTaskFormController";
import {Redirect} from "react-router";
import {SimpleSelect} from 'react-selectize';
import 'react-selectize/themes/index.css';
import "./AddTaskForm.scss";
import {Utils} from "../../Utils";

@observer
@autobind
class AddTaskForm extends Component {
    store = new AddTaskFormStore();
    controller = new AddTaskFormController();

    constructor(props) {
        super(props);
        this.store.project_id = this.props.project_id;
    }

    async componentWillMount() {
        await Utils.getUserListByRole("developer")
            .then((data) => {
                this.store.developerList = data;
            });
        await Utils.getUserListByRole("tester")
            .then((data) => {
                this.store.testerList = data;
            });
        await Utils.getCurrentUserInfo()
            .then((data) =>
                this.store.id_user = data.id_user
            );

        console.log(this.props.data);
        if (this.props.edit) {
            this.store.project_id = this.props.data.id_project;
            this.store.id_user = this.props.data.id_user_manager;
            this.store.description = this.props.data.description;
            this.store.time = this.props.data.time;
            this.store.title = this.props.data.title;
            this.store.status = this.props.data.status;
        }
    }

    onSelectDeveloper(selectedOption) {
        if (!selectedOption) {
            return;
        }
        const index = +(selectedOption.value);
        if (this.store.selectedDeveloper.indexOf(this.store.developerList[index]) !== -1) {
            return;
        }
        this.store.selectedDeveloper.push(this.store.developerList[index]);
    }

    onSelectTester(selectedOption) {
        if (!selectedOption) {
            return;
        }
        const index = +(selectedOption.value);
        if (this.store.selectedTesters.indexOf(this.store.testerList[index]) !== -1) {
            return;
        }
        this.store.selectedTesters.push(this.store.testerList[index]);
    }

    onSubmit() {
        const data = {
            id_project: this.store.project_id,
            id_user_manager: this.store.id_user,
            description: this.store.description,
            time: +this.store.time,
            title: this.store.title,
            status: this.store.status,
            developers: this.store.selectedTesters.concat(this.store.selectedDeveloper),
        };
        if (!this.verifyData(data)) {
            this.store.error = "Все поля должны быть корректно заполнены";
            return;
        }
        this.store.error = "";
        if (this.props.edit) {
            this.controller.updateTask(data, this.props.idTask)
                .then(this.onSuccessCreateTask)
                .catch(console.log);
            return;
        }
        this.controller.addTask(data)
            .then(this.onSuccessCreateTask)
            .catch(console.log);
    }

    verifyData(data) {
        return !(!data.id_project || !data.id_user_manager || !data.description || !data.time
            || !data.title || !data.developers)

    }

    onSuccessCreateTask() {
        this.props.onHide();
    }

    onChangeTitle(event) {
        this.store.title = event.target.value;
    }


    onChangeTime(event) {
        this.store.time = event.target.value;
    }

    onChangeDescription(event) {
        this.store.description = event.target.value;
    }

    removeTester(index) {
        if (index === undefined) {
            return;
        }
        this.store.selectedTesters.splice(index, 1);
    }

    removeDeveloper(index) {
        if (index === undefined) {
            return;
        }
        this.store.selectedDeveloper.splice(index, 1);
    }

    render() {
        //todo рефактор select
        if (!localStorage.getItem("token")) {
            return <Redirect to={"/signin"}/>
        } else if (this.props.isVisible) {
            return (
                <div className={"add-task"}>
                    <div className={"add-task-container"}>
                        <div onClick={this.props.onHide} className={"close-form-icon"}/>
                        <input
                            className={"title"}
                            type={"text"}
                            placeholder={"Task Title"}
                            required={true}
                            value={this.store.title}
                            onChange={this.onChangeTitle}
                        />
                        <textarea
                            className={"form-control"}
                            placeholder={"Description"}
                            value={this.store.description}
                            onChange={this.onChangeDescription}
                        />
                        <input
                            className={"form-control time"}
                            type={"text"}
                            value={this.store.time}
                            placeholder={"Time"}
                            onChange={this.onChangeTime}
                        />
                        <span>(hours)</span>
                        {
                            this.props.edit
                                ? <SimpleSelect
                                    placeholder="status"
                                    onValueChange={this.store.setStatus}
                                    options={[{value: "open", label:"open"}, {value: "done", label:"done"}, {value: "in progress", label:"in progress"}]}
                                />
                                : void 0
                        }
                        <div className={"team"}>
                            <p className={"team-header"}>Team:</p>
                            <p>Developer:</p>
                            {this.store.selectedDeveloper.map((data, index) => {
                                return (
                                    <div key={index}>
                                        <span>{data.first_name} {data.last_name}</span>
                                        <div className={"close-icon"} onClick={() => this.removeDeveloper(index)}/>
                                    </div>
                                )
                            })}
                            <SimpleSelect
                                placeholder="Select developer"
                                onValueChange={this.onSelectDeveloper}>
                                {
                                    this.store.developerList && this.store.developerList.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={`${index}`}
                                            >{`${item.first_name} ${item.last_name}`}
                                            </option>
                                        )
                                    })
                                }
                            </SimpleSelect>
                            <p>Tester:</p>
                            {this.store.selectedTesters.map((data, index) => {
                                return (
                                    <div key={index} className={"selected-container"}>
                                        <div>{data.first_name} {data.last_name}</div>
                                        <div className={"close-icon"} onClick={() => this.removeTester(index)}/>
                                    </div>
                                )
                            })}
                            <SimpleSelect
                                placeholder="Select tester"
                                onValueChange={this.onSelectTester}>
                                {
                                    this.store.testerList && this.store.testerList.map((item, index) => {
                                        return (
                                            <option
                                                key={index}
                                                value={`${index}`}
                                            >{`${item.first_name} ${item.last_name}`}
                                            </option>
                                        )
                                    })
                                }
                            </SimpleSelect>
                        </div>
                        <button
                            onClick={this.onSubmit}
                            type="button"
                            className="btn btn-success"
                        >Save Task
                        </button>
                        {
                            this.store.error !== "" &&
                            <div className={"alert alert-danger"} role={"alert"}>{this.store.error}</div>
                        }
                    </div>
                </div>
            );
        } else return <div/>;
    }
}

export {AddTaskForm};