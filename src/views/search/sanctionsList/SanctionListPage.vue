<template>
    <div class="page">
        <div class="check-list">

            <div class="card-header">
                Сервис проверки компаний на вхождение в санкционные списки:
            </div>

            <div class="search-box-input-line">
                <input type="text" v-model="enteredText" v-on:keyup="onKeyUp"/>
                <div class="search-box-button">Поиск</div>
            </div>

            <BlockInfo caption="ОЖИДАНИЕ ОТВЕТА..." v-if="waitingResponse">
                <div class="block-wait">
                    <i class="color-blue fas fa-hourglass-half">
                        Ожидание ответа...
                    </i>
                </div>
            </BlockInfo>

            <div class="inline"  v-if="this.enteredText">
                <div class="one">
                    <div v-for='org in arrOrgRight' v-bind:key="org.itemId">
                        <div class="margin-top-10" v-on:click="onMouseClick(org)">
                            {{ getNameCountry(org) }}
                        </div>
                    </div>
                </div>
                <div class="two">
                    <div v-for='org in arrOrgLeft' v-bind:key="org.itemId">
                        <div class="margin-top-10" v-on:click="onMouseClick(org)">
                            {{ getNameCountry(org) }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="block-selected"  v-if="this.enteredText">
                <div>
                   <span class="selected-caption"> ВЫБОРКА ДЛЯ ПРОВЕРКИ: </span> <div class="rtk-button-port" v-on:click="onShowResultClick()">Показать</div>
                </div>

                <div class="inline">
                    <div class="one">
                        <div class="boxShadow16"  v-on:click="onMouseClickDel(org)" v-for='org in arrSelectedOrgLeft' v-bind:key="org.itemId">
                            {{ getNameCountry(org) }}
                        </div>
                    </div>
                    <div class="two">
                        <div class="boxShadow16"  v-on:click="onMouseClickDel(org)" v-for='org in arrSelectedOrgRigth' v-bind:key="org.itemId">
                            {{ getNameCountry(org) }}
                        </div>
                    </div>

                </div>
            </div>

            <div class="block-selected" caption="РЕЗУЛЬТАТЫ ЗАПРОСА:" v-if="this.showResult">
                <div>
                    <span class="selected-caption"> РЕЗУЛЬТАТЫ ЗАПРОСА: </span>
                </div>
                <div v-for='(value, index) in orgFullResult' v-bind:key="index">
                    <OrganizationInfo :org="value" :is-odd="index % 2 === 0"></OrganizationInfo>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import urls from "@/js/utils/urls";
    import paths from "@/js/utils/paths";
    import dateUtils from "@/js/utils/date";
    import BlockInfo from "@/components/checkList/BlockInfo";
    import OrganizationInfo from "@/views/search/sanctionsList/components/OrganizationInfo";

    export default {
        name: "SelfEmployedPage",
        components: {
            BlockInfo,
            OrganizationInfo
        },

        computed: {
            arrOrgRight() {
                if (this.orgLiteResult === null){
                    return null;
                }
                return  this.orgLiteResult.slice(0, 5);
            },

            arrOrgLeft() {
                if (this.orgLiteResult === null){
                    return null;
                }
                return  this.orgLiteResult.slice(5, 10);
            },

            arrSelectedOrgLeft() {
                let selectedOrgLeft = [];
                for(let i = 0; i < this.selectedOrg.length; i++){
                    if(i % 2 ===0){
                        selectedOrgLeft.push(this.selectedOrg[i]);
                    }
                }
                return selectedOrgLeft;
            },

            arrSelectedOrgRigth() {
                let selectedOrgRigth = [];
                for(let i = 0; i < this.selectedOrg.length; i++){
                    if(i % 2 !==0){
                        selectedOrgRigth.push(this.selectedOrg[i]);
                    }
                }
                return selectedOrgRigth;
            },
        },

        data() {
            return {
                enteredText: "",
                waitingResponse: false,
                orgLiteResult: null,
                orgFullResult: null,
                testData: "",
                selectedOrg: [],
                showResult: false,
            }
        },

        methods: {
            onButtonClick() {
                alert("!!!" + this.enteredText);
            },

            onKeyUp(e) {
                this.testData = this.enteredText;
                this.complienceOrgByNameUrl(this.enteredText);
            },

            onMouseClick(org){
                this.selectedOrg.push(org);
            },

            onMouseClickDel(org){
                this.deleteByElement(org);
            },

            getNameCountry(org){
                let name = "";
                if (org === null){
                    return name;
                }
                if (org.complianceOrgCountries === null){
                    name = org.name;
                    return name.toUpperCase();
                }
                name = org.name;
                org.complianceOrgCountries.forEach(function (country) {
                    name = name + " (" + country.name + ")";
                });
                return name.toUpperCase();
            },

            complienceOrgByNameUrl(name) {
                let url = urls.complienceOrgByNameUrl(name);
                this.loadAndShowOrgByUrl(url, name);
            },

            loadAndShowOrgByUrl(url, name) {
                this.orgLiteResult = null;
                let component = this;
                component.waitingResponse = true;
                axios.get(url)
                    .then(function (response) {
                        component.waitingResponse = false;
                        component.orgLiteResult = response.data;

                    })
                    .catch(function (e) {
                        component.waitingResponse = false;
                    });
            },

            getIdsBySelectedOrgs(){
                let ids = "";
                this.selectedOrg.forEach(function (country) {
                    ids = ids + ((ids !== "") ? "," : "") + country.systemId;
                });
               return ids;
            },

            complienceOrgByIdsUrl() {
                let ids = this.getIdsBySelectedOrgs();
                let url = urls.complienceOrgByIdsUrl(ids);
                this.loadAndShowFullOrgByIds(url, ids);
            },

            loadAndShowFullOrgByIds(url, ids) {
                this.orgFullResult = null;
                let component = this;
                component.waitingResponse = true;
                axios.get(url)
                    .then(function (response) {
                        component.waitingResponse = false;
                        component.orgFullResult = response.data;

                    })
                    .catch(function (e) {
                        component.waitingResponse = false;
                    });
            },

            onShowResultClick(){
                this.showResult = true;
                this.complienceOrgByIdsUrl();
            },

            getStatus(status){
                if (status === 'SUCCESS'){
                    return 'Обработан'
                }
                if (status === 'ERROR'){
                    return 'Ошибка'
                }
                return status;
            },

            loadBusinessData() {
                if ((this.enteredText != null) && (this.enteredText != "")) {
                    this.loadSelfEmployedByInn(this.enteredText)
                } else {
                    this.clearView();
                }
            },

            clearView() {
                this.selfEmployedResult = null;
            },

            loadSelfEmployedByInn(inn) {
                let url = urls.selfEmployedByInnUrl(inn);
                this.loadAndShowSelfEmployedByUrl(url, inn);
            },

            deleteByElement(element){
                for (let i = this.selectedOrg.length; i--;) {
                    if (this.selectedOrg[i] === element) {
                        this.selectedOrg.splice(i, 1);
                    }
                }
            },

            loadAndShowSelfEmployedByUrl(url, inn) {

                this.selfEmployedResult = null;
                let component = this;
                component.waitingResponse = true;
                axios.get(url)
                    .then(function (response) {
                        component.waitingResponse = false;
                        component.selfEmployedResult = response.data;
                    })
                    .catch(function (e) {
                        component.waitingResponse = false;
                    });
            },
        },
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    .color-blue {
        color: dodgerblue;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
    }

    .block-wait {
        background-color: #f1f1fd;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 20px 10px 10px;
    }

    .block-selected {
        /*background-color: #f1f1fd;*/
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 20px 10px 10px;
    }

    .inline{
        width:100%;
        height:auto;
        display:flex;
    }

    .one,.two{
        width:50%;
        height:auto;
        margin:10px;
        cursor: pointer;
    }

    .selected-caption{
        color: @baseViolet;
        font-size: 24px;
        font-weight: bold;
    }

    .boxShadow16 {
        margin: 2.5em auto 1em;
        padding: 1em;
        border: 1px solid #ccc;
        box-shadow: 7px 7px 10px 0px rgba(50, 50, 50, 0.75);
        cursor: no-drop;
    }
</style>