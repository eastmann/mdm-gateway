<template>
    <div class="block-info">
        <div class="font-color-violet">
            <img src="@/assets/img/check_list/info.png" class="icon-info">
            {{caption}}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "BlockInfo",
        props: {
            'caption': String,
        },
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .block-info {
        background-color: #f1f1fd;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 10px 20px 10px 10px;
    }

    .icon-info {
        height: 15px;
        margin-right: 10px;
    }

    .font-color-violet {
        color: #8C00FF;
    }
</style>