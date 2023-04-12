<template>
    <div class="drop-down">

        {{caption}}

        <select v-model="selected" v-bind:disabled="disabled" v-bind:isFullName="isFullName" v-on:change="onChange($event.target.value)" class="margin-left-5 mdm-select">
            <option v-for="item in options" v-bind:value="item.fullName"
                    v-bind:key="item.id">
                <span v-if="isFullName">{{ item.fullName }} </span>
                <span v-if="!isFullName">{{ item.shortName }} </span>
            </option>
        </select>

        <img v-if="value && !noImage" src="@/assets/img/check_list/ok.png" class="ok-info">
    </div>
</template>

<script>
    export default {
        props: {
            'caption': String,
            'disabled': Boolean,
            'isFullName': Boolean,
            'noImage': Boolean,
            'value': [String, Number, Boolean, Object, Array],
            'options': [String, Number, Boolean, Object, Array],
        },
        name: "DropDown",
        data() {
            return {

            }
        },
        computed: {
            selected: {
                get(){
                    return this.value
                },
                set(v){
                    this.$emit('input', v)
                }
            },
        },

        methods: {
            onChange(e){
                this.$emit('change', e)
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .drop-down {
        margin-top: 10px;
        font-size: 16px;
        font-weight: bold;
    }
</style>