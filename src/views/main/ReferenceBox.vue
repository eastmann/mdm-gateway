<template>
    <div class="ref-box">
        <div :class="fullIconClass" v-on:click="onIconClick"></div>
        <div class="ref-box-header">{{header}}</div>
        <div class="ref-box-description">
            <slot />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['icon-class', 'header'],
        name: "ReferenceBox",
        computed: {
            fullIconClass() {
                return "ref-box-icon " + this.iconClass;
            }
        },
        methods: {
            onIconClick() {
                this.$emit('icon-click');
            }
        }
    }
</script>
<style>
    .ref-box {
        display: inline-block;
        width: 378px;
        border-radius: 10px;
        background-color: #f4f4fe;
        text-align: center;
        padding: 0 38px;
        box-sizing: border-box;
        vertical-align: top;
        height: 400px;
    }

    .ref-box.central {
        margin: 0 12px;
    }

    .ref-box a {
        text-decoration: underline;
    }

    .ref-box p {
        padding-top: 10px;
    }

    .ref-box-icon {
        width: 112px;
        height: 112px;
        box-shadow: 0 0 17px 1px rgba(0, 0, 0, 0.31);
        background-color: #ffffff;
        border-radius: 56px;
        margin: auto;
        margin-top: 44px;
        cursor: pointer;
    }

    .ref-box-website {
        background: url("../../assets/img/icons/main-page/icon_website.png") no-repeat center;
        background-color: #FFFFFF;
    }

    .ref-box-pin {
        background: url("../../assets/img/icons/main-page/icon_pin.png") no-repeat center;
        background-color: #FFFFFF;
    }

    .ref-box-api {
        background: url("../../assets/img/icons/main-page/icon_api.png") no-repeat center;
        background-color: #FFFFFF;
    }

    .ref-box-header {
        color: #273a64;
        font-size: 24px;
        font-weight: 700;
        margin-top: 30px;
        padding-top: 10px;
    }

    .ref-box-description {
        color: #273a64;
        font-size: 15px;
        font-weight: 400;
        line-height: 20px;
    }

    .ref-box p {
        margin-top: 10px;
    }

</style>