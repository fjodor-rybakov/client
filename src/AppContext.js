class AppContext {
    static getToken() {
        return new Promise((resolve) => {
            const data = {token: localStorage.getItem("token")};
            const options = {method: "POST", body: JSON.stringify(data)};
            fetch(`${localStorage.getItem("serverAddress")}/api/checkAuthorization`, options)
                .then(res => {
                    if (res.status !== 200) {
                        localStorage.removeItem("token");
                        window.location.reload();
                    }
                    return resolve(res.json());
                })
        });
    }
}

export {AppContext}