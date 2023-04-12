<template>
    <div>
        <h2>Регистрационная информация</h2>
        <div class="company-fields">
            <DataField caption="ИНН ИП" :value="companyInn"/>
            <DataField caption="Идентификатор СПАРК" :value="sparkEntrepreneur.sparkId"/>
            <DataField caption="ОГРНИП" :value="sparkEntrepreneur.ogrnIp"/>
            <DataField caption="ОКПО" :value="sparkEntrepreneur.okpo"/>
            <DataField caption="ОКАТО" :value="sparkEntrepreneur.okato"/>
            <DataField caption="Код ОКАТО" :value="sparkEntrepreneur.okatoCode"/>
            <DataField caption="Код региона" :value="sparkEntrepreneur.okatoRegionCode"/>
            <DataField caption="Наименование региона" :value="sparkEntrepreneur.okatoRegionName"/>
            <DataField caption="Код ОКТМО" :value="sparkEntrepreneur.oktmoCode"/>
            <DataField caption="ОКОПФ" :value="sparkEntrepreneur.okopfCode"/>
            <DataField caption="Наименование кода ОКОПФ" :value="sparkEntrepreneur.okopfName"/>
            <DataField caption="Дата первичной регистрации" :value="sparkEntrepreneur.dateFirstReg" :is-date="true"/>
            <DataField caption="Дата регистрации" :value="dateToText(sparkEntrepreneur.dateReg)" :is-date="true"/>
            <DataField caption="Дата рождения" :value="dateToText(sparkEntrepreneur.birthDate)" :is-date="true"/>
            <DataField caption="Место рождения" :value="sparkEntrepreneur.birthPlace"/>
            <DataField caption="Пол" :value="sparkEntrepreneur.sexName"/>
            <DataField caption="Гражданство" :value="sparkEntrepreneur.citizenshipName"/>
            <DataField caption="Статус" :value="sparkEntrepreneur.statusText"/>
            <DataField caption="Состояние" :value="sparkEntrepreneur.statusGroupName"/>
            <DataField caption="Дата статуса" :value="dateToText(sparkEntrepreneur.statusDate)" :is-date="true"/>
        </div>
    </div>
</template>

<script>
    import DataField from "@/components/datafield/DataField";

    export default {
        name: "EntrepreneurTopic",
        components: {
            DataField,
        },
        props: {
            'sparkEntrepreneur': Object,
            'companyInn': String,
            'shortName': String
        },
        methods: {
            dateToText(myDate){
                if (myDate === null) {
                    return  '';
                }
                return new Date(myDate).toLocaleDateString();
            },
        }
    }
</script>
