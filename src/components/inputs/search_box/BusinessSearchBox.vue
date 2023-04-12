<template>
    <BaseSuggestionBox  :suggestion-provider="suggestionProvider"
                        :suggestion-renderer="suggestionRenderer"
                        :default-suggestion-count="suggestionCount"
                        v-on:suggestion-selected="emitSuggestionSelected"
                        :init-text="initText"
                        :disabled="disabled"
    />
</template>

<script>
    import BaseSuggestionBox from "./BaseSuggestionBox";
    import CompanySuggestionProvider from "./js/provider/company-suggestion-provider"
    import CompanySuggestionRenderer from "./js/renderer/company-suggestion-renderer"

    let DEFAULT_SUGGESTIONS_COUNT = 10;

    export default {
        name: "SearchBox",
        props: ["initText", "disabled"],
        components: {
            BaseSuggestionBox
        },
        data() {
            return {
                suggestionProvider: new CompanySuggestionProvider(),
                suggestionRenderer: new CompanySuggestionRenderer(),
                suggestionCount: DEFAULT_SUGGESTIONS_COUNT
            }
        },
        methods: {
            emitSuggestionSelected(suggestion) {
                this.$emit("suggestion-selected", suggestion)
            }
        }
    }
</script>
<style lang="less" >
    @import "css/search-box";
</style>
