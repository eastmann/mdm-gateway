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
                    <div class="relabillity" v-if="checkList">
                        ЧЕК-ЛИСТ ОЦЕНКИ БЛАГОНАДЕЖНОСТИ НОВОГО КЛИЕНТА
                    </div>

<!--                    <BlockInfo caption="ОСНОВНАЯ ИНФОРМАЦИЯ" v-if="checkList">-->
<!--                        <TextField caption="Услуга:" :value="businessServiceShortName()"/>-->
<!--                        <TextField caption="Запрашиваемая система расчетов:" :value="calcSystemShortName()"/>-->
<!--                    </BlockInfo>-->

                    <BlockInfo caption="ОСНОВНАЯ ИНФОРМАЦИЯ" v-if="checkList">
                        <DropDown caption="Услуга:" v-model="checkList.businessService" :options="this.$parent.businessService"/>
                        <DropDown caption="Запрашиваемая система расчетов:" v-model="checkList.calcSystem"
                                  :options="this.$parent.calcSystem"/>
                    </BlockInfo>

                    <BlockInfo caption="СВЕДЕНИЯ ПО ЗАЯВКЕ" v-if="checkList">
                        <TextField caption="Наименование:" v-model="this.$parent.companyName"/>
                        <TextField caption="ИНН:" :value="this.$parent.inn"/>
                        <TextField caption="Вид бизнеса:" v-model="checkList.businessTypeName"/>
                        <TextEdit v-model="checkList.userBusinessTypeName" caption="Вид бизнеса (со слов клиента):"
                                  placeholder="Вид бизнеса" size="50px"/>
                        <TextEdit v-model="checkList.city" caption="Город:" placeholder="Город" size="30px"/>
                    </BlockInfo>

                    <BlockInfo caption="ЧЕК-ЛИСТ" v-if="checkList">
                        <div class="font-color-violet-bold margin-top-10">
                            1. Профиль ЛПР/представителя клиента (Внешний андеррайтинг, субъективная оценка поведения)
                            <br/>
                        </div>
                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_REPRESENTATIVE')"
                                          factor="NONE"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_REPRESENTATIVE')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('HAVE_BUSINESS_INFO')"
                                          factor="NONE"
                                          v-model="checkList.checkListParam[getIdByDictiName('HAVE_BUSINESS_INFO')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('NOT_INTERESTED_TARIFFS')"
                                          factor="NONE"
                                          v-model="checkList.checkListParam[getIdByDictiName('NOT_INTERESTED_TARIFFS')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('NOT_UNIQUE_CONTACT_INFO')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('NOT_UNIQUE_CONTACT_INFO')].checked"/>


                    </BlockInfo>

                    <BlockInfo caption="" v-if="checkList">
                        <div class="font-color-violet-bold">
                            Проверка действия паспорта:
                        </div>
                        <table class="font-lighter-normal margin-top-10">
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <div class="margin-left-5">
                                                    Серия:
                                                    <input name="series" type="text" v-model="checkList.passportSeries"
                                                           class="mdm-text">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="margin-left-5">
                                                    Номер:
                                                    <input name="number" type="text" v-model="checkList.passportNumber"
                                                           class="mdm-text">
                                                </div>
                                            </td>
                                            <td>
                                                <div class="margin-left-5">
                                                    Дата:
                                                    <input name="issuedate" type="date"
                                                           v-model="checkList.passportDateIssue" class="mdm-text">
                                                </div>
                                            </td>
                                            <!--                                            <td>-->
                                            <!--                                                <div class="margin-left-5">-->
                                            <!--                                                    <div class="rtk-button-mini" v-on:click="loadCheckPassport()">Проверка-->
                                            <!--                                                    </div>-->
                                            <!--                                                </div>-->
                                            <!--                                            </td>-->
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </BlockInfo>

                </section>

                <div class="html2pdf__page-break"/>

                <section class="pdf-item">
                    <BlockInfo caption="" v-if="checkList">
                        <div class="font-color-violet-bold">
                            2. Оценка компании клиента
                        </div>
                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('COMPANY_LIQUIDATED')"
                                          factor="STOP"
                                          v-model="checkList.checkListParam[getIdByDictiName('COMPANY_LIQUIDATED')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_BANKRUPT_INFO')"
                                          factor="NONE"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_BANKRUPT_INFO')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('SIX_MONTH_LESS_BUSIN')"
                                          factor="NONE"
                                          v-model="checkList.checkListParam[getIdByDictiName('SIX_MONTH_LESS_BUSIN')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_TAX_ARREARS')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_TAX_ARREARS')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_ACCOUNT_FROZEN')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_ACCOUNT_FROZEN')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHIEF_DISQUALIFIED')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHIEF_DISQUALIFIED')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('WRONG_COMPANY_INFO')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('WRONG_COMPANY_INFO')].checked"/>

                        <div class="font-color-violet-bold">
                            3. Оценка документов
                        </div>
                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_INVALID_PASSPORT')"
                                          factor="STOP"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_FAKE_DOCUMENTS')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_FAKE_DOCUMENTS')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('DIFFERING_SIGNATURES')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('DIFFERING_SIGNATURES')].checked"/>

                        <DropDownTableRow v-bind:editable="false"
                                          v-bind:caption="getFullNameByDictiName('CHL_PAR_UNREADABLE_DATA')"
                                          factor="INFO"
                                          v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_UNREADABLE_DATA')].checked"/>
                    </BlockInfo>

