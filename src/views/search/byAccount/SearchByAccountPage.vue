<template>
    <div class="page">
        <div class="check-list">

            <div class="card-header">
                Поиск по лицевому счету:
            </div>

            <div class="search-box-input-line">
                <input type="text" v-model="enteredText"/>
                <div class="search-box-button" v-on:click="onClick">Поиск</div>
            </div>

            <BlockInfo caption="ОЖИДАНИЕ ОТВЕТА..." v-if="waitingResponse">
                <div class="block-wait">
                    <i class="color-blue fas fa-hourglass-half">
                        Ожидание ответа...
                    </i>
                </div>
            </BlockInfo>

            <BlockInfo caption="РЕЗУЛЬТАТ ПРОВЕРКИ:" v-if="accountResult">
                <div class="res-check">{{accountResult}}</div>
            </BlockInfo>

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
        name: "SearchByAccountPage",
        components: {
            BlockInfo,
        },

        computed: {},

        data() {
            return {
                enteredText: "",
                waitingResponse: false,
                accountResult: null,
            }
        },

        methods: {

            searchAccount(account) {
                let url = urls.rknByAccountUrl(account);
                this.loadAndShowByUrl(url);
            },

            goToCompanyPage(){
                if (this.accountResult === null){
                    return;
                }

                if (this.accountResult.status !== 'FOUND') {
                    this.accountResult = 'Данный ЛС не найден либо по нему отсутствуют  действующие услуги';
                    return;
                }

                let inn = this.accountResult.data[0].inn;
                this.$router.push(paths.businessByInn(inn));
            },

            loadAndShowByUrl(url) {
                this.waitingResponse = true;
                this.accountResult = null;
                let component = this;

                axios.get(url)
                    .then(function (response) {
                        component.waitingResponse = false;
                        component.accountResult = response.data;
                        component.goToCompanyPage();
                        //8630375358

                    })
                    .catch(function (e) {
                        component.waitingResponse = false;
                        component.accountResult = 'Сервис не отвечает, повторите позже';
                    });
            },

            onClick(e) {
                this.searchAccount(this.enteredText);
            },


        },
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    .res-check{
        padding-top: 10px;
    }

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
</style>