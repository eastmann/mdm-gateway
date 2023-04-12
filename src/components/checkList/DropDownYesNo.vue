<template>
    <div class="drop-down-yes-no">
        {{caption}}
        <select v-model="selected" v-bind:disabled="disabled"  class="margin-select-yes-no">
            <option v-for="item in yesNoParam" v-bind:value="item.name"
                    v-bind:key="item.id">
                {{ item.rusName }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        props: {
            'caption': String,
            'disabled' : Boolean,
            'value': [String, Number, Boolean, Object, Array],
        },
        name: "DropDown",
        data() {
            return {
                yesNoParam: [{code: '-1', name: 'UNDEFINED', rusName: '--'},
                    {code: '0', name: 'NO', rusName: 'Нет'},
                    {code: '1', name: 'YES', rusName: 'Да'}],
            }
        },

        computed: {
            selected: {
                get(){
                    return this.value
                },
                set(v){this.$emit('input', v) }
            },
        }
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .margin-select-yes-no{
        margin-left: 5px;
        font-size: 16px;
        height: 25px;
    }

    .drop-down-yes-no {
        margin-top: 5px;
        font-size: 16px;
        font-weight: bold;
    }
</style>