<template>
    <table class="drop-down-border-table drop-down-table">
        <tr>
            <td width="30">
                <img src="@/assets/img/check_list/info_factor.png" class="stop-info"
                     v-if="isInfoFactor(value)">

                <img src="@/assets/img/check_list/stop_factor.png" class="stop-info"
                     v-if="isStopFactor(value)">

                <img src="@/assets/img/check_list/ok.png" class="ok-info"
                     v-if="isOk(value)">

                <img src="@/assets/img/check_list/ok.png" class="ok-info"
                     v-if="isEnabledOk(value)">

            </td>
            <td>
                {{caption}}
            </td>

            <td class="yes-no-params"  v-if="isEditable(value)">
                <DropDownYesNo caption="" v-bind:disabled="disabled" v-model="selected"/>
            </td>

            <td class="yes-no-params" v-if="!isEditable(value)"  v-bind:class="{ yes: yesNoRus(value) === 'Да' }">
                {{yesNoRusDisabled(value)}}
            </td>

        </tr>
    </table>
</template>

<script>
    import DropDownYesNo from "@/components/checkList/DropDownYesNo";

    export default {
        components: {DropDownYesNo},

        props: {
            'caption': String,
            'factor': String,
            'editable': Boolean,
            'disabled' : Boolean,
            'value': [String, Number, Boolean, Object, Array],
        },

        methods: {

            isEmpty(val){
                if ((val == null) || (val === '') || (val === 'UNDEFINED')){
                    return true;
                }
                return false;
            },

            isEnabledOk(val){
             return (!this.isEditable(val) && ((val === 'UNDEFINED')))
            },

            isEditable(val){
               return this.editable;
            },

            isStopFactor(val){
                return  ((val==='YES') && (this.factor === 'STOP'))
            },

            isOk(val){
                if (this.isEmpty(val)) return false;
                if (this.isStopFactor(val) || (this.isInfoFactor(val))
                    && (val==='YES')) return false;

                return  true
            },

            isInfoFactor(val){
                return  ((val==='YES') && (this.factor === 'INFO'))
            },

            yesNoRus(yesNo) {
                if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED'))
                    return '--';
                if (yesNo === 'NO')
                    return 'Нет';
                if (yesNo === 'YES')
                    return 'Да';
                return 'Нет';
            },

            yesNoRusDisabled(yesNo) {
                if ((yesNo == null) || (yesNo === '') || (yesNo === 'UNDEFINED'))
                    return 'Нет';
                if (yesNo === 'NO')
                    return 'Нет';
                if (yesNo === 'YES')
                    return 'Да';
                return 'Нет';
            },
        },

        computed: {
            selected: {
                get() {
                    return this.value
                },
                set(v) {
                    this.$emit('input', v)
                }
            },
        },

        name: "DropDownTableRow",
        data() {
            return {

            }
        },
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .drop-down-border-table {
        margin-top: 2px;
        border-collapse: collapse;
        width: 100%;

        th {
            border: 1px solid black;
            text-align: left;
            color: black;
            vertical-align: middle;
            padding: 5px;
        }

        td {
            border: 1px solid black;
            padding: 5px;
            height: 40px;
        }
    }

    .yes-no-params{
        text-align: center;
        width: 60px;
    }

    .drop-down-table {
        font-weight: lighter;
        font-size: 16px;
        margin-left: 5px;
    }
</style>