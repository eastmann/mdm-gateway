<template>
    <div>
        <UtilsBlock caption="Сервис проверки компании на вхождение в санкционные списки">
            <div>
                Сервис проверки компании на вхождение в санкционные списки:
            </div>

            <ul>
                <li>
                    Проверка осуществляется по наименованию компании;
                </li>
                <li>
                    Возможен поиск на русском и английском языках;
                </li>
                <li>
                    Есть возможность детального просмотра санкций по выбранному санкционному списку.
                </li>
            </ul>

            <div class="button-center">
                <ButtonFlat i class="fa fa-list" v-on:click.native="onClickSanctionList()">
                    Проверить по наименованию компании
                </ButtonFlat>
            </div>

        </UtilsBlock>
    </div>
</template>

<script>
    import UtilsBlock from "./UtilsBlock.vue";
    import ButtonFlat from "@/components/button/ButtonFlat";

    export default {
        name: "SanctionsListUtils",
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
            onClickSanctionList() {
                window.location.href = "/search/sanctions-list";
            }
        }

    }
</script>

<style lang="less">
    @import "../../../../css/colors";

</style>