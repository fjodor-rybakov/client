import autobind from "autobind-decorator";
import {observable} from "mobx";

@autobind
class AddTaskFormStore {
    @observable project_id = null;
    @observable first_name = "";
    @observable last_name = "";
    @observable email = "";
    @observable role = 0;
    @observable id_user = 0;
}

export {AddTaskFormStore}