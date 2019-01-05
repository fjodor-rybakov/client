import {autobind} from "core-decorators";
import { observable } from "mobx";

@autobind
class SignUpStore {
    @observable validateErr = "";
    password = "";
    repeatPassword = "";
    login = "";
    @observable id_role;
    @observable rolesList = [];

    getOptions() {
        let adminIndex = -1;
        const data = this.rolesList.map((item, index) => {
            if (item.name === "admin") {
                adminIndex = index;
            }
            return {label: `${item.name}`, value: item.id_role}
        });
        data.splice(adminIndex, 1);
        return data;
    }
}

export { SignUpStore }