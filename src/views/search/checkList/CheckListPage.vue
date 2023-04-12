<template>
    <div class="page">
        <CheckListToPdf ref="checkListToPdf" v-if="checkList"
                        :check-list="checkList"
                        :company-name="companyName"
                        :permit-check-passport="permitCheckPassport"
                        :my-date="myDate"/>

        <div class="margin-left-5 check-list">
            <div class="rtk-button-port" v-if="checkList" v-on:click="onButtonPdfClick()">Печать в PDF</div>
            <div class="rtk-button-port" v-if="checkList" v-on:click="onButtonSaveClick()">Сохранить</div>
            <div class="rtk-button-port" v-if="checkList" v-on:click="goHome">Отмена</div>
            <!-- -           <div class="rtk-button-port" v-on:click="onButtonTest">Рейтинг</div>-->
            <div class="rtk-button-port" v-if="checkList" v-on:click="goCheckListJournalPage">Перейти в журнал</div>
        </div>

        <div class="check-list">

            <div class="card-header">
                Оценка благонадежности нового клиента.
            </div>

            <BusinessSearchBox v-on:suggestion-selected="loadCheckListBySuggestion"/>

            <modal-window ref="modalRatingInfo">
                <template v-slot:title>
                    <h1>Решение о подключении:</h1>
                </template>
                <template v-slot:body>
                    <div>
                        <h3> Рекомендуемое решение: {{recommendedDecisionFullName()}} </h3>
                    </div>
                </template>
            </modal-window>

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
                        <div v-if="checkList.checkDate === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Дата проведения проверки
                        </div>
                        <div v-if="(checkList.userFio === null)||(checkList.userFio === '')">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            ФИО сотрудника
                        </div>
                        <div v-if="checkList.salesChannel === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Канал продаж
                        </div>
                        <div v-if="checkList.rtkSystemName === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            МРФ
                        </div>
                        <div v-if="checkList.businessService === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Услуга
                        </div>
                        <div v-if="checkList.calcSystem === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Запрашиваемая система расчетов
                        </div>
                        <div v-if="checkList.userBusinessTypeName === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Вид бизнеса (со слов клиента)
                        </div>
                        <div v-if="(checkList.city === null)||(checkList.city === '')">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Город
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('CHL_PAR_REPRESENTATIVE')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Контактное лицо клиента
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('HAVE_BUSINESS_INFO')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Не обладает информацией о бизнесе
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('NOT_INTERESTED_TARIFFS')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Не интересуется тарифами
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('NOT_UNIQUE_CONTACT_INFO')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Контактный номер телефона и/или e-mail
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Паспорт является недействительным
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('CHL_PAR_FAKE_DOCUMENTS')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Документы имеют признаки подделки
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('DIFFERING_SIGNATURES')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Подписи на документах отличаются
                        </div>
                        <div v-if="checkList.checkListParam[getIdByDictiName('CHL_PAR_UNREADABLE_DATA')].checked === 'UNDEFINED'">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Документы в плохом качестве, нечитаемые данные
                        </div>
                        <div v-if="checkList.checkResult === null">
                            <img src="@/assets/img/check_list/info_factor.png" class="stop-info">
                            Резюме
                        </div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div class="margin-top-10">
                        <div class="rtk-button-port" v-on:click="onButtonPdfClickModal">Печать в PDF</div>
                        <div class="rtk-button-port" v-on:click="onButtonSaveClickModal">Сохранить</div>
                        <div class="rtk-button-port" v-on:click="closeModal">Отмена</div>
