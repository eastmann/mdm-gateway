import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/main/Home.vue'
import SearchAddress from '../views/search/address/SearchAddressPage.vue'
import BusinessPage from '../views/search/business/BusinessPage.vue'
import SearchMap from '../views/search/map/SeachMapPage.vue'
import UtilsPage from '../views/search/utils/UtilsPage.vue'
import CheckListPage from '../views/search/checkList/CheckListPage.vue'
import CheckListJournalPage from '../views/search/checkList/CheckListJournalPage.vue'
import CheckListFinancePage from '../views/search/checkListFinance/CheckListFinancePage.vue'
import CheckListForSalesPage from '../views/search/checkListForSales/CheckListForSalesPage.vue'
import CheckListCounterpartyPage from '../views/search/checkListCounterParty/CheckListCounterpartyPage.vue'
import SelfEmployedPage from '../views/search/selfEmployed/SelfEmployedPage.vue'
import SanctionListPage from '../views/search/sanctionsList/SanctionListPage.vue'
import RknPage from '../views/search/rkn/RknPage.vue'
import SearchByAccountPage from '../views/search/byAccount/SearchByAccountPage.vue'
import LoginPage from '../views/login/LoginPage.vue'
import CheckListFinanceRiskReport from "@/views/search/checkListInnFinancrRiskReport/CheckListFinanceRiskReport.vue";
import CheckListCounterPartyReport from "@/views/search/checkListInnCounterPartyExport/CheckListCounterPartyReport.vue";
import '../css/style.less'
import '@/js/main'

import initAuthCheck from '@/router/auth-checker'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage
    },

    {
        path: '/search/address',
        name: 'search',
        component: SearchAddress
    },
    {
        path: '/search/address/:compositeId',
        name: 'address',
        component: SearchAddress
    },
    {
        path: '/search/business',
        name: 'business-page',
        component: BusinessPage
    },
    {
        path: '/search/business/:businessId',
        name: 'business-page',
        component: BusinessPage
    },
    {
        path: '/search/business/by-inn/:inn',
        name: 'business-page',
        component: BusinessPage
    },
    {
        path: '/search/business/by-inn-and-gid/:inn/:gid',
        name: 'business-page',
        component: BusinessPage
    },
    {
        path: '/search/map',
        name: 'map',
        component: SearchMap
    },
    {
        path: '/search/utils',
        name: 'utils',
        component: UtilsPage
    },
    {
        path: '/search/check-list',
        name: 'check-list',
        component: CheckListPage
    },
    {
        path: '/search/check-list/by-inn/:inn',
        name: 'check-list',
        component: CheckListPage
    },
    {
        path: '/search/check-list-journal',
        name: 'check-list-journal',
        component: CheckListJournalPage
    },
    {
        path: '/search/check-list-finance',
        name: 'check-list-finance',
        component: CheckListFinancePage
    },
    {
        path: '/search/check-list-finance/by-inn/:inn',
        name: 'check-list-finance',
        component: CheckListFinancePage
    },
    {
        path: '/search/check-list-for-sales',
        name: 'check-list-for-sales',
        component: CheckListForSalesPage
    },
    {
        path: '/search/check-list-for-sales/by-inn/:inn',
        name: 'check-list-for-sales',
        component: CheckListForSalesPage
    },
    {
        path: '/search/check-list-counterparty',
        name: 'check-list-counterparty',
        component: CheckListCounterpartyPage
    },
    {
        path: '/search/check-list-counterparty/by-inn/:inn',
        name: 'check-list-counterparty',
        component: CheckListCounterpartyPage
    },
    {
        path: '/search/check-list-finance-risk-report',
        name: 'check-list-finance-risk-report',
        component: CheckListFinanceRiskReport
    },
    {
        path: '/search/check-list-counterparty-report',
        name: 'check-list-counterparty-report',
        component: CheckListCounterPartyReport
    },
    {
        path: '/search/self-employed',
        name: 'self-employed',
        component: SelfEmployedPage
    },
    {
        path: '/search/self-employed/by-inn/:inn',
        name: 'self-employed',
        component: SelfEmployedPage
    },
    {
        path: '/search/sanctions-list',
        name: 'sanctions-list',
        component: SanctionListPage
    },
    {
        path: '/search/rkn',
        name: 'rkn',
        component: RknPage
    },
    {
        path: '/search/account',
        name: 'account',
        component: SearchByAccountPage
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

initAuthCheck(router);

export default router
