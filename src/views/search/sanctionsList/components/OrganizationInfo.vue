<template>
    <div class="margin-top-10">
        <div :class="lineClass"></div>
        <table class="org-th">
            <tr>
                <th width="15%" :class="thClass">Страна регистр компании</th>
                <th width="30%" :class="thClass">Название компании</th>
                <th width="29%" :class="thClass">Тип санционных списков</th>
                <th width="16%" :class="thClass">Страна-инициатор санкции</th>
                <th width="10%" :class="thClass">количесво санкций</th>
            </tr>
            <tr>
                <td class="td-org-name" rowspan="2">{{getCountry()}}</td>
                <td class="td-org-name" rowspan="2">{{org.fullName.toUpperCase()}}</td>
            </tr>
            <tr v-for='(value, index) in uniqeSanctions' v-bind:key="index">
                <td v-if="index !==0"></td>
                <td v-if="index !==0"></td>
                <td class="blue-font" v-on:click="onMouseDetailClick(value)">{{value}}</td>
                <td class="black-font">{{getCountryBySanlistName(value)}}</td>
                <td class="black-font">{{getCountBySanlistName(value)}}</td>
            </tr>
        </table>
        <div :class="lineClass"></div>
        <modal-window ref="modalDetail">
            <template v-slot:title>
                <h1>САНКЦИОННЫЙ ЛИСТ:</h1>
            </template>
            <template v-slot:body>
                <div>
                    <div>
                        {{sanListName}}
                    </div>
                    <table class="table-sanlist">
                        <tr>
                            <th width="40%">Наименование санкции</th>
                            <th width="30%">Тип</th>
                            <th width="30%">Срок действия</th>
                        </tr>
                        <tr v-for='(value, index) in sanctions' v-bind:key="index">
                            <td class="td-org-name color-blue" v-on:click="onExtraInfoChange(value)">{{value.name}}</td>
                            <td class="td-org-name">{{value.typeName}}</td>
                            <td class="td-org-name">{{value.dateEnd === null ? "" : new Date(value.dateEnd).toLocaleDateString()}}</td>
                        </tr>
                    </table>
                    <div class="margin-top-10">Дополнительная информация:</div>
                    <div class="extraInfo margin-top-10">
                        {{extraInformations}}
                    </div>
                </div>
            </template>
        </modal-window>
    </div>
</template>

<script>
    import ModalWindow from "../../../../components/inputs/windows/modal-window";
    import BusinessSearchBox from "@/components/inputs/search_box/BusinessSearchBox";

    export default {
        name: "OrganizationInfo",
        props: {
            'org': Object,
            'isOdd': Boolean
        },

        components: {
            ModalWindow,
        },

        computed: {
            thClass() {
                return this.isOdd ? 'gray-group' : 'brown-group'
            },

            lineClass(){
                return this.isOdd ? 'blue-line-ligth' : 'blue-line-deep'
            },

            uniqeSanctions() {
                let set = new Set();
                this.org.complianceOrgSanctions.forEach(function (orgEl) {
                    set.add(orgEl.sanlistName);
                });
                return [...set];
            },
        },

        data() {
            return {
                sanctions: [],
                extraInformations: "",
                sanListName: "",
            }
        },

        methods: {
            showDetail: function () {
                this.$refs.modalDetail.show = true
            },

            closeDetail: function () {
                this.$refs.modalDetail.show = false
            },

            onExtraInfoChange(value){
                if (value === null){
                    this.extraInformations = "";
                    return;
                }
                this.extraInformations = value.extraInformations;
            },

            getCountryBySanlistName(name) {
                let res = "";
                for (var i = 0; i < this.org.complianceOrgSanctions.length; i++) {
                    if (this.org.complianceOrgSanctions[i].sanlistName === name) {
                        res = this.org.complianceOrgSanctions[i].country;
                        break;
                    }
                }
                return res;
            },

            getExtraInfoBySanlistName(name) {
                let res = "";
                for (var i = 0; i < this.org.complianceOrgSanctions.length; i++) {
                    if (this.org.complianceOrgSanctions[i].sanlistName === name) {
                        res = this.org.complianceOrgSanctions[i].extraInformations;
                        break;
                    }
                }
                return res;
            },

            getCountBySanlistName(name) {
                let count = 0;
                this.org.complianceOrgSanctions.forEach(function (orgEl) {
                    if (orgEl.sanlistName === name) {
                        count++;
                    }
                });
                return count;
            },

            getCountry() {
                let country = "";
                if ((this.org === null) || (this.org.complianceOrgCountries === null)) {
                    return country;
                }

                this.org.complianceOrgCountries.forEach(function (countryName) {
                    country = country + " " + countryName.name;
                });
                return country;
            },

            getSanctionsBtSanListName(name){
                let res = [];
                for (var i = 0; i < this.org.complianceOrgSanctions.length; i++) {
                    if (this.org.complianceOrgSanctions[i].sanlistName === name) {
                        res.push(this.org.complianceOrgSanctions[i]);
                    }
                }
                return res;
            },

            onMouseDetailClick(name){
                this.extraInformations = "";
                this.sanctions = this.getSanctionsBtSanListName(name);
                this.sanListName = name;
                this.showDetail();
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../css/colors";

    .blue-line-ligth{
        background-color: lightskyblue;
        height: 20px;
    }

    .blue-line-deep{
        background-color: darkblue;
        height: 20px;
    }

    .gray-group{
        margin-top: 10px;
        background-color: sienna;
        padding: 8px;
        color: white;
    }

    .brown-group{
        margin-top: 10px;
        background-color: dimgray;
        padding: 8px;
        color: white;
    }

    .org-th {
        border: 2px solid @baseViolet;

        .white-group{
            background-color: sienna;
        }

        .td-org-name {
            color: @baseViolet;
            font-size: 16px;
            font-weight: bold;
            padding: 8px;
        }

        .blue-font {
            color: dodgerblue;
            cursor: pointer;
            padding: 8px;
        }

        .black-font {
            color: black;
        }

    }

    .table-sanlist {
        border: 1px solid #000;
        border-collapse: collapse;

        th {
            padding: 6px;
            border: 1px solid #000;
            font-weight: bold;
            background-color: lightgray;
        }

        td {
            padding: 6px;
            border: 1px solid #000
        }
    }

    .extraInfo {
        border: 1px solid #000;
        height: 80px;
        overflow-y: auto;
    }
</style>