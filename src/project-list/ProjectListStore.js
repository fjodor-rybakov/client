import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class ProjectListStore {
    @observable data = [];
}

export { ProjectListStore }