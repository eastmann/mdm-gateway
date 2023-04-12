<template>
    <div class="login-page">
        <div class="login-form">
            <h1>DataPort</h1>
            <p class="guiding-label">Введите свой E-mail и пароль от рабочей учетной записи</p>
            <form>
                <div class="login-form-field">
                    <label for="login">Логин (E-mail):</label>
                    <input id="login" name="login"  v-on:keydown="loginOnEnter" v-model="login">
                </div>
                <div class="login-form-field">
                    <label for="password">Пароль:</label>
                    <input id="password" name="password" type="password" v-on:keydown="loginOnEnter" v-model="password"/>
                </div>
                <div v-if="message" class="login-message">{{message}}</div>
                <div class="mdm-button-row">
                    <div class="enter-button" v-on:click="loginUser" >Войти</div>
                </div>
                <div class="alert-auth">
                    <div>
                        Внимание.
                    </div>
                    Обращаем внимание на то, что с 26.08 портал Датапорт переходит в режим проверки паролей через AD.
                    Просьба актуализировать Логин (e-mail) и доменный пароль при авторизации через Датапорт.
                    При возникновении проблем авторизации просьба обращаться в техподдержку портала Датапорт :
                    <a href="mailto:support_dataport@rt.ru"> support_dataport@rt.ru </a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import userSession from '../../js/session/user-session'
    import paths from "@/js/utils/paths";
    import sessionManager from '../../js/session/session-manager';
    import LoginErrors from '../../js/session/helper/login-errors';

    let WRONG_CREDENTIALS_ERROR = "Неверный логин и/или пароль";
    let UNKNOWN_ERROR = "Неизвестная ошибка";

    export default {
        name: "LoginPage",
        data() {
            return {
                login: null,
                password: null,
                message: null
            }
        },
        methods: {
            loginUser() {
                let self = this;

                sessionManager.login(this.login, this.password).then((success) => {
                    self.message = null;
                    self.$router.go(paths.home());
                }, (error) => {
                    self.message = self._messageForLoginError(error);
                }).catch((e) => {
                    self.message = UNKNOWN_ERROR
                });
            },
            loginOnEnter(e) {
               if(e.key === 'Enter') {
                   this.loginUser();
               }
            },
            _messageForLoginError(error) {
                switch (error) {
                    case LoginErrors.WRONG_LOGIN_OR_PASSWORD:
                        return WRONG_CREDENTIALS_ERROR;
                    default:
                        return UNKNOWN_ERROR;
                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../css/colors";

    .alert-auth{
        padding: 10px;
        font-weight: bold;
        border-style: solid;
        border-color: @baseViolet;
        margin-top: 30px;
        max-width: 580px;
        text-align:justify;
        font-size: 14px;
    }

    .login-page {
        width: 100%;
        height: 100%;
        font-weight: lighter;
        display:grid;
        grid-template-columns: 1fr;

        .login-form-field {
            margin: 10px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;

            font-size: 20px;

            input {
                padding: 3px;
                font-size: 20px;
                width: 300px;
            }
        }
    }
    .guiding-label {
        font-size: 20px;
        padding: 10px 0;
    }
    .login-form {
        justify-self: center;
        align-self: center;
        border: 1px solid @lightGrey;
        padding: 20px;
        border-radius: 10px;

        h1 {
            background-image: url("../../assets/img/login/rtk_logo.png");
            background-size: 20px;
            background-repeat: no-repeat;

            padding-left: 60px;
            padding-top: 4px;
            font-size: 28px;
        }
    }
    .mdm-button-row {
        margin-top: 20px;
        text-align: center;
    }

    .enter-button {
        background-color: @baseViolet;
        color: white;
        padding: 5px 0;
        border-radius: 5px;
        font-size: 20px;

        cursor: pointer;
    }

    .login-message {
        color: @errorRed;
    }
</style>