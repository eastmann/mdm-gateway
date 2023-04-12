<template>
    <div class="page">
        <div class="margin-left-5 check-list">
            <CheckListFinanceToPdf ref="toPdf" v-if="checkListFinance"
                                   :check-list-finance="checkListFinance"
                                   :spark-organization-info="sparkOrganizationInfo"
                                   :fin-indicators="finIndicators"
                                   :stop-factors="stopFactors"/>

            <div class="rtk-button-port" v-if="checkListFinance" v-on:click="onButtonPdfClick()">Печать в PDF</div>

            <div class="rtk-button-port" v-if="checkListFinance" v-on:click="onButtonSaveClick()">Сохранить</div>
            <div class="rtk-button-port" v-if="checkListFinance" v-on:click="goHome">Отмена</div>

        </div>

        <div class="check-list">

            <div class="card-header">
                Финансовая оценка контрагента
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
                        <div v-if="checkListFinance.checkDate === null">
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

            <div class="relabillity" v-if="checkListFinance">
                ЧЕК-ЛИСТ ФИНАНСОВЫХ ПОКАЗАТЕЛЕЙ
            </div>
            <BlockInfo caption="ДАННЫЕ КОМПАНИИ" v-if="checkListFinance">
                <table class="table-border-none">
                    <tr>
                        <td>
                            <TextField caption="Наименование:" :value="companyName"/>
                            <TextField caption="ИНН:" v-model="inn"/>
<!--                            <TextField caption="Статус организации:" :value="checkListFinance.companyStatusCode"/>-->
                            <TextField caption="Дата регистрации:"
                                       :value="new Date(checkListFinance.dateReg).toLocaleDateString() "/>
                            <TextField caption="Срок деятельности:" :value="getExictingCompany"/>
                            <!--                            <DropDownYesNo caption="Основной вид деятельности оказание услуг:"-->
                            <!--                                           v-model="checkListFinance.mainCompanyActivityIsServices"/>-->
                        </td>
                        <td>
                            <!--                            <TextEdit type="number" caption="Сумма договора без НДС, тыс. руб." v-model="sumContract"/>-->

                            <TextField caption="ОГРН:" v-model="ogrn"/>
                            <!--                            <TextField caption="Банкротство:" :value="(checkListFinance.bankruptInfo===1) ? 'Банкротство' : 'Отсутствует'"/>-->