<!--                        <div class="rtk-button-port" v-on:click="goCheckListJournalPage">Перейти в журнал.</div>-->
                    </div>
                </template>

            </modal-window>

            <div class="relabillity" v-if="checkList">
                ЧЕК-ЛИСТ ОЦЕНКИ БЛАГОНАДЕЖНОСТИ НОВОГО КЛИЕНТА
            </div>

            <BlockInfo caption="ОСНОВНАЯ ИНФОРМАЦИЯ" v-if="checkList">
                <DropDown caption="Услуга:" v-model="checkList.businessService" :options="businessService"/>
                <DropDown caption="Запрашиваемая система расчетов:" v-model="checkList.calcSystem"
                          :options="calcSystem"/>
            </BlockInfo>


            <BlockInfo caption="СВЕДЕНИЯ ПО ЗАЯВКЕ" v-if="checkList">
                <TextField caption="Наименование:" v-model="companyName"/>
                <TextField caption="ИНН:" :value="inn"/>
                <TextField caption="Вид бизнеса:" v-model="checkList.businessTypeName"/>
                <TextEdit v-model="checkList.userBusinessTypeName" caption="Вид бизнеса (со слов клиента):"
                          placeholder="Вид бизнеса" size="50px"/>
                <TextEdit v-model="checkList.city" caption="Город:" placeholder="Город" size="30px"/>
            </BlockInfo>

            <BlockInfo caption="ЧЕК-ЛИСТ" v-if="checkList">
                <div class="font-color-violet-bold margin-top-10">
                    1. Профиль ЛПР/представителя клиента (Внешний андеррайтинг, субъективная оценка поведения) <br/>
                </div>
                <div>
                    <DropDownTableRow v-bind:editable="true"
                                      v-bind:caption="getFullNameByDictiName('CHL_PAR_REPRESENTATIVE')"
                                      factor="NONE"
                                      v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_REPRESENTATIVE')].checked"/>

                    <DropDownTableRow v-bind:editable="true"
                                      v-bind:caption="getFullNameByDictiName('HAVE_BUSINESS_INFO')"
                                      factor="NONE"
                                      v-model="checkList.checkListParam[getIdByDictiName('HAVE_BUSINESS_INFO')].checked"/>

                    <DropDownTableRow v-bind:editable="true"
                                      v-bind:caption="getFullNameByDictiName('NOT_INTERESTED_TARIFFS')"
                                      factor="NONE"
                                      v-model="checkList.checkListParam[getIdByDictiName('NOT_INTERESTED_TARIFFS')].checked"/>

                    <DropDownTableRow v-bind:editable="true"
                                      v-bind:caption="getFullNameByDictiName('NOT_UNIQUE_CONTACT_INFO')"
                                      factor="INFO"
                                      v-model="checkList.checkListParam[getIdByDictiName('NOT_UNIQUE_CONTACT_INFO')].checked"/>
                </div>


                <div class="font-color-violet-bold margin-top-10">
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
                                            <input name="issuedate" type="date" v-model="checkList.passportDateIssue"
                                                   class="mdm-text">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="margin-left-5">
                                            <div class="rtk-button-mini" v-on:click="loadCheckPassport()">Проверка
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <div class="company-message font-lighter-normal">
                                            <div>{{shownSmevMessage}}</div>
                                            <div>{{shownExpiredListMessage}}</div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <div class="font-color-violet-bold margin-top-10">
                    2. Оценка компании клиента
                </div>

                <DropDownTableRow v-bind:editable="false" v-bind:caption="getFullNameByDictiName('COMPANY_LIQUIDATED')"
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

                <DropDownTableRow v-bind:editable="false" v-bind:caption="getFullNameByDictiName('CHL_PAR_TAX_ARREARS')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_TAX_ARREARS')].checked"/>

                <DropDownTableRow v-bind:editable="false"
                                  v-bind:caption="getFullNameByDictiName('CHL_PAR_ACCOUNT_FROZEN')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_ACCOUNT_FROZEN')].checked"/>

                <DropDownTableRow v-bind:editable="false" v-bind:caption="getFullNameByDictiName('CHIEF_DISQUALIFIED')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHIEF_DISQUALIFIED')].checked"/>

                <DropDownTableRow v-bind:editable="false" v-bind:caption="getFullNameByDictiName('WRONG_COMPANY_INFO')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('WRONG_COMPANY_INFO')].checked"/>


                <div class="font-color-violet-bold margin-top-10">
                    3. Оценка документов
                </div>
                <DropDownTableRow v-bind:editable="true" v-bind:disabled="true"
                                  v-bind:caption="getFullNameByDictiName('CHL_PAR_INVALID_PASSPORT')"
                                  factor="STOP"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked"/>

                <DropDownTableRow v-bind:editable="true"
                                  v-bind:caption="getFullNameByDictiName('CHL_PAR_FAKE_DOCUMENTS')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_FAKE_DOCUMENTS')].checked"/>

                <DropDownTableRow v-bind:editable="true" v-bind:caption="getFullNameByDictiName('DIFFERING_SIGNATURES')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('DIFFERING_SIGNATURES')].checked"/>

                <DropDownTableRow v-bind:editable="true"
                                  v-bind:caption="getFullNameByDictiName('CHL_PAR_UNREADABLE_DATA')"
                                  factor="INFO"
                                  v-model="checkList.checkListParam[getIdByDictiName('CHL_PAR_UNREADABLE_DATA')].checked"/>


            </BlockInfo>

