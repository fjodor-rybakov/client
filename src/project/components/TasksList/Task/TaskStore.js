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
    @observable edit = false;
    @observable edit_data = {};
    @observable startData;
    @observable startTime = "00:00";
    @observable endData;
    @observable endTime="00:00";
    @observable description;

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id;
    }
}

export {TaskStore}