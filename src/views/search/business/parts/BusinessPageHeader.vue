<template>
    <div class="company-header-block">
        <a v-if="showGoToSpark" class="go-to-spark-href"
           v-on:click="goToSpark('http://dd.rt.ru/mdm/ExtendedReport','Посмотреть в АРМ СПАРК')">Посмотреть в АРМ СПАРК <i class="fa fa-arrow-right"></i> </a>
        <h1><i :class="iconClassForCompany" title="titleForBusinessUnit"/>{{companyName}}</h1>
    </div>
</template>

<script>
    import urls from "@/js/utils/urls";
    import innUtils from "@/js/utils/inn-utils"
    import axios from "axios";

    export default {
        name: "BusinessPageHeader",
        props: {
            "inn" : String,
            "companyName" : String,
            "showGoToSpark" : {
                type: Boolean,
                default: true
            }
        },
        computed: {
            iconClassForCompany() {
                if(innUtils.isCompanyInn(this.inn)) {
                    return 'far fa-building';
                } else {
                    return 'fa fa-briefcase';
                }

            },
            titleForBusinessUnit() {
                if(innUtils.isCompanyInn(this.inn)) {
                    return 'Компания'
                } else {
                    return 'ИП'
                }
            }
        },
        methods: {
            goToSpark(urlSpark, info) {
                let urlToGo = urls.userHistory(urlSpark, this.inn);
                axios.get(urlToGo)
                    .then(function (response) {
                    })
                    .catch(function (e) {
                    });

                let url = urls.goToSparkUrl(this.inn, this.companyName);
                window.open(url, "_blank");
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../../../css/colors';

    .company-header-block {
        /*display: grid;*/
        /*grid-template-columns: 1fr 1fr;*/

        h1 {
            i {
                margin-right: 10px;
            }
        }

        a {
            color: @baseOrange;
            align-self: center;
            margin-right: 10px;
            cursor: pointer;

            .fa {
                margin-left: 5px;
            }
        }
    }
    .go-to-spark-href {
        /*text-align: right;*/
        margin-left: 20px;
        float: right;
        text-align: right;
    }
</style>