<template>
    <div>
        <hr>
        <h2>
            <i class="header-icon fas fa-id-card grey"/>Контактная информация
            <span class="m-l-5">
                <i class="far fa-file-excel save-excel-icon"  v-on:click="export2gisData" title="Выгрузить в Excel"/>
            </span>
        </h2>
        <table class="mdm-table">
            <th>Адрес</th>
            <th>Расположение</th>
            <th>Телефон</th>
            <th>Веб-сайт</th>
            <th>Соцсети</th>
            <th>Рубрики</th>

            <tr v-for="(row, index) in twoGisData" v-bind:key="index">
                <td>{{addressString(row)}}</td>
                <td>{{locationString(row)}}</td>
                <td>{{joinByPipe(row.phones)}}</td>
                <td>{{joinByPipe(row.websites)}}</td>
                <td>{{joinByPipe(row.socialNetworks)}}</td>
                <td>{{joinByPipe(row.rubrics)}}</td>
            </tr>
        </table>
        <Pager :page-count="totalPages" v-on:page-selected="loadCompanyTwoGisDataOnPage($event)"/>
    </div>
</template>

<script>
    import urls from "@/js/utils/urls";
    import axios from "axios";
    import Pager from "@/components/pager/Pager";

    let PAGE_SIZE = 6;
    let TWO_GIS_DATA_ERROR = "Не удалось загрузить данные по 2ГИС"

    export default {
        name: "TwoGisTableData",
        props: ['companyInn'],
        components: {
            Pager
        },
        data() {
            return {
                twoGisDataLoading: false,
                twoGisData: null,
                twoGisMessage: null,
                totalPages: 0
            }
        },
        mounted() {
            this.loadCompanyTwoGisData();
        },
        methods: {
            addressString(row) {
                let parts = [];
                parts.push(row.city);
                parts.push(row.street);

                if(row.houseNum != null) {
                    parts.push('д '+ row.houseNum);
                }

                return parts.filter(p => p != null && p != "").join(", ");
            },

            locationString(row) {
                let parts = [];
                if(row.floor != null && row.floor != '') {
                    let floors = row.floor.split(" ");
                    parts.push(floors.filter(f => f != null && f != '')
                        .join(", ")+" этаж");
                }
                if(row.office != null && row.office != "") {
                    parts.push("офис "+row.office);
                }
                return parts.join(", ");
            },
            joinByPipe(arr) {
                if(arr == null || !Array.isArray(arr)) {
                    return '';
                } else {
                    return arr.join(" | ");
                }
            },
            loadCompanyTwoGisData() {
                this.loadCompanyTwoGisDataOnPage(1);
            },
            loadCompanyTwoGisDataOnPage(page) {
                this.twoGisDataLoading = true;

                let url = urls.twoGisDataByInn(this.companyInn, page, PAGE_SIZE);
                let component = this;

                axios.get(url).then(response => {
                    component.twoGisDataLoading = false;

                    if (response.data != null) {
                        if (response.data.totalObjects == null || response.data.totalObjects === 0) {
                            component.twoGisData = null;
                        } else {
                            component.twoGisData = response.data.data;
                            component.totalPages = response.data.totalPages;
                        }
                    }
                })
                .catch(e => {
                    component.twoGisDataLoading = false;
                    component.twoGisMessage = TWO_GIS_DATA_ERROR;
                })
            },
            export2gisData(){
                var file = '2gisClient-' + this.companyInn + '.xlsx';
                axios({
                    method: 'post',
                    url: urls.gisDataExportByInn(this.companyInn),
                    responseType: 'arraybuffer',
                })
                    .then(response => {
                        let blob = new Blob([response.data], {
                            type: 'application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = file
                        link.click()
                    });
            }
        },
        watch: {
            companyInn(newCompany, oldCompany) {
                if (newCompany != null) {
                    this.loadCompanyTwoGisData();
                }
            }
        }
    }
</script>

<style scoped>
    .m-l-5 { margin-left: 5px; }
</style>