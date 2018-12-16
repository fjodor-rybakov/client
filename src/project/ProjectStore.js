import {autobind} from "core-decorators";
import {observable} from "mobx/lib/mobx";

@autobind
class ProjectStore {
    _id = "";

    get id() {
        return this._id
    }

    set id(id) {
        this._id = id;
    }

    @observable _data = {};
    @observable _isAddBlockShown = false;

    get data() {
        return this._data
    }

    set data(data) {
        this._data = data;
    }

    get isAddBlockShown() {
        return this._isAddBlockShown;
    }

    set isAddBlockShown(data) {
        this._isAddBlockShown = data;
    }

    @observable isTaskListVisible = false;
    @observable title = "";
}

export {ProjectStore};