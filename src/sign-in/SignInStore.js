import {observable} from "mobx";
import {autobind} from "core-decorators";

@autobind
class SignInStore {
    @observable validateErr = "";
    @observable login = "";
    @observable password = "";
}

export { SignInStore }