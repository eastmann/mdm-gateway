<template>
    <div class="utils-button">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ButtonFlat"
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .utils-button {
        display: inline-block;
        margin-left: 6px;
        margin-bottom: 15px;
        font-size: 14px;
        //font-weight: lighter !important;
        padding: 8px 20px 8px;
        border-radius: 10px;
        border: 2px solid @baseViolet;
        background-color: #fefefe;
        color: @baseViolet;
        cursor: pointer;
    }
</style>