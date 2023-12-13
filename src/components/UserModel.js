export default class UserModel {
    constructor(username, password, email, type) {
        this.username = username || "";
        this.password = password || "";
        this.email = email || "";
        this.type = type || "";
    }
}