<!--                            <div class="drop-down-yes-no">-->
<!--                                Банкротство:-->
<!--                                <select class="margin-select-yes-no" v-model="banckuptInfo">-->
<!--                                    <option>-</option>-->
<!--                                    <option>Конкурсное производство</option>-->
<!--                                    <option>Процедура наблюдения</option>-->
<!--                                    <option>Финансовое оздоровление</option>-->
<!--                                    <option>Подано заявление в Арбитражный суд</option>-->
<!--                                    <option>Заявление о намерении обратиться в суд</option>-->
<!--                                </select>-->
<!--                            </div>-->

                            <TextField caption="Сумма активных арбитражных дел, тыс. руб.:"
                                       :value="checkListFinance.arbitrationSummarySum"/>
                            <TextField caption="Сумма активных исполнительных производств, тыс. руб.:"
                                       :value="checkListFinance.executionProceedingsSum"/>
                            <TextField caption="Численность персонала:" :value="personalCount()"/>
                        </td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="РАСЧЕТ ФИНАНСОВЫХ ПОКАЗАТЕЛЕЙ" v-if="checkListFinance">
                <table class="fin-table">
                    <!--                    {{new Date().getFullYear() - 3}}-->
                    <tr>
                        <th>Показатель</th>
                        <th>ед. изм</th>
                        <th>2020 год</th>
                        <th>2021 год</th>
                        <th>Рейтинг</th>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[0].name}}</td>
                        <td> {{caption=finIndicators[0].measure}}</td>
                        <td> {{caption=finIndicators[0].lastValue}}</td>
                        <td> {{caption=finIndicators[0].newValue}}</td>
                        <td> {{caption=finIndicators[0].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[1].name}}</td>
                        <td> {{caption=finIndicators[1].measure}}</td>
                        <td> {{caption=finIndicators[1].lastValue}}</td>
                        <td> {{caption=finIndicators[1].newValue}}</td>
                        <td> {{caption=finIndicators[1].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[2].name}}</td>
                        <td> {{caption=finIndicators[2].measure}}</td>
                        <td> {{caption=finIndicators[2].lastValue}}</td>
                        <td> {{caption=finIndicators[2].newValue}}</td>
                        <td> {{caption=finIndicators[2].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[3].name}}</td>
                        <td> {{caption=finIndicators[3].measure}}</td>
                        <td> {{caption=finIndicators[3].lastValue}}</td>
                        <td> {{caption=finIndicators[3].newValue}}</td>
                        <td> {{caption=finIndicators[3].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[4].name}}</td>
                        <td> {{caption=finIndicators[4].measure}}</td>
                        <td> {{caption=finIndicators[4].lastValue}}</td>
                        <td> {{caption=finIndicators[4].newValue}}</td>
                        <td> {{caption=finIndicators[4].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[5].name}}</td>
                        <td> {{caption=finIndicators[5].measure}}</td>
                        <td> {{caption=finIndicators[5].lastValue}}</td>
                        <td> {{caption=finIndicators[5].newValue}}</td>
                        <td> {{caption=finIndicators[5].rating}}</td>
                    </tr>
                    <tr>
                        <td> {{caption=finIndicators[6].name}}</td>
                        <td> {{caption=finIndicators[6].measure}}</td>
                        <td> {{caption=finIndicators[6].lastValue}}</td>
                        <td> {{caption=finIndicators[6].newValue}}</td>
                        <td> {{caption=finIndicators[6].rating}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="СТОП-ФАКТОРЫ" v-if="checkListFinance">
                При выявлении стоп факторов Оценка ставится не выше, чем указанная в описании
                <table class="fin-table">
                    <tr>
                        <th>Стоп-фактор</th>
                        <th>Значение</th>
                        <th>Риск</th>
                    </tr>
                    <tr>
                        <td> {{stopFactors[0].name}}</td>
                        <td> {{stopFactors[0].value}}</td>
                        <td> {{getRisk(stopFactors[0].risk)}}</td>
                    </tr>
<!--                    <tr>-->
<!--                        <td> {{stopFactors[1].name}}</td>-->
<!--                        <td class="fix-stop-factors">-->
<!--                            {{ banckuptInfo }}-->
<!--                        </td>-->
<!--                        <td> {{getRisk(calcBanckuptInfo)}}</td>-->
<!--                    </tr>-->
                    <tr>
                        <td> {{stopFactors[2].name}}</td>
                        <td> {{stopFactors[2].value}}</td>
                        <td> {{getRisk(stopFactors[2].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[3].name}}</td>
                        <td> {{stopFactors[3].value}}</td>
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
                        <td> {{stopFactors[6].value}}</td>
                        <td> {{getRisk(stopFactors[6].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[7].name}}</td>
                        <td> {{stopFactors[7].value}}</td>
                        <td> {{getRisk(stopFactors[7].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[8].name}}</td>
                        <td> {{stopFactors[8].value}}</td>
                        <td> {{getRisk(stopFactors[8].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[9].name}}</td>
                        <td> {{stopFactors[9].value}}</td>
                        <td> {{getRisk(stopFactors[9].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[10].name}}</td>
                        <td> {{stopFactors[10].value}}</td>
                        <td> {{getRisk(stopFactors[10].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[11].name}}</td>
                        <td> {{stopFactors[11].value !== '0' ? stopFactors[11].value : '-'}}</td>
                        <td> {{getRisk(stopFactors[11].risk)}}</td>
                    </tr>
                    <tr>
                        <td> {{stopFactors[12].name}}</td>
                        <td> {{stopFactors[12].value !== '0' ? stopFactors[12].value : '-'}}</td>
                        <td> {{getRisk(stopFactors[12].risk)}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ИТОГИ ПО РАСЧЕТАМ" v-if="checkListFinance">
                <table class="fin-table">
                    <tr>
                        <th>Показатель</th>
                        <th>Значение</th>
                    </tr>
                    <!--                    <tr>-->
                    <!--                        <td> Расчетная оценка </td>-->
                    <!--                        <td :class="cssRating"> {{round(calcRatingForIndicators, 4)}} </td>-->
                    <!--                    </tr >-->
                    <tr>
                        <td> Расчетный уровень риска</td>
                        <td :class="cssLevelRisk"> {{round(calcLevelRisk, 2)}}</td>
                    </tr>
                    <!--                    <tr>-->
                    <!--                        <td> Расчетный уровень с учетом стоп-факторов </td>-->
                    <!--                        <td :class="cssLevelRiskWithStopFactors"> {{round(calcLevelRiskWithStopFactors, 2)}} </td>-->
                    <!--                    </tr>-->
                    <!--                    <tr>-->
                    <!--                        <td> Изменение уровня риска по мнению аналитика </td>-->
                    <!--                        <td>-->
                    <!--                            <div class="drop-down-yes-no">-->
                    <!--                            <select class="margin-select-yes-no" v-model="analistOpinion">-->
                    <!--                                <option>Нет</option>-->
                    <!--                                <option>-</option>-->
                    <!--                                <option>+</option>-->
                    <!--                            </select>-->
                    <!--                            </div>-->
                    <!--                        </td>-->
                    <!--                    </tr>-->
                    <tr>
                        <td> Итоговый уровень риска с учетом стоп-факторов</td>
                        <td :class="cssResultRisk"> {{round(calcResultRisk, 0)}}</td>
                    </tr>
                </table>
            </BlockInfo>

            <BlockInfo caption="ИНФОРМАЦИЯ" v-if="checkListFinance">

                <div class="company-header-block">
                    <a class="go-to-spark-href"
                       v-on:click="goToSpark('http://dd.rt.ru/mdm/ExtendedReport','Бухгалтерский баланс и фин. отчетность')">Бухгалтерский
                        баланс и фин. отчетность <i class="fa fa-arrow-right"></i> </a>
                </div>

                <div class="margin-top-10">
                    <p>Комментарий:</p>
                    <textarea class="comment-info" v-model="checkListFinance.comment"></textarea>
                </div>

                <TextEdit v-model="checkListFinance.userFio" caption="ФИО сотрудника:" placeholder="" size="60px"/>

                Дата: <input class="margin-top-10" v-model="checkDate" type="date">

                <div class="margin-top-10">
                <div class="rtk-button-port " v-if="checkListFinance" v-on:click="goPurchaseModule">{{showPurchaseModule ?
                    'Скрыть модуль по закупкам' : 'Показать модуль по закупкам'}}
                </div>
                </div>
            </BlockInfo>



            <BlockInfo caption="МОДУЛЬ ПО ЗАКУПКАМ" v-if="checkListFinance && showPurchaseModule">
                <TextEdit type="number" caption="Сумма договора с НДС, тыс. руб." v-model="purchasingModule.sumContract"
                          v-on:focusout="calcAllPurchase"/>
                <TextEdit type="number" caption="Сумма аванса с НДС, тыс. руб." v-model="purchasingModule.sumPrepayment"
                          v-on:focusout="calcAllPurchase"/>
                <DropDown caption="Предмет договора" v-model="purchasingModule.subjectOfContract"
                          v-on:change="calcAllPurchase" :no-image="true"
                          :options="subjectOfContractOptions"/>

                <table class="fin-table margin-top-10">
                    <tr>
                        <th>Параметр</th>
                        <th>Значение</th>
                    </tr>
                    <tr>
                        <td> Сумма аванса превышает собственный капитал</td>
                        <td> {{yesNoRus(purchasingModule.prepaymentMoreCapital)}}</td>
                    </tr>
                    <tr>
                        <td> Сумма аванса превышает выручку за месяц</td>
                        <td> {{yesNoRus(purchasingModule.prepaymentMoreMonthProfit)}}</td>
                    </tr>
                    <tr>
                        <td> Сумма договора превышает половину выручки за последний завершенный год</td>
                        <td> {{yesNoRus(purchasingModule.contractMoreHalfProfit)}}</td>
                    </tr>
                    <tr>
                        <td> Период оборачиваемости запасов менее 10 дней (кроме услуг)</td>
                        <td> {{yesNoRus(purchasingModule.turnoverLess10days)}}</td>
                    </tr>
                    <tr>
                        <td> Коэффициент текущей ликвидности менее 0,9</td>
                        <td> {{yesNoRus(purchasingModule.liquidityRatio)}}</td>
                    </tr>
                </table>

<!--                <div class="font-color-violet margin-top-10">-->
<!--&lt;!&ndash;                    <img src="@/assets/img/check_list/info.png" class="icon-info">&ndash;&gt;-->
<!--                    ИТОГИ ПО РАСЧЕТАМ-->
<!--                </div>-->

                <table class="no-border margin-top-10">
                    <tr>
                        <td>
                            <div class="bold-text">
                                Рекомендации по заключению договора
                            </div>
                        </td>
                        <td :class="cssContractRecomended"> {{yesNoRecomendation(purchasingModule.contractRecomended)}}</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="bold-text">
                                Рекомендации по выплате авансовых платежей
                            </div>
                        </td>
                        <td :class="cssPrePaymentRecomended"> {{yesNoRecomendation(purchasingModule.prePaymentRecomended)}}</td>
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
    import TextEdit from "@/components/checkList/TextEdit";
    import CheckListFinanceToPdf from "./components/CheckListFinanceToPdf";
    import BlockInfo from "@/components/checkList/BlockInfo";
    import DropDown from "@/components/checkList/DropDown";

    import purchase from "@/js/utils/checkLists/checkListFinance/purchaseModule";

    export default {
        name: "CheckListFinancePage",
        components: {
            DropDown,
            BusinessSearchBox,
            ModalWindow,
            TextField,
            TextEdit,
            CheckListFinanceToPdf,
            BlockInfo,
            // DropDownYesNo,
        },
        mounted() {
            this.loadBusinessData();
        },
        home() {
            return '/'
        },
        computed: {
            // calcBanckuptInfo() {
            //     let risk = -1;
            //     if (this.banckuptInfo === 'Конкурсное производство') {
            //         risk = 0;
            //     }
            //     if (this.banckuptInfo === 'Процедура наблюдения') {
            //         risk = 1;
            //     }
            //     if (this.banckuptInfo === 'Финансовое оздоровление') {
            //         risk = 1;
            //     }
            //     if (this.banckuptInfo === 'Подано заявление в Арбитражный суд') {
            //         risk = 1;
            //     }
            //     if (this.banckuptInfo === 'Заявление о намерении обратиться в суд') {
            //         risk = 1;
            //     }
            //     this.setBancruptRisk(risk);
            //     return risk;
            // },

            // calcTurnoverStock() {
            //     let risk = -1;
            //     //if (this.checkListFinance.mainCompanyActivityIsServices === 'YES'){
            //     this.setTurnoverStockEmpty();
            //     // } else {
            //     //     this.restoreTurnoverStockEmpty();
            //     //     risk = this.turnoverStock;
            //     // }
            //     return risk;
            // },

            cssRating: function () {
                return {
                    active: true,
                    'rating-red-dark': this.calcRatingForIndicators <= 0,
                    'rating-red': this.calcRatingForIndicators > 0 && this.calcRatingForIndicators <= 1,
                    'rating-yellow-dark': this.calcRatingForIndicators > 1 && this.calcRatingForIndicators <= 2,
                    'rating-yellow': this.calcRatingForIndicators > 2 && this.calcRatingForIndicators <= 3,
                    'rating-green': this.calcRatingForIndicators > 3 && this.calcRatingForIndicators <= 4,
                    'rating-green-dark': this.calcRatingForIndicators > 4
                }
            },
            cssLevelRisk: function () {
                return {
                    active: true,
                    'rating-red-dark': this.calcLevelRisk <= 0,
                    'rating-red': this.calcLevelRisk > 0 && this.calcLevelRisk <= 1,
                    'rating-yellow-dark': this.calcLevelRisk > 1 && this.calcLevelRisk <= 2,
                    'rating-yellow': this.calcLevelRisk > 2 && this.calcLevelRisk <= 3,
                    'rating-green': this.calcLevelRisk > 3 && this.calcLevelRisk <= 4,
                    'rating-green-dark': this.calcLevelRisk > 4
                }
            },

            cssLevelRiskWithStopFactors: function () {
                return {
                    active: true,
                    'rating-red-dark': this.calcLevelRiskWithStopFactors <= 0,
                    'rating-red': this.calcLevelRiskWithStopFactors > 0 && this.calcLevelRiskWithStopFactors <= 1,
                    'rating-yellow-dark': this.calcLevelRiskWithStopFactors > 1 && this.calcLevelRiskWithStopFactors <= 2,
                    'rating-yellow': this.calcLevelRiskWithStopFactors > 2 && this.calcLevelRiskWithStopFactors <= 3,
                    'rating-green': this.calcLevelRiskWithStopFactors > 3 && this.calcLevelRiskWithStopFactors <= 4,
                    'rating-green-dark': this.calcLevelRiskWithStopFactors > 4
                }
            },

            cssResultRisk: function () {
                return {
                    active: true,
                    'rating-red-dark': this.calcResultRisk <= 0,
                    'rating-red': this.calcResultRisk > 0 && this.calcResultRisk <= 1,
                    'rating-yellow-dark': this.calcResultRisk > 1 && this.calcResultRisk <= 2,
                    'rating-yellow': this.calcResultRisk > 2 && this.calcResultRisk <= 3,
                    'rating-green': this.calcResultRisk > 3 && this.calcResultRisk <= 4,
                    'rating-green-dark': this.calcResultRisk > 4
                }
            },

            getExictingCompany() {
                if (old === null) {
                    return '';
                }
                var current = new Date(); // сегодня
                var old = new Date(this.checkListFinance.dateReg); // !!! год-месяц-день !!!

                // сначала находим количество дней между датами
                var days = Math.ceil(Math.abs(old.getTime() - current.getTime()) / (1000 * 3600 * 24));
                var year = Math.floor(days / 365); // вычисляем кол-во лет. Math.floor убирает остаток.
                var months = Math.floor((days - (year * 365)) / 30); // отняв года, вычисляем месяцы
                return year + ' лет, ' + months + ' месяцев';
            },

            companyName() {
                return organization.companyName(this.sparkOrganizationInfo);
            },
            companyFullName() {
                return organization.companyFullName(this.sparkOrganizationInfo);
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
            calcRatingForIndicators() {
                // if (this.checkListFinance.mainCompanyActivityIsServices === null){
                //     return 0;
                // }
                let isMain = true;//this.yesNoRus(this.checkListFinance.mainCompanyActivityIsServices) === 'Да';
                let cRating = 0;
                for (let index in this.finIndicators) {
                    let weight = isMain ? this.finIndicators[index].coeffIsMain : this.finIndicators[index].coeffNoMain
                    cRating = cRating + this.finIndicators[index].rating * weight;
                }
                return cRating;
            },

            calcLevelRisk() {
                let ratingForIndicators = this.calcRatingForIndicators;
                if (ratingForIndicators === null) {
                    return 0;
                }
                if (ratingForIndicators < 0.5) {
                    return 0;
                }
                if ((ratingForIndicators >= 0.5) && (ratingForIndicators < 1.5)) {
                    return 1;
                }
                if ((ratingForIndicators >= 1.5) && (ratingForIndicators < 2.5)) {
                    return 2;
                }
                if ((ratingForIndicators >= 2.5) && (ratingForIndicators < 3.5)) {
                    return 3;
                }
                if ((ratingForIndicators >= 3.5) && (ratingForIndicators < 4.5)) {
                    return 4;
                }
                if (ratingForIndicators >= 4.5) {
                    return 5;
                }
                return 0;
            },
            // calcLevelRisk(){
            //    let ratingForIndicators = this.calcRatingForIndicators;
            //    if (ratingForIndicators === null){
            //        return 0;
            //    }
            //    if (ratingForIndicators < 1){
            //        return 0.5;
            //    }
            //     if ((ratingForIndicators >= 1) && (ratingForIndicators < 2)){
            //         return 1.5;
            //     }
            //     if ((ratingForIndicators >= 2) && (ratingForIndicators < 3)){
            //         return 2.5;
            //     }
            //     if ((ratingForIndicators >= 3) && (ratingForIndicators < 4)){
            //         return 3.5;
            //     }
            //     if (ratingForIndicators > 4){
            //         return 4.5;
            //     }
            //     return 0;
            // },

            calcLevelRiskWithStopFactors() {
                if (this.stopFactors === null) {
                    return 0;
                }
                let ratingForIndicators = this.calcRatingForIndicators;
                let levelRisk = this.calcLevelRisk;

                let minStopFactorRisk = 5;
                for (let index in this.stopFactors) {
                    if ((this.stopFactors[index].risk !== -1) && (this.stopFactors[index].risk < minStopFactorRisk)) {
                        minStopFactorRisk = this.stopFactors[index].risk;
                    }
                }
                return Math.min(ratingForIndicators, levelRisk, minStopFactorRisk);
            },

            calcResultRisk() {
                let levelRiskWithStopFactors = this.calcLevelRiskWithStopFactors;
                if (this.analistOpinion === "+") {
                    levelRiskWithStopFactors++;
                } else if (this.analistOpinion === "-") {
                    levelRiskWithStopFactors--;
                }
                return levelRiskWithStopFactors;
            },

            cssContractRecomended: function () {
                return {
                    active: true,
                    'rating-green': this.purchasingModule.contractRecomended === 'YES',
                    'rating-red': this.purchasingModule.contractRecomended === 'NO',
                    'rating-none': this.purchasingModule.contractRecomended === 'UNDEFINED',
                }
            },

            cssPrePaymentRecomended: function () {
                return {
                    active: true,
                    'rating-green': this.purchasingModule.prePaymentRecomended === 'YES',
                    'rating-red': this.purchasingModule.prePaymentRecomended === 'NO',
                    'rating-none': this.purchasingModule.prePaymentRecomended === 'UNDEFINED',
                }
            },

        },
        data() {
            return {
                checkListFinance: "",
                sparkOrganizationInfo: "",
                stopFactors: null,
                finIndicators: null,
                purchasingModule: null,
                saveInfo: "",
                saveError: "",
                checkDate: "",
                calcRating: 0,
                riskWithFactors: 0,
                analistOpinion: "Нет",
                resultRisk: 0,
                turnoverStock: -1,
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

            setTurnoverStockEmpty() {
                //this.stopFactors[8].risk = -1;
            },

            restoreTurnoverStockEmpty() {
                this.stopFactors[8].risk = this.turnoverStock;
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
                if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED'))
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
                    this.loadCheckListFinanceByInn(this.$route.params.inn)
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

            loadCheckListFinanceByInn(inn) {
                let url = urls.checkListFinanceByInnUrl(inn);
                this.loadAndShowCheckListFinanceByUrl(url, inn);
            },

            loadAndShowCheckListFinanceByUrl(url, inn) {
                this.checkListFinance = null;
                let component = this;
                axios.get(url)
                    .then(function (response) {
                        component.checkListFinance = response.data.checkListFinanceDto.checkListFinance;
                        component.sparkOrganizationInfo = response.data.checkListFinanceDto.organizationInfo;
                        component.stopFactors = response.data.checkListFinanceDto.financeInfo.stopFactors;
                        component.turnoverStock = -1;//component.stopFactors[8].risk;
                        component.finIndicators = response.data.checkListFinanceDto.financeInfo.finIndicators;
                        component.purchasingModule = response.data.checkListFinanceDto.financeInfo.purchasingModule;
                        component.checkDate = dateUtils.timeStampToDate(component.checkListFinance.checkDate);
                    })
                    .catch(function (e) {
                    });
            },

            loadCheckListBySuggestion(suggestion) {
                this.clearInfo();
                if (suggestion.data != null && suggestion.data.inn != null) {
                    let inn = suggestion.data.inn;
                    if (this.$route.params.inn !== inn) {
                        this.$router.push(paths.checkListFinanceByInn(inn))
                        this.loadCheckListFinanceByInn(inn);
                    }
                }
            },

            onSave() {
                let url = urls.postCheckListFinanceUrl();

                if ((this.checkDate != null) && (this.checkDate !== "")) {
                    this.checkListFinance.checkDate = new Date(this.checkDate).getTime();
                } else
                    this.checkListFinance.checkDate = new Date().getTime();

                this.checkListFinance.inn = this.inn;
                axios.post(url, this.checkListFinance)
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
                return this.checkListFinance.personalCount !== 0 ? this.checkListFinance.personalCount : 'нет данных';
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

            calcAllPurchase() {
                purchase.calcAllPurchase(this.purchasingModule, this.round(this.calcResultRisk, 0))
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

    .no-border{
        td, th {
            padding: 5px 10px; /* Поля вокруг содержимого ячеек */
            border: none;
        }
    }

    .bold-text{
        font-weight: bold;
    }
</style>