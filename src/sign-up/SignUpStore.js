import autobind from "autobind-decorator";
import { observable } from "mobx";

@autobind
class SignUpStore {
    @observable validateErr = "";
    password = "";
    repeatPassword = "";
    login = "";
}

export { SignUpStore }