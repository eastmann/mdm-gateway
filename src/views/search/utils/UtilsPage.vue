<template>
    <div>
        <table>
            <tr>
                <td>
                    <EgrnPlugin/>
                </td>
                <td>
                    <UtilsBlock caption="Сервис проверки самозанятых">
                        <div>
                            Проверка самозанятых:
                        </div>

                        <ul>
                            <li>
                                Проверка осуществляется по ИНН;
                            </li>
                            <li>
                                Интервал между проверками должен составлять не менее 30 сек.
                            </li>
                            <li>
                                При большой нагрузке на сервис возможно длительное ожидание ответа;
                            </li>

                        </ul>

                        <div class="button-center">
                            <ButtonFlat i class="fa fa-user-check" v-on:click.native="onClickSelfEmployed()">
                                Проверить по ИНН
                            </ButtonFlat>
                        </div>
                    </UtilsBlock>
                </td>
            </tr>
            <tr>
                <td>
                    <SanctionsListUtils/>
                </td>
                <td>
                    <RknUtils/>
                </td>
                <td>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import EgrnPlugin from "./components/EgrnPlugin.vue";
    import UtilsBlock from "./components/UtilsBlock.vue";
    import ButtonFlat from "@/components/button/ButtonFlat";
    import SanctionsListUtils from "./components/SanctionsListUtils.vue";
    import RknUtils from "./components/RknUtils";
    import axios from "axios";

    export default {
        name: "UtilsPage",
        components: {
            EgrnPlugin,
            UtilsBlock,
            ButtonFlat,
            SanctionsListUtils,
            RknUtils
        },


        mounted() {

        },

        methods: {
            onClickSelfEmployed() {
                window.location.href = "/search/self-employed";
            }
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    .float-style {
        display: inline-block;
        padding: 30px;
        float: left;
    }

    .button-center{
        margin: 20px;
        text-align: center;
    }
</style>