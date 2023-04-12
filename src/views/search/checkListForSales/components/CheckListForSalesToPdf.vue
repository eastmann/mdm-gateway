<template>
    <div>
        <vue-html2pdf
                :show-layout="false"
                :float-layout="true"
                :enable-download="true"
                :preview-modal="true"
                :paginate-elements-by-height="1400"
                :filename="'checkList-' + inn"
                :pdf-quality="2"
                :manual-pagination="false"
                pdf-format="a4"
                pdf-orientation="portrait"
                pdf-content-width="98%"
                ref="html2Pdf"
        >
            <section slot="pdf-content">
                <section class="pdf-item">

                    <div class="relabillity" v-if="checkListForSales">
                        Проверка контрагентов для сотрудников продаж
                    </div>

                    <BlockInfo caption="ДАННЫЕ КОМПАНИИ" v-if="checkListForSales">
                        <table class="table-border-none">
                            <tr>
                                <td>
                                    <TextField caption="Наименование:" :value="companyName"/>
                                    <TextField caption="Наименование полное:" :value="companyFullName"/>
                                    <TextField caption="Адрес:" :value="companyAddress"/>
                                    <TextField caption="ИНН:" v-model="inn"/>
<!--                                    <TextField caption="Статус организации:"-->
<!--                                               :value="checkListForSales.companyStatusCode"/>-->
                                    <TextField caption="Дата регистрации:"
                                               :value="new Date(checkListForSales.dateReg).toLocaleDateString() "/>
                                    <TextField caption="Срок деятельности:" :value="getExictingCompany"/>
<!--                                    <DropDownYesNo caption="Основной вид деятельности оказание услуг:"-->
<!--                                                   v-model="checkListForSales.mainCompanyActivityIsServices"/>-->
                                </td>
                                <td>
<!--                                    <TextEdit caption="Сумма договора без НДС, тыс. руб."-->
<!--                                              :value="this.$parent.sumContract"/>-->
                                    <TextField caption="Отрасль:" :value="checkListForSales.industry"/>
                                    <TextField caption="ОГРН:" v-model="ogrn"/>
                                    <!--                            <TextField caption="Банкротство:" :value="(checkListForSales.bankruptInfo===1) ? 'Банкротство' : 'Отсутствует'"/>-->

<!--                                    Банкротство: {{ this.$parent.banckuptInfo }}-->

                                    <TextField caption="Сумма активных арбитражных дел, тыс. руб.:"
                                               :value="checkListForSales.arbitrationSummarySum"/>
                                    <TextField caption="Сумма активных исполнительных производств, тыс. руб.:"
                                               :value="checkListForSales.executionProceedingsSum"/>
                                    <TextField caption="Численность персонала:"
                                               :value="this.$parent.personalCount()"/>
                                    <TextField caption="Статус:" :value="companyStatus"/>
                                </td>
                            </tr>
                        </table>
                    </BlockInfo>

                    <BlockInfo caption="ОЦЕНКА КОМПАНИИ КЛИЕНТА"
                               v-if="checkListForSales && checkListForSales.checkListParam">

                        <DropDownTableRow v-bind:editable="false" v-bind:caption="this.$parent.getFullNameByDictiName('COMPANY_LIQUIDATED')"
                                          factor="STOP"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('COMPANY_LIQUIDATED')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="this.$parent.getFullNameByDictiName('CHL_PAR_BANKRUPT_INFO')"
                                          factor="NONE"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('CHL_PAR_BANKRUPT_INFO')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="this.$parent.getFullNameByDictiName('SIX_MONTH_LESS_BUSIN')"
                                          factor="NONE"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('SIX_MONTH_LESS_BUSIN')].checked"/>

                        <DropDownTableRow v-bind:editable="false" v-bind:caption="this.$parent.getFullNameByDictiName('CHL_PAR_TAX_ARREARS')"
                                          factor="INFO"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('CHL_PAR_TAX_ARREARS')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="this.$parent.getFullNameByDictiName('CHL_PAR_ACCOUNT_FROZEN')"
                                          factor="INFO"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('CHL_PAR_ACCOUNT_FROZEN')].checked"/>

                        <DropDownTableRow v-bind:editable="false" v-bind:caption="this.$parent.getFullNameByDictiName('CHIEF_DISQUALIFIED')"
                                          factor="INFO"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('CHIEF_DISQUALIFIED')].checked"/>

                        <DropDownTableRow v-bind:editable="false" v-bind:caption="this.$parent.getFullNameByDictiName('WRONG_COMPANY_INFO')"
                                          factor="INFO"
                                          v-model="checkListForSales.checkListParam[this.$parent.getIdByDictiName('WRONG_COMPANY_INFO')].checked"/>
                    </BlockInfo>

                    <BlockInfo caption="РАСЧЕТ ФИНАНСОВЫХ ПОКАЗАТЕЛЕЙ" v-if="checkListForSales">
                        <table class="fin-table">
                            <tr>
                                <th>Показатель</th>
                                <th>ед. изм</th>
                                <th>{{new Date().getFullYear() - 2}} год</th>
                                <th>{{new Date().getFullYear() - 1}} год</th>
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

                </section>

                <div class="html2pdf__page-break"/>

                <section class="pdf-item">
                    <BlockInfo caption="СТОП-ФАКТОРЫ" v-if="checkListForSales">
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
                                <td> {{this.$parent.getRisk(stopFactors[0].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[1].name}}</td>
                                <td> {{stopFactors[1].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[1].risk)}}</td>
                            </tr>
