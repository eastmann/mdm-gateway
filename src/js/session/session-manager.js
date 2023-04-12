import axios from 'axios';
import userSession from "./user-session";
import paths from "../utils/paths";
import urls from '../utils/urls';
import LoginErrors from './helper/login-errors'

function SessionManager() {
    this.login = function(login, password) {
        let loginInfo = {login: login, password: password}

        return new Promise((resolve, reject) => {
            axios.post(urls.loginUrl(), loginInfo).then((response) => {
                let authInfo = response.data;
                // console.log(response.data);
                userSession.userLoggedIn(self.login, authInfo.userName);

                if(authInfo.authorized) {
                    resolve();
                } else {
                    reject(LoginErrors.WRONG_LOGIN_OR_PASSWORD);
                }
            }, (error) => {
                reject(LoginErrors.SERVER_ERROR);
            }).catch((e) => {
                reject(LoginErrors.SERVER_ERROR);
            });
        });
    };

    this.logout = function() {
        return new Promise((resolve, reject) => {
            axios.post(urls.logoutUrl()).then((response) => {
                let authInfo = response.data;
                // console.log(response.data);

                if(!authInfo.authorized) {
                    userSession.userLoggedOut();
                    resolve();
                } else {
                    reject();
                }
            }, (error) => {
                reject(error);
            }).catch((e) => {
                reject(e);
            });
        });
    }
}

export default new SessionManager();