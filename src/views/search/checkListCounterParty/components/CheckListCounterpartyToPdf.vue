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

                    <div class="relabillity" v-if="sparkOrganizationInfo">
                        Чек лист Проверка контрагента НД КЦ
                    </div>

                    <BlockInfo caption="ДАННЫЕ КОМПАНИИ" v-if="sparkOrganizationInfo">
                        <table class="table-border-none">
                            <tr>
                                <td>
                                    <TextField caption="Наименование:" :value="companyName"/>
                                    <TextField caption="ИНН:" v-model="inn"/>
                                    <!--                            <TextField caption="Дата регистрации:"-->
                                    <!--                                       :value="new Date(checkListForTaxes.dateReg).toLocaleDateString() "/>-->
                                </td>
                                <td>
                                    <TextField caption="ОГРН:" :value="ogrn"/>
                                    <TextField caption="Статус:" :value="companyStatus"/>
                                    <TextField caption="Дата регистрации:"
                                               :value="new Date(companyDateReg).toLocaleDateString() "/>
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
                                <td> {{this.$parent.yesNoRus(stopFactors[0].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[0].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[1].name}}</td>
                                <td> {{this.$parent.yesNoRus(stopFactors[1].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[1].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[2].name}}</td>
                                <td> {{stopFactors[2].value}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[2].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[3].name}}</td>
                                <td> {{this.$parent.yesNoRus(stopFactors[3].value)}}</td>
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
                                <td> {{this.$parent.yesNoRus(stopFactors[6].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[6].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[7].name}}</td>
                                <td> {{this.$parent.yesNoRus(stopFactors[7].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[7].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[8].name}}</td>
                                <td> {{this.$parent.yesNoRus(stopFactors[8].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[8].risk)}}</td>
                            </tr>
                            <tr>
                                <td> {{stopFactors[9].name}}</td>
                                <td> {{this.$parent.yesNoRus(stopFactors[9].value)}}</td>
                                <td> {{this.$parent.getRisk(stopFactors[9].risk)}}</td>
                            </tr>
                        </table>
                    </BlockInfo>

                </section>

                <div class="html2pdf__page-break"/>

                <section class="pdf-item">
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
                                <td> {{caption=finIndicators[6].thirdValue}}</td>
                                <td> {{caption=finIndicators[6].secondValue}}</td>
                                <td> {{caption=finIndicators[6].firstValue}}</td>
                                <td> {{caption=finIndicators[6].rating}}</td>
                            </tr>
                            <tr>
                                <td> {{caption=finIndicators[7].name}}</td>
                                <td> {{caption=finIndicators[7].measure}}</td>
                                <td> {{caption=finIndicators[7].thirdValue}}</td>
                                <td> {{caption=finIndicators[7].secondValue}}</td>
                                <td> {{caption=finIndicators[7].firstValue}}</td>
                                <td> {{caption=finIndicators[7].rating}}</td>
                            </tr>
                            <tr>
                                <td> {{caption=finIndicators[8].name}}</td>
                                <td> {{caption=finIndicators[8].measure}}</td>
                                <td> {{caption=finIndicators[8].thirdValue}}</td>
                                <td> {{caption=finIndicators[8].secondValue}}</td>
                                <td> {{caption=finIndicators[8].firstValue}}</td>
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
                                <td> {{caption=finIndicators[9].thirdValue}}</td>
                                <td> {{caption=finIndicators[9].secondValue}}</td>
                                <td> {{caption=finIndicators[9].firstValue}}</td>
                                <td> {{caption=finIndicators[9].rating}}</td>
                            </tr>
                            <tr>
                                <td> {{caption=finIndicators[10].name}}</td>
                                <td> {{caption=finIndicators[10].measure}}</td>
                                <td> {{caption=finIndicators[10].thirdValue}}</td>
                                <td> {{caption=finIndicators[10].secondValue}}</td>
                                <td> {{caption=finIndicators[10].firstValue}}</td>
                                <td> {{caption=finIndicators[10].rating}}</td>
                            </tr>
                            <tr>
                                <td> {{caption=finIndicators[11].name}}</td>
                                <td> {{caption=finIndicators[11].measure}}</td>
                                <td> {{caption=finIndicators[11].thirdValue}}</td>
                                <td> {{caption=finIndicators[11].secondValue}}</td>
                                <td> {{caption=finIndicators[11].firstValue}}</td>
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
                                <td :class="this.$parent.calcLevelRisk"> {{this.$parent.round(riskEvaluation, 2)}}</td>
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
    import BlockInfo from "@/components/checkList/BlockInfo";
    import organization from "@/js/utils/organization";


    export default {
        name: "CheckListForTaxesToPdf",
        components: {
            VueHtml2pdf,
            TextField,
            BlockInfo,
        },
        props: {
            'checkListForTaxes': Object,
            'sparkOrganizationInfo': Object,
            'finIndicators': Array,
            'stopFactors': Array,
            'periodMap': Object,
            'riskEvaluation': Number,
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
                var old = new Date(this.checkListForTaxes.dateReg); // !!! год-месяц-день !!!

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
