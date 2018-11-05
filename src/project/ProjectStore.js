import autobind from "autobind-decorator";
import {observable} from "mobx/lib/mobx";

@autobind
class ProjectStore {
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
}
export {ProjectStore};