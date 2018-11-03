import autobind from "autobind-decorator";
import {observable} from "mobx";

@autobind
class ProjectListStore {
    @observable data = [];
}

export { ProjectListStore }