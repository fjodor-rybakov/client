import {autobind} from "core-decorators";
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
    @observable userRole = "";
    @observable id_user = 0;

    createProject(data) {
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/project`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: data,
            json: true
        };
        return rp(options);
    }

    getTypes() {
        return this.projectTypes.map((item, index) => { return {label: item.name, value: index} });
    }
}

export {CreateProjectStore}