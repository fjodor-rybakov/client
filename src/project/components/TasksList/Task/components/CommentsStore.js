import {observable} from "mobx";
import * as rp from "request-promise";
import { autobind } from "core-decorators";

@autobind
class CommentsStore {
    @observable comments = [];
    @observable text = "";
    @observable id = "";
    @observable id_user = "";
    @observable updated = false;
    @observable edited = "";
    @observable edited_id = "";

    async getComments() {
        if (!this.id) {
            return;
        }

        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/feedback/list/${this.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(this.onSuccess)
            .catch(console.log);
    }

    onSuccess(data) {
        this.comments = data;
        console.log(data);
    }

    updateComment() {
        const options = {
            method: "PUT",
            url: `${localStorage.getItem("serverAddress")}/api/feedback/${this.edited_id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: {
                data: this.edited
            },
            json: true
        };
        rp(options).then(this.onSuccessUpdateComment);
    }

    onSuccessUpdateComment() {
        this.edited_id = "";
        this.updated = false;
        this.edited = "";
        this.getComments().then(console.log);
    }

    async saveComment() {
        if (this.updated) {
            this.updateComment();
            return;
        }

        if (this.text === "" || !this.id) {
            return;
        }

        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/feedback/${this.id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: {
                data: this.text
            },
            json: true
        };
        await rp(options)
            .then(this.onAddComment)
            .catch(console.log);
    }

    onAddComment() {
        this.text = "";
        this.getComments().then(console.log);
    }

    onDelete(id) {
        const options = {
            method: "DELETE",
            url: `${localStorage.getItem("serverAddress")}/api/feedback/${id}`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        rp(options)
            .then(this.getComments)
            .catch(console.log);
    }

}

export {CommentsStore}