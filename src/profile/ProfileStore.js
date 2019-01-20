import {autobind} from "core-decorators";
import {observable} from "mobx";
import * as rp from "request-promise";

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
    @observable typeIMG = "";
    @observable tracks = [];


    async getTracks() {
        const options = {
            method: "GET",
            uri: `${localStorage.getItem("serverAddress")}/api/profile/task`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(res => JSON.parse(res))
            .then(this.setTracks)
            .catch(console.log);

    }

    setTracks(data) {
        console.log(data);
        this.tracks = data;
    }
}

export {ProfileStore}