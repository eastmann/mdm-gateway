<template>
    <div class="site-section">
        <h1>Поиск по адресу</h1>
        <SearchBox v-on:address-found="loadAddressBySuggestion" v-on:address-not-found="showNotFound" :init-text="suggestionInitText"/>
        <AddressBlock v-if="addressBlockShown" :composite-id="currentCompositeId"/>
        <p class="not-found-message" v-if="errorMessageShown">{{errorMessage}}</p>
    </div>
</template>

<script>
    import SearchBox from "../../../components/inputs/search_box/AddressSearchBox"
    import AddressBlock from "./AddressBlock"
    import Vue from 'vue'
    import paths from '../../../js/utils/paths'

    export default {
        name: "SearchPage",
        components: {
            SearchBox,
            AddressBlock
        },
        data() {
            return {
                addressBlockShown: false,
                errorMessageShown: false,
                loadingWidgetShown: false,
                errorMessage: '',
                foundAddress: null,
                currentCompositeId: null,
                suggestionInitText: ''
            }
        },
        mounted() {
            if(this.$route.params.compositeId != null) {
                this.loadAddressByCompositeId(this.$route.params.compositeId)
            }
            if(this.$route.query.q != null) {
                this.suggestionInitText = this.$route.query.q;
            }
        },
        methods: {
            loadAddressBySuggestion(suggestion) {
                this.loadAddressByCompositeId(suggestion.id);
                this.$router.push(paths.addressByCompositeId(suggestion.id, suggestion.value));
            },
            loadAddressByCompositeId(compositeId) {
                this.showAddressBlock();
                this.currentCompositeId = compositeId;
            },
            showAddressBlock() {
                this.clearView();
                this.addressBlockShown = true;
            },
            showNotFound(addressStr) {
                this.errorMessage = `Не удалось распознать адрес "${addressStr}"`;
                this.errorMessageShown = true;
                this.addressBlockShown = false;
            },
            clearView() {
                this.addressBlockShown = false;
                this.errorMessageShown = false;
            }
        }
    }
</script>

<style>
    .not-found-message {
        margin-top: 10px;
    }
    .loading-message {
        margin-top: 10px;
    }
</style>