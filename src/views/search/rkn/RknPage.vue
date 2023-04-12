<template>
    <div class="page">
        <div class="check-list">

            <div class="card-header">
                Проверка по реестру запрещенных сайтов РКН:
            </div>

            <div class="search-box-input-line">
                <input type="text" v-model="enteredText"/>
                <div class="search-box-button" v-on:click="onClick">Поиск</div>
            </div>

            <!--            <BlockInfo caption="ОЖИДАНИЕ ОТВЕТА..." v-if="waitingResponse">-->
            <!--                <div class="block-wait">-->
            <!--                    <i class="color-blue fas fa-hourglass-half">-->
            <!--                        Ожидание ответа...-->
            <!--                    </i>-->
            <!--                </div>-->
            <!--            </BlockInfo>-->

            <BlockInfo caption="РЕЗУЛЬТАТ ПРОВЕРКИ:" v-if="domainResult">
                <table class="rkn-table">
                    <tr>
                        <td width="150px">
                            Домен:
                        </td>
                        <td class="margin-top-10">
                            <div class="color-blue">
                                {{domainResult.domain}}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td width="150px">
                            Статус:
                        </td>
                        <td>
                            {{ruBlockStatus(domainResult.status)}}
                        </td>
                    </tr>
                    <tr v-if="domainResult.domainMask">
                        <td width="150px">
                            Доменная маска:
                        </td>
                        <td>
                            <div class="color-blue">
                                {{domainResult.domainMask}}
                            </div>
                        </td>
                    </tr>
                    <tr v-if="(domainResult.urls !== null)&&(domainResult.urls.length > 0)">
                        <td width="150px">
                            Запрещенные страницы:
                        </td>
                        <td>
                            <ul v-for='(page, index) in domainResult.urls' v-bind:key="index">
                                <li>
                                    <div class="color-blue">
                                        {{page}}
                                    </div>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </table>
            </BlockInfo>

            <!--            <div  v-if="this.enteredText">-->
            <!--                    <div v-for='org in arrOrgRight' v-bind:key="org.itemId">-->
            <!--                        <div class="margin-top-10" v-on:click="onMouseClick(org)">-->
            <!--                            {{ getNameCountry(org) }}-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--            </div>-->

        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import urls from "@/js/utils/urls";
    import paths from "@/js/utils/paths";
    import dateUtils from "@/js/utils/date";
    import BlockInfo from "@/components/checkList/BlockInfo";

    export default {
        name: "RknPage",
        components: {
            BlockInfo,
        },

        computed: {},

        data() {
            return {
                enteredText: "",
                domainResult: null,
            }
        },

        methods: {
            ruBlockStatus(status) {
                if (status === "BLOCKED_PAGE"){
                    return "Блокировка по страницам"
                }
                if (status === "BLOCKED_DOMAIN"){
                    return "Блокировка по домену"
                }
                if (status === "BLOCKED_MASK"){
                    return "Блокировка по маске"
                }
                if (status === "BLOCKED_IP"){
                    return "Блокировка по IP"
                }
                return "Сведений о блокировках нет"
            },

            rknByDomain(domain) {
                let url = urls.rknByDomainUrl(domain);
                this.loadAndShowDomainByUrl(url, domain);
            },

            loadAndShowDomainByUrl(url, domain) {
                this.domainResult = null;
                let component = this;
                axios.get(url)
                    .then(function (response) {
                        component.domainResult = response.data;
                    })
                    .catch(function (e) {

                    });
            },

            getIdsBySelectedOrgs() {
                let ids = "";
                this.selectedOrg.forEach(function (country) {
                    ids = ids + ((ids !== "") ? "," : "") + country.systemId;
                });
                return ids;
            },

            getStatus(status) {
                if (status === 'SUCCESS') {
                    return 'Обработан'
                }
                if (status === 'ERROR') {
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

            onClick(e) {
                this.rknByDomain(this.enteredText);
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

    .inline {
        width: 100%;
        height: auto;
        display: flex;
    }

    .one, .two {
        width: 50%;
        height: auto;
        margin: 10px;
        cursor: pointer;
    }

    .selected-caption {
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

    .rkn-table {
        margin-top: 10px;
        border-collapse: collapse;
        width: 100%;

        tr {
            border: 1px solid @lightGrey;
            vertical-align: text-bottom;
            padding: 10px;
        }

        td {
            border: 1px solid @lightGrey;
            padding: 10px;
        }
    }
</style>