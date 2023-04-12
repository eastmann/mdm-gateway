export default {
    home() {
        return '/'
    },

    businessByInnAndGid(inn, gid) {
        return `/search/business/by-inn-and-gid/${inn}/${gid}`;
    },

    businessByInn(inn) {
        return "/search/business/by-inn/"+inn
    },

    accountPage() {
        return "/search/account";
    },

    addressPage() {
        return '/search/address';
    },

    mapPage() {
        return '/search/map';
    },

    businessMap() {
        return '/search/business'
    },

    utilsPage() {
        return '/search/utils'
    },

    checkListPage() {
        return '/search/check-list'
    },

    checkListJournalPage() {
        return '/search/check-list-journal'
    },

    checkListByInn(inn) {
        return "/search/check-list/by-inn/"+inn
    },

    checkListFinancePage() {
        return '/search/check-list-finance'
    },

    checkListFinanceCkkPage() {
        return '/search/check-list-finance-ckk'
    },

    checkListInnReportePage() {
        return '/search/check-list-inn-finance-risk-report'
    },

    checkListInnCounterpartyReportePage() {
        return '/search/check-list-inn-counterparty-report'
    },

    checkListFinanceByInn(inn) {
        return "/search/check-list-finance/by-inn/"+inn
    },

    checkListForSalesByInn(inn) {
        return "/search/check-list-for-sales/by-inn/"+inn
    },

    checkListCounterPartyByInn(inn) {
        return "/search/check-list-counterparty/by-inn/"+inn
    },

    addressByCompositeId(compositeId, query) {
        return { path: `/search/address/${compositeId}`, query: {q: query}}
    },

    loginPage() {
        return "/login";
    }

}