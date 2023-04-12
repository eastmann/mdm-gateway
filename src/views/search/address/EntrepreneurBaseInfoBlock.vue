<template>
    <div class="companies" v-if="hasAnyData">
        <ExpandBox :header="entrepreneurName">
            <template v-slot:header>
                <BusinessExpandBoxHeader :company-name="entrepreneurName" :is-in-spark="sparkEntrepreneurData"
                                         :is-in-two-gis="twoGisEntrepreneurData"
                                         :is-in-rtk="rtkEntrepreneurData"/>
            </template>
            <template v-slot:default>
                <div>
                    <div class="company-info">
                        <div>
                            <h2>Регистрационные данные</h2>
                            <div class="company-fields-block">
                                <DataField caption="ИНН" :value="entrepreneurInn"/>
                                <template v-if="sparkEntrepreneurData">
                                    <DataField caption="Идентификатор СПАРК" :value="sparkEntrepreneurData.sparkId"/>
                                    <DataField caption="ОГРН ИП" :value="sparkEntrepreneurData.ogrnip"/>
                                    <DataField caption="ОКПО" :value="sparkEntrepreneurData.okpo"/>
                                    <DataField caption="Статус" :value="sparkEntrepreneurData.statusText"/>
                                    <DataField caption="ОКОПФ" :value="sparkEntrepreneurData.okopfName"/>
                                    <DataField caption="ОКАТО" :value="sparkEntrepreneurData.okatoCode"/>
                                    <DataField caption="ОКАТО (Регион)" :value="sparkEntrepreneurData.okatoRegionName"/>
                                    <DataField caption="Запись создана" :value="sparkEntrepreneurData.createDate"/>
                                    <DataField caption="Запись обновлена" :value="sparkEntrepreneurData.changeDate"/>
                                </template>
                            </div>
                            <template v-if="twoGisEntrepreneurData">
                                <h2>Контактные данные </h2>
                                <div class="company-fields-block">
                                    <DataField caption="Офис в этом здании" value="Да"/>
                                    <DataField caption="Телефон" :value="twoGisEntrepreneurData.phones"/>
                                    <DataField caption="Рубрики" :value="twoGisEntrepreneurData.rubrics"/>
                                </div>
                            </template>
                            <template v-if="rtkEntrepreneurData">
                                <h2>Данные о подключении</h2>
                                <div class="company-fields-block">
                                    <DataField caption="Абонент РТК" :value="true"/>
                                    <DataField caption="Подключено услуг" :value="rtkEntrepreneurData.serviceCount"/>
                                </div>
                            </template>
                        </div>
                        <div class="go-to-company-arrow" v-on:click="goToEntrepreneur">
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
    import paths from "@/js/utils/paths";

    export default {
        components: {
            ExpandBox,
            DataField,
            BusinessExpandBoxHeader
        },
        name: "EntrepreneurBlock",
        props: ['responseData', "house-global-id"],
        data() {
            return {}
        },
        computed: {
            hasAnyData() {
                return this.sparkEntrepreneurData || this.twoGisEntrepreneurData || this.rtkEntrepreneurData;
            },
            entrepreneurName() {
                if (this.responseData != null) {
                    if (this.sparkEntrepreneurData != null) {
                        return this.sparkEntrepreneurData.fullNameRus;
                    } else if (this.responseData.twoGisData != null) {
                        return this.responseData.twoGisData.firmName;
                    } else if (this.responseData.rtkData != null) {
                        return this.responseData.rtkData.contrName;
                    }
                }
                return '';
            },
            entrepreneurInn() {
                if (this.responseData != null) {
                    if (this.sparkEntrepreneurData != null) {
                        return this.sparkEntrepreneurData.inn;
                    } else if (this.responseData.twoGisData != null) {
                        return this.responseData.twoGisData.inn
                    } else if (this.responseData.rtkData != null) {
                        return this.responseData.rtkData.inn;
                    }
                }
                return null;
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
            twoGisEntrepreneurData() {
                if (this.responseData != null) {
                    return this.responseData.twoGisData;
                } else {
                    return null;
                }
            },
            rtkEntrepreneurData() {
                if (this.responseData != null) {
                    return this.responseData.rtkData;
                } else {
                    return null;
                }
            }
        },
        methods: {
            goToEntrepreneur() {
                if (this.responseData != null) {
                    this.$router.push(paths.businessByInnAndGid(this.entrepreneurInn, this.houseGlobalId));
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