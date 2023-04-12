<template>
    <div>
        <UtilsBlock caption="Сервис проверки на вхождение в реестр запрещенных сайтов РКН">
            <div>
                Сервис проверки на вхождение в реестр запрещенных сайтов РКН:
            </div>

            <ul>
                <li>
                    Проверка осуществляется по наименованию домена;
                </li>
                <li>
                    Перед именем домена допустимы префиксы http, https, www;
                </li>
                <li>
                    Выводится информация о блокировке по домену, по маске, по страницам а так же список заблокированных страниц.
                </li>
            </ul>

            <div class="button-center">
                <ButtonFlat i class="fa fa-list" v-on:click.native="onClickDomain()">
                    Проверить по наименованию домена
                </ButtonFlat>
            </div>

        </UtilsBlock>
    </div>
</template>

<script>
    import UtilsBlock from "./UtilsBlock.vue";
    import ButtonFlat from "@/components/button/ButtonFlat";

    export default {
        name: "DomainUtils",
        components: {
            UtilsBlock,
            ButtonFlat
        },

        data() {
            return {

            }
        },

        mounted() {

        },

        methods: {
            onClickDomain() {
                window.location.href = "/search/rkn";
            }
        }

    }
</script>

<style lang="less">
    @import "../../../../css/colors";

</style>