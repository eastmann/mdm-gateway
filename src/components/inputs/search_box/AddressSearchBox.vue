<template>
    <BaseSuggestionBox  :suggestion-provider="suggestionProvider"
                        :suggestion-renderer="suggestionRenderer"
                        :default-suggestion-count="suggestionCount"
                        v-on:suggestion-selected="loadAndShowAddress"
                        :init-text="initText"
                        :disabled="disabled"
                        />
</template>

<script>
    import axios from 'axios';
    import urls from '../../../js/utils/urls'
    import BaseSuggestionBox from "./BaseSuggestionBox";
    import AddressSuggestionProvider from "./js/provider/address-suggestion-provider"
    import AddressSuggestionRenderer from "./js/renderer/address-suggestion-renderer"

    let DEFAULT_SUGGESTIONS_COUNT = 10;

    export default {
        name: "SearchBox",
        props: ["initText", "disabled"],
        components: {
            BaseSuggestionBox
        },
        data() {
            return {
                suggestionProvider: new AddressSuggestionProvider(),
                suggestionRenderer: new AddressSuggestionRenderer(),
                suggestionCount: DEFAULT_SUGGESTIONS_COUNT
            }
        },
        methods: {
            loadAndShowAddress(suggestion) {
                let address = suggestion.value;

                let url = urls.suggestionUrlForAddress(address, 1);
                let component = this;
                axios.get(url)
                    .then(function(response) {
                        let suggestion = response.data.suggestions;

                        if(suggestion != null && Array.isArray(suggestion) && suggestion.length > 0) {
                            component.$emit("address-found", suggestion[0])
                        } else {
                            component.$emit("address-not-found", address)
                        }
                    })
                    .catch(function(error) {
                        //console.log(error);
                    });
            }
        }
    }
</script>
<style lang="less" >
    @import "css/search-box";
</style>
