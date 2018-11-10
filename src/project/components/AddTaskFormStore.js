import autobind from "autobind-decorator";
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
    description = "";
    time = "";
    title = "";
}

export {AddTaskFormStore}