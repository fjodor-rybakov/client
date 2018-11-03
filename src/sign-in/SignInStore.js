import {observable} from "mobx";
import autobind from "autobind-decorator";

@autobind
class SignInStore {
    @observable validateErr = "";
    @observable login = "";
    @observable password = "";
}

export { SignInStore }