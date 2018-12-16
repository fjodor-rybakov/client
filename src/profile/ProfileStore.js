import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class ProfileStore {
    @observable validateErr = "";
    @observable first_name = "";
    @observable last_name = "";
    @observable email = "";
    @observable role = "";
    @observable photo = "";
    @observable id_user = 0;
    @observable path = "";
}

export {ProfileStore}