<template>
    <div class="text-edit">
        {{caption}}
        <input :type="type !== '' ? type : 'text'" class="text-edit-value"  :value="value" v-on:focusout="rtFocusOut($event.target.value)" @input="$emit('input', $event.target.value)" :size="size" :placeholder="placeholder">
    </div>
</template>

<script>
    export default {
        props: {
            'caption': String,
            'placeholder': String,
            'size': [String, Number],
            'type': String,
            'value': [String, Number, Boolean, Object, Array],
        },
        name: "TextEdit",
        data() {
            return {

            }
        },

        methods: {
            rtFocusOut(val){
                this.$emit('focusout', val)
            },
        }
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .text-edit {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type='number'] {
            -moz-appearance: textfield;
        }
    }

    .text-edit-value{
        font-size: 16px;
        font-weight: normal;
    }
</style>