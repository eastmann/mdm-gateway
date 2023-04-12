<template>
    <div>
        <UtilsBlock caption="Помощник ЕГРН (расширение/плагин для браузера)">
            <div>
                Обеспечение выписок:
            </div>

            <ul>
                <li>
                    об основных характеристиках и зарегистрированных правах на объект недвижимости;
                </li>
                <li>
                    о кадастровой стоимости объектов недвижимости;
                </li>
                <li>
                    о правах отдельного лица на имевшиеся (имеющиеся) у него объекты недвижимости.
                </li>
            </ul>

            <div class="button-row">
                <ButtonFlat  i class="fa fa-book-reader" v-on:click.native="onClickInstruction('instruction_egrn_v1.7.docx')">
                    Руководство пользователя
                </ButtonFlat>

                <ButtonFlat  i class="fa fa-tools" v-on:click.native="onClickPlugin('EgrnPlugin.crx')">
                    Скачать расширение
                </ButtonFlat>
            </div>

        </UtilsBlock>
    </div>
</template>

<script>
    import axios from "axios";
    import UtilsBlock from "./UtilsBlock.vue";
    import ButtonFlat from "@/components/button/ButtonFlat";

    export default {
        name: "EgrnPlugin",
        components: {
            UtilsBlock,
            ButtonFlat
        },

        data() {
            return {
                fileInstruction: require('../../../../assets/files/instruction_egrn_v1.7.png'),
                filePlugin: require('../../../../assets/files/EgrnPlugin.png')
            }
        },

        mounted() {

        },

        methods: {
            onClickInstruction(fileName) {
                axios({
                    url: this.fileInstruction,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', fileName);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
            },
            onClickPlugin(fileName) {
                axios({
                    url: this.filePlugin,
                    method: 'GET',
                    responseType: 'blob',
                }).then((response) => {
                    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                    var fileLink = document.createElement('a');

                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', fileName);
                    document.body.appendChild(fileLink);

                    fileLink.click();
                });
            }
        }
    }
</script>

<style lang="less">
    @import "../../../../css/colors";


</style>