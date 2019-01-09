import {autobind} from "core-decorators";
import {observable} from "mobx";
import * as rp from "request-promise";

@autobind
class CreateProjectStore {
    id = "";
    @observable error = "";
    @observable status = "open";
    @observable title = "";
    @observable description = "";
    @observable projectTypes = [];

    @observable clientsList = [];
    @observable pm_list = [];
    @observable developersList = [];
    @observable testersList = [];

    @observable selectedDeveloper = [];
    @observable selectedTesters = [];

    @observable userRole = "";
    @observable id_user = 0;

    isPrivate = false;
    client = {};
    project_manager = {};
    project_type = {};


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

    editProject(data) {
        console.log(data);
        if (this.id === "") {
            this.error = "error";
        }
        const options = {
            method: "PUT",
            url: `${localStorage.getItem("serverAddress")}/api/project/${this.id}`,
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
        return this.projectTypes.map((item, index) => {
            return {label: item.name, value: index}
        });
    }
}

export {CreateProjectStore}