<!--                </section>-->

<!--                <div class="html2pdf__page-break"/>-->

<!--                <section class="pdf-item">-->
                    <BlockInfo caption="РЕЗЮМЕ ПО ИТОГАМ ПРОВЕРКИ" v-if="checkList">
                        <DropDown caption="Резюме:" v-model="checkList.checkResult" :options="this.$parent.checkResult"/>
                        <DropDown caption="Решение о возможности подключения:" v-bind:is-full-name="true"
                                  v-model="checkList.connectionDecision" :options="this.$parent.connectionDecision"/>

                        <div class="l-container">
                            <div class="l-container-right">
                                <DropDown class="margin-top-10" caption="Канал продаж:" v-model="checkList.salesChannel"
                                          :options="this.$parent.salesChannel"/>
                            </div>

                            <div class="l-container-left">
                                МРФ
                                <select v-model="checkList.rtkSystemName" class="margin-left-5 mdm-select">
                                    <option v-for="mrf in this.$parent.mrfs" v-bind:value="mrf.shortName" v-bind:key="mrf.id">
                                        {{ mrf.shortName }}
                                    </option>
                                </select>
                            </div>
                        </div>

                        <img src="@/assets/img/check_list/ok.png" class="ok-info"
                             v-if="checkList.rtkSystemName">

                        <TextEdit v-model="checkList.userFio" caption="ФИО сотрудника:" placeholder="Ф.И.О." size="50px"/>

                        <div class="font-bold margin-top-10">
                            Дата проведения проверки:
                            <input disabled v-model="this.$parent.myDate" type="date">
                        </div>
                    </BlockInfo>

                    <BlockInfo caption="4. Обозначения и правила:" v-if="checkList">
                        <div class="font-black-normal">
                            <img src="@/assets/img/check_list/stop_factor.png" class="stop-info">
                            При выявлении stop-фактора оформление договора и подключение услуги не допускается! <br/>

                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            При наличии хотя бы одного негативного фактора
                            необходимо согласование со стороны Департамента экономической безопасности/Руководителя
                            сотрудника (см. матрицу
                            принятия решения)
                        </div>
                    </BlockInfo>
                </section>
            </section>
        </vue-html2pdf>
    </div>
</template>

<script>
    import VueHtml2pdf from "vue-html2pdf";
    import TextField from "@/components/checkList/TextField";
    import checkListUtils from "@/js/utils/checkList";
    import BlockInfo from "@/components/checkList/BlockInfo";
    import DropDownTableRow from "@/components/checkList/DropDownTableRow";
    import DropDown from "@/components/checkList/DropDown";
    import TextEdit from "@/components/checkList/TextEdit";
    import organization from "@/js/utils/organization";


    export default {
        name: "CheckListToPdf",
        components: {
            TextEdit,
            DropDown,
            VueHtml2pdf,
            TextField,
            BlockInfo,
            DropDownTableRow

        },
        props: {
            'checkList': Object,
            'companyName': String,
            'doPdf': Boolean,
            'permitCheckPassport': Boolean,
            'myDate': String
        },

        computed: {
            inn() {
                return organization.inn(this.sparkOrganizationInfo);
            },
        },

        methods: {
            businessServiceShortName() {
                return checkListUtils.businessServiceShortName(this.checkList)
            },

            getFullNameByDictiName(dictiName){
                return checkListUtils.getFullNameByDictiName(this.checkList, dictiName)
            },

            getIdByDictiName(dictiName) {
                return checkListUtils.getIdByDictiName(this.checkList, dictiName)
            },

            salesChannelShortName() {
                return checkListUtils.salesChannelShortName(this.checkList);
            },

            calcRating() {
                return checkListUtils.calcRating(this.checkList);
            },

            recommendedDecisionFullName() {
                return checkListUtils.recommendedDecisionFullName(this.checkList)
            },

            checkResultShortName() {
                return checkListUtils.checkResultShortName(this.checkList)
            },

            calcSystemShortName() {
                return checkListUtils.calcSystemShortName(this.checkList)
            },

            connectionDecisionShortName() {
                return checkListUtils.connectionDecisionShortName(this.checkList)
            },

            recommendedDecisionShortName() {
                return checkListUtils.recommendedDecisionShortName(this.checkList)
            },

            doTest() {
               return  checkListUtils.doTest()
            },

            onPdf() {
                this.$refs.html2Pdf.generatePdf();
            }
        }
    }
</script>
