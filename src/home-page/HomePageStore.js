import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
class HomePageStore {
    @observable value = "123";
}

export {HomePageStore}