<template>
    <div class="expand-box">
        <div class="expand-box-header" v-on:click="toggleExpand">
            <i :class="['fa', iconClass, 'expand-icon']"></i>
            <slot name="header">
                <div :class="headerClassObject">
                    {{header}}
                </div>
            </slot>
        </div>
        <transition v-on:enter="animEnter" v-on:leave="animLeave">
            <div class="expand-box-content" v-if="expanded">
                <slot />
            </div>
        </transition>
    </div>
</template>

<script>
    import * as $ from 'jquery'

    export default {
        name: "ExpandBox",
        props: ['header', 'headerClass'],
        computed: {
            iconClass() {
                return this.expanded ? 'fa-caret-down' : 'fa-caret-right'
            },
            headerClassObject() {
                let result = {};
                result['expand-box-header-label'] = true;

                if(this.headerClass != null) {
                    result[this.headerClass] = true;
                }

                return result;
            }
        },
        data() {
            return {
                expanded: false
            }
        },

        methods: {
            toggleExpand() {
                this.expanded = !this.expanded;
            },
            animEnter(el) {
                let parent = $(el).closest('expand-box-content');
                parent.css('max-height', parent.scrollHeight);
                $(el).animate({"max-height": el.scrollHeight}, 300, () => {
                    $(el).css('max-height', '')
                })
            },
            animLeave(el, done) {
                $(el).css('max-height', el.scrollHeight);
                $(el).animate({"max-height": 0}, 300, () => done())
            }

        }
    }
</script>

<style lang="less" >
    @import "../../css/colors";
    @import "../../css/animations";

    .expand-box {
        margin-top: 16px;
    }

    .expand-box-header {
        display: grid;
        grid-template-columns: 30px calc(100% - 30px);
    }

    .expand-box-header-label {
        margin-left: 20px;
        color: @baseViolet;
        cursor: pointer;
    }

    .expand-box-content {
        padding-left: 30px;
        overflow: hidden;
    }

    .expand-icon {
        font-size: 16px;
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