<template>
    <div>
        <h2><i class="header-icon fas fa-info-circle grey"/>Регистрационная информация</h2>
        <div class="company-fields">
            <DataField caption="ИНН" :value="companyInn"/>
            <template v-if="sparkCompany">
                <DataField caption="Идентификатор СПАРК" :value="sparkCompany.sparkId"/>
                <DataField caption="ОГРН" :value="sparkCompany.ogrn"/>
                <DataField caption="ОКПО" :value="sparkCompany.okpo"/>
                <DataField caption="Статус" :value="sparkCompany.statusText"/>
                <DataField caption="ЕГРПО Включено" :value="egrpoIncluded"/>
                <DataField caption="Ликвидация ЕГРЮЛ" :value="sparkCompany.egrulLikvidation"/>
                <DataField caption="ОКАТО" :value="sparkCompany.okato"/>
                <DataField caption="Запись создана" :value="sparkCompany.createDate"/>
                <DataField caption="Запись обновлена" :value="sparkCompany.changeDate"/>
            </template>
        </div>
    </div>
</template>

<script>
    import DataField from "@/components/datafield/DataField";
    import urls from "@/js/utils/urls"

    export default {
        name: "CompanyTopic",
        components: {
            DataField,
        },
        props: {
            'sparkCompany': Object,
            'companyInn' : String,
            'shortName' : String
        },
        computed:{
            egrpoIncluded() {
                if(this.sparkCompany != null && this.sparkCompany.sparkCompanyData != null
                    && this.sparkCompany.sparkCompanyData.egrpoIncluded != null) {
                    return this.sparkCompany.sparkCompanyData.egrpoIncluded == 'true';
                } else {
                    return null;
                }
            }
        }
    }
</script>
<style lang="less">
</style>