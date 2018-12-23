import * as rp from "request-promise";

class Utils {
    static async getUserListByRole(role) {
        const options = {method: "POST", body: JSON.stringify({role: role})};
        return await fetch(`${localStorage.getItem("serverAddress")}/api/getUserListByRole`, options)
            .then(res => res.json())
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
            .then(res => JSON.parse(res))
            .then(data => res = data)
            .catch(console.log);
        return res.data;
    }
}

export {Utils}