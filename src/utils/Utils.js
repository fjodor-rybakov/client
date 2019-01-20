export class Utils {
    static isAuthorisation() {
        return localStorage.getItem("token")
    }
}