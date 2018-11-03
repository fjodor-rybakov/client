import autobind from "autobind-decorator";
import {observable} from "mobx";

@autobind
class ProfileStore {
    @observable validateErr = "";
    @observable first_name = "";
    @observable last_name = "";
    @observable email = "";
    @observable role = "";
    @observable id_user = 0;
}

export {ProfileStore}