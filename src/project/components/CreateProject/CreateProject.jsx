import * as React from "react";
import {SimpleSelect} from "react-selectize";
import {CreateProjectStore} from "./CreateProjectStore";
import {Utils} from "../../Utils";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Header} from "../../../header/Header";
import "./CreateProject.scss";
import {Button} from "../../../button/Button";

@autobind
@observer
class CreateProject extends React.Component {
    store = new CreateProjectStore();

    getOptions(array) {
        return array.map((item, index) => {
            return {label: `${item.first_name} ${item.last_name}`, value: index}
        })
    }

    async componentWillMount() {
        await Utils.getUserListByRole("developer")
            .then((data) => {
                this.store.developersList = data;
            });
        await Utils.getUserListByRole("project manager")
            .then((data) => {
                this.store.pm_list = data;
            });
        await Utils.getUserListByRole("tester")
            .then((data) => {
                this.store.testersList = data;
            });
        await Utils.getUserListByRole("client")
            .then((data) => {
                this.store.clientsList = data;
            });
        await Utils.getAllProjectType()
            .then((data) => {
                this.store.projectTypes = data;
            });
        await Utils.getCurrentUserInfo()
            .then((data) => {
                this.store.userRole = data.role;
                this.store.id_user = data.id_user;
                this.setData(data);
            });
    }

    setData(data) {
        console.log(this.props.data);
        if (this.props.edit) {
            this.store.id = this.props.data.id_project;
            this.store.client = {id_user: this.props.data.id_user_client};
            this.store.project_manager = {id_user: this.props.data.id_project_manager};
            this.store.description = this.props.data.description;
            this.store.title = this.props.data.title;
            this.store.selectedDeveloper = this.props.dev;
            this.store.selectedTesters = this.props.testers;
            this.store.isPrivate = this.props.data.is_private;
            this.store.project_type = this.props.data.id_project_type;
        } else {
            if (data.role === "client") {
                this.store.client = {id_user: data.id_user}
            } else {
                this.store.project_manager = {id_user: data.id_user}
            }
        }
    }

    removeDeveloper(index) {
        if (index === undefined) {
            return;
        }
        this.store.selectedDeveloper.splice(index, 1);
    }

    removeTester(index) {
        if (index === undefined) {
            return;
        }
        this.store.selectedTesters.splice(index, 1);
    }

    render() {
        return (
            <>
                {!this.props.edit ? <Header title={"create project"}/> : void 0}
                <div className={"create-project container"}>
                    {
                        this.store.error !== "" &&
                        <div className={"alert alert-danger"} role={"alert"}>{this.store.error}</div>
                    }
                    <input className={"input-field"} placeholder={"title"} onChange={this.onChangeTitle}
                           maxLength={30} value={this.store.title}/>
                    <textarea className={"input-field"} placeholder={"description"}
                              onChange={this.onChangeDescription} maxLength={140} value={this.store.description}/>
                    {
                        this.store.userRole === "client"
                            ? <SimpleSelect
                                placeholder="Select project manager"
                                onValueChange={this.onSelectPM}
                                options={this.getOptions(this.store.pm_list)}
                            />
                            : <SimpleSelect
                                options={this.getOptions(this.store.clientsList)}
                                placeholder="Select client"
                                onValueChange={this.onSelectClient}
                            />

                    }
                    <p>Developer:</p>
                    {this.store.selectedDeveloper.map((data, index) => {
                        return (
                            <div key={index} className={"selected-container"}>
                                <span>{data.first_name} {data.last_name}</span>
                                <div className={"close-icon"} onClick={() => this.removeDeveloper(index)}/>
                            </div>
                        )
                    })}
                    <SimpleSelect
                        placeholder="Select developers"
                        onValueChange={this.onSelectDeveloper}
                        options={this.getOptions(this.store.developersList)}
                    />
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
                        placeholder="Select testers"
                        onValueChange={this.onSelectTester}
                        options={this.getOptions(this.store.testersList)}
                    />
                    <SimpleSelect
                        placeholder="Select project type"
                        onValueChange={this.onSelectType}
                        options={this.store.getTypes()}
                    />
                    <div className={"is-private"}>
                        <span className={"is-private__text"}>Make project private</span>
                        <input className={"is-private__checkbox"} type={"checkbox"} onChange={this.onCheck}/>
                    </div>
                    <Button onClick={this.onSubmit} text={"Save Project"}/>
                </div>
            </>
        )
    };

    onSelectType(selected) {
        const index = +(selected.value);
        this.store.project_type = this.store.projectTypes[index].id_project_type;
    }

    async onSubmit() {
        const data = {
            id_user_manager: this.store.project_manager.id_user,
            description: this.store.description,
            title: this.store.title,
            developers: this.store.selectedTesters.concat(this.store.selectedDeveloper),
            id_user_client: this.store.client.id_user,
            id_project_type: this.store.project_type,
            is_private: this.store.isPrivate,
            status: this.store.status
        };
        if (this.props.edit) {
            this.store.editProject(data)
                .then(this.onSuccessEditProject)
                .catch(this.onError);
            return;
        }
        if (!this.isCorrectData(data)) {
            this.store.error = "Все поля должны быть корректно заполнены";
            return;
        }
        this.store.error = "";
        this.store.createProject(data)
            .then(this.onSuccessCreateProject)
            .catch(this.onError);
    }

    onSuccessEditProject() {
        console.log('edit');
    }

    isCorrectData(data) {
        return (data.id_user_manager && data.description && data.title
            && data.developers.length !== 0 && data.id_user_client && data.id_project_type)
    }

    onError() {
        this.store.error = "Произошла ошибка при отправке запроса.";
    }

    onSuccessCreateProject() {
        this.store.error = "";
        window.location.replace("/projectList");
    }

    onCheck() {
        this.store.isPrivate = !this.store.isPrivate;
    }

    onChangeTitle(event) {
        this.store.title = event.target.value;
    }

    onSelectClient(selected) {
        const index = +(selected.value);
        this.store.client = this.store.clientsList[index];
    }

    onSelectPM(selected) {
        if (!selected) {
            return;
        }
        const index = +(selected.value);
        this.store.project_manager = this.store.pm_list[index];
    }

    onSelectDeveloper(selectedOption) {
        if (!selectedOption) {
            return;
        }
        const index = +(selectedOption.value);
        if (this.store.selectedDeveloper.indexOf(this.store.developersList[index]) !== -1) {
            return;
        }
        this.store.selectedDeveloper.push(this.store.developersList[index]);
    }

    onSelectTester(selectedOption) {
        if (!selectedOption) {
            return;
        }
        const index = +(selectedOption.value);
        if (this.store.selectedTesters.indexOf(this.store.testersList[index]) !== -1) {
            return;
        }
        this.store.selectedTesters.push(this.store.testersList[index]);
    }

    onChangeDescription(event) {
        this.store.description = event.target.value;
    }
}

export {CreateProject}