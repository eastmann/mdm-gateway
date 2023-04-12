import userSession from '../js/session/user-session'
import axios from 'axios';
import urls from "@/js/utils/urls";
import paths from "@/js/utils/paths";

let initAuthCheck = function(router) {

    router.beforeEach((to, from, next) => {

        let loginPage = paths.loginPage();
        let homePage = paths.home();

        axios.get(urls.authCheckUrl()).then((response) => {
            let authData = response.data;
            userSession.refreshDataFromServer(authData);

            if(!userSession.isAuthorized() && to.path !== '/login') {
                next({path: loginPage});
            } else if(userSession.isAuthorized() && to.path === loginPage) {
                next({path: homePage});
            } else {
                next();
            }
        }, (error) => {
            alert("Error during auth check");
        }).catch((e) => {
            alert(JSON.stringify(e));
        });

    });
};

export default initAuthCheck;

