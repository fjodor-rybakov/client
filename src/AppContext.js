class AppContext {
    static getToken(path) {
        return new Promise((resolve, reject) => {
            const data = {token: localStorage.getItem("token")};
            const options = {method: "POST", body: JSON.stringify(data)};
            fetch(`${localStorage.getItem("serverAddress")}${path}`, options)
                .then(res => {
                    if (res.status === 401) {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }
                    return resolve(res.json());
                })
        });
    }
}

export {AppContext}