<!--                            <tr>-->
<!--                                <td> {{stopFactors[1].name}}</td>-->
<!--                                <td class="fix-stop-factors">-->
<!--                                    {{ this.$parent.banckuptInfo }}-->
<!--                                </td>-->
<!--                                <td> {{this.$parent.getRisk(this.$parent.calcBanckuptInfo)}}</td>-->
<!--                            </tr>-->
                            <tr>
                                <td> {{stopFactors[2].name}}</td>
                                <td> {{stopFactors[2].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[2].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[3].name}}</td>
                                <td> {{stopFactors[3].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[3].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[4].name}}</td>
                                <td> {{stopFactors[4].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[4].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[5].name}}</td>
                                <td> {{stopFactors[5].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[5].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[6].name}}</td>
                                <td> {{stopFactors[6].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[6].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[7].name}}</td>
                                <td> {{this.$parent.less10days(stopFactors[7].value)}} </td>
                                <td> {{this.$parent.getRisk(this.$parent.calcTurnoverStock)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[8].name}}</td>
                                <td> {{stopFactors[8].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[8].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[9].name}}</td>
                                <td> {{stopFactors[9].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[9].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[10].name}}</td>
                                <td> {{stopFactors[10].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[10].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[11].name}}</td>
                                <td> {{stopFactors[11].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[11].risk)}}</td>
                            </tr>
<!--                            <tr>-->
<!--                                <td> {{stopFactors[11].name}}</td>-->
<!--                                <td> {{stopFactors[11].value !== '0' ? stopFactors[11].value : '-'}}</td>-->
<!--                                <td> {{this.$parent.getRisk(stopFactors[11].risk)}}</td>-->
<!--                            </tr>-->
                        </table>
                    </BlockInfo>

                    <BlockInfo caption="ИТОГИ ПО РАСЧЕТАМ" v-if="checkListForSales">
                    <table class="fin-table">
                        <tr>
                            <th>Показатель</th>
                            <th>Значение</th>
                        </tr>
<!--                        <tr>-->
<!--                            <td> Расчетная оценка</td>-->
<!--                            <td :class="this.$parent.cssRating">-->
<!--                                {{this.$parent.round(this.$parent.calcRatingForIndicators, 4)}}-->
<!--                            </td>-->
<!--                        </tr>-->
                        <tr>
                            <td> Расчетный уровень риска</td>
                            <td :class="this.$parent.cssLevelRisk"> {{this.$parent.round(this.$parent.calcLevelRisk, 2)}}
                            </td>
                        </tr>
<!--                        <tr>-->
<!--                            <td> Расчетный уровень с учетом стоп-факторов</td>-->
<!--                            <td :class="this.$parent.cssLevelRiskWithStopFactors">-->
<!--                                {{this.$parent.round(this.$parent.calcLevelRiskWithStopFactors, 2)}}-->
<!--                            </td>-->
<!--                        </tr>-->
<!--                        <tr>-->
<!--                            <td> Изменение уровня риска по мнению аналитика</td>-->
<!--                            <td>-->
<!--                                <div class="this.$parent.drop-down-yes-no">-->
<!--                                    <select class="margin-select-yes-no" v-model="this.$parent.analistOpinion">-->
<!--                                        <option>Нет</option>-->
<!--                                        <option>-</option>-->
<!--                                        <option>+</option>-->
<!--                                    </select>-->
<!--                                </div>-->
<!--                            </td>-->
<!--                        </tr>-->
                        <tr>
                            <td> Итоговый уровень риска с учетом стоп-факторов</td>
                            <td :class="this.$parent.cssResultRisk"> {{this.$parent.round(this.$parent.calcResultRisk, 0)}}
                            </td>
                        </tr>
                    </table>
                </BlockInfo>

                    <BlockInfo caption="ИНФОРМАЦИЯ" v-if="checkListForSales">
                    <div class="margin-top-10">
                        <p>Комментарий:</p>
                        <pre class="pre-info">{{checkListForSales.comment}}</pre>
                    </div>

                    <TextEdit :value="checkListForSales.userFio" caption="ФИО сотрудника:" placeholder="" size="60px"/>

                    Дата: <input class="margin-top-10" :value="this.$parent.checkDate" type="date">
                </BlockInfo>
                </section>
                <div class="html2pdf__page-break"/>
                <section class="pdf-item">
                    <BlockInfo caption="МОДУЛЬ ПО ЗАКУПКАМ" v-if="checkListForSales && this.$parent.showPurchaseModule">

                    <TextEdit type="number" caption="Сумма договора с НДС, тыс. руб." v-model="this.$parent.purchasingModule.sumContract"
                              v-on:focusout="this.$parent.calcAllPurchase"/>
                    <TextEdit type="number" caption="Сумма аванса с НДС, тыс. руб." v-model="this.$parent.purchasingModule.sumPrepayment"
                              v-on:focusout="this.$parent.calcAllPurchase"/>
                    <DropDown caption="Предмет договора" v-model="this.$parent.purchasingModule.subjectOfContract"
                              v-on:change="this.$parent.calcAllPurchase"
                              :options="this.$parent.subjectOfContractOptions"
                              :no-image="true"/>

                    <table class="fin-table margin-top-10">
                        <tr>
                            <th>Параметр</th>
                            <th>Значение</th>
                        </tr>
                        <tr>
                            <td> Сумма аванса превышает собственный капитал</td>
                            <td> {{this.$parent.yesNoRus(this.$parent.purchasingModule.prepaymentMoreCapital)}}</td>
                        </tr>
                        <tr>
                            <td> Сумма аванса превышает выручку за месяц</td>
                            <td> {{this.$parent.yesNoRus(this.$parent.purchasingModule.prepaymentMoreMonthProfit)}}</td>
                        </tr>
                        <tr>
                            <td> Сумма договора превышает половину выручки за последний завершенный год</td>
                            <td> {{this.$parent.yesNoRus(this.$parent.purchasingModule.contractMoreHalfProfit)}}</td>
                        </tr>
                        <tr>
                            <td> Период оборачиваемости запасов менее 10 дней (кроме услуг)</td>
                            <td> {{this.$parent.yesNoRus(this.$parent.purchasingModule.turnoverLess10days)}}</td>
                        </tr>
                        <tr>
                            <td> Коэффициент текущей ликвидности менее 0,9</td>
                            <td> {{this.$parent.yesNoRus(this.$parent.purchasingModule.liquidityRatio)}}</td>
                        </tr>
                    </table>

