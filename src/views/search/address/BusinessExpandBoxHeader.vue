<template>
    <div class="expand-box-header-with-icons">
        <div class="expand-box-header-icons">
            <img src="@/assets/img/icons/company/is_in_spark.png"
                 class="company-info-icon" v-if="isInSpark" title="Зарегистрирована в СПАРК">
            <img src="@/assets/img/icons/company/is_in_2gis.png"
                 class="company-info-icon" v-if="isInTwoGis" title="Располагается в 2ГИС">
            <img src="@/assets/img/icons/company/is_in_rtk.png"
                 class="company-info-icon" v-if="isInRtk" title="Является клиентом РТК">
        </div>
        <div class="expand-box-header-with-icons-label">
            {{companyName}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "BusinessExpandBoxHeader",
        props: ["companyName", "isInSpark", "isInTwoGis", "isInRtk"]
    }
</script>

<style scoped lang = "less">
    @import "../../../css/colors";

    .expand-box-header-with-icons {
        display: grid;
        grid-template-columns: 65px calc(100% - 65px);
        height: 20px;
    }
    .expand-box-header-with-icons-label {
        color: @baseViolet;
        margin-left: 7px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        padding-top: 2px;
    }
    .company-info-icon {
        height: 20px;
        padding-left: 3px;
    }
</style>