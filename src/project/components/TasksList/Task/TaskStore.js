import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class TaskStore {
    @observable _id = "";
    @observable id_user = 0;
    @observable isFormShown = false;
    @observable data = {
        tracks: []
    };
    @observable taskData = [];
    @observable canCreate = false;
    @observable isFormVisible = false;
    startData;
    startTime;
    endData;
    endTime;
    description;

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id;
    }
}

export {TaskStore}