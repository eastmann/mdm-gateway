<template>
    <div class="unexpand-box">
        <div class="unexpand-box-header">
            <i :class="['fa', iconClass, 'unexpand-icon']"></i>
            <div :class="headerClassObject">
                {{header}}
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "UnexpandBox",
        props: ['header', 'headerClass'],
        computed: {
            iconClass() {
                return 'fa fa-circle'
            },
            headerClassObject() {
                let result = {};
                result['unexpand-box-header-label'] = true;

                if(this.headerClass != null) {
                    result[this.headerClass] = true;
                }

                return result;
            }
        }
    }
</script>

<style lang="less" >
    @import "../../css/colors";

    .unexpand-box {
        margin-top: 16px;
    }

    .unexpand-box-header {
        display: grid;
        grid-template-columns: 30px calc(100% - 30px);
    }

    .unexpand-box-header-label {
        margin-left: 20px;
        color: @baseViolet;
        cursor: pointer;
    }

    .unexpand-box-content {
        padding-left: 30px;
        overflow: hidden;
    }

    .unexpand-icon {
        font-size: 6px;
        color: @baseViolet;
        justify-self: center;
        align-self: center;
    }

    //Стиль применяется по желанию, указывается в header-class
    .big-expand-header {
        font-size: 20px;
        font-weight: bold;
    }
</style>