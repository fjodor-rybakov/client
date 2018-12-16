import {autobind} from "core-decorators";
import {observable} from "mobx/lib/mobx";

@autobind
class TasksListStore {
    _idProject = "";
    @observable _data = [];

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get idProject() {
        return this._idProject;
    }

    set idProject(id) {
        this._idProject = id;
    }
}

export {TasksListStore};
