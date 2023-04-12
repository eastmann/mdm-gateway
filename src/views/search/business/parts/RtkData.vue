<template>
    <div class="rtk-data">
        <hr>
        <div v-if="(rtkTele2Client) && (getTele2FilialsLength() <= 5)" class="t2-container">
            <div class="t2-con1">
                {{rtkTele2Client}}
            </div>
            <div class="t2-con2">
                <img src="@/assets/img/logo_tele2.png" class="tele2-pic">
            </div>
        </div>

        <div v-if="(rtkTele2Client) && (getTele2FilialsLength() > 5)">
            <div class="t2-container">
                <div class="t2-con-expand">
                    <ExpandBox v-if="getTele2FilialsLength() > 5 " header="Список филиалов Теле2" header-class="big-expand-header">
                        <UnexpandBox v-for="filial in getTele2Filials()"
                                     :header="filial" v-bind:key="filial">
                        </UnexpandBox>
                    </ExpandBox>

                </div>
                <div class="t2-con2">
                    <img src="@/assets/img/logo_tele2.png" class="tele2-pic">
                </div>
            </div>
        </div>

        <hr>

        <h2>
            <img src="@/assets/img/icons/company/rtk_logo_bw.png" class="header-png-icon">Профиль клиента РТК
            <span class="m-l-5">
                <i class="far fa-file-excel save-excel-icon" v-on:click="exportRtkData" title="Выгрузить в Excel"/>
            </span>
        </h2>

        <h2>Данные по сегментам</h2>

        <div class="scrollble" v-if="(cdiData != null) && (cdiData.length > 0)">
            <table class="mdm-table">
                <th>№</th>
                <th>Филиал</th>
                <th>Сегмент</th>
                <th>К-код</th>
                <th>Класс обслуживания</th>
                <th>Холдинг</th>
                <tr v-for="(item, index)  in cdiData" :key="item.value">
                    <td>{{index + 1}}</td>
                    <td>{{item.value}}</td>
                    <td>{{item.data.macrosegment}}\{{item.data.mainsegment}}\{{item.data.subsegment}}</td>
                    <td>{{item.data.kacode}}</td>
                    <td>{{item.data.servicelevel}}</td>
                    <td>{{item.data.holdingname}}</td>
                </tr>
            </table>
        </div>

        <template v-if="(cdiData == null) || (cdiData.length === 0)">
            <p class="rtk-message"> Отсутствуют параметры сегментации.
                Автоматически будут присвоены параметры В2В\МСП\Микро- K0203 - Бронза</p>
        </template>

        <template v-if="rtkData">
            <h2>Информация по счетам</h2>
            <table class="mdm-table">
                <th>Номер лицевого счета</th>
                <th>Номер договора</th>
                <th>Услуга</th>
                <th>Технология</th>
                <th>Класс обслуживания</th>
                <th>Адрес</th>
                <tr v-for="rtkRow in rtkData" v-bind:key="rtkRow.rowId">
                    <td>{{rtkRow.account}}</td>
                    <td>{{rtkRow.contrNum}}</td>
                    <td>{{rtkRow.servName}}</td>
                    <td>{{rtkRow.techName}}</td>
                    <td>{{rtkRow.serviceClassName}}</td>
                    <td>{{rtkRow.ustAddr}}</td>
                </tr>
            </table>
            <Pager :page-count="totalPages" v-on:page-selected="loadCompanyRtkDataOnPage($event)"/>

            <ExpandBox header="Задолженность по счетам" header-class="big-expand-header" v-if="rtkData">
                <ExpandBox v-for="(item, index) in debt "
                           :header="item.account" v-bind:key="index">
                    <div class="company-fields">
                        <DataField caption="Аккаунт" :value="item.account"/>
                        <DataField caption="Сумма задолженности" :value="item.debsum"/>
                        <DataField caption="Дата образования задолженности" :value="dateFormat(item.debtCrnDate)"
                                   :is-date="true"/>
                        <DataField caption="Дата просрочки задолженности" :value="dateFormat(item.debtOverDueDate)"
                                   :is-date="true"/>
                    </div>
                </ExpandBox>
            </ExpandBox>
        </template>

        <template v-else-if="rtkMessage" ->
            <p class="rtk-message" v-if="rtkMessage">{{rtkMessage}}</p>
        </template>
    </div>
</template>

