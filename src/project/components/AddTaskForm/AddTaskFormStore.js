import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class AddTaskFormStore {
    @observable project_id;
    @observable first_name = "";
    @observable last_name = "";
    @observable error = "";
    @observable id_user;
    @observable selectedDeveloper = [];
    @observable selectedTesters = [];
    @observable developerList = [];
    @observable testerList = [];
    @observable description = "";
    @observable time = "";
    @observable title = "";
    status = "";

    setStatus(status) {
        this.status = status.value;
    }
}

export {AddTaskFormStore}