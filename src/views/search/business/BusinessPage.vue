<template>
    <div class="site-section">
        <div class="mdm-button-row float-right">
            <div class="rtk-button-port" v-on:click="onButtonClick('https://dd.rt.ru/mdm/InnList', 'Работа со списками')">Работа со списками</div>
            <div class="rtk-button-port" v-on:click="goToAccountPage()">Поиск по ЛС</div>
        </div>
        <h1>Поиск компаний и ИП</h1>
        <div class="clearfix"></div>
        <BusinessSearchBox v-on:suggestion-selected="loadBusinessBySuggestion"/>
        <BusinessFullInfoBlock v-if="responseData" :response-data="responseData"/>
        <div class="company-message" v-if="shownMessage">{{shownMessage}}</div>
    </div>
</template>

<script>
    import urls from '../../../js/utils/urls'
    import paths from '../../../js/utils/paths'
    import axios from 'axios'
    import DataField from "../../../components/datafield/DataField";
    import ExpandBox from "../../../components/layout/ExpandBox";
    import BusinessSearchBox from "../../../components/inputs/search_box/BusinessSearchBox";
    import BusinessFullInfoBlock from "@/views/search/business/BusinessFullInfoBlock";

    let LOADING_MESSAGE = "Загрузка данных...";
    let NOT_FOUND_MESSAGE = "Не удалось найти информацию о компании";
    let ERROR_MESSAGE = "Возникла ошибка при загрузке данных";

    export default {
        name: "CompanyPage",
        components: {
            BusinessSearchBox,
            BusinessFullInfoBlock
        },
        mounted() {
            this.loadBusinessData();
        },
        data() {
            return {
                responseData: null,
                shownMessage: null
            }
        },
        methods: {
          goToAccountPage(){
              this.$router.push(paths.accountPage());
          },

          onButtonClick(urlHistory, info){
            let url = urls.userHistory(urlHistory, info);
            let component = this;
            axios.get(url)
                .then(function (response) {
                })
                .catch(function (e) {
                });
            location.href = urlHistory;
          },
            loadBusinessData() {
                if(this.$route.params.businessId != null) {
                    this.loadBusinessById(this.$route.params.businessId)
                } else if(this.$route.params.inn != null) {
                    if(this.$route.params.gid != null) {
                        this.loadBusinessByInnAndGid(this.$route.params.inn, this.$route.params.gid);
                    } else {
                        this.loadBusinessByInn(this.$route.params.inn)
                    }
                } else {
                    this.clearView();
                }
            },
            loadBusinessById(businessId) {
                let url = urls.businessByIdUrl(businessId);
                this.loadAndShowBusinessByUrl(url);
            },
            loadBusinessBySuggestion(suggestion) {
                if(suggestion.data != null && suggestion.data.inn != null) {
                    let inn = suggestion.data.inn;
                    if(this.$route.params.inn !== inn) {
                        this.$router.push(paths.businessByInn(inn))
                        this.loadBusinessByInn(inn);
                    }
                }
            },
            loadBusinessByInnAndGid(inn, gid) {
                let url = urls.businessByInnAndGidUrl(inn, gid);
                this.loadAndShowBusinessByUrl(url);
            },

            loadBusinessByInn(inn) {
                let url = urls.businessByInnUrl(inn);
                this.loadAndShowBusinessByUrl(url);
            },

            loadAndShowBusinessByUrl(url) {
                this.shownMessage = LOADING_MESSAGE;
                this.responseData = null;

                let component = this;
                axios.get(url).then(response => {
                    if(response.data != null) {
                        let businessFound = ((response.data.sparkData != null) &&
                            ((response.data.sparkData.company != null
                                || response.data.sparkData.entrepreneur != null)))
                            || response.data.twoGisData != null
                            || (response.data.rtkData != null && response.data.rtkData.status === 'FOUND');
                        if(businessFound) {
                            component.responseData = response.data;
                            component.shownMessage = null;
                        } else {
                            component.shownMessage = NOT_FOUND_MESSAGE;
                        }

                    }
                })
                .catch(e => {
                    component.shownMessage = ERROR_MESSAGE;
                })
            },
            clearView() {
                this.responseData = null;
            }
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";
    @import "../../../css/style";

    .company-block {
        .base-info-block;
    }
    .company-fields {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-column-gap: 10px;
    }
    .company-message {
        margin-top: 10px;
    }
</style>