<template>
    <div>
        <hr>
        <h2>Контактная информация</h2>
        <div class="company-fields">
            <DataField caption="Телефон" :value="twoGisData.phones"/>
            <DataField caption="E-mail" :value="twoGisData.emails"/>
            <LinkDataField caption="Web-сайт" :multiple-value="twoGisData.websites"/>
            <DataField caption="Соцсети" :value="twoGisData.socialNetworks"/>
            <DataField caption="Рубрики" :value="twoGisData.rubrics"/>
        </div>
    </div>
</template>

<script>
    import DataField from "@/components/datafield/DataField";
    import LinkDataField from "@/components/datafield/LinkDataField";

    export default {
        name: "TwoGisData",
        components: {
            DataField,
            LinkDataField,
        },

        props: {
            'twoGisData': Object,
        },
    }
</script>
