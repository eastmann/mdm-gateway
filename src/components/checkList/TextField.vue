<template>
    <div class="text-field">
        {{caption}}
        <span class="text-value">
            {{value}}
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            'caption': String,
            'value': [String, Number, Boolean, Object, Array],
        },
        name: "TextField",
        data() {
            return {

            }
        },
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .text-field {
        margin-top: 10px;
        font-size: 16px;
    }
    .text-value {
        font-weight: bold;
    }
</style>