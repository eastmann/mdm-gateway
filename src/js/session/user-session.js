function Session() {
    this.authorized = false;
    this.userName = null;
    this.login = null;

    this.isAuthorized = function() {
        return this.authorized;
    };

    this.userLoggedIn = function(login, userName) {
        this.authorized = true;
        this.userName = userName;
        this.login = login;
    };

    this.userLoggedOut = function() {
        this.authorized = false;
        this.userName = null;
        this.login = null;
    }

    this.refreshDataFromServer = function(serverData) {
        this.authorized = serverData.authorized;
        this.userName = serverData.userName;
        this.login = serverData.login;
    }
}

export default new Session();