<!--                    <div class="font-color-violet margin-top-10">-->
<!--                        &lt;!&ndash;                    <img src="@/assets/img/check_list/info.png" class="icon-info">&ndash;&gt;-->
<!--                        ИТОГИ ПО РАСЧЕТАМ-->
<!--                    </div>-->

                    <table class="no-border">
                        <tr>
                            <td>
                                <div class="bold-text">
                                    Рекомендации по заключению договора
                                </div>
                            </td>
                            <td :class="this.$parent.cssContractRecomended"> {{this.$parent.yesNoRecomendation(this.$parent.purchasingModule.contractRecomended)}}</td>
                        </tr>
                        <tr>
                            <td>
                                <div class="bold-text">
                                    Рекомендации по выплате авансовых платежей
                                </div>
                            </td>
                            <td :class="this.$parent.cssPrePaymentRecomended"> {{this.$parent.yesNoRecomendation(this.$parent.purchasingModule.prePaymentRecomended)}}</td>
                        </tr>
                    </table>
                </BlockInfo>
                </section>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
    import VueHtml2pdf from "vue-html2pdf";
    import TextField from "@/components/checkList/TextField";
    import TextEdit from "@/components/checkList/TextEdit";
    import BlockInfo from "@/components/checkList/BlockInfo";
    // import DropDownYesNo from "@/components/checkList/DropDownYesNo";
    import organization from "@/js/utils/organization";
    import DropDown from "@/components/checkList/DropDown";
    import DropDownTableRow from "@/components/checkList/DropDownTableRow";


    export default {
        name: "CheckListForSalesToPdf",
        components: {
            DropDownTableRow,
            DropDown,
            VueHtml2pdf,
            TextField,
            TextEdit,
            BlockInfo,
            // DropDownYesNo

        },
        props: {
            'checkListForSales': Object,
            'sparkOrganizationInfo': Object,
            'finIndicators': Array,
            'stopFactors': Array,
            'doPdf': Boolean
        },

        computed: {
            companyName() {
                return organization.companyName(this.sparkOrganizationInfo);
            },
            companyFullName() {
                return organization.companyFullName(this.sparkOrganizationInfo);
            },
            companyAddress() {
                return organization.companyAddress(this.sparkOrganizationInfo);
            },
            companyStatus() {
                return organization.companyStatus(this.sparkOrganizationInfo);
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
            getExictingCompany() {
                if (old === null) {
                    return '';
                }
                var current = new Date(); // сегодня
                var old = new Date(this.checkListForSales.dateReg); // !!! год-месяц-день !!!

                // сначала находим количество дней между датами
                var days = Math.ceil(Math.abs(old.getTime() - current.getTime()) / (1000 * 3600 * 24));
                var year = Math.floor(days / 365); // вычисляем кол-во лет. Math.floor убирает остаток.
                var months = Math.floor((days - (year * 365)) / 30); // отняв года, вычисляем месяцы
                return year + ' лет, ' + months + ' месяцев';
            },
        },

        methods: {
            onPdf() {
                this.$refs.html2Pdf.generatePdf();
            },

            onButtonPdfClick() {
                this.onPdf();
            },
        }
    }
</script>
