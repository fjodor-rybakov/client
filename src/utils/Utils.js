export class Utils {
    isAuthorisation() {
        return localStorage.getItem("token")
    }
}