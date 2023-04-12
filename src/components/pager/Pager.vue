<template>
    <div class="pager" v-if="pageCount > 1">
        <template v-if="needShowBeginningButton">
            <a class="pager-element" v-on:click="goToBeginning()">&lt;&lt;</a>
        </template>
        <template v-if="needShowPreviousButton">
            <a class="pager-element" v-on:click="goToPrevious()">&lt;</a>
        </template>
        <span class="pager-element" v-for="page in shownPages" v-bind:key="page">
            <template v-if="page === currentPage">
                <span class="pager-element">{{page}}</span>
            </template>
            <template v-else>
                <a class="pager-element" v-on:click="pageSelected(page)">{{page}}</a>
            </template>
        </span>
        <template v-if="needShowNextButton">
            <a class="pager-element" v-on:click="goToNext()">&gt;</a>
        </template>
        <template v-if="needShowEndButton">
            <a class="pager-element" v-on:click="goToEnd()">&gt;&gt;</a>
        </template>
    </div>
</template>

<script>

    export default {
        name: "Pager",
        props: {
            "pageCount": {
                type: Number,
                default: 1
            }
        },
        computed: {
            shownPages() {
                let result = [];

                if(this.currentPage > 1) {
                    result.push(this.currentPage - 1);
                }
                result.push(this.currentPage);
                if(this.currentPage < this.lastPage) {
                    result.push(this.currentPage + 1);
                }
                if(this.currentPage === 1 && this.lastPage > 2) {
                    result.push(this.currentPage + 2);
                }
                return result;
            },
            lastPage() {
                return this.pageCount;
            },
            needShowBeginningButton() {
                return this.currentPage > 2;
            },
            needShowPreviousButton() {
                return this.currentPage > 1;
            },
            needShowNextButton() {
                return this.currentPage < this.lastPage;
            },
            needShowEndButton() {
                return this.lastPage - this.currentPage > 2
            }
        },
        data() {
            return {
                currentPage: 1
            }
        },
        methods: {
            pageSelected(page) {
                this.currentPage = page;
                this.$emit("page-selected", page);
            },
            goToPrevious() {
                this.pageSelected(this.currentPage - 1);
            },
            goToNext() {
                this.pageSelected(this.currentPage + 1);
            },
            goToBeginning() {
                this.pageSelected(1);
            },
            goToEnd() {
                this.pageSelected(this.lastPage);
            }
        }
    }
</script>

<style scoped>
    .pager {
        margin: 10px 0;
        text-align: center;
    }
    a.pager-element {
        cursor: pointer;
    }
    .pager-element {
        padding: 5px
    }
    .page {
        display: inline-block;
    }
</style>