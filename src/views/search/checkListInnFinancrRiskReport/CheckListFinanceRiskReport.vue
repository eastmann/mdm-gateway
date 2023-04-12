<template>
    <div>
        <div class="card-header-inn">
            Отчет по финансовым рискам
        </div>

        <div>
            <div class="margin-top-30">
                <form enctype="multipart/form-data">
                    <label class="my-label" for="inputTag">
                        Загрузите список инн в формате csv:
                        <i class="far fa-file-excel save-excel-icon">
                            выберите файл {{filename}}
                            <input class="my-input" id="inputTag" type="file" @change="onFileChange">
                        </i>
                    </label>

                </form>
                <!--                <div class="rtk-button-port" v-on:click="loadJournalDataOnPage(0)">Сформировать</div>-->
            </div>

            <div>
                <textarea style="width: 450px; height: 300px;margin-top: 10px" class="mdm-text" v-model="inputInn"
                          placeholder="Введите ИНН">
                </textarea>
                <div class="load-info-report">
                    {{loadJournalMessage}}
                </div>
            </div>

            <div class="margin-top-30">
                <div class="rtk-button-save" v-on:click="exportCheckListInnToExel">
                    Сформировать отчет в excel
                </div>

<!--                <i class="far fa-file-excel save-excel-icon" v-on:click="exportCheckListInnToExel"-->
<!--                   title="Выгрузить в Excel">-->
<!--                    Сформировать отчет в excel-->
<!--                </i>-->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import urls from "@/js/utils/urls";

    let PAGE_SIZE = 20;

    export default {
        name: "CheckListFinanceRiskReport",
        data() {
            return {
                inputInn: "",
                loadJournalMessage: "",
                fileinput: '',
                filename: ''
            }
        },

        props: {},

        computed: {},

        methods: {
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createInput(files[0]);
            },

            createInput(file) {
                var reader = new FileReader();
                var vm = this;
                this.filename = file.name;
                reader.readAsText(file);
                reader.onload = (e) => {
                    vm.fileinput = reader.result;
                    this.inputInn = this.fileinput;
                }
            },

            transformToJson(inputInn) {
                let innList = inputInn.split("\n");
                return {
                    "inns": innList
                };
            }
            ,

            exportCheckListInnToExel() {
                this.loadJournalMessage = "Загрузка данных отчета...";
                var file = 'CheckListInnFinanceRiskReport.xlsx';
                axios({
                    method: 'post',
                    url: urls.exportCheckListInnReportToExcel(),
                    responseType: 'arraybuffer',
                    data: this.transformToJson(this.inputInn),
                })
                    .then(response => {
                        this.loadJournalMessage = "";
                        let blob = new Blob([response.data], {
                            type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = file
                        link.click()
                    })
                    .catch((error) => {
                        this.loadJournalMessage = "";
                    });
            }
            ,

        }
    }

</script>

<style lang="less">
    @import "../../../css/colors";

    .rtk-button-save {
        display: inline-block;
        /*margin-left: 10px;*/
        font-size: 16px;
        font-weight: bold;

        padding: 8px 20px 8px;
        border-radius: 10px;
        border: 2px solid @baseViolet;
        background-color: #fefefe;
        color: @baseViolet;
        cursor: pointer;
    }

    .my-input {
        display: none;
    }

    .my-label {
        cursor: pointer;
    }

    .save-excel-icon {
        color: @baseViolet;
        opacity: 0.5;
        cursor: pointer;

        &:hover {
            opacity: 1.0 !important;
        }
    }

    .card-header-inn {
        font-weight: bold;
        text-align: center;
        font-size: 32px;
        padding-top: 45px;
        padding-bottom: 5px;

    }

    .load-info-report {
        font-weight: bold;
        height: 10px;
        /*color: red;*/
        /*text-align: center;*/
        /*font-size: 24px;*/
        /*padding-top: 15px;*/
        /*padding-bottom: 5px;*/
    }

</style>