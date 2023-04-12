<template>
    <div class="companies" v-if="hasAnyData">
        <ExpandBox :header="companyName">
            <template v-slot:header>
                <BusinessExpandBoxHeader :company-name="companyName" :is-in-spark="sparkCompanyData"
                                         :is-in-two-gis="twoGisCompanyData"
                                        :is-in-rtk="rtkCompanyData"/>
            </template>
            <template v-slot:default>
                <div>
                    <div class="company-info">
                        <div>
                            <h2>Регистрационные данные</h2>
                            <div class="company-fields-block">
                                <DataField caption="ИНН" :value="companyInn"/>

                                <template v-if="sparkCompanyData">
                                    <DataField caption="Идентификатор СПАРК" :value="sparkCompanyData.sparkId"/>
                                    <DataField caption="ОГРН" :value="sparkCompanyData.ogrn"/>
                                    <DataField caption="ОКПО" :value="sparkCompanyData.okpo"/>
                                    <DataField caption="Статус" :value="sparkCompanyData.statusText"/>
                                    <DataField caption="ЕГРПО Включено" :value="egrpoIncluded == 'true'"/>
                                    <DataField caption="Ликвидация ЕГРЮЛ" :value="sparkCompanyData.egrulLikvidation"/>
                                    <DataField caption="ОКАТО" :value="sparkCompanyData.okato"/><DataField caption="Запись создана" :value="sparkCompanyData.createDate"/>
                                    <DataField caption="Запись обновлена" :value="sparkCompanyData.changeDate"/>
                                </template>
                            </div>
                            <template v-if="twoGisCompanyData">
                                <h2>Контактные данные </h2>
                                <div class="company-fields-block">
                                    <DataField caption="Офис в этом здании" value="Да" />
                                    <DataField caption="Телефон" :value="twoGisCompanyData.phones" />
                                    <DataField caption="Рубрики" :value="twoGisCompanyData.rubrics" />
                                </div>
                            </template>
                            <template v-if="rtkCompanyData">
                                <h2>Данные о подключении</h2>
                                <div class="company-fields-block">
                                    <DataField caption="Абонент РТК" :value="true" />
                                    <DataField caption="Подключено услуг" :value="rtkCompanyData.serviceCount" />
                                </div>
                            </template>
                        </div>
                        <div class="go-to-company-arrow" v-on:click="goToCompany">
                            <i class="fa fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </template>
        </ExpandBox>
    </div>
</template>

<script>
    import ExpandBox from "../../../components/layout/ExpandBox";
    import DataField from "../../../components/datafield/DataField";
    import BusinessExpandBoxHeader from "@/views/search/address/BusinessExpandBoxHeader";
    import paths from "../../../js/utils/paths";

    export default {
        components: {
            BusinessExpandBoxHeader,
            ExpandBox,
            DataField
        },
        name: "CompanyBlock",
        props: ['responseData', "house-global-id"],
        data() {
            return {

            }
        },
        computed: {
            hasAnyData() {
                let result =  this.sparkCompanyData != null || this.twoGisCompanyData != null || this.rtkCompanyData != null;
                return result;
            },
            companyName() {
                if(this.responseData != null) {
                    if(this.sparkCompanyData != null) {
                        return this.sparkCompanyData.shortName;
                    } else if (this.responseData.twoGisData != null) {
                        return this.responseData.twoGisData.firmName;
                    } else if (this.responseData.rtkData != null) {
                        return this.responseData.rtkData.contrName;
                    }
                }
                return '';
            },
            companyInn() {
                if(this.responseData != null) {
                    if(this.sparkCompanyData != null){
                        return this.sparkCompanyData.inn;
                    } else if(this.responseData.twoGisData != null) {
                        return this.responseData.twoGisData.inn
                    } else if (this.responseData.rtkData != null) {
                        return this.responseData.rtkData.inn;
                    }
                }
                return null;
            },
            egrpoIncluded() {
                if(this.sparkCompanyData != null && this.responseData.egrpoIncluded != null) {
                    return this.sparkCompanyData.egrpoIncluded == 'true';
                } else {
                    return null;
                }
            },
            sparkCompanyData() {
                if(this.responseData != null && this.responseData.sparkData) {
                    return this.responseData.sparkData.company;
                } else {
                    return null;
                }
            },
            sparkEntrepreneurData() {
                if (this.responseData != null && this.responseData.sparkData) {
                    return this.responseData.sparkData.entrepreneur;
                } else {
                    return null;
                }
            },
            twoGisCompanyData() {
                if(this.responseData != null) {
                    return this.responseData.twoGisData;
                } else {
                    return null;
                }
            },
            rtkCompanyData() {
                if(this.responseData != null) {
                    return this.responseData.rtkData;
                } else {
                    return null;
                }
            }
        },
        methods: {
            goToCompany() {
                if(this.responseData != null) {
                    this.$router.push(paths.businessByInnAndGid(this.companyInn, this.houseGlobalId));
                }
            }
        }
    }
</script>

<style lang="less">
    @import "../../../css/colors";

    .company-info {
        display: grid;
        grid-gap: 10px;
        grid-template-columns: 90% 10%;
    }
    .company-fields-block {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .go-to-company-arrow {
        align-self: center;
        justify-self: center;
        cursor: pointer;

        i {
            font-size: 30px;
            color: @baseViolet;
        }
    }


</style>