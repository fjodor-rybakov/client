import * as React from "react";
import {SimpleSelect} from "react-selectize";
import {CreateProjectStore} from "./CreateProjectStore";
import {Utils} from "../../Utils";
import {autobind} from "core-decorators";
import {observer} from "mobx-react/index";

@observer
@autobind
class CreateProject extends React.Component {
    store = new CreateProjectStore();

    getOptions(array) {
        return array.map((item, index) => {
            return {label: `${item.first_name} ${item.last_name}`, value: index}
        })
    }

    componentWillMount() {
        Utils.getUserListByRole("developer")
            .then((data) => {
                this.store.developersList = data;
            });
        Utils.getUserListByRole("project manger")
            .then((data) => {
                this.store.pm_list = data;
                console.log(data);
            });
        Utils.getUserListByRole("tester")
            .then((data) => {
                this.store.testersList = data;
            });
        Utils.getUserListByRole("client")
            .then((data) => {
                this.store.clientsList = data;
            });
        Utils.getAllProjectType()
            .then((data) => {
                this.store.projectTypes = data;
            });
    }


    render() {
        return (
            <>
                <input placeholder={"title"} onChange={this.onChangeTitle}/>
                <textarea placeholder={"description"} onChange={this.onChangeDescription}/>
                <SimpleSelect
                    options={this.getOptions(this.store.clientsList)}
                    placeholder="Select client"
                    onValueChange={this.onSelectClient}
                />
                <SimpleSelect
                    placeholder="Select project manager"
                    onValueChange={this.onSelectPM}
                    options={this.getOptions(this.store.pm_list)}
                />
                <SimpleSelect
                    placeholder="Select developers"
                    onValueChange={this.onSelectDeveloper}
                    options={this.getOptions(this.store.developersList)}
                />
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
                <span>is Private</span>
                <input type={"checkbox"} onChange={this.onCheck}/>
                <button
                    onClick={this.onSubmit}
                    type="button"
                    className="btn btn-success"
                >Save Project
                </button>
                {
                    this.store.error !== "" &&
                    <div className={"alert alert-danger"} role={"alert"}>{this.store.error}</div>
                }
            </>
        )
    };

    onSelectType(selected) {
        const index = +(selected.value);
        this.store.project_type = this.store.projectTypes[index].id_project_type;
    }

    onSubmit() {
        const data = {
            id_user_manager: this.store.project_manager.id_user,
            description: this.store.description,
            title: this.store.title,
            developers: this.store.selectedTesters.concat(this.store.selectedDeveloper),
            id_user_client: this.store.client.id_user,
            id_project_type: this.store.project_type,
            is_private: this.store.isPrivate,
        };
        if (!this.verifyData(data)) {
            this.store.error = "Все поля должны быть корректно заполнены";
            return;
        }
        this.store.error = "";
        this.store.createProject(data)
            .then(this.onSuccessCreateProject)
            .catch(this.onError);
    }

    verifyData(data) {
        return !(!data.id_user_manager || !data.description || !data.description || !data.title
            || data.developers.length === 0 || !data.id_user_client || !data.id_project_type)

    }

    onError(){
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