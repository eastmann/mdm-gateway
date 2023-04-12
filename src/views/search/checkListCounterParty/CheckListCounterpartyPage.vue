<template>
    <div class="page">
        <div class="margin-left-5 check-list">
            <CheckListCounterpartyToPdf ref="toPdf" v-if="sparkOrganizationInfo"
                                        :spark-organization-info="sparkOrganizationInfo"
                                        :fin-indicators="finIndicators"
                                        :stop-factors="stopFactors"
                                        :period-map="periodMap"
                                        :risk-evaluation="riskEvaluation"/>

            <div class="rtk-button-port" v-if="sparkOrganizationInfo" v-on:click="onButtonPdfClick()">Печать в PDF</div>

            <!--            <div class="rtk-button-port" v-if="checkListCounterparty" v-on:click="onButtonSaveClick()">Сохранить</div>-->
            <div class="rtk-button-port" v-if="sparkOrganizationInfo" v-on:click="goHome">Отмена</div>

        </div>

        <div class="check-list">

            <div class="card-header">
                Проверка контрагентов для НД
            </div>

            <BusinessSearchBox v-on:suggestion-selected="loadCheckListBySuggestion"/>

            <modal-window ref="modalSaveInfo">
                <template v-slot:title>
                    <h1>Сохранение чек-листа:</h1>
                </template>
                <template v-slot:body>
                    <div v-if="saveInfo">
                        <h3> {{saveInfo}} </h3>
                    </div>
                    <div v-if="saveError">
                        <h3> {{saveError}} </h3>
                    </div>
                </template>
            </modal-window>

            <modal-window ref="modal">
                <template v-slot:title>
                    <h1>Список незаполненных параметров:</h1>
                </template>
                <template v-slot:body>
                    <div>
                        <div v-if="checkListForTaxes.checkDate === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Дата проведения проверки
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div class="margin-top-10">
                        <div class="rtk-button-port" v-on:click="onButtonPdfClickModal">Печать в PDF</div>
                        <div class="rtk-button-port" v-on:click="onButtonSaveClickModal">Сохранить</div>
                        <div class="rtk-button-port" v-on:click="closeModal">Отмена</div>
                    </div>
                </template>

            </modal-window>

            <div class="relabillity" v-if="sparkOrganizationInfo">
                Чек лист Проверка контрагента НД КЦ
            </div>
            <BlockInfo caption="ДАННЫЕ КОМПАНИИ" v-if="sparkOrganizationInfo">
                <table class="table-border-none">
                    <tr>
                        <td>
                            <TextField caption="Наименование:" :value="companyName"/>
                            <TextField caption="ИНН:" v-model="inn"/>
                            <TextField caption="Дата регистрации:"
                                       :value="new Date(companyDateReg).toLocaleDateString() "/>
                        </td>
                        <td>
                            <TextField caption="ОГРН:" :value="ogrn"/>
                            <TextField caption="Статус:" :value="companyStatusAndDate"/>
                            <!--                            <TextField caption="Дата регистрации:"-->
                            <!--                                       :value="new Date(checkListForTaxes.dateReg).toLocaleDateString() "/>-->
                        </td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ОБЩАЯ ИНФОРМАЦИЯ" v-if="stopFactors">
                При выявлении стоп факторов Оценка ставится не выше, чем указанная в описании
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>Статус</th>
                        <th>Рейтинг</th>
                    </tr>
                    <tr>
                        <td> {{stopFactors[0].name}}</td>
                        <td> {{yesNoRus(stopFactors[0].value)}}</td>
                        <td> {{getRisk(stopFactors[0].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[1].name}}</td>
                        <td> {{yesNoRus(stopFactors[1].value)}}</td>
                        <td> {{getRisk(stopFactors[1].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[2].name}}</td>
                        <td> {{stopFactors[2].value}}</td>
                        <td> {{getRisk(stopFactors[2].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[3].name}}</td>
                        <td> {{yesNoRus(stopFactors[3].value)}}</td>
                        <td> {{getRisk(stopFactors[3].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[4].name}}</td>
                        <td> {{stopFactors[4].value}}</td>
                        <td> {{getRisk(stopFactors[4].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[5].name}}</td>
                        <td> {{stopFactors[5].value}}</td>
                        <td> {{getRisk(stopFactors[5].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[6].name}}</td>
                        <td> {{yesNoRus(stopFactors[6].value)}}</td>
                        <td> {{getRisk(stopFactors[6].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[7].name}}</td>
                        <td> {{yesNoRus(stopFactors[7].value)}}</td>
                        <td> {{getRisk(stopFactors[7].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[8].name}}</td>
                        <td> {{yesNoRus(stopFactors[8].value)}}</td>
                        <td> {{getRisk(stopFactors[8].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[9].name}}</td>
                        <td> {{yesNoRus(stopFactors[9].value)}}</td>
                        <td> {{getRisk(stopFactors[9].risk)}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ПЕРСОНАЛ" v-if="finIndicators">
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>ед. изм</th>
                        <th>{{periodMap.thirdPeriod}} год</th>
                        <th>{{periodMap.secondPeriod}} год</th>
                        <th>{{periodMap.firstPeriod}} год</th>
                        <th>Рейтинг</th>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[0].name}}</td>
                        <td> {{caption=finIndicators[0].measure}}</td>
                        <td> {{caption=finIndicators[0].thirdValue}}</td>
                        <td> {{caption=finIndicators[0].secondValue}}</td>
                        <td> {{caption=finIndicators[0].firstValue}}</td>
                        <td> {{caption=finIndicators[0].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[1].name}}</td>
                        <td> {{caption=finIndicators[1].measure}}</td>
                        <td> {{caption=finIndicators[1].thirdValue}}</td>
                        <td> {{caption=finIndicators[1].secondValue}}</td>
                        <td> {{caption=finIndicators[1].firstValue}}</td>
                        <td> {{caption=finIndicators[1].rating}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ИМУЩЕСТВО" v-if="finIndicators">
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>ед. изм</th>
                        <th>{{periodMap.thirdPeriod}} год</th>
                        <th>{{periodMap.secondPeriod}} год</th>
                        <th>{{periodMap.firstPeriod}} год</th>
                        <th>Рейтинг</th>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[2].name}}</td>
                        <td> {{caption=finIndicators[2].measure}}</td>
                        <td> {{caption=finIndicators[2].thirdValue}}</td>
                        <td> {{caption=finIndicators[2].secondValue}}</td>
                        <td> {{caption=finIndicators[2].firstValue}}</td>
                        <td> {{caption=finIndicators[2].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[3].name}}</td>
                        <td> {{caption=finIndicators[3].measure}}</td>
                        <td> {{caption=finIndicators[3].thirdValue}}</td>
                        <td> {{caption=finIndicators[3].secondValue}}</td>
                        <td> {{caption=finIndicators[3].firstValue}}</td>
                        <td> {{caption=finIndicators[3].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[4].name}}</td>
                        <td> {{caption=finIndicators[4].measure}}</td>
                        <td> {{caption=finIndicators[4].thirdValue}}</td>
                        <td> {{caption=finIndicators[4].secondValue}}</td>
                        <td> {{caption=finIndicators[4].firstValue}}</td>
                        <td> {{caption=finIndicators[4].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[5].name}}</td>
                        <td> {{caption=finIndicators[5].measure}}</td>
                        <td> {{caption=finIndicators[5].thirdValue}}</td>
                        <td> {{caption=finIndicators[5].secondValue}}</td>
                        <td> {{caption=finIndicators[5].firstValue}}</td>
                        <td> {{caption=finIndicators[5].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[6].name}}</td>
                        <td> {{caption=finIndicators[6].measure}}</td>
                        <td> {{caption=yesNoRus(finIndicators[6].thirdValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[6].secondValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[6].firstValue)}}</td>
                        <td> {{caption=finIndicators[6].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[7].name}}</td>
                        <td> {{caption=finIndicators[7].measure}}</td>
                        <td> {{caption=yesNoRus(finIndicators[7].thirdValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[7].secondValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[7].firstValue)}}</td>
                        <td> {{caption=finIndicators[7].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[8].name}}</td>
                        <td> {{caption=finIndicators[8].measure}}</td>
                        <td> {{caption=yesNoRus(finIndicators[8].thirdValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[8].secondValue)}}</td>
                        <td> {{caption=yesNoRus(finIndicators[8].firstValue)}}</td>
                        <td> {{caption=finIndicators[8].rating}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="НАЛОГИ, РЕНТАБЕЛЬНОСТЬ" v-if="finIndicators">
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>ед. изм</th>
                        <th>{{periodMap.thirdPeriod}} год</th>
                        <th>{{periodMap.secondPeriod}} год</th>
                        <th>{{periodMap.firstPeriod}} год</th>
                        <th>Рейтинг</th>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[9].name}}</td>
                        <td> {{caption=finIndicators[9].measure}}</td>
                        <td> {{caption=round(finIndicators[9].thirdValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[9].secondValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[9].firstValue, 2)}}</td>
                        <td> {{caption=finIndicators[9].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[10].name}}</td>
                        <td> {{caption=finIndicators[10].measure}}</td>
                        <td> {{caption=round(finIndicators[10].thirdValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[10].secondValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[10].firstValue, 2)}}</td>
                        <td> {{caption=finIndicators[10].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[11].name}}</td>
                        <td> {{caption=finIndicators[11].measure}}</td>
                        <td> {{caption=round(finIndicators[11].thirdValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[11].secondValue, 2)}}</td>
                        <td> {{caption=round(finIndicators[11].firstValue, 2)}}</td>
                        <td> {{caption=finIndicators[11].rating}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ИТОГИ ПО РАСЧЕТАМ" v-if="sparkOrganizationInfo">
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>Значение</th>
                    </tr>
                    <tr>
                        <td>Итоговый показатель</td>
                        <td :class="calcLevelRisk"> {{round(riskEvaluation, 2)}}</td>
                    </tr>
                </table>
            </BlockInfo>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import BusinessSearchBox from "../../../components/inputs/search_box/BusinessSearchBox";
    import ModalWindow from "../../../components/inputs/windows/modal-window";
    import urls from "@/js/utils/urls";
    import paths from "@/js/utils/paths";
    import organization from "@/js/utils/organization";
    import dateUtils from "@/js/utils/date";
    import TextField from "@/components/checkList/TextField";
    import BlockInfo from "@/components/checkList/BlockInfo";
    import purchase from "@/js/utils/checkLists/checkListFinance/purchaseModule";
    import CheckListCounterpartyToPdf from "@/views/search/checkListCounterParty/components/CheckListCounterpartyToPdf";
    import checkListUtils from "@/js/utils/checkList";

    export default {
        name: "CheckListCounterparty",
        components: {
            CheckListCounterpartyToPdf,
            BusinessSearchBox,
            ModalWindow,
            TextField,
            BlockInfo,
        },
        mounted() {
            this.loadBusinessData();
        },
        home() {
            return '/'
        },
        computed: {
            calcLevelRisk: function () {
                return {
                    active: true,
                    'rating-red': this.riskEvaluation <= 27,
                    'rating-yellow': this.riskEvaluation > 27 && this.riskEvaluation <= 48,
                    'rating-green': this.riskEvaluation > 48
                }
            },

            companyName() {
                return organization.companyName(this.sparkOrganizationInfo);
            },
            companyFullName() {
                return organization.companyFullName(this.sparkOrganizationInfo);
            },
            companyStatusAndDate() {
                return organization.companyStatusAndDate(this.sparkOrganizationInfo);
            },
            companyAddress() {
                return organization.companyAddress(this.sparkOrganizationInfo);
            },
            companyDateReg() {
                return organization.companyDateReg(this.sparkOrganizationInfo);
            },
            ogrn() {
                return organization.ogrn(this.sparkOrganizationInfo);
            },
            inn() {
                return organization.inn(this.sparkOrganizationInfo);
            },
        },
        data() {
            return {
                checkListForTaxes: "",
                sparkOrganizationInfo: "",
                stopFactors: null,
                finIndicators: null,
                periodMap: null,
                riskEvaluation: 0,
                saveInfo: "",
                saveError: "",
                checkDate: "",
                calcRating: 0,
                riskWithFactors: 0,
                analistOpinion: "Нет",
                resultRisk: 0,
                banckuptInfo: "-",
                sumContract: 0,
                comment: "",
                showPurchaseModule: false,
                subjectOfContractOptions: [
                    {code: '-1', fullName: 'UNDEFINED', shortName: 'Нет'},
                    {code: '0', fullName: 'PRODUCT', shortName: 'Товар'},
                    {code: '1', fullName: 'SERVICE', shortName: 'Услуга'}],
                correctingList: [
                    {code: '-1', fullName: 'UNDEFINED', shortName: 'Нет'},
                    {code: '0', fullName: 'PLUS', shortName: '+'},
                    {code: '1', fullName: 'MINUS', shortName: '-'}],
            }
        },

        methods: {

            goToSpark(urlSpark) {
                let urlToGo = urls.userHistory(urlSpark, this.inn);
                axios.get(urlToGo)
                    .then(function (response) {
                    })
                    .catch(function (e) {
                    });

                let url = urls.goToSparkUrl(this.inn, this.companyName);
                window.open(url, "_blank");
            },

            round(x, n) {
                return Math.round(x * Math.pow(10, n)) / Math.pow(10, n)
            },

            showModal: function () {
                this.$refs.modal.show = true
            },

            setBancruptRisk(risk) {
                this.stopFactors[1].risk = risk;
            },

            showSaveInfo: function () {
                this.$refs.modalSaveInfo.show = true
            },

            getRisk(risk) {
                if (risk === -1) {
                    return "-";
                }
                return risk;
            },

            less10days(val) {
                if (this.isEmpty(val)) {
                    return "Нет";
                }

                let fDays = Math.fround(parseFloat(val.replace(",", ".")));
                let days_10 = Math.fround(parseFloat('10'))

                return fDays < days_10 ? 'Да' : 'Нет'
            },

            closeModal: function () {
                this.$refs.modal.show = false
            },

            closeRatingInfo: function () {
                this.$refs.modalRatingInfo.show = false
            },

            closeSaveInfo: function () {
                this.$refs.modalSaveInfo.show = false
            },

            yesNoRus(yesNo) {
                if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED') || (yesNo === '0') )
                    return '--';
                if (yesNo === 'NO')
                    return 'Нет';
                if (yesNo === 'YES')
                    return 'Да';
                return '--';
            },

            yesNoRecomendation(yesNo) {
                if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED'))
                    return '--';
                if (yesNo === 'NO')
                    return 'Не рекомендовано';
                if (yesNo === 'YES')
                    return 'Рекомендовано';
                return '--';
            },

            loadBusinessData() {
                if (this.$route.params.inn != null) {
                    this.loadCheckListForTaxesByInn(this.$route.params.inn)
                } else {
                    this.clearView();
                }
            },
            clearView() {
                this.responseDataList = null;
            },

            goHome() {
                if (this.$route.fullPath !== paths.home()) {
                    this.$router.push(paths.home());
                }
            },

            loadCheckListForTaxesByInn(inn) {
                let url = urls.checkListCounterpartyByInnUrl(inn);
                this.loadAndShowCheckListCounterpartyByUrl(url, inn);
            },

            loadAndShowCheckListCounterpartyByUrl(url, inn) {
                this.checkListForTaxes = null;
                let component = this;
                axios.get(url)
                    .then(function (response) {
                        //component.checkListForTaxes = response.data.checkListCounterpartyDto.checkListForSales;
                        component.sparkOrganizationInfo = response.data.checkListCounterpartyDto.organizationInfo;
                        component.stopFactors = response.data.checkListCounterpartyDto.financeInfo.stopFactorList;
                        component.finIndicators = response.data.checkListCounterpartyDto.financeInfo.finIndicatorList;
                        component.periodMap = response.data.checkListCounterpartyDto.financeInfo.periodMap;
                        component.riskEvaluation = response.data.checkListCounterpartyDto.financeInfo.riskEvaluation;
                        // component.checkDate = dateUtils.timeStampToDate(component.checkListForTaxes.checkDate);
                    })
                    .catch(function (e) {
                    });
            },

            loadCheckListBySuggestion(suggestion) {
                this.clearInfo();
                if (suggestion.data != null && suggestion.data.inn != null) {
                    let inn = suggestion.data.inn;
                    if (this.$route.params.inn !== inn) {
                        this.$router.push(paths.checkListCounterPartyByInn(inn))
                        this.loadCheckListForTaxesByInn(inn);
                    }
                }
            },

            onSave() {
                let url = urls.postCheckListForTaxesUrl();

                if ((this.checkDate != null) && (this.checkDate !== "")) {
                    this.checkListForTaxes.checkDate = new Date(this.checkDate).getTime();
                } else
                    this.checkListForTaxes.checkDate = new Date().getTime();

                this.checkListForTaxes.inn = this.inn;
                axios.post(url, this.checkListForTaxes)
                    .then((response) => {
                        this.saveInfo = "Чек-лист сохранен в базу данных!";
                        this.showSaveInfo();
                        //console.log(response);
                    })
                    .catch((error) => {
                        this.saveError = "Ошибка сохранения данных! " + error;
                        this.showSaveInfo();
                        //console.log(error);
                    });
            },

            clearInfo() {
                this.saveInfo = "";
                this.saveError = "";
                this.showPurchaseModule = false;
            },

            onButtonSaveClick() {
                // if (this.isEmptyFields) {
                //     this.showModal();
                // } else {
                this.onSave();
                // }
            },

            getIdByDictiName(dictiName) {
                return checkListUtils.getIdByDictiName(this.checkListForTaxes, dictiName)
            },

            getFullNameByDictiName(dictiName) {
                return checkListUtils.getFullNameByDictiName(this.checkListForTaxes, dictiName)
            },

            onButtonSaveClickModal() {
                this.closeModal();
                this.onSave();
            },

            isEmpty(val) {
                if ((val === null) || (val === '') || (val === 'UNDEFINED')) {
                    return 0;
                }
                return false;
            },

            personalCount() {
                return this.checkListForTaxes.personalCount !== 0 ? this.checkListForTaxes.personalCount : 'нет данных';
            },

            onButtonTest() {
                var rating = this.calcRating();
            },

            onButtonPdfClick() {
                this.$refs.toPdf.onPdf();

                // if (this.isEmptyFields) {
                //     this.showModal();
                // } else {
                //     this.onPdf();
                // }
            },

            onButtonPdfClickModal() {
                this.closeModal()
                this.onPdf();
            },

            goPurchaseModule() {
                this.showPurchaseModule = !this.showPurchaseModule;
            },
        },
    }
</script>

<style lang="less">
    @import "../../../css/colors";


    .rating-green {
        background-color: #6cf66c;
    }

    .rating-green-dark {
        background-color: #088d08;
    }

    .rating-red {
        background-color: #f51616;
    }

    .rating-none {
        background-color: #f1f1fd;
    }

    .rating-red-dark {
        background-color: #bd0000;
    }

    .rating-yellow-dark {
        background-color: #f59d06;
    }

    .rating-yellow {
        background-color: #f5e906;
    }

    .recomendation-red {
        background-color: #f51616;
    }

    .recomendation-yellow {
        background-color: #f5e906;
    }

    .recomendation-green {
        background-color: #6cf66c;
    }

    .fix-stop-factors {
        width: 350px;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
        margin: 0;
        padding: 0;
        height: 100vh;
    }

    .comment-info {
        width: 100%;
    }

    .pre-info {
        white-space: pre-wrap;
    }

    .fin-table {
        width: 100%;

        table {
            margin-top: 10px;
        }

        th {
            background: #4b0082; /* Цвет фона */
            color: #fffff0; /* Цвет текста */
        }

        td, th {
            padding: 3px; /* Поля вокруг содержимого ячеек */
            border: 1px groove #ccc
        }
    }

    .table-border-none {
        td, th {
            padding: 10px; /* Поля вокруг содержимого ячеек */
            border: none;
        }
    }

    .drop-down-yes-no {
        margin-top: 5px;
        font-size: 16px;
        font-weight: bold;
    }

    .margin-select-yes-no {
        margin-left: 5px;
        font-size: 16px;
        height: 25px;
    }

    .width-50 {
        width: 50px;
    }

    .page {
        position: relative;
        width: 100%;
        min-height: 100%;
    }

    .clearfix {
        clear: both;
    }

    .font-bold {
        font-weight: bold;
    }

    .font-lighter {
        font-weight: lighter;
    }

    .option {
        width: 220px;
        margin-left: 10px;
    }

    .font-lighter-normal {
        font-weight: lighter;
        font-size: 16px;
    }

    .mdm-select {
        font-size: 16px;
        height: 25px;
    }

    .mdm-text {
        font-size: 16px;
        //  font-weight: normal;
    }

    .font-black-normal {
        font-weight: lighter;
        font-size: 16px;
        margin-top: 10px;
        color: black;
    }

    .margin-top-10 {
        margin-top: 10px;
        font-size: 16px;
    }

    .margin-top-30 {
        margin-top: 30px;
        font-size: 16px;
    }

    .ratingInfoButton {
        margin: auto;
        margin-top: 10px;
        width: 50%;
    }

    .margin-left-5 {
        margin-left: 5px;
        // font-size: 16px;
    }

    .margin-left-35 {
        margin-left: 110px;
        // font-size: 16px;
    }

    .margin-top-10-normal {
        margin-top: 10px;
        font-weight: lighter;
        font-size: 16px;
    }

    .saveInfo {
        text-align: center;
        color: green;
        font-size: 24px;
        padding: 30px;
    }

    .saveError {
        text-align: center;
        color: red;
        font-size: 24px;
        padding: 30px;
    }

    .event-check {
        margin: 20px 30px 60px 30px;
    }

    .border-table {
        margin-top: 10px;
        border-collapse: collapse;
        width: 100%;

        th {
            border: 1px solid black;
            text-align: left;
            color: black;
            vertical-align: middle;
            padding: 5px;
        }

        td {
            border: 1px solid black;
            padding: 5px;
        }
    }

    .icon-info {
        height: 15px;
        margin-right: 10px;
    }

    .ok-info {
        height: 15px;
        margin-left: 10px;
    }

    .stop-info {
        height: 23px;
    }


    .card-header {
        font-weight: bold;
        text-align: center;
        font-size: 32px;
        padding-top: 15px;
        padding-bottom: 5px;

    }

    .inn-search {
        padding: 20px;
        margin-bottom: 20px;
    }

    .check-list {
        margin-left: 50px;
        margin-right: 50px;
        font-size: 16px;
    }

    .relabillity {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 5px;
    }

    .float-left {
        float: left;
    }

    .float-right {
        float: right;
        text-align: right;
    }

    .block-info {
        background-color: #f1f1fd;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 20px 10px 10px;
    }

    .block-info-end {
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 10px 10px 10px;
    }

    .font-color-violet {
        color: #8C00FF;
    }

    .font-color-green {
        color: #009900;
        font-size: 16px;
    }

    .font-color-violet-bold {
        color: #8C00FF;
        text-align: center;
    }

    .font-color-violet-normal-left {
        color: #8C00FF;
        text-align: left;
    }

    .yes {
        color: #ff0000;
    }

    .go-to-spark-href {
        text-align: right;
    }

    .company-header-block {
        margin-top: 10px;

        a {
            color: #C43367;
            cursor: pointer;

            .fa {
                margin-left: 5px;
            }
        }
    }

    .rtk-button-mini {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;

        padding: 4px 20px 4px;
        border-radius: 10px;
        border: 2px solid @baseViolet;
        background-color: #fefefe;
        color: @baseViolet;
        cursor: pointer;
    }

    .no-border {
        td, th {
            padding: 5px 10px; /* Поля вокруг содержимого ячеек */
            border: none;
        }
    }

    .bold-text {
        font-weight: bold;
    }

    .container {
        display: flex;
        justify-content: left;
    }

    .container-right {
        display: flex;
        justify-content: left;
    }

    .container-left {
        display: flex;
        justify-content: left;
    }

</style>