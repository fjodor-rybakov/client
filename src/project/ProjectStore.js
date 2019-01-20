import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class ProjectStore {
    id = "";
    @observable dev = [];
    @observable testers = [];
    @observable canCreate = false;
    @observable data = {};
    @observable isAddBlockShown = false;
    @observable isTaskListVisible = false;
    @observable isFormShown = false;
}

export {ProjectStore};