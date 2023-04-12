<template>
    <div class="page">
        <template v-if="isLoginPage()">
            <LoginPage />
        </template>
        <template v-else>
            <div class="header">
                <div class="main-logo">
                    <img src="@/assets/img/rt_logo_horizontal_rus.png"
                         :class="{clickable : !isHomePage()}" v-on:click="goHome">
                </div>
<!--                <div class="man-logo">-->
<!--                  <img src="@/assets/img/dataport.png">-->

<!--                </div>-->


                <div class="menu-right-part">
                    <div class="sections" id="nav">
                        <router-link class="section" to="/" exact >ГЛАВНАЯ</router-link>
                        <router-link class="section" to="/search/business">КОМПАНИИ</router-link>
                        <router-link class="section" to="/search/address">АДРЕСА</router-link>
                        <router-link class="section" to="/search/map">КАРТА</router-link>
                        <div class="dropdown">
                            <div class="dropbtn">ЧЕК-ЛИСТ</div>
                            <div class="dropdown-content">
                                <a href="/search/check-list">Оценка благонадежности нового клиента</a>
                                <a href="/search/check-list-finance">Финансовая оценка контрагента</a>
                                <a href="/search/check-list-for-sales">Проверка контрагентов для сотрудников продаж</a>
                                <a href="/search/check-list-counterparty">Проверка контрагентов для НД</a>
                                <a href="/search/check-list-finance-risk-report">Отчет по финансовым рискам</a>
                                <a href="/search/check-list-counterparty-report">Массовая проверка контрагентов для НД</a>
<!--                                <a href="/search/self-employed">Проверка самозанятых</a>-->
                            </div>
                        </div>
<!--                        <router-link class="section" to="/search/check-list">ЧЕК-ЛИСТ</router-link>-->
<!--                        <router-link class="section" to="/search/check-list-finance">ФИН. ПОКАЗАТЕЛИ</router-link>-->
                        <router-link class="section" to="/search/utils">УТИЛИТЫ</router-link>
                        <span class="section">ЛИЧНЫЙ КАБИНЕТ</span>
                        <a v-bind:href="mailtoRef" v-on:click="sendEmail"> ТЕХПОДДЕРЖКА </a>
                        <span><i class="fas fa-sign-out-alt logout-icon" v-on:click="logout"/></span>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
            <div class="page-content">
                <transition name="fade" mode="out-in" >
                    <router-view/>
                </transition>
            </div>
        </template>

    </div>
</template>
<script>
    import paths from './js/utils/paths'
    import LoginPage from "@/views/login/LoginPage";
    import userSession from '@/js/session/user-session.js';
    import sessionManager from '@/js/session/session-manager.js';
    import MailtoUI from 'mailtoui/dist/mailtoui-min.js';


    export default {
        computed: {
            mailtoRef: function() {
                const email = 'support_dataport@rt.ru';
                const subject = 'Ошибка';
                return 'mailto:' + email + '?subject=' + subject;
            }
        },
        components: {
            'LoginPage': LoginPage
        },
        methods: {
            isHomePage() {
                return this.$route.fullPath === paths.home();
            },
            goHome() {
                if(this.$route.fullPath !== paths.home()) {
                    this.$router.push(paths.home());
                }
            },
            beforeLeave(element) {
                this.prevHeight = getComputedStyle(element).height;
            },
            enter(element) {
                const { height } = getComputedStyle(element);

                element.style.height = this.prevHeight;

                setTimeout(() => {
                    element.style.height = height;
                });
            },
            afterEnter(element) {
                element.style.height = 'auto';
            },
            isLoginPage() {
                return this.$router.currentRoute.name === 'login';
            },
            logout() {
                let self = this;
                sessionManager.logout().then((success) => {
                    self.$router.push(paths.loginPage());
                }, (error) => {
                   // alert("Error during logout");
                })
            },
            sendEmail() {
                MailtoUI.run();
            }
        }
    }
</script>
<style lang="less">
    @import "css/style.less";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;
            text-decoration: none;

            &.router-link-active {
                color: @baseViolet;
                cursor: default !important;
            }

        }
    }
    .clickable {
        cursor: pointer;
    }

    .man-logo {
      display: inline-block;
      margin-left: 140px;
      width: 150px;
      height: 130px;
      //margin-bottom: 50px;
      padding-left: 3px;
    }

    .fade-enter-active, .fade-leave-active {
        transition-duration: 0.18s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .menu-right-part {
        display: inline-block;
        height: 62px;
        /*line-height: 62px;*/
        vertical-align: top;
        text-align: right;
        width: calc(100% - 256px);
    }

    .header {
        position: relative;
        padding-top: 48px;
        box-sizing: border-box;
    }

    .sections {
        display: inline-block;
        padding-right: 37px;
        font-size: 14px;
    }

    .sections .section {
        display: inline-block;

        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        padding: 0 13px;
        color: #273a64;
    }

    .user-info {
        display: inline-block;
        padding-left: 20px;
    }

    .logout-icon {
        opacity: 0.5;

        &:hover {
            opacity: 1.0;
            cursor:pointer;
        }
    }


    /*display: inline-block;*/
    /*height: 62px;*/
    /*line-height: 62px;*/
    /*vertical-align: top;*/
    /*text-align: left;*/
    /*width: calc(100% - 256px);*/
    /* Dropdown Button */
    .dropbtn {
        /*background-color: #04AA6D;*/
        /*color: white;*/
        /*padding: 16px;*/
        /*font-size: 16px;*/
        border: none;
    }

    /* The container <div> - needed to position the dropdown content */
    .dropdown {
        position: relative;
        display: inline-block;
        text-align: left;
    }

    /* Dropdown Content (Hidden by Default) */
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f1f1f1;
        min-width: 160px;
        width: 320px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    /* Links inside the dropdown */
    .dropdown-content a {
        /*color: black;*/
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    /* Change color of dropdown links on hover */
    .dropdown-content a:hover {background-color: #ddd;}

    /* Show the dropdown menu on hover */
    .dropdown:hover .dropdown-content {display: block;}

    /* Change the background color of the dropdown button when the dropdown content is shown */
    .dropdown:hover .dropbtn {
        background-color: #e6efee;
    }
</style>
