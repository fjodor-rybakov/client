class AppContext {
    static getToken() {
        return new Promise((resolve) => {
            const data = {token: localStorage.getItem("token")};
            const options = {method: "POST", body: JSON.stringify(data)};
            fetch(`${localStorage.getItem("serverAddress")}/api/authorization`, options)
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