<template>
    <div class="data-field" v-if="needShow">
        <div class="data-field-caption">{{caption}}</div>
        <div class="data-field-value">{{shownValue}}</div>
    </div>
</template>

<script>
    import dateUtils from '../../js/utils/date'

    let UNDEFINED_STR = 'Не определено';

    export default {
        props: {
            'caption': String,
            'value': [String, Number, Boolean, Object, Array],
            'hideOnNull' : {
                type: Boolean,
                default: true
            },
            'format': {
                type: Boolean,
                default: true
            },
            'isDate': {
                type: Boolean,
                default: false
            },
            'delimiter': {
                type: String,
                default: ', '
            }
        },
        name: "DataField",
        data() {
            return {

            }
        },
        computed: {
            shownValue() {
                if(this.value == null) {
                    return UNDEFINED_STR;
                }
                if(typeof this.value == "boolean") {
                    return this.value ? 'Да' : 'Нет';
                }
                if(typeof this.value == "object") {
                    if(Array.isArray(this.value)) {
                        return this.value.join(this.delimiter);
                    } else if(this.value.description != null) {
                        return this.value.description;
                    }
                    return UNDEFINED_STR;
                }
                if(typeof this.value == 'number') {
                    if(this.isDate) {
                        let date = new Date();
                        date.setTime(this.value);
                        return dateUtils.formatDefault(date)
                    }
                    if(this.format) {
                        return this.value.toLocaleString('ru-RU');
                    } else {
                        return this.value;
                    }
                }
                return this.value;
            },
            needShow() {
                if(this.hideOnNull && (this.value == null || this.value == ""
                    || (Array.isArray(this.value) && this.value.length == 0))) {
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style lang="less">
    @import "../../css/colors";

    .data-field-caption {
        color: @baseViolet;
        margin-top: 10px;
    }
</style>