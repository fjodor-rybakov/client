import autobind from "autobind-decorator";
import {observable} from "mobx";

@autobind
class HomePageStore {
    @observable value = "123";
}

export {HomePageStore}