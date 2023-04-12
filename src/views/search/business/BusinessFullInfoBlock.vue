<template>
    <div class="company-block">

        <v-businessPageHeader :company-name="shortName" :inn="companyInn" />

        <v-companyTopic v-if="sparkEntrepreneur == null"
                        :short-name="shortName"
                        :company-inn="companyInn"
                        :spark-company="sparkCompany"/>

        <v-entrepreneurTopic v-if="sparkEntrepreneur"
                             :short-name="shortName"
                             :company-inn="companyInn"
                             :spark-entrepreneur="sparkEntrepreneur"/>

        <v-twoGisTableData :company-inn="companyInn" />

        <v-rtkData :company-inn="companyInn"
                   :cdi-data="cdiData"/>

        <v-companyBody v-if="sparkCompany" :spark-company="sparkCompany"/>

        <v-entrepreneurBody v-if="sparkEntrepreneur" :spark-entrepreneur="sparkEntrepreneur"/>
    </div>
</template>

<script>
    import RtkData from "./parts/RtkData";
    import CompanyTopic from "./parts/CompanyTopic";
    import CompanyBody from "./parts/CompanyBody";
    import EntrepreneurTopic from "./parts/EntrepreneurTopic";
    import EntrepreneurBody from "./parts/EntrepreneurBody";
    import BusinessPageHeader from "@/views/search/business/parts/BusinessPageHeader";
    import TwoGisTableData from "@/views/search/business/parts/TwoGisTableData";
    import innUtils from "../../../js/utils/inn-utils"

    export default {
        name: "CompanyBlock",
        components: {
            'v-twoGisTableData': TwoGisTableData,
            'v-rtkData': RtkData,
            'v-companyTopic': CompanyTopic,
            'v-companyBody': CompanyBody,
            'v-entrepreneurTopic': EntrepreneurTopic,
            'v-entrepreneurBody': EntrepreneurBody,
            'v-businessPageHeader': BusinessPageHeader
        },


        computed: {
            twoGisData() {
                if (this.responseData != null && this.responseData.twoGisData != null) {
                    return this.responseData.twoGisData.data;
                }
                return null;
            },
            sparkEntrepreneur() {
                if (this.responseData != null && this.responseData.sparkData != null){
                    return this.responseData.sparkData.entrepreneur;
                }
                return null;
            },
            sparkCompany() {
                if (this.responseData != null && this.responseData.sparkData){
                    return this.responseData.sparkData.company;
                }
                return null;
            },
            cdiData() {
                if (this.responseData != null && this.responseData.cdiDto){
                    return this.responseData.cdiDto.suggestions;
                }
                return null;
            },
            rtkShortData() {
                if (this.responseData != null && this.responseData.rtkData != null) {
                    return this.responseData.rtkData.data
                }
                return null;
            },
            companyInn() {
                if (this.sparkCompany != null) {
                    return this.sparkCompany.inn
                } else if (this.sparkEntrepreneur != null) {
                    return this.sparkEntrepreneur.inn
                } else if (this.twoGisData != null) {
                    return this.twoGisData.inn
                } else if (this.rtkShortData != null) {
                    return this.rtkShortData.inn
                } else {
                    return null;
                }
            },
            shortName() {
                if (this.sparkCompany != null) {
                    return this.sparkCompany.shortName
                } else if (this.sparkEntrepreneur != null) {
                    return this.sparkEntrepreneur.fullNameRus
                } else if (this.twoGisData != null) {
                    return this.twoGisData.firmName
                } else if (this.rtkShortData != null) {
                    return this.rtkShortData.contrName;
                }
                return null;
            },
        },
        methods: {

        },
        props: ["responseData"],
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    .pledge-block {
        padding-left: 20px;
        border-left: 1px solid @baseViolet;
    }

    .pledge-list-header {
        color: @baseViolet;
    }

    .pledgee-header {
        color: @baseViolet;
    }

    .mdm-table {
        margin-top: 10px;
        border-collapse: collapse;
        width: 100%;

        th {
            border: 1px solid @lightGrey;
            text-align: left;
            color: @baseViolet;
            vertical-align: middle;
            padding: 5px;

        }

        td {
            border: 1px solid @lightGrey;
            padding: 5px;
            font-size: 10px;
        }
    }
</style>