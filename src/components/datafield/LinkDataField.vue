<template>
    <div class="data-field" v-if="needShow">
        <div class="data-field-caption">{{caption}}</div>
        <a v-if="value" :href="href(value)" >{{value}}</a>
        <div v-if="isNotEmpty(multipleValue)" class="data-field-value">
            <span v-for="(v, i) in multipleValue" v-bind:key="i">
                <template v-if="i > 0">, </template>
                <a :href="href(v)">{{v}}</a>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LinkDataField",
        props: {
            'caption': String,
            'value': {
                type: [String, Object],
                default: null
            },
            'multipleValue': {
                type: Array,
                default: null
            },
            'hideOnNull' : {
                type: Boolean,
                default: true
            }
        },
        computed: {
            needShow() {
                if(this.hideOnNull && (this.value == null
                    && (this.multipleValue == null ||
                        (Array.isArray(this.multipleValue) && this.multipleValue.length == 0)))) {
                    return false;
                }
                return true;
            }
        },
        methods: {
            href(src) {
                if(src.startsWith("http://") || src.startsWith("https://")) {
                    return src;
                } else {
                    return "http://"+src;
                }
            },
            isNotEmpty(arr) {
                return Array.isArray(arr) && arr.length > 0;
            }
        }
    }
</script>

<style scoped>

</style>