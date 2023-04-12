export default {
    suggestionUrlForAddress(address, count) {
        return `/factor/address-suggestions?address=${address}&count=${count}`
    },
    suggestionUrlForCompany(company, count) {
        return `/factor/company-suggestions?company=${company}&count=${count}`
    },

    orponAddressDataByCoordinateUrl(pointX, pointY) {
        return `/coordinates/for-yandex/by-coordinate?pointX=${pointX}&pointY=${pointY}`;
    },

    orponAddressDataUrl(compositeId) {
        return `/facade/address/by-composite-id?composite-id=${compositeId}`;
    },

    sparkBusinessInfoByOrponIdUrl(orponId) {
        return `/facade/business/by-orpon-id?orpon-id=${orponId}`;
    },

    checkPassportUrl(series, number, issuedate) {
        return `/facade/check-passport?series=${series}&number=${number}&issuedate=${issuedate}`;
    },

    checkMrfsUrl(inn) {
        return `/facade/check-list-data?inn=${inn}`;
    },

    postCheckListUrl() {
        return `/facade/post-check-list`;
    },

    doPdfCheckListUrl() {
        return `/facade/report-pdf`;
    },

    businessByIdUrl(businessId) {
        return `/facade/business/by-id?id=${businessId}`;
    },

    userHistory(url, info) {
        return `/facade/auth/put-record?url=${url}&info=${info}`;
    },

    businessByInnUrl(inn) {
        return `/facade/business/by-inn?inn=${inn}`;
    },

    checkListByInnUrl(inn) {
        return `/facade/check-list/by-inn?inn=${inn}`;
    },

    checkListFinanceByInnUrl(inn) {
        return `/facade/check-list-finance/by-inn?inn=${inn}`;
    },

    checkListForSalesByInnUrl(inn) {
        return `/facade/check-list-for-sales/by-inn?inn=${inn}`;
    },

    checkListCounterpartyByInnUrl(inn) {
        return `/facade/check-list-counterparty/by-inn?inn=${inn}`;
    },

    selfEmployedByInnUrl(inn){
        return `/facade/self-employed/simple-сheck-inn?inn=${inn}`;
    },

    complienceOrgByNameUrl(name){
        return `/facade/complience/org-by-name?name=${name}`;
    },

    complienceOrgByIdsUrl(ids){
        return `/facade/complience/org-by-ids?ids=${ids}`;
    },

    rknByDomainUrl(domain){
        return `/facade/rkn/by-domain?domain=${domain}`;
    },

    rknByAccountUrl(account){
        return `/facade/business/by-account?account=${account}`;
    },

    postCheckListFinanceUrl() {
        return `/facade/check-list-finance/post`;
    },

    postCheckListForSalesUrl() {
        return `/facade/check-list-for-sales/post`;
    },

    postCheckListForTaxesUrl() {
        return `/facade/check-list-for-taxes/post`;
    },

    businessByInnAndGidUrl(inn, gid) {
        return `/facade/business/by-inn-and-orpon-id?inn=${inn}&orpon-id=${gid}`;
    },

    rtkDataByInn(inn, page, pageSize) {
        //Страницы на бэкэнде считаются с 0
        return `/rtk/rtk-data/by-inn?inn=${inn}&page=${page - 1}&page-size=${pageSize}`;
    },

    rtkTele2ClientByInn(inn) {
        return `/rtk/rtk-data/tele2-client-by-inn?inn=${inn}`;
    },

    rtkDataExportByInn(inn) {
        return `/rtk/data-export/by-inn?inn=${inn}`;
    },

    gisDataExportByInn(inn) {
        return `/two-gis/data-export/by-inn?inn=${inn}`;
    },

    exportCheckListJournal(inn, fio, dateStart, dateEnd) {
        return `/data-export/check-list-journal?inn=${inn}&fio=${fio}&date-start=${dateStart}&date-end=${dateEnd}`;
    },

    exportCheckListInnReportToExcel() {
        return `/inn-export/finance-risk/export-to-xls`;
    },

    exportCheckListCounterpartyInnReportToExcel() {
        return `/inn-export/counterparty/export-to-xls`;
    },

    exportCheckListReestr(inn, fio, dateStart, dateEnd) {
        return `/data-export/check-list-reestr-xls?inn=${inn}&fio=${fio}&date-start=${dateStart}&date-end=${dateEnd}`;
    },

    exportCheckListJournalView(inn, fio, dateStart, dateEnd, page, pageSize) {
        return `/data-export/check-list-journal-view?inn=${inn}&fio=${fio}&date-start=${dateStart}&date-end=${dateEnd}&page=${page}&page-size=${pageSize}`;
    },

    twoGisDataByInn(inn, page, pageSize) {
        return `/two-gis/summary-list-by-inn?inn=${inn}&page=${page - 1}&page-size=${pageSize}`;
    },

    goToSparkUrl(inn, companyName) {
        return `http://dd.rt.ru/mdm/ExtendedReport?INN=${inn + "_"+encodeURI(companyName)}&eliminated=false`
    },

    coordinatesByCompositeId(orponId) {
        return `/coordinates/for-yandex/by-composite-id?composite-id=${orponId}`;
    },

    getCoordinatesByBbox(type) {
        return '/coordinates/for-yandex/by-bbox?bbox=%b&zoom=%z&type=' + type;
    },

    authCheckUrl() {
        return '/auth-api/check'
    },

    loginUrl() {
        return '/auth-api/login'
    },

    logoutUrl() {
        return '/auth-api/logout'
    }

}