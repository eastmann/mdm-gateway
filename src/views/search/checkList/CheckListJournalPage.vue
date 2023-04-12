<template>
    <div>
        <div class="card-header">
            Журнал чек-листов
        </div>
        <div class="search-info">
                ИНН <input type = "text" v-model="inputInn" class="mdm-text">
                ФИО сотрудника <input type = "text" v-model="inputFio" class="mdm-text">
                Период с: <input name="date1" v-model="inputDateStart" type="date" class="mdm-text">
                по: <input name="date2" v-model="inputDateEnd" type="date" class="mdm-text">
                <div class="rtk-button-port" v-on:click="loadJournalDataOnPage(0)">Показать</div>
        </div>
        <div v-if="loadJournalMessage" class="load-info">
            {{loadJournalMessage}}
        </div>
        <div v-if="loadJournalMessage == null" class="address-block">
            <div>
                <i class="far fa-file-excel save-excel-icon"  v-on:click="exportCheckListJournalToExel"
                    title="Выгрузить в Excel">  Реестр чек-листов</i>

                <i class="m-l-10 far fa-file-excel save-excel-icon"  v-on:click="exportCheckListReestrToExel"
                   title="Выгрузить реестр в Excel">  Реестр проверок</i>

                <hr>
                <h2>

                    <i class="header-icon fas fa-id-card grey"/>Реестр чек-листов

                </h2>
                <table class="mdm-table">
                    <th>Наименование</th>
                    <th>ИНН</th>
                    <th>ФИО сотрудника</th>
                    <th>Дата проверки</th>
                    <th>МРФ </th>
                    <th>Услуга </th>
                    <th>Система расчетов</th>
                    <th>Результат проверки</th>
                    <tr v-for="checkListDto in this.checkListsDto" v-bind:key="checkListDto.checkList.id">
                        <td>{{getCompanyName(checkListDto)}}</td>
                        <td>{{getCompanyInn(checkListDto)}}</td>
                        <td>{{checkListDto.checkList.userFio}}</td>
                        <td>{{dateToText(checkListDto.checkList.checkDate)}}</td>
                        <td>{{checkListDto.checkList.rtkSystemName}}</td>
                        <td>{{getDictiFullName(checkListDto.checkList.businessService)}}</td>
                        <td>{{getDictiFullName(checkListDto.checkList.calcSystem)}}</td>
                        <td>{{getDictiFullName(checkListDto.checkList.checkResult)}}</td>
                    </tr>
                </table>

                <button class="rtk-previos-next" :disabled="(this.firstPage) || (checkListsDto == null)"
                     v-on:click="loadJournalPreviosPage"> &lt;&lt;&lt;</button>


                <button class="rtk-previos-next" :disabled="(this.lastPage) || (this.checkListsDto == null)"
                     v-on:click="loadJournalNextPage">&gt;&gt;&gt;</button>

                <spam class="page-count"> стр: {{pageNumber + 1}} </spam>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import urls from "@/js/utils/urls";

    let PAGE_SIZE = 20;

    export default {
        data() {
            return {
                inputInn: "",
                firstPage: true,
                lastPage: true,
                inputFio: "",
                inputDateStart: this.nowDateLastMonth(),
                inputDateEnd: this.nowDate(),
                name: "CheckListJournalPage",
                checkListsDto: null,
                loadJournalMessage: null,
                pageNumber: 0
            }
        },

        props:{
            size:{
                type:Number,
                required:false,
                default: 1
            }
        },

        computed: {

        },

        methods: {

            nowDate(){
                let datNow = new Date();
                datNow.setHours(23,59,59,999);
                return datNow.toISOString().split('T')[0];
            },

            nowDateLastMonth(){
                let date = new Date();
                date.setDate(1);
                date.setHours(0,0,0,0);
                return date.toISOString().split('T')[0]
            },

            nextPage(){
                this.pageNumber++;
            },

            prevPage(){
                this.pageNumber--;
            },

            getCompanyName(checkListDto) {
                if (checkListDto == null) return null;
                if (checkListDto.sparkOrganizationInfo == null) return null;

                if (checkListDto.sparkOrganizationInfo.company != null) {
                    return checkListDto.sparkOrganizationInfo.company.shortName
                }

                if (checkListDto.sparkOrganizationInfo.entrepreneur != null) {
                    return checkListDto.sparkOrganizationInfo.entrepreneur.fullNameRus;
                }
                return null;
            },

            getDictiFullName(dicti){
                if (dicti == null) return "";
                return dicti.fullName;
            },

            getCompanyInn(checkListDto) {
                if (checkListDto == null) return null;
                if (checkListDto.sparkOrganizationInfo == null) return null;
                if (checkListDto.sparkOrganizationInfo.company != null) {
                    return checkListDto.sparkOrganizationInfo.company.inn
                }

                if (checkListDto.sparkOrganizationInfo.entrepreneur != null) {
                    return checkListDto.sparkOrganizationInfo.entrepreneur.inn;
                }
                return null;
            },

            dateToText(myDate){
                if (myDate != null) {
                    return  myDate.split('T')[0];
                }
                return myDate;
            },

            exportCheckListJournalToExel(){
                var file = 'CheckListJournal.xlsx';
                axios({
                    method: 'post',
                    url: urls.exportCheckListJournal(this.inputInn, this.inputFio, this.dateToText(this.inputDateStart), this.dateToText(this.inputDateEnd)),
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

            exportCheckListReestrToExel(){
                var file = 'CheckListReestr.xlsx';
                axios({
                    method: 'post',
                    url: urls.exportCheckListReestr(this.inputInn, this.inputFio, this.dateToText(this.inputDateStart), this.dateToText(this.inputDateEnd)),
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

            loadJournalNextPage(){
                this.pageNumber = this.pageNumber + 1;
                this.loadJournalDataOnPage(this.pageNumber);
            },

            loadJournalPreviosPage(){
                this.pageNumber = this.pageNumber - 1;
                this.loadJournalDataOnPage(this.pageNumber);
            },

            loadJournalDataOnPage(page){
                let component = this;
                let url = urls.exportCheckListJournalView(this.inputInn, this.inputFio, this.dateToText(component.inputDateStart), this.dateToText(component.inputDateEnd), page, PAGE_SIZE);
                component.loadJournalMessage = "Загрузка данных...";
                axios.post(url)
                    .then(function (response) {
                        component.loadJournalMessage = null;
                        component.checkListsDto = response.data.content;
                        component.firstPage = response.data.first;
                        component.lastPage = response.data.last;
                         //response.data.numberOfElements / PAGE_SIZE;
                    })
                    .catch(function (e) {
                        this.loadJournalMessage = "Ошибка загрузки данных " + e;
                    });
            },
        }
    }

</script>

<style lang="less">
    @import "../../../css/colors";

    button:disabled {
        color: red;
    }

    .m-l-10 {
        margin-left: 10px;
    }

    .page-count{
        color: @baseViolet;
        margin-left: 15px;
    }

    .search-info {
        background-color: #f1f1fd;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 10px 10px 10px;
    }
    .rtk-previos-next {
        display: inline-block;
        margin-left: 10px;
        margin-top: 10px;
        font-size: 14px;
        font-weight: bold;

        padding: 1px 15px 1px;
        border-radius: 10px;
        border: 2px solid @baseViolet;
        background-color: #fefefe;
        color: @baseViolet;
        cursor: pointer;
    }

    .save-excel-icon {
        color: @baseViolet;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1.0 !important;
        }
    }

    .card-header {
        font-weight: bold;
        text-align: center;
        font-size: 32px;
        padding-top: 95px;
        padding-bottom: 5px;

    }

    .load-info {
        font-weight: bold;
        /*color: red;*/
        text-align: center;
        font-size: 24px;
        padding-top: 15px;
        padding-bottom: 5px;
    }

    .check-list {
        margin-left: 50px;
        margin-right: 50px;
        font-size: 16px;
    }

</style>