<script>
    import urls from "@/js/utils/urls";
    import axios from "axios";
    import Pager from "@/components/pager/Pager";
    import ExpandBox from "@/components/layout/ExpandBox";
    import DataField from "@/components/datafield/DataField";
    import UnexpandBox from "@/components/layout/UnexpandBox";

    let PAGE_SIZE = 6;
    let RTK_DATA_ERROR = "Не удалось загрузить данные по клиентам РТК"
    let COMPANY_IS_NOT_RTK_CLIENT = "Данная компания не является клиентом РТК"

    export default {
        name: "RtkData",
        props: {
            'companyInn': [String],
            'cdiData': [Object, Array]
        },
        components: {
            UnexpandBox,
            Pager,
            ExpandBox,
            DataField
        },
        mounted() {
            this.loadCompanyRtkData();
        },
        data() {
            return {
                rtkDataLoading: false,
                rtkData: null,
                rtkTele2Client: null,
                debt: null,
                rtkMessage: null,
                totalPages: 0
            }
        },

        computed:{

        },

        methods: {
            isRtkClient(){
                let rtkClient = false;
                if (this.cdiData === null){
                    return rtkClient;
                }

                for (let index in this.cdiData){
                    if (this.cdiData[index].value !== "Потенциальный"){
                        rtkClient = true;
                        break;
                    }
                }

                return rtkClient;
            },

            dateFormat(pDate) {
                if (pDate === null) {
                    return null;
                }
                return pDate.split('T')[0];
            },

            loadCompanyRtkData() {
                this.loadCompanyRtkDataOnPage(1);
                this.loadTele2Client(this.companyInn);

                this.rtkMessage = this.isRtkClient() ? "" : COMPANY_IS_NOT_RTK_CLIENT;
            },
            loadCompanyRtkDataOnPage(page) {
                this.rtkDataLoading = true;

                var url = urls.rtkDataByInn(this.companyInn, page, PAGE_SIZE);
                var component = this;
                axios.get(url).then(response => {
                    component.rtkDataLoading = false;

                    if (response.data != null) {
                        if (response.data.totalObjects == null || response.data.totalObjects === 0) {
                            component.rtkData = null;
                            //component.rtkMessage = COMPANY_IS_NOT_RTK_CLIENT
                        } else {
                            component.rtkData = response.data.data;
                            component.debt = response.data.debt;
                            component.totalPages = response.data.totalPages;
                        }
                    }
                })
                    .catch(e => {
                        component.rtkDataLoading = false;
                        //component.rtkMessage = RTK_DATA_ERROR;
                    })
            },
            exportRtkData() {
                var file = 'rtkClient-' + this.companyInn + '.xlsx';
                axios({
                    method: 'post',
                    url: urls.rtkDataExportByInn(this.companyInn),
                    responseType: 'arraybuffer',
                })
                    .then(response => {
                        let blob = new Blob([response.data], {
                            type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = file
                        link.click()
                    });
            },

            loadTele2Client(inn) {
                this.rtkTele2Client = null;
                var url = urls.rtkTele2ClientByInn(inn);
                var component = this;
                axios.get(url).then(response => {
                    component.rtkTele2Client = response.data;
                })
                    .catch(e => {

                    })
            },

            getTele2Filials(){
                if (this.rtkTele2Client === null){
                    return null;
                }
                return this.rtkTele2Client.split(",")
            },

            getTele2FilialsLength(){
                if (this.rtkTele2Client === null){
                    return null;
                }
                return this.rtkTele2Client.split(",").length
            }
        },

        watch: {
            companyInn(newCompany, oldCompany) {
                if (newCompany != null) {
                    this.loadCompanyRtkData();
                }
            }
        }

    }
</script>
<style>
    .rtk-message {
        margin-top: 10px;
    }

    .scrollble {
        overflow-y: auto;
        max-height: 160px;
    }

    .company-fields {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 10px;
    }

    .m-l-5 {
        margin-left: 5px;
    }

    .t2-container{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 20px;
    }

    .t2-con1{
        width: 100%;
        text-align: right;
        font-weight: 100;
        font-size: 12px;
        margin-top: 5px;
    }

    .t2-con-expand{
        width: 100%;
    }

    .t2-con2{
        width: 80px;
        text-align: right;
    }

    .tele2-pic {
        height: 20px;
        margin-left: 10px;
    }
</style>