<!--            <BlockInfo caption="РЕКОМЕНДУЕМОЕ РЕШЕНИЕ " v-if="checkList">-->
<!--                <div class="margin-top-10">-->
<!--                    Общее кол-во  баллов: {{this.updateRating}} <br/>-->
<!--                    <DropDown caption="Рекомендуемое решение:" v-model="checkList.recommendedDecision" :options="recommendedDecision"/>-->
<!--                </div>-->
<!--            </BlockInfo>+++++вернуть-->


            <BlockInfo caption="РЕЗЮМЕ ПО ИТОГАМ ПРОВЕРКИ" v-if="checkList">
                <DropDown caption="Резюме:" v-model="checkList.checkResult" :options="checkResult"/>
                <DropDown caption="Решение о возможности подключения:" v-bind:is-full-name="true"
                          v-model="checkList.connectionDecision" :options="connectionDecision"/>
                <DropDown class="margin-top-30" caption="Канал продаж:" v-model="checkList.salesChannel"
                          :options="salesChannel"/>
                <div class="margin-top-10 font-bold">
                    МРФ
                    <select v-model="checkList.rtkSystemName" class="margin-left-5 mdm-select">
                        <option v-for="mrf in mrfs" v-bind:value="mrf.shortName" v-bind:key="mrf.id">
                            {{ mrf.shortName }}
                        </option>
                    </select>
                    <img src="@/assets/img/check_list/ok.png" class="ok-info"
                         v-if="checkList.rtkSystemName">
                </div>

                <TextEdit v-model="checkList.userFio" caption="ФИО сотрудника:" placeholder="Ф.И.О." size="50px"/>

                <div class="font-bold margin-top-10">
                    Дата проведения проверки:
                    <input disabled v-model="myDate" type="date">
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


            <div class="block-info-end" v-if="checkList">
                <br/><br/><br/><br/><br/><br/>
            </div>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import BusinessSearchBox from "../../../components/inputs/search_box/BusinessSearchBox";
    import ModalWindow from "../../../components/inputs/windows/modal-window";
    import urls from "@/js/utils/urls";
    import paths from "@/js/utils/paths";
    import checkListUtils from "@/js/utils/checkList";
    import DropDown from "@/components/checkList/DropDown";
    import TextEdit from "@/components/checkList/TextEdit";
    import TextField from "@/components/checkList/TextField";
    import DropDownTableRow from "@/components/checkList/DropDownTableRow";
    import BlockInfo from "@/components/checkList/BlockInfo";
    import CheckListToPdf from "./components/CheckListToPdf";
    import organization from "@/js/utils/organization";


    export default {
        name: "CheckListPage",
        components: {
            BusinessSearchBox,
            ModalWindow,
            DropDown,
            TextEdit,
            TextField,
            DropDownTableRow,
            BlockInfo,
            CheckListToPdf
        },
        mounted() {
            this.loadBusinessData();
        },
        home() {
            return '/'
        },
        computed: {
            companyName(){
                return organization.companyName(this.sparkOrganizationInfo);
            },

            inn(){
                return organization.inn(this.sparkOrganizationInfo);
            },

            salesChannelShortName() {
                return checkListUtils.salesChannelShortName(this.checkList);
            },

            updateRating() {
                let rating = this.calcRating();
                this.setDecisionByRating(rating)
                return rating;
            },

            isEmptyFields() {
                let isEmptyField = false;
                if ((this.checkList.checkDate === null) ||
                    (this.checkList.userFio === null) || (this.checkList.userFio === '') ||
                    (this.checkList.salesChannel === null) ||
                    (this.checkList.rtkSystemName === null) ||
                    (this.checkList.businessService === null) ||
                    (this.checkList.calcSystem === null) ||
                    (this.checkList.userBusinessTypeName === null) ||
                    (this.checkList.city === null) || (this.checkList.city === '') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_REPRESENTATIVE')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('HAVE_BUSINESS_INFO')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('NOT_INTERESTED_TARIFFS')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('NOT_UNIQUE_CONTACT_INFO')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_FAKE_DOCUMENTS')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('DIFFERING_SIGNATURES')].checked === 'UNDEFINED') ||
                    (this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_UNREADABLE_DATA')].checked === 'UNDEFINED') ||
                    (this.checkList.checkResult === null)) isEmptyField = true;
                return isEmptyField;
            },

        },
        data() {
            return {
                shownSmevMessage: "",
                shownExpiredListMessage: "",
                myDate: "",
                //json data from back
                checkList: "",
                dictiList: "",
                sparkOrganizationInfo: "",
                mrfs: "",
                calcSystem: "",
                salesChannel: "",
                checkResult: "",
                connectionDecision: "",
                recommendedDecision: "",
                businessService: "",
                permitCheckPassport: "",
                saveInfo: "",
                saveError: "",
                yesNoParam: [{code: '-1', name: 'UNDEFINED', rusName: '--'},
                    {code: '0', name: 'NO', rusName: 'Нет'},
                    {code: '1', name: 'YES', rusName: 'Да'}],
                //------------------
                series: "",
                number: "",
                issuedate: "",
            }
        },

        methods: {
            getFullNameByDictiName(dictiName){
                return checkListUtils.getFullNameByDictiName(this.checkList, dictiName)
            },

            recommendedDecisionFullName() {
                checkListUtils.recommendedDecisionFullName(this.checkList)
            },

            showModal: function () {
                this.$refs.modal.show = true
            },

            showRatingInfo: function () {
                //+++вернуть this.$refs.modalRatingInfo.show = true
                this.$refs.modalRatingInfo.show = false
            },

            showSaveInfo: function () {
                this.$refs.modalSaveInfo.show = true
            },

            setDecisionByName(name) {
                this.checkList.recommendedDecision = this.recommendedDecision[this.getIndexDesicionByName(name)];
            },

            setDecisionByRating(rating) {
                if (rating === 'R') {
                    this.setDecisionByName('Отказано');
                    this.showRatingInfo();
                } else if (Number(rating) >= 10) {
                    this.setDecisionByName('Авансовая');
                    this.showRatingInfo();
                } else {
                    this.setDecisionByName('Любая');
                }
            },

            getIndexDesicionByName(name) {
                let i = 0;
                for (var index = 0; index < this.recommendedDecision.length; index++) {
                    if (this.recommendedDecision[index].fullName === name) {
                        return i
                    }
                    i++;
                }
                return -1;
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

            getIdByDictiName(dictiName) {
                return checkListUtils.getIdByDictiName(this.checkList, dictiName)
            },

            loadBusinessData() {
                if (this.$route.params.inn != null) {
                    this.loadCheckListByInn(this.$route.params.inn)
                } else {
                    this.clearView();
                }
            },
            clearView() {
                this.responseDataList = null;
            },

            goCheckListJournalPage() {
                if (this.$route.fullPath !== paths.checkListJournalPage()) {
                    this.$router.push(paths.checkListJournalPage());
                }
            },

            goHome() {
                if (this.$route.fullPath !== paths.home()) {
                    this.$router.push(paths.home());
                }
            },

            setPassportYes() {
                this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked = 'YES';
            },

            setPassportNo() {
                this.checkList.checkListParam[this.getIdByDictiName('CHL_PAR_INVALID_PASSPORT')].checked = 'NO';
            },

            loadCheckPassport() {
                let url = urls.checkPassportUrl(this.checkList.passportSeries, this.checkList.passportNumber, this.checkList.passportDateIssue);
                this.shownSmevMessage = "Загрузка данных...";
                this.shownExpiredListMessage = "Загрузка данных...";
                let pasportGosuslugi = "Проверка через Госуслуги: ";
                let component = this;
                axios.get(url)
                    .then(function (response) {
                        component.responseDataList = response.data;
                        component.setPassportNo();
                        let passpExpiredListDiscription = "Проверка по списку недействительных паспортов МВД: ";
                        if (response.data.description === "YES") {
                            passpExpiredListDiscription = passpExpiredListDiscription + "Паспорт найден в списке недействительных.";
                            component.setPassportYes();
                        } else {
                            passpExpiredListDiscription = passpExpiredListDiscription + "Паспорт среди недействительных не значится";
                        }
                        component.shownExpiredListMessage = passpExpiredListDiscription;

                        if (response.data.responseCode === "300") {
                            component.shownSmevMessage = pasportGosuslugi + "Паспорт действителен";
                        } else if (response.data.responseCode === "302") {
                            component.shownSmevMessage = pasportGosuslugi + "Сведениями по заданным реквизитам не располагаем";
                        } else {
                            component.shownSmevMessage = pasportGosuslugi + "Паспорт в базе данных действительных не найден";
                            component.setPassportYes();
                        }

                    })
                    .catch(function (e) {
                        component.shownSmevMessage = pasportGosuslugi + "Не удалось загрузить информацию по паспортным данным";
                        let passpExpiredListDiscription = "Проверка по списку недействительных паспортов МВД: ";
                        if (response.data.description === "YES") {
                            passpExpiredListDiscription = passpExpiredListDiscription + "Паспорт найден в списке недействительных.";
                        } else {
                            passpExpiredListDiscription = passpExpiredListDiscription + "Паспорт среди недействительных не значится";
                        }
                        component.shownExpiredListMessage = passpExpiredListDiscription;
                    });

            },

            loadCheckListByInn(inn) {
                let url = urls.checkListByInnUrl(inn);
                this.loadAndShowCheckListByUrl(url, inn);
            },

            loadAndShowCheckListByUrl(url, inn) {
                this.checkList = null;

                let component = this;
                axios.get(url)
                    .then(function (response) {
                        component.checkList = response.data.checkListDto.checkList;
                        component.checkList.inn = inn;
                        component.sparkOrganizationInfo = response.data.checkListDto.sparkOrganizationInfo;
                        component.mrfs = response.data.dictList.mrfs;
                        component.calcSystem = response.data.dictList.calcSystem;
                        component.salesChannel = response.data.dictList.salesChannel;
                        component.checkResult = response.data.dictList.checkResult;
                        component.connectionDecision = response.data.dictList.connectionDecision;
                        component.dictiList = response.data.dictList;
                        component.recommendedDecision = response.data.dictList.recommendedDecision;
                        component.businessService = response.data.dictList.businessService;
                        component.permitCheckPassport = response.data.permitCheckPassport;
                        if ((component.checkList.checkDate != null) && (component.checkList.checkDate !== "")) {
                            component.myDate = component.checkList.checkDate.split('T')[0];
                        }

                    })
                    .catch(function (e) {
                    });
            },

            loadCheckListBySuggestion(suggestion) {
                this.clearInfo();
                if (suggestion.data != null && suggestion.data.inn != null) {
                    let inn = suggestion.data.inn;
                    if (this.$route.params.inn !== inn) {
                        this.$router.push(paths.checkListByInn(inn))
                        this.loadCheckListByInn(inn);
                    }
                }
            },

            onSave() {
                let url = urls.postCheckListUrl();
                if ((this.myDate != null) && (this.myDate !== "")) {
                    this.checkList.checkDate = new Date(this.myDate).toISOString().split('.000Z')[0];
                } else this.checkList.checkDate = "";

                let rtkId = "";
                if (this.checkList.rtkSystemName !== null) {
                    for (var i = 0; i < this.mrfs.length; i++)
                        if (this.mrfs[i]["shortName"] === this.checkList.rtkSystemName)
                            rtkId = this.mrfs[i]["id"];
                    this.checkList.rtkSystemOrponId = rtkId;
                }

                axios.post(url, this.checkList)
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
            },

            onButtonSaveClick() {
                if (this.isEmptyFields) {
                    this.showModal();
                } else {
                    this.onSave();
                }
            },

            onButtonSaveClickModal() {
                this.closeModal();
                this.onSave();
            },

            isEmpty(val) {
                if ((val == null) || (val === '') || (val === 'UNDEFINED')) {
                    return 0;
                }
                return val;
            },

            getRatingByName(dictiName) {
                let rating = this.checkList.checkListParam[getIdByDictiName(dictiName)].valueStr;
                if (this.isEmpty(rating)) return 0;
                return rating;
            },

            calcRating() {
                return checkListUtils.calcRating(this.checkList);
            },

            onButtonTest() {
                var rating = this.calcRating();
            },


            onButtonPdfClick() {
                if (this.isEmptyFields) {
                    this.showModal();
                } else {
                    this.$refs.checkListToPdf.onPdf();
                }
            },

            onButtonPdfClickModal() {
                this.closeModal();
                this.$refs.checkListToPdf.onPdf();
            },
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    body {
        font-family: 'Source Sans Pro', sans-serif;
        margin: 0;
        padding: 0;
        height: 100vh;
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

    .l-container {
        display: flex;
        justify-content: left;
    }

    .l-container-right {
        display: flex;
        justify-content: left;
    }

    .l-container-left {
        display: flex;
        justify-content: left;
        margin-top: 10px;
        margin-left: 10px;
        font-weight: bold;
    }
</style>