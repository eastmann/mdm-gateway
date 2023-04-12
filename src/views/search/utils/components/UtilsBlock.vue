<template>
    <div class="base-utils-block">
        <div class="ao-block utils-section">
            <h2>{{caption}}</h2>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "UtilsBlock",
        props: {
            'caption': String,
        },

        data() {
            return {

            }
        },

        mounted() {

        },

        methods: {

        }
    }
</script>

<style lang="less">
    @import "../../../../css/colors";

    .base-utils-block {
        display: inline-block;

        margin: 20px;
        padding: 10px;
        border: 1px solid @baseViolet;
        transition: height 0.3s ease;
        overflow: hidden;
        font-weight: lighter;
        border-radius: 5px;
        height: 300px;
        width: 500px;
    }

    .utils-section {
        padding-top: 20px;
        margin-bottom: 20px;
    }
</style>