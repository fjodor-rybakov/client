import * as rp from "request-promise";

class Utils {
    static async getUserListByRole(role) {
        console.log(role);
        const options = {
            method: "POST",
            url: `${localStorage.getItem("serverAddress")}/api/getUserListByRole`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
            body: role,
            json: true
        };
        return await rp(options);
    }

    static async getRoles() {
        let res = {};
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/getRoles`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(data => res = data)
            .catch(console.log);
        console.log(res);
        return res;
    }

    static async getCurrentUserInfo() {
        let res = {};
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/getInfo`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(data => res = data)
            .catch(console.log);
        return res;
    }

    static async getAllProjectType() {
        let res = {};
        const options = {
            method: "GET",
            url: `${localStorage.getItem("serverAddress")}/api/getProjectTypes`,
            headers: {
                "x-guide-key": localStorage.getItem("token"),
                "Cache-Control": "private, max-age=0, no-cache"
            },
        };
        await rp(options)
            .then(JSON.parse)
            .then(data => res = data)
            .catch(console.log);
        console.log(res);
        return res;
    }
}

export {Utils}