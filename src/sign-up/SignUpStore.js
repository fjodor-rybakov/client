import {autobind} from "core-decorators";
import { observable } from "mobx";

@autobind
class SignUpStore {
    @observable validateErr = "";
    password = "";
    repeatPassword = "";
    login = "";
}

export { SignUpStore }