import autobind from "autobind-decorator";
import {observable} from "mobx";
import * as rp from "request-promise";

@autobind
class CreateProjectStore {
    client = {};
    @observable error = "";
    @observable clientsList = [];
    project_manager = {};
    @observable pm_list = [];
    @observable developersList = [];
    @observable testersList = [];
    project_type = {};
    selectedDeveloper = [];
    selectedTesters = [];
    title = "";
    description = "";
    isPrivate = false;
    @observable projectTypes = [];

    async createProject(data) {
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/createProject`,
            headers: {"x-guide-key": localStorage.getItem("token")},
            body: {data: data},
            json: true
        };
        return rp(options);
    }

    getTypes() {
        console.log("hbyy", this.projectTypes);
        return this.projectTypes.map((item, index) => { return {label: item.name, value: index} });
    }
}

export {CreateProjectStore}