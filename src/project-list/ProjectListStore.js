import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class ProjectListStore {
    @observable data = [];
    @observable isRedirect = false;
}

export { ProjectListStore }