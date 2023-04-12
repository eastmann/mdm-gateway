<template>
    <div class="page">
        <div class="check-list">

            <div class="card-header">
                Сервис проверки самозанятых:
            </div>

            <div class="search-box-input-line">
                <input type="text" v-model="enteredText"/>
                <div class="search-box-button" v-on:click="onButtonClick()">Поиск</div>
            </div>

            <BlockInfo caption="ОЖИДАНИЕ ОТВЕТА..." v-if="waitingResponse">
                <div class="block-wait">
                    <i class="color-blue fas fa-hourglass-half">
                        Интервал между запросами составляет 30 сек.
                    </i>
                    <div class="margin-top-10">
                        При длительном ожидании воспользуйтесь сервисом повторно.
                    </div>
                </div>
            </BlockInfo>

            <BlockInfo caption="РЕЗУЛЬТАТ:" v-if="selfEmployedResult">
                <TextField caption="ИНН:" v-model="selfEmployedResult.inn"/>
                <TextField caption="Статус:" :value="getStatus(selfEmployedResult.status)"/>
                <TextField caption="Результат проверки:" :value="getResponse(selfEmployedResult.response)"/>
                <TextField caption="Описание:" v-model="selfEmployedResult.errorMessage"/>
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
    import TextField from "@/components/checkList/TextField";


    export default {
        name: "SelfEmployedPage",
        components: {
            BlockInfo,
            TextField
        },

        computed: {},
        data() {
            return {
                enteredText: "",
                waitingResponse: false,
                selfEmployedResult: null
            }
        },

        methods: {
            onButtonClick() {
                this.loadBusinessData();
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

            getResponse(response){
                if ((response === 'null') || (response === '') || (response === null)){
                    return  '-';
                }
                return response === 'true' ? 'Является самозанятым' : 'Не является самозанятым';
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
        color: #8C00FF;
    }

    .block-wait {
        background-color: #f1f1fd;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 20px 10px 10px;
    }